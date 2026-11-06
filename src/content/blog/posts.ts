import KundliBasics from "./understanding-kundli-basics.mdx";
import RelationshipCompatibility from "./relationship-compatibility-in-vedic-astrology.mdx";
import CareerQuestions from "./career-questions-and-vedic-astrology.mdx";
import NumerologyIntro from "./numerology-numbers-and-meaning.mdx";
import VastuBasics from "./vastu-basics-for-home.mdx";
import MuhuratIntro from "./muhurat-and-traditional-timing.mdx";
import ConsultationPreparation from "./preparing-for-an-astrology-consultation.mdx";
import InternationalConsultations from "./online-astrology-abroad-time-zones.mdx";
import type { ComponentType } from "react";
import type { BlogPost } from "@/config/blog";

/** Only locally authored, trusted MDX components are mapped here. */
export const articleComponents: Record<string, ComponentType> = {
  "understanding-kundli-basics": KundliBasics,
  "relationship-compatibility-in-vedic-astrology": RelationshipCompatibility,
  "career-questions-and-vedic-astrology": CareerQuestions,
  "numerology-numbers-and-meaning": NumerologyIntro,
  "vastu-basics-for-home": VastuBasics,
  "muhurat-and-traditional-timing": MuhuratIntro,
  "preparing-for-an-astrology-consultation": ConsultationPreparation,
  "online-astrology-abroad-time-zones": InternationalConsultations,
} satisfies Record<BlogPost["slug"], ComponentType>;
