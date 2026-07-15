import { companies } from "@/data/companies";

export type DisclosureType = "Price sensitive" | "Dividend" | "AGM notice" | "Regulatory";

export type Disclosure = {
  id: string;
  code: string;
  name: string;
  sector: string;
  type: DisclosureType;
  date: string;
  time: string;
  summary: string;
  body: string;
};

export const typeMeta: Record<DisclosureType, { color: string; bg: string }> = {
  "Price sensitive": { color: "var(--red-down)", bg: "rgba(232,136,154,0.10)" },
  Dividend: { color: "var(--green-up)", bg: "rgb(var(--brand-tint) / 0.10)" },
  "AGM notice": { color: "#7fbcd9", bg: "rgba(127,188,217,0.10)" },
  Regulatory: { color: "#f0c674", bg: "rgba(240,198,116,0.10)" },
};

const extra: Disclosure[] = [
  {
    id: "x-1",
    code: "BEXIMCO",
    name: "Beximco Ltd",
    sector: "Conglomerate",
    type: "Price sensitive",
    date: "Jun 05",
    time: "11:42",
    summary: "Subsidiary Beximco Pharma signs MoU with Aspen South Africa for vaccine fill-finish capacity.",
    body: "Beximco Limited disclosed today that its pharmaceutical subsidiary has entered into a Memorandum of Understanding with Aspen South Africa for a vaccine fill-finish partnership. The arrangement is expected to add up to USD 14M of annualised revenue over a 24-month ramp.",
  },
  {
    id: "x-2",
    code: "ACI",
    name: "ACI Limited",
    sector: "Consumer",
    type: "Dividend",
    date: "Jun 05",
    time: "10:08",
    summary: "Board recommends final cash dividend of 30% for FY2025; record date set for June 22.",
    body: "The Board of Directors at its meeting held on June 5, 2026 recommended a final cash dividend of 30% (BDT 3 per share of BDT 10 face value) for the year ended March 31, 2026.",
  },
  {
    id: "x-3",
    code: "OLYMPIC",
    name: "Olympic Industries",
    sector: "Food & Beverage",
    type: "AGM notice",
    date: "Jun 04",
    time: "16:30",
    summary: "33rd AGM scheduled for July 14, 2026 via digital platform; record date June 26.",
    body: "Notice is hereby given that the 33rd Annual General Meeting of Olympic Industries Limited will be held on Tuesday, July 14, 2026 at 11:00 AM through a digital platform in accordance with BSEC directive.",
  },
  {
    id: "x-4",
    code: "BSRMSTEEL",
    name: "BSRM Steel",
    sector: "Engineering",
    type: "Regulatory",
    date: "Jun 04",
    time: "14:55",
    summary: "BSEC clarification: no undisclosed information behind recent price movement.",
    body: "In response to a query from the Dhaka Stock Exchange regarding unusual price movement, BSRM Steel Limited confirms that there is no undisclosed price-sensitive information that may have any impact on the share price.",
  },
];

export function buildFeed(): Disclosure[] {
  const fromCompanies: Disclosure[] = [];
  let id = 0;
  for (const co of companies) {
    for (const a of co.recentAnnouncements ?? []) {
      fromCompanies.push({
        id: `c-${id++}`,
        code: co.code,
        name: co.name,
        sector: co.sector,
        type: a.type as DisclosureType,
        date: a.date,
        time: `${10 + (id % 5)}:${(15 + (id * 7) % 45).toString().padStart(2, "0")}`,
        summary: a.summary,
        body:
          a.summary +
          ". Full disclosure text would appear here, including financial details, board resolutions and any relevant attachments filed with the BSEC and submitted to the Dhaka Stock Exchange.",
      });
    }
  }
  return [...extra, ...fromCompanies];
}

export function getDisclosureById(id: string): Disclosure | undefined {
  return buildFeed().find((d) => d.id === id);
}
