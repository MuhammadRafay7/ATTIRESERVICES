import { Building2, Mail } from "lucide-react";
import { getSettings } from "@/lib/cms";
import { SettingsForm } from "../SettingsForm";
import { AdminCard, AdminGrid, AdminInput, AdminPage, AdminTextarea } from "../ui";

export const dynamic = "force-dynamic";

/** Contact routes and the corporate identifiers procurement teams check. */
export default async function ContactPage() {
  const s = await getSettings();

  return (
    <AdminPage
      title="Contact details"
      description="Shown in the header bar, the footer, the contact page and the closing call-to-action band."
    >
      <SettingsForm>
        <AdminCard title="How clients reach you" icon={<Mail size={17} />}>
          <AdminGrid>
            <AdminInput label="Enquiry email" name="contact.email" type="email"
              defaultValue={s.contact.email} required wide />
            <AdminTextarea label="Registered address" name="contact.address"
              defaultValue={s.contact.address} rows={2} />
            <AdminInput label="Response time" name="responseSla" defaultValue={s.responseSla} wide
              hint='Stated as a commitment, e.g. "One business day".' />
          </AdminGrid>
        </AdminCard>

        <AdminCard
          title="Corporate identifiers"
          description="Shown in the header utility bar and the footer. Procurement teams check these during vendor qualification."
          icon={<Building2 size={17} />}
        >
          <AdminGrid>
            <AdminInput label="Legal entity" name="legalEntity" defaultValue={s.legalEntity} />
            <AdminInput label="Company registration" name="registration" defaultValue={s.registration} />
            <AdminInput label="D-U-N-S number" name="duns" defaultValue={s.duns} wide />
          </AdminGrid>
        </AdminCard>
      </SettingsForm>
    </AdminPage>
  );
}
