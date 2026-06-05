export const dsexData = [
  { time: "09:30", value: 6192 }, { time: "09:45", value: 6198 },
  { time: "10:00", value: 6205 }, { time: "10:15", value: 6201 },
  { time: "10:30", value: 6215 }, { time: "10:45", value: 6220 },
  { time: "11:00", value: 6218 }, { time: "11:15", value: 6228 },
  { time: "11:30", value: 6224 }, { time: "11:45", value: 6230 },
  { time: "12:00", value: 6235 }, { time: "12:15", value: 6229 },
  { time: "12:30", value: 6238 }, { time: "12:45", value: 6241 },
  { time: "13:00", value: 6241 },
];

export const sparkData = Array.from({ length: 30 }, (_, i) => ({
  i,
  v: 6190 + Math.round(Math.sin(i / 3) * 12 + i * 1.7 + Math.cos(i / 1.7) * 4),
}));

export const tickerStocks = [
  { code: "BATBC", price: "211.5", change: 1.2 },
  { code: "GPCO", price: "324.0", change: -1.0 },
  { code: "BRAC", price: "48.3", change: 1.3 },
  { code: "SQPHARMA", price: "190.2", change: 1.1 },
  { code: "RENATA", price: "1,240", change: -0.6 },
  { code: "GRAMEENS", price: "28.4", change: 0.5 },
  { code: "ISLAMIBNK", price: "32.1", change: -0.3 },
  { code: "DBBL", price: "288.0", change: 0.8 },
  { code: "ACMELAB", price: "79.4", change: 1.7 },
  { code: "ACI", price: "194.1", change: 0.9 },
  { code: "MARICO", price: "298.0", change: -0.2 },
  { code: "BEXIMCO", price: "18.5", change: 0.4 },
  { code: "WALTONHIL", price: "1,620", change: 0.3 },
  { code: "BSRMSTEEL", price: "68.2", change: -0.9 },
  { code: "OLYMPIC", price: "160.5", change: 0.6 },
];

const sectorSpark = (up: boolean, seed: number) =>
  Array.from({ length: 12 }, (_, i) => ({
    i,
    v: 50 + (up ? i * 1.1 : -i * 0.7) + Math.sin((i + seed) / 1.7) * 3,
  }));

export type SectorSize = "lg" | "md" | "sm";

export const sectors: {
  name: string;
  change: number;
  size: SectorSize;
  turnover: string;
  spark: { i: number; v: number }[];
}[] = [
  { name: "Pharmaceuticals", change: 1.8, size: "lg", turnover: "৳184.2 Cr", spark: sectorSpark(true, 1) },
  { name: "Banking", change: 0.4, size: "lg", turnover: "৳212.6 Cr", spark: sectorSpark(true, 2) },
  { name: "Textile", change: -0.9, size: "lg", turnover: "৳96.4 Cr", spark: sectorSpark(false, 3) },
  { name: "IT", change: 0.2, size: "md", turnover: "৳42.1 Cr", spark: sectorSpark(true, 4) },
  { name: "Insurance", change: -1.3, size: "md", turnover: "৳58.3 Cr", spark: sectorSpark(false, 5) },
  { name: "Cement", change: 0.6, size: "md", turnover: "৳61.2 Cr", spark: sectorSpark(true, 6) },
  { name: "Food & Beverage", change: 0.3, size: "sm", turnover: "৳28.4 Cr", spark: sectorSpark(true, 7) },
  { name: "Engineering", change: -0.4, size: "sm", turnover: "৳33.1 Cr", spark: sectorSpark(false, 8) },
  { name: "Fuel & Power", change: 1.1, size: "sm", turnover: "৳71.8 Cr", spark: sectorSpark(true, 9) },
  { name: "Telecom", change: -0.2, size: "sm", turnover: "৳54.0 Cr", spark: sectorSpark(false, 10) },
];

const mkSpark = (up: boolean) =>
  Array.from({ length: 6 }, (_, i) => ({ i, v: up ? 10 + i + Math.sin(i) * 1.5 : 20 - i + Math.cos(i) * 1.5 }));

export const topGainers = [
  { code: "ANWARGALV", name: "Anwar Galvanising", price: 109.7, change: 9.92, volume: "2.1M", spark: mkSpark(true) },
  { code: "ACFL", name: "AFC Agro Biotech", price: 24.4, change: 7.02, volume: "4.8M", spark: mkSpark(true) },
  { code: "JANATAMF", name: "Janata Mutual Fund", price: 3.1, change: 6.9, volume: "11.2M", spark: mkSpark(true) },
  { code: "APOLOISPAT", name: "Apolo Ispat Complex", price: 3.5, change: 6.06, volume: "8.6M", spark: mkSpark(true) },
  { code: "ALLTEX", name: "Alltex Industries", price: 17.4, change: 2.91, volume: "1.9M", spark: mkSpark(true) },
];

export const topLosers = [
  { code: "APEXSPINN", name: "Apex Spinning", price: 315.9, change: -3.89, volume: "0.4M", spark: mkSpark(false) },
  { code: "APEXTANRY", name: "Apex Tannery", price: 105.5, change: -3.83, volume: "0.6M", spark: mkSpark(false) },
  { code: "ATLASBANG", name: "Atlas Bangladesh", price: 70.1, change: -2.09, volume: "0.9M", spark: mkSpark(false) },
  { code: "ACMEPL", name: "ACME Pesticides", price: 25.6, change: -1.92, volume: "1.2M", spark: mkSpark(false) },
  { code: "BAYLEASING", name: "Bay Leasing", price: 4.5, change: -2.17, volume: "5.3M", spark: mkSpark(false) },
];

export const mostActive = [
  { code: "BEXIMCO", name: "Beximco Ltd", price: 18.5, change: 0.4, volume: "48.2M", spark: mkSpark(true) },
  { code: "ISLAMIBNK", name: "Islami Bank BD", price: 32.1, change: -0.3, volume: "32.1M", spark: mkSpark(false) },
  { code: "BATBC", name: "BAT Bangladesh", price: 211.5, change: 1.2, volume: "28.4M", spark: mkSpark(true) },
  { code: "GRAMEENS", name: "GrameenPhone", price: 28.4, change: 0.5, volume: "24.7M", spark: mkSpark(true) },
  { code: "BRAC", name: "BRAC Bank", price: 48.3, change: 1.3, volume: "21.9M", spark: mkSpark(true) },
];

export const announcements = [
  { code: "ACMELAB", name: "ACME Laboratories", type: "Price sensitive", date: "Jun 04", summary: "Transmission of shares following death of Managing Director" },
  { code: "BATBC", name: "BAT Bangladesh", type: "Dividend", date: "Jun 03", summary: "Final cash dividend of 450% declared for FY2025" },
  { code: "GRAMEENS", name: "GrameenPhone", type: "AGM notice", date: "Jun 02", summary: "Annual General Meeting scheduled for June 25, 2026" },
  { code: "RENATA", name: "Renata Limited", type: "Price sensitive", date: "Jun 01", summary: "Board approves rights share issuance at 1:5 ratio" },
  { code: "ISLAMIBNK", name: "Islami Bank BD", type: "Regulatory", date: "May 31", summary: "BSEC query response regarding unusual price movement" },
] as const;

export const longSeries = Array.from({ length: 60 }, (_, i) => ({
  date: `D${i + 1}`,
  value: 6100 + Math.round(Math.sin(i / 4) * 40 + i * 2.4 + Math.cos(i / 2.3) * 9),
}));

/* Period-keyed index data — used by IndicesPanel to swap on tab click */
export const indexData: Record<string, { t: string; v: number }[]> = {
  "1D": [
    { t: "09:30", v: 6192 }, { t: "10:00", v: 6205 }, { t: "10:30", v: 6215 },
    { t: "11:00", v: 6218 }, { t: "11:30", v: 6224 }, { t: "12:00", v: 6235 },
    { t: "12:30", v: 6238 }, { t: "13:00", v: 6241 },
  ],
  "1W": [
    { t: "Mon", v: 6180 }, { t: "Tue", v: 6195 }, { t: "Wed", v: 6172 },
    { t: "Thu", v: 6210 }, { t: "Fri", v: 6241 },
  ],
  "1M": [
    { t: "May 6", v: 6050 }, { t: "May 13", v: 6090 }, { t: "May 20", v: 6140 },
    { t: "May 27", v: 6180 }, { t: "Jun 4", v: 6241 },
  ],
  "3M": [
    { t: "Mar", v: 5890 }, { t: "Apr", v: 6020 }, { t: "May", v: 6140 }, { t: "Jun", v: 6241 },
  ],
  YTD: [
    { t: "Jan", v: 5640 }, { t: "Feb", v: 5720 }, { t: "Mar", v: 5890 },
    { t: "Apr", v: 6020 }, { t: "May", v: 6140 }, { t: "Jun", v: 6241 },
  ],
};

/* Lightweight company index for nav search — full dataset arrives in Phase 2 Part 2 */
export const companyIndex = [
  { code: "BATBC", name: "British American Tobacco Bangladesh", price: 211.5, sector: "Consumer Staples" },
  { code: "GRAMEENS", name: "Grameenphone Ltd", price: 28.4, sector: "Telecom" },
  { code: "RENATA", name: "Renata Limited", price: 1240, sector: "Pharmaceuticals" },
  { code: "SQPHARMA", name: "Square Pharmaceuticals", price: 190.2, sector: "Pharmaceuticals" },
  { code: "WALTONHIL", name: "Walton Hi-Tech Industries", price: 1620, sector: "Engineering" },
  { code: "ISLAMIBNK", name: "Islami Bank Bangladesh", price: 32.1, sector: "Banking" },
  { code: "BRAC", name: "BRAC Bank Limited", price: 48.3, sector: "Banking" },
  { code: "DBBL", name: "Dutch-Bangla Bank Limited", price: 288, sector: "Banking" },
  { code: "ACMELAB", name: "ACME Laboratories Limited", price: 79.4, sector: "Pharmaceuticals" },
  { code: "MARICO", name: "Marico Bangladesh Limited", price: 298, sector: "Consumer Staples" },
  { code: "BEXIMCO", name: "Beximco Ltd", price: 18.5, sector: "Conglomerate" },
  { code: "ACI", name: "ACI Limited", price: 194.1, sector: "Consumer" },
  { code: "BSRMSTEEL", name: "BSRM Steel", price: 68.2, sector: "Engineering" },
  { code: "OLYMPIC", name: "Olympic Industries", price: 160.5, sector: "Food & Beverage" },
];
