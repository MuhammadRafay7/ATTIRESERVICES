/**
 * Technical product plates.
 *
 * Where we have no photography for a category, we do not fall back to a
 * grey icon box — we draw the product as a dimensioned schematic on a
 * measured ground, the way a spec sheet would. For a technical buyer this
 * reads as more authoritative than generic stock photography, and it keeps
 * the portfolio grid visually consistent.
 *
 * All plates are inline SVG on a 400×300 canvas, stroked in currentColor.
 */

type PlateProps = { className?: string };

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const THIN = { ...S, strokeWidth: 0.75, opacity: 0.55 };

export type PlateKey =
  | "fabric"
  | "apparel"
  | "workwear"
  | "upholstery"
  | "trims";

function Ground() {
  return (
    <>
      {/* measured ground */}
      <g opacity={0.28}>
        {Array.from({ length: 9 }, (_, i) => (
          <line
            key={`v${i}`}
            x1={40 + i * 40}
            y1={20}
            x2={40 + i * 40}
            y2={280}
            stroke="currentColor"
            strokeWidth={0.4}
          />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <line
            key={`h${i}`}
            x1={20}
            y1={40 + i * 40}
            x2={380}
            y2={40 + i * 40}
            stroke="currentColor"
            strokeWidth={0.4}
          />
        ))}
      </g>
      {/* corner registration marks */}
      <g opacity={0.6}>
        {[
          [24, 24],
          [376, 24],
          [24, 276],
          [376, 276],
        ].map(([x, y], i) => (
          <g key={i}>
            <line x1={x - 6} y1={y} x2={x + 6} y2={y} {...THIN} opacity={1} />
            <line x1={x} y1={y - 6} x2={x} y2={y + 6} {...THIN} opacity={1} />
          </g>
        ))}
      </g>
    </>
  );
}

const plates: Record<PlateKey, React.ReactNode> = {


  // Fabric roll with weave detail
  fabric: (
    <g>
      <rect x={96} y={112} width={208} height={78} {...S} />
      <ellipse cx={96} cy={151} rx={16} ry={39} {...S} />
      <ellipse cx={96} cy={151} rx={6} ry={15} {...THIN} />
      <path d="M304 112c14 0 14 78 0 78" {...THIN} />
      <path d="M150 190l-34 52h150l-30-52" {...S} />
      {Array.from({ length: 7 }, (_, i) => (
        <line key={i} x1={128 + i * 24} y1={112} x2={128 + i * 24} y2={190} {...THIN} />
      ))}
      {Array.from({ length: 4 }, (_, i) => (
        <line key={i} x1={124} y1={206 + i * 10} x2={272} y2={206 + i * 10} {...THIN} />
      ))}
    </g>
  ),

  // Jacket flat
  apparel: (
    <g>
      <path d="M148 92l-38 20-14 60 30 10v66h148v-66l30-10-14-60-38-20z" {...S} />
      <path d="M148 92l52 34 52-34" {...S} />
      <path d="M200 126v122" {...S} />
      <path d="M126 182v66M274 182v66" {...THIN} />
      <path d="M164 156h22M214 156h22" {...THIN} />
      <path d="M200 150v-6M200 174v-6M200 198v-6M200 222v-6" {...THIN} />
    </g>
  ),

  // Coverall flat
  workwear: (
    <g>
      <path d="M152 88l-34 18-10 54 26 8v82h132v-82l26-8-10-54-34-18z" {...S} />
      <path d="M152 88l48 22 48-22" {...S} />
      <path d="M200 110v140" {...S} />
      <path d="M134 168v82M266 168v82" {...THIN} />
      <rect x={146} y={186} width={34} height={26} {...THIN} />
      <rect x={220} y={186} width={34} height={26} {...THIN} />
      <path d="M134 232h132" {...THIN} />
      <path d="M156 138h18M226 138h18" {...THIN} />
    </g>
  ),

  // Upholstered seat, section view
  upholstery: (
    <g>
      <path d="M92 236v-70a22 22 0 0 1 22-22h4v-30a18 18 0 0 1 18-18h128a18 18 0 0 1 18 18v30h4a22 22 0 0 1 22 22v70z" {...S} />
      <path d="M118 144h164" {...S} />
      <path d="M92 202h216" {...THIN} />
      <path d="M136 116h128" {...THIN} />
      <path d="M164 116v28M200 116v28M236 116v28" {...THIN} />
      <path d="M112 236v-28M288 236v-28" {...THIN} />
      <path d="M92 236h216" {...S} />
    </g>
  ),


  // Zip, buckle and rivet
  trims: (
    <g>
      <rect x={78} y={130} width={104} height={40} {...S} />
      <path d="M130 130v40" {...S} />
      {Array.from({ length: 6 }, (_, i) => (
        <g key={i}>
          <line x1={112} y1={136 + i * 6} x2={126} y2={136 + i * 6} {...THIN} />
          <line x1={134} y1={139 + i * 6} x2={148} y2={139 + i * 6} {...THIN} />
        </g>
      ))}
      <path d="M182 138h22l8 12-8 12h-22z" {...S} />
      <rect x={228} y={122} width={72} height={56} {...S} />
      <path d="M228 150h72" {...S} />
      <path d="M252 122v56" {...THIN} />
      <circle cx={150} cy={222} r={18} {...S} />
      <circle cx={150} cy={222} r={7} {...THIN} />
      <circle cx={228} cy={222} r={18} {...S} />
      <path d="M228 208v28M214 222h28" {...THIN} />
    </g>
  ),
};

export function ProductPlate({
  plate,
  label,
  className = "",
}: PlateProps & { plate: PlateKey; label?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-bg-muted ${className}`}
    >
      <svg
        viewBox="0 0 400 300"
        className="h-full w-full text-ink/60"
        role="img"
        aria-label={label ? `Technical plate — ${label}` : "Technical plate"}
      >
        <Ground />
        {plates[plate]}
      </svg>
      {label && (
        <span className="label-mono absolute bottom-3 left-4 text-ink-faint">
          {label}
        </span>
      )}
    </div>
  );
}
