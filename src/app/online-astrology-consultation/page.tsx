import { ConsultationPage } from "@/components/booking/consultation-page";
import { consultationPages } from "@/config/consultations";
import { pageMetadata } from "@/lib/metadata";

const content = consultationPages.online;
export const metadata = pageMetadata(content.path, content.title, content.description);

export default function OnlineConsultationPage() {
  return <ConsultationPage content={content}/>;
}
