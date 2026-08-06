"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { geo } from "@/lib/site";
import { landPoints } from "@/lib/land-points";

/**
 * The hero's signature element: a dotted marine chart of the world with our
 * ports marked on it.
 *
 * Land is sampled from real Natural Earth coastlines (scripts/gen-land.mjs)
 * and drawn as a point field, which reads as a chart rather than a textured
 * planet. Route arcs were tried and removed — at this size they cluttered the
 * sphere more than they explained it, and the flat footprint map further down
 * the page shows the lanes properly.
 *
 * Everything is built from three.js primitives (no external assets), the
 * renderer pauses when scrolled out of view, and with `prefers-reduced-motion`
 * the sphere holds still and the lane markers park at their destinations.
 */

const RADIUS = 1;

const COLOR = {
  sphere: 0x0a2338,
  land: 0x8fbcd9,
  graticule: 0x2f5f80,
  atmosphere: 0x3a8dc0,
  lane: 0xe0b070,
  node: 0xf0d3a0,
};

function latLonToVec3(lat: number, lon: number, radius = RADIUS) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function buildGraticule() {
  const positions: number[] = [];

  // Parallels every 30°, skipping the poles.
  for (let lat = -60; lat <= 60; lat += 30) {
    for (let lon = -180; lon < 180; lon += 6) {
      const a = latLonToVec3(lat, lon, RADIUS * 1.001);
      const b = latLonToVec3(lat, lon + 6, RADIUS * 1.001);
      positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }
  // Meridians every 30°.
  for (let lon = -180; lon < 180; lon += 30) {
    for (let lat = -84; lat < 84; lat += 6) {
      const a = latLonToVec3(lat, lon, RADIUS * 1.001);
      const b = latLonToVec3(lat + 6, lon, RADIUS * 1.001);
      positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  return geometry;
}

/** Soft round point with per-vertex alpha — used for ports and lane markers. */
function pointMaterial(color: number, size: number) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uSize: { value: size },
    },
    vertexShader: /* glsl */ `
      attribute float aAlpha;
      varying float vAlpha;
      uniform float uSize;
      void main() {
        vAlpha = aAlpha;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        // uSize is a screen-pixel target at the sphere's nominal distance.
        gl_PointSize = clamp(uSize * (4.2 / -mv.z), 1.5, 26.0);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      varying float vAlpha;
      uniform vec3 uColor;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float a = smoothstep(0.5, 0.05, d);
        gl_FragColor = vec4(uColor, a * vAlpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

export default function GlobeScene({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // WebGL can be unavailable (old browser, blocked context). Fail quietly —
    // the hero still reads without it.
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      32,
      host.clientWidth / Math.max(host.clientHeight, 1),
      0.1,
      100,
    );
    // Far enough back that the atmosphere rim never touches the frame edge.
    camera.position.set(0, 0, 4.2);

    // The whole chart rotates as one group so lanes stay pinned to their ports.
    const world = new THREE.Group();
    // Our lanes all sit between 10°N and 52°N. Tilting by the middle of that
    // band brings the whole fan to the centre of the disc instead of crowding
    // it against the top rim.
    world.rotation.x = 0.62;
    scene.add(world);

    const disposables: { dispose(): void }[] = [];

    // --- opaque sphere: occludes the far side, giving the chart real depth ---
    const sphereGeo = new THREE.SphereGeometry(RADIUS * 0.998, 48, 32);
    const sphereMat = new THREE.MeshBasicMaterial({ color: COLOR.sphere });
    world.add(new THREE.Mesh(sphereGeo, sphereMat));
    disposables.push(sphereGeo, sphereMat);

    // --- atmosphere rim ---
    const atmoGeo = new THREE.SphereGeometry(RADIUS * 1.12, 32, 32);
    const atmoMat = new THREE.ShaderMaterial({
      uniforms: { uColor: { value: new THREE.Color(COLOR.atmosphere) } },
      vertexShader: /* glsl */ `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vNormal;
        uniform vec3 uColor;
        void main() {
          float intensity = pow(clamp(0.58 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 3.2);
          gl_FragColor = vec4(uColor, 1.0) * intensity * 0.55;
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    scene.add(new THREE.Mesh(atmoGeo, atmoMat));
    disposables.push(atmoGeo, atmoMat);

    // --- land ---
    // Real Natural Earth coastlines, sampled offline (scripts/gen-land.mjs).
    // An earlier pass approximated continents with ellipses, which reads fine
    // on the small flat map but scatters into noise at sphere scale.
    const land = landPoints();
    const landPos = new Float32Array(land.length * 3);
    const landAlpha = new Float32Array(land.length).fill(1);
    land.forEach((point, i) => {
      const v = latLonToVec3(point.lat, point.lon, RADIUS * 1.004);
      landPos.set([v.x, v.y, v.z], i * 3);
    });

    const landGeo = new THREE.BufferGeometry();
    landGeo.setAttribute("position", new THREE.BufferAttribute(landPos, 3));
    landGeo.setAttribute("aAlpha", new THREE.BufferAttribute(landAlpha, 1));
    const landMat = pointMaterial(COLOR.land, 3.4);
    // Land is a field, not a light source — normal blending keeps it matte
    // instead of blooming where dots overlap.
    landMat.blending = THREE.NormalBlending;
    world.add(new THREE.Points(landGeo, landMat));
    disposables.push(landGeo, landMat);

    // --- graticule ---
    const gratGeo = buildGraticule();
    const gratMat = new THREE.LineBasicMaterial({
      color: COLOR.graticule,
      transparent: true,
      opacity: 0.22,
    });
    world.add(new THREE.LineSegments(gratGeo, gratMat));
    disposables.push(gratGeo, gratMat);

    // --- ports ---
    const portKeys = Object.keys(geo);
    const portPos = new Float32Array(portKeys.length * 3);
    const portAlpha = new Float32Array(portKeys.length).fill(1);
    portKeys.forEach((key, i) => {
      const v = latLonToVec3(geo[key].lat, geo[key].lon, RADIUS * 1.012);
      portPos.set([v.x, v.y, v.z], i * 3);
    });

    const portGeo = new THREE.BufferGeometry();
    portGeo.setAttribute("position", new THREE.BufferAttribute(portPos, 3));
    portGeo.setAttribute("aAlpha", new THREE.BufferAttribute(portAlpha, 1));
    const portMat = pointMaterial(COLOR.node, 6);
    world.add(new THREE.Points(portGeo, portMat));
    disposables.push(portGeo, portMat);

    // --- interaction: drag to spin, with inertia ---
    const spin = 0.0016;
    let velocity = 0;
    let dragging = false;
    let lastX = 0;

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      renderer.domElement.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      velocity = dx * 0.005;
      world.rotation.y += velocity;
    };
    const onPointerUp = (e: PointerEvent) => {
      dragging = false;
      renderer.domElement.releasePointerCapture?.(e.pointerId);
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointercancel", onPointerUp);
    renderer.domElement.style.touchAction = "pan-y";
    renderer.domElement.style.cursor = "grab";

    // Open on ~30°E. The lanes fan from Rotterdam out to İzmir, Chennai, Dhaka
    // and Ho Chi Minh City, which is more than a hemisphere of longitude — this
    // framing shows the dense Europe–Asia side, and the transatlantic leg to
    // New York rotates into view.
    world.rotation.y = -2.09;

    // --- resize ---
    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    // --- pause when off-screen ---
    let visible = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(host);

    // --- loop ---
    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (!visible) return;

      if (!reduceMotion) {
        if (!dragging) {
          // Bleed off drag inertia, then settle back to the ambient spin.
          velocity *= 0.94;
          world.rotation.y += velocity + spin;
        }

      }

      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointercancel", onPointerUp);
      for (const d of disposables) d.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={className}
      role="img"
      aria-label="Rotating chart of Attire Services trade lanes between Rotterdam, New York, İzmir, Ho Chi Minh City, Dhaka and Chennai"
    />
  );
}
