import { ConsultationPage } from "@/components/booking/consultation-page";
import { consultationPages } from "@/config/consultations";
import { pageMetadata } from "@/lib/metadata";

const content = consultationPages.prayagraj;
export const metadata = pageMetadata(content.path, content.title, content.description);

export default function PrayagrajPage() {
  return <ConsultationPage content={content}/>;
}
