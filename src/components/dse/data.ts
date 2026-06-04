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
  v: 6190 + Math.round(Math.sin(i / 3) * 12 + i * 1.7 + Math.random() * 6),
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

export const sectors = [
  { name: "Pharmaceuticals", change: 1.8, size: "lg" },
  { name: "Banking", change: 0.4, size: "lg" },
  { name: "Textile", change: -0.9, size: "lg" },
  { name: "IT", change: 0.2, size: "md" },
  { name: "Insurance", change: -1.3, size: "md" },
  { name: "Cement", change: 0.6, size: "md" },
  { name: "Food & Beverage", change: 0.3, size: "sm" },
  { name: "Engineering", change: -0.4, size: "sm" },
  { name: "Fuel & Power", change: 1.1, size: "sm" },
  { name: "Telecom", change: -0.2, size: "sm" },
] as const;

const mkSpark = (up: boolean) =>
  Array.from({ length: 6 }, (_, i) => ({ i, v: up ? 10 + i + Math.random() * 3 : 20 - i + Math.random() * 3 }));

export const topGainers = [
  { code: "ANWARGALV", name: "Anwar Galvanising", price: 109.7, change: 9.92, spark: mkSpark(true) },
  { code: "ACFL", name: "AFC Agro Biotech", price: 24.4, change: 7.02, spark: mkSpark(true) },
  { code: "JANATAMF", name: "Janata Mutual Fund", price: 3.1, change: 6.9, spark: mkSpark(true) },
  { code: "APOLOISPAT", name: "Apolo Ispat Complex", price: 3.5, change: 6.06, spark: mkSpark(true) },
  { code: "ALLTEX", name: "Alltex Industries", price: 17.4, change: 2.91, spark: mkSpark(true) },
];

export const topLosers = [
  { code: "GPCO", name: "GrameenPhone Co", price: 324.0, change: -4.2, spark: mkSpark(false) },
  { code: "BSRMSTEEL", name: "BSRM Steel", price: 68.2, change: -3.8, spark: mkSpark(false) },
  { code: "RENATA", name: "Renata Limited", price: 1240, change: -3.1, spark: mkSpark(false) },
  { code: "MARICO", name: "Marico BD", price: 298.0, change: -2.4, spark: mkSpark(false) },
  { code: "ISLAMIBNK", name: "Islami Bank BD", price: 32.1, change: -1.9, spark: mkSpark(false) },
];

export const mostActive = [
  { code: "BEXIMCO", name: "Beximco Ltd", price: 18.5, change: 2.1, spark: mkSpark(true) },
  { code: "BATBC", name: "BAT Bangladesh", price: 211.5, change: 1.2, spark: mkSpark(true) },
  { code: "BRAC", name: "BRAC Bank", price: 48.3, change: 1.3, spark: mkSpark(true) },
  { code: "DBBL", name: "Dutch-Bangla Bank", price: 288.0, change: 0.8, spark: mkSpark(true) },
  { code: "ACI", name: "ACI Limited", price: 194.1, change: -0.4, spark: mkSpark(false) },
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
