export type ShareCategory = "A" | "B" | "N" | "Z";

export type SharePattern = {
  sponsor: number;
  government: number;
  institution: number;
  foreign: number;
  public: number;
};

export type DividendRow = { year: number; cash: number; stock: number };

export type Company = {
  code: string;
  name: string;
  sector: string;
  board: string;
  category: ShareCategory;
  price: number;
  change: number;
  changePct: number;
  prevClose: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  marketCap: number;
  pe: number;
  eps: number;
  dividendYield: number;
  bookValue: number;
  freeFloat: number;
  weekHigh52: number;
  weekLow52: number;
  faceValue: number;        // per share, BDT
  paidUpCapital: number;    // BDT
  nav: number;              // NAV per share, BDT
  description: string;
  founded?: number;
  hq: string;
  employees?: number;
  website?: string;
  sharePattern?: SharePattern;
  dividendHistory?: DividendRow[];
  recentAnnouncements?: { type: string; date: string; summary: string }[];
  // legacy / unused in UI
  financials?: { revenue: string; netProfit: string; netMargin: string; roe: string; debtEquity: string };
  shareholders?: { name: string; pct: number }[];
};

/* helper to fabricate a deterministic share pattern when not specified */
function pat(p: Partial<SharePattern>): SharePattern {
  const sponsor = p.sponsor ?? 45;
  const government = p.government ?? 0;
  const foreign = p.foreign ?? 0;
  const institution = p.institution ?? 15;
  const publicPct = Math.max(0, Math.round((100 - sponsor - government - foreign - institution) * 10) / 10);
  return { sponsor, government, institution, foreign, public: publicPct };
}

/* deterministic dividend history helper */
function dh(rows: [number, number, number][]): DividendRow[] {
  return rows.map(([year, cash, stock]) => ({ year, cash, stock }));
}

export const companies: Company[] = [
  {
    code: "BATBC", name: "British American Tobacco Bangladesh", sector: "Consumer Staples", board: "Main Board", category: "A",
    price: 211.5, change: 1.6, changePct: 0.77, prevClose: 209.9, open: 210.1, high: 213.2, low: 209.5,
    volume: 28400000, marketCap: 8245000000000, pe: 14.2, eps: 14.9, dividendYield: 2.14, bookValue: 98.4, freeFloat: 30,
    weekHigh52: 248, weekLow52: 188.5, faceValue: 10, paidUpCapital: 5400000000, nav: 98.4,
    description: "BAT Bangladesh is the country's leading tobacco company, manufacturing and marketing cigarettes under brands including Benson & Hedges, John Player Gold Leaf, and Camel.",
    hq: "Dhaka", website: "batbangladesh.com",
    sharePattern: pat({ sponsor: 72.9, foreign: 0, institution: 14.6, government: 0.5 }),
    dividendHistory: dh([[2025, 450, 0], [2024, 360, 0], [2023, 400, 0], [2022, 600, 0], [2021, 600, 0]]),
    recentAnnouncements: [
      { type: "Dividend", date: "Jun 03", summary: "Final cash dividend of 450% declared for FY2025" },
      { type: "AGM notice", date: "May 22", summary: "AGM scheduled for June 28, 2026 at Le Méridien Dhaka" },
      { type: "Price sensitive", date: "May 14", summary: "Q1 results: revenue +9.4% YoY, EPS ৳ 3.81" },
    ],
  },
  {
    code: "GRAMEENS", name: "Grameenphone Ltd", sector: "Telecom", board: "Main Board", category: "A",
    price: 28.4, change: 0.5, changePct: 1.79, prevClose: 27.9, open: 28, high: 28.8, low: 27.8,
    volume: 24700000, marketCap: 2380000000000, pe: 18.4, eps: 1.54, dividendYield: 3.1, bookValue: 12.2, freeFloat: 44,
    weekHigh52: 34.5, weekLow52: 24.1, faceValue: 10, paidUpCapital: 13503000000, nav: 12.2,
    description: "Grameenphone is Bangladesh's largest mobile telecommunications operator with over 82 million subscribers.",
    hq: "Dhaka", website: "grameenphone.com",
    sharePattern: pat({ sponsor: 55.8, foreign: 34.2, institution: 6.0, government: 0 }),
    dividendHistory: dh([[2025, 130, 0], [2024, 175, 0], [2023, 250, 0], [2022, 275, 0], [2021, 280, 0]]),
    recentAnnouncements: [
      { type: "AGM notice", date: "Jun 02", summary: "Annual General Meeting scheduled for June 25, 2026" },
      { type: "Dividend", date: "Apr 18", summary: "Interim cash dividend of 130% recommended" },
      { type: "Price sensitive", date: "Mar 30", summary: "Spectrum acquisition update for 700 MHz band" },
    ],
  },
  {
    code: "RENATA", name: "Renata Limited", sector: "Pharmaceuticals", board: "Main Board", category: "A",
    price: 1240, change: -8, changePct: -0.64, prevClose: 1248, open: 1248, high: 1255, low: 1238,
    volume: 4200000, marketCap: 1680000000000, pe: 22.1, eps: 56.1, dividendYield: 1.8, bookValue: 310, freeFloat: 25,
    weekHigh52: 1480, weekLow52: 1050, faceValue: 10, paidUpCapital: 1135000000, nav: 310,
    description: "Renata Limited is one of Bangladesh's leading pharmaceutical companies, manufacturing prescription medicines and animal health products.",
    hq: "Dhaka", website: "renata-ltd.com",
    sharePattern: pat({ sponsor: 51.0, foreign: 8.4, institution: 19.0 }),
    dividendHistory: dh([[2025, 110, 0], [2024, 130, 0], [2023, 145, 5], [2022, 160, 0], [2021, 130, 0]]),
    recentAnnouncements: [
      { type: "Price sensitive", date: "Jun 01", summary: "Board approves rights share issuance at 1:5 ratio" },
      { type: "Dividend", date: "May 10", summary: "Final cash dividend of 110% for FY2025" },
      { type: "AGM notice", date: "Apr 28", summary: "AGM scheduled for June 12, 2026" },
    ],
  },
  {
    code: "SQPHARMA", name: "Square Pharmaceuticals Ltd", sector: "Pharmaceuticals", board: "Main Board", category: "A",
    price: 190.2, change: 2.1, changePct: 1.11, prevClose: 188.1, open: 188.5, high: 191, low: 188,
    volume: 18200000, marketCap: 3240000000000, pe: 19.8, eps: 9.61, dividendYield: 2.4, bookValue: 72.5, freeFloat: 32,
    weekHigh52: 220, weekLow52: 160, faceValue: 10, paidUpCapital: 8862000000, nav: 72.5,
    description: "Square Pharmaceuticals is Bangladesh's largest pharmaceutical company by revenue, exporting to over 40 countries.",
    hq: "Dhaka", website: "squarepharma.com.bd",
    sharePattern: pat({ sponsor: 48.5, foreign: 4.5, institution: 19.5 }),
    dividendHistory: dh([[2025, 105, 0], [2024, 100, 0], [2023, 75, 5], [2022, 65, 5], [2021, 55, 5]]),
    recentAnnouncements: [
      { type: "Dividend", date: "May 26", summary: "Final cash dividend of 105% recommended" },
      { type: "Price sensitive", date: "Apr 14", summary: "Q3 results: EPS ৳ 2.41, revenue +6.8% YoY" },
      { type: "AGM notice", date: "Mar 20", summary: "AGM scheduled for May 15, 2026" },
    ],
  },
  {
    code: "WALTONHIL", name: "Walton Hi-Tech Industries", sector: "Engineering", board: "Main Board", category: "A",
    price: 1620, change: 4.8, changePct: 0.3, prevClose: 1615.2, open: 1616, high: 1628, low: 1612,
    volume: 1800000, marketCap: 490000000000, pe: 26.4, eps: 61.36, dividendYield: 0.9, bookValue: 420, freeFloat: 9.9,
    weekHigh52: 1920, weekLow52: 1340, faceValue: 10, paidUpCapital: 3027000000, nav: 420,
    description: "Walton Hi-Tech is Bangladesh's leading electronics manufacturer, producing refrigerators, ACs, televisions, and mobile phones.",
    hq: "Dhaka", website: "waltonbd.com",
    sharePattern: pat({ sponsor: 90.1, foreign: 0.2, institution: 4.0 }),
    dividendHistory: dh([[2025, 30, 0], [2024, 25, 0], [2023, 25, 0], [2022, 20, 0], [2021, 250, 0]]),
    recentAnnouncements: [
      { type: "Price sensitive", date: "Jun 04", summary: "First 7-tonne floor-standing AC line commissioned" },
      { type: "Dividend", date: "May 20", summary: "Final cash dividend of 30% recommended" },
      { type: "AGM notice", date: "Apr 30", summary: "AGM scheduled for June 22, 2026" },
    ],
  },
  {
    code: "ISLAMIBNK", name: "Islami Bank Bangladesh", sector: "Banking", board: "Main Board", category: "A",
    price: 32.1, change: -0.3, changePct: -0.93, prevClose: 32.4, open: 32.5, high: 32.6, low: 31.9,
    volume: 32100000, marketCap: 1860000000000, pe: 9.2, eps: 3.49, dividendYield: 4.1, bookValue: 28.4, freeFloat: 58,
    weekHigh52: 38.8, weekLow52: 28.2, faceValue: 10, paidUpCapital: 16100000000, nav: 28.4,
    description: "Islami Bank Bangladesh is the country's largest private commercial bank under Islamic Shariah principles, with over 400 branches.",
    hq: "Dhaka", website: "islamibankbd.com",
    sharePattern: pat({ sponsor: 30.0, foreign: 12.4, institution: 24.5 }),
    dividendHistory: dh([[2025, 10, 0], [2024, 10, 0], [2023, 10, 0], [2022, 10, 0], [2021, 10, 0]]),
    recentAnnouncements: [
      { type: "Regulatory", date: "May 31", summary: "BSEC query response regarding unusual price movement" },
      { type: "Dividend", date: "Apr 22", summary: "Cash dividend of 10% declared for FY2025" },
      { type: "AGM notice", date: "Mar 28", summary: "AGM scheduled for May 24, 2026" },
    ],
  },
  {
    code: "BRAC", name: "BRAC Bank Limited", sector: "Banking", board: "Main Board", category: "A",
    price: 48.3, change: 0.6, changePct: 1.26, prevClose: 47.7, open: 47.8, high: 48.6, low: 47.6,
    volume: 21900000, marketCap: 1340000000000, pe: 11.4, eps: 4.24, dividendYield: 3.2, bookValue: 38.1, freeFloat: 62,
    weekHigh52: 56.2, weekLow52: 38.5, faceValue: 10, paidUpCapital: 17721000000, nav: 38.1,
    description: "BRAC Bank is a leading commercial bank in Bangladesh, known for its SME lending and digital banking through bKash.",
    hq: "Dhaka", website: "bracbank.com",
    sharePattern: pat({ sponsor: 44.6, foreign: 23.0, institution: 22.3 }),
    dividendHistory: dh([[2025, 17.5, 0], [2024, 15, 0], [2023, 10, 5], [2022, 10, 0], [2021, 7.5, 5]]),
    recentAnnouncements: [
      { type: "Dividend", date: "May 18", summary: "Cash dividend of 17.5% declared" },
      { type: "Price sensitive", date: "Apr 10", summary: "bKash crosses 80 million registered users" },
      { type: "AGM notice", date: "Mar 12", summary: "AGM scheduled for May 8, 2026" },
    ],
  },
  {
    code: "DBBL", name: "Dutch-Bangla Bank Limited", sector: "Banking", board: "Main Board", category: "A",
    price: 288, change: 2.3, changePct: 0.8, prevClose: 285.7, open: 286, high: 289.5, low: 285.5,
    volume: 8400000, marketCap: 2180000000000, pe: 12.8, eps: 22.5, dividendYield: 2.6, bookValue: 165, freeFloat: 40,
    weekHigh52: 320, weekLow52: 248, faceValue: 10, paidUpCapital: 7569000000, nav: 165,
    description: "Dutch-Bangla Bank is one of Bangladesh's most profitable private commercial banks, pioneering mobile and agent banking.",
    hq: "Dhaka", website: "dutchbanglabank.com",
    sharePattern: pat({ sponsor: 60.0, foreign: 0, institution: 15.4 }),
    dividendHistory: dh([[2025, 50, 0], [2024, 35, 12.5], [2023, 30, 12.5], [2022, 25, 12.5], [2021, 25, 0]]),
    recentAnnouncements: [
      { type: "Dividend", date: "Apr 30", summary: "Cash dividend of 50% recommended" },
      { type: "AGM notice", date: "Mar 22", summary: "AGM scheduled for May 18, 2026" },
      { type: "Price sensitive", date: "Feb 14", summary: "Nexus Pay surpasses 5 million active users" },
    ],
  },
  {
    code: "ACMELAB", name: "ACME Laboratories Limited", sector: "Pharmaceuticals", board: "Main Board", category: "A",
    price: 79.4, change: 1.3, changePct: 1.66, prevClose: 78.1, open: 78.2, high: 80, low: 78,
    volume: 12400000, marketCap: 840000000000, pe: 16.2, eps: 4.9, dividendYield: 2.8, bookValue: 42.8, freeFloat: 35,
    weekHigh52: 94, weekLow52: 68, faceValue: 10, paidUpCapital: 2117000000, nav: 42.8,
    description: "ACME Laboratories is a leading pharmaceutical company in Bangladesh, manufacturing tablets, capsules, injections, and syrups.",
    hq: "Dhaka", website: "acmeglobal.com",
    sharePattern: pat({ sponsor: 50.0, foreign: 0, institution: 17.5 }),
    dividendHistory: dh([[2025, 22, 0], [2024, 20, 0], [2023, 18, 0], [2022, 16, 0], [2021, 15, 0]]),
    recentAnnouncements: [
      { type: "Price sensitive", date: "Jun 04", summary: "Transmission of shares following death of Managing Director" },
      { type: "Dividend", date: "May 12", summary: "Cash dividend of 22% declared" },
      { type: "AGM notice", date: "Apr 02", summary: "AGM scheduled for May 28, 2026" },
    ],
  },
  {
    code: "MARICO", name: "Marico Bangladesh Limited", sector: "Consumer Staples", board: "Main Board", category: "A",
    price: 298, change: -0.6, changePct: -0.2, prevClose: 298.6, open: 299, high: 300.2, low: 297.4,
    volume: 6200000, marketCap: 1120000000000, pe: 28.4, eps: 10.49, dividendYield: 1.9, bookValue: 64.2, freeFloat: 25,
    weekHigh52: 340, weekLow52: 258, faceValue: 10, paidUpCapital: 315000000, nav: 64.2,
    description: "Marico Bangladesh manufactures and markets personal care and food products under brands including Parachute, Saffola.",
    hq: "Dhaka", website: "marico.com/bangladesh",
    sharePattern: pat({ sponsor: 75.0, foreign: 0, institution: 12.4 }),
    dividendHistory: dh([[2025, 750, 0], [2024, 700, 0], [2023, 600, 0], [2022, 550, 0], [2021, 800, 0]]),
    recentAnnouncements: [
      { type: "Dividend", date: "May 06", summary: "Final cash dividend of 750% recommended" },
      { type: "Price sensitive", date: "Apr 11", summary: "Q4 results: EPS ৳ 3.20, revenue +5.2% YoY" },
      { type: "AGM notice", date: "Mar 18", summary: "AGM scheduled for June 30, 2026" },
    ],
  },

  /* ----- expanded sample dataset (30 more across sectors) ----- */
  { code: "BEXIMCO", name: "Beximco Limited", sector: "Conglomerate", board: "Main Board", category: "A",
    price: 118.4, change: 1.1, changePct: 0.94, prevClose: 117.3, open: 117.5, high: 119.2, low: 117.2,
    volume: 48200000, marketCap: 105000000000, pe: 14.6, eps: 8.11, dividendYield: 2.5, bookValue: 96.3, freeFloat: 71,
    weekHigh52: 138, weekLow52: 92, faceValue: 10, paidUpCapital: 8870000000, nav: 96.3,
    description: "Beximco Limited is one of Bangladesh's largest conglomerates with operations in pharmaceuticals, textiles, energy and IT.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 29.5, foreign: 4.2, institution: 26.0 }),
    dividendHistory: dh([[2025, 25, 0], [2024, 20, 0], [2023, 30, 0], [2022, 25, 0], [2021, 15, 0]]),
  },
  { code: "ACI", name: "ACI Limited", sector: "Consumer Staples", board: "Main Board", category: "B",
    price: 194.1, change: -1.4, changePct: -0.72, prevClose: 195.5, open: 195.3, high: 196.4, low: 193.7,
    volume: 1900000, marketCap: 14600000000, pe: 22.1, eps: 8.78, dividendYield: 1.5, bookValue: 188, freeFloat: 38,
    weekHigh52: 240, weekLow52: 168, faceValue: 10, paidUpCapital: 754000000, nav: 188,
    description: "ACI Limited is a diversified Bangladeshi multinational with businesses in pharmaceuticals, consumer brands and agribusiness.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 40.7, foreign: 2.3, institution: 22.0 }),
    dividendHistory: dh([[2025, 5, 5], [2024, 6, 0], [2023, 4, 0], [2022, 7, 0], [2021, 10, 0]]),
  },
  { code: "OLYMPIC", name: "Olympic Industries", sector: "Food & Beverage", board: "Main Board", category: "A",
    price: 160.5, change: 0.9, changePct: 0.56, prevClose: 159.6, open: 159.8, high: 161.5, low: 159.5,
    volume: 3200000, marketCap: 32100000000, pe: 17.4, eps: 9.22, dividendYield: 2.7, bookValue: 64, freeFloat: 30,
    weekHigh52: 185, weekLow52: 138, faceValue: 10, paidUpCapital: 1999000000, nav: 64,
    description: "Olympic Industries is Bangladesh's largest biscuit manufacturer, also producing confectionery and battery products.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 49.6, foreign: 1.1, institution: 19.0 }),
    dividendHistory: dh([[2025, 45, 0], [2024, 40, 0], [2023, 40, 0], [2022, 45, 0], [2021, 35, 0]]),
  },
  { code: "BSRMSTEEL", name: "BSRM Steels Limited", sector: "Engineering", board: "Main Board", category: "A",
    price: 68.2, change: 0.4, changePct: 0.59, prevClose: 67.8, open: 67.9, high: 68.5, low: 67.5,
    volume: 4200000, marketCap: 27200000000, pe: 15.6, eps: 4.37, dividendYield: 2.9, bookValue: 52, freeFloat: 30,
    weekHigh52: 84, weekLow52: 56, faceValue: 10, paidUpCapital: 3987000000, nav: 52,
    description: "BSRM Steels is a leading steel manufacturer in Bangladesh, producing graded re-bars for construction.",
    hq: "Chattogram",
    sharePattern: pat({ sponsor: 51.5, foreign: 0.4, institution: 21.0 }),
    dividendHistory: dh([[2025, 20, 0], [2024, 18, 0], [2023, 20, 0], [2022, 22, 0], [2021, 20, 0]]),
  },
  { code: "SUMITPOWER", name: "Summit Power Limited", sector: "Power & Energy", board: "Main Board", category: "A",
    price: 38.7, change: 0.2, changePct: 0.52, prevClose: 38.5, open: 38.5, high: 38.9, low: 38.4,
    volume: 6800000, marketCap: 41300000000, pe: 8.4, eps: 4.61, dividendYield: 5.2, bookValue: 41, freeFloat: 38,
    weekHigh52: 44, weekLow52: 32, faceValue: 10, paidUpCapital: 10681000000, nav: 41,
    description: "Summit Power is Bangladesh's largest independent power producer, operating multiple power plants nationwide.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 62.0, foreign: 0, institution: 17.5 }),
    dividendHistory: dh([[2025, 20, 0], [2024, 15, 0], [2023, 15, 0], [2022, 18, 0], [2021, 25, 0]]),
  },
  { code: "TITASGAS", name: "Titas Gas Transmission", sector: "Power & Energy", board: "Main Board", category: "A",
    price: 38.1, change: -0.1, changePct: -0.26, prevClose: 38.2, open: 38.2, high: 38.3, low: 37.9,
    volume: 2900000, marketCap: 37700000000, pe: 6.9, eps: 5.52, dividendYield: 4.3, bookValue: 71, freeFloat: 25,
    weekHigh52: 46, weekLow52: 33, faceValue: 10, paidUpCapital: 9886000000, nav: 71,
    description: "Titas Gas is the largest gas distribution company in Bangladesh, supplying natural gas to households and industries.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 0, government: 75.0, institution: 8.0 }),
    dividendHistory: dh([[2025, 18, 0], [2024, 12, 0], [2023, 15, 0], [2022, 12, 0], [2021, 15, 0]]),
  },
  { code: "POWERGRID", name: "Power Grid Company of Bangladesh", sector: "Power & Energy", board: "Main Board", category: "A",
    price: 41.5, change: 0.3, changePct: 0.73, prevClose: 41.2, open: 41.2, high: 41.8, low: 41.0,
    volume: 1800000, marketCap: 31200000000, pe: 9.1, eps: 4.56, dividendYield: 3.0, bookValue: 88, freeFloat: 19,
    weekHigh52: 48, weekLow52: 35, faceValue: 10, paidUpCapital: 7510000000, nav: 88,
    description: "Power Grid Company of Bangladesh is the national electricity transmission operator.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 0, government: 81.0, institution: 7.0 }),
    dividendHistory: dh([[2025, 12, 0], [2024, 10, 0], [2023, 12, 0], [2022, 12, 0], [2021, 12, 0]]),
  },
  { code: "BEACONPHAR", name: "Beacon Pharmaceuticals", sector: "Pharmaceuticals", board: "Main Board", category: "A",
    price: 320.6, change: 4.1, changePct: 1.29, prevClose: 316.5, open: 317, high: 322.4, low: 316.2,
    volume: 4100000, marketCap: 88000000000, pe: 24.5, eps: 13.08, dividendYield: 1.2, bookValue: 92, freeFloat: 27,
    weekHigh52: 360, weekLow52: 248, faceValue: 10, paidUpCapital: 2744000000, nav: 92,
    description: "Beacon Pharmaceuticals is a leading manufacturer of oncology and high-tech medicines in Bangladesh.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 55.0, foreign: 0.5, institution: 17.0 }),
    dividendHistory: dh([[2025, 12, 0], [2024, 10, 0], [2023, 10, 0], [2022, 8, 0], [2021, 8, 0]]),
  },
  { code: "ORIONPHARM", name: "Orion Pharma Limited", sector: "Pharmaceuticals", board: "Main Board", category: "A",
    price: 92.4, change: 0.6, changePct: 0.65, prevClose: 91.8, open: 91.9, high: 93, low: 91.6,
    volume: 2800000, marketCap: 21500000000, pe: 18.1, eps: 5.10, dividendYield: 2.0, bookValue: 68, freeFloat: 33,
    weekHigh52: 108, weekLow52: 78, faceValue: 10, paidUpCapital: 2327000000, nav: 68,
    description: "Orion Pharma manufactures pharmaceutical formulations for domestic and export markets.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 47.0, foreign: 0, institution: 20.0 }),
    dividendHistory: dh([[2025, 15, 0], [2024, 12, 0], [2023, 14, 0], [2022, 15, 0], [2021, 12, 0]]),
  },
  { code: "BERGERPBL", name: "Berger Paints Bangladesh", sector: "Chemicals", board: "Main Board", category: "A",
    price: 1810, change: 8, changePct: 0.44, prevClose: 1802, open: 1804, high: 1818, low: 1801,
    volume: 95000, marketCap: 83960000000, pe: 25.8, eps: 70.16, dividendYield: 2.2, bookValue: 410, freeFloat: 5,
    weekHigh52: 2080, weekLow52: 1580, faceValue: 10, paidUpCapital: 463900000, nav: 410,
    description: "Berger Paints Bangladesh is the largest paint manufacturer in the country, producing decorative and industrial paints.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 95.0, foreign: 0.1, institution: 3.4 }),
    dividendHistory: dh([[2025, 400, 0], [2024, 380, 0], [2023, 350, 0], [2022, 320, 0], [2021, 280, 0]]),
  },
  { code: "LHBL", name: "LafargeHolcim Bangladesh", sector: "Cement", board: "Main Board", category: "A",
    price: 76.2, change: 0.4, changePct: 0.53, prevClose: 75.8, open: 75.9, high: 76.5, low: 75.6,
    volume: 5400000, marketCap: 88500000000, pe: 21.0, eps: 3.63, dividendYield: 2.6, bookValue: 28, freeFloat: 41,
    weekHigh52: 88, weekLow52: 62, faceValue: 10, paidUpCapital: 11616000000, nav: 28,
    description: "LafargeHolcim Bangladesh is a leading cement manufacturer, operating the Surma plant in Sylhet.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 58.9, foreign: 0.2, institution: 19.0 }),
    dividendHistory: dh([[2025, 20, 0], [2024, 15, 0], [2023, 17.5, 0], [2022, 15, 0], [2021, 12.5, 0]]),
  },
  { code: "HEIDELBCEM", name: "Heidelberg Cement Bangladesh", sector: "Cement", board: "Main Board", category: "B",
    price: 175.4, change: -1.2, changePct: -0.68, prevClose: 176.6, open: 176.4, high: 177.2, low: 174.9,
    volume: 220000, marketCap: 9900000000, pe: 32.0, eps: 5.48, dividendYield: 0.6, bookValue: 92, freeFloat: 39,
    weekHigh52: 220, weekLow52: 158, faceValue: 10, paidUpCapital: 565000000, nav: 92,
    description: "Heidelberg Cement Bangladesh manufactures and markets cement under the Ruby and Scan brands.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 60.7, foreign: 0.6, institution: 14.0 }),
    dividendHistory: dh([[2025, 5, 0], [2024, 0, 0], [2023, 10, 0], [2022, 12, 0], [2021, 0, 0]]),
  },
  { code: "ROBI", name: "Robi Axiata Limited", sector: "Telecom", board: "Main Board", category: "B",
    price: 28.8, change: 0.1, changePct: 0.35, prevClose: 28.7, open: 28.7, high: 28.9, low: 28.6,
    volume: 9100000, marketCap: 151300000000, pe: 38.4, eps: 0.75, dividendYield: 1.0, bookValue: 13, freeFloat: 10,
    weekHigh52: 36, weekLow52: 24, faceValue: 10, paidUpCapital: 52359000000, nav: 13,
    description: "Robi Axiata is the second-largest mobile network operator in Bangladesh, providing voice and data services.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 61.8, foreign: 28.2, institution: 6.0 }),
    dividendHistory: dh([[2025, 5, 0], [2024, 5, 0], [2023, 7, 0], [2022, 5, 0], [2021, 0, 0]]),
  },
  { code: "BSCCL", name: "Bangladesh Submarine Cable Company", sector: "Telecom", board: "Main Board", category: "A",
    price: 188.3, change: 2.4, changePct: 1.29, prevClose: 185.9, open: 186, high: 189.2, low: 185.8,
    volume: 900000, marketCap: 31100000000, pe: 19.2, eps: 9.81, dividendYield: 3.5, bookValue: 105, freeFloat: 25,
    weekHigh52: 220, weekLow52: 154, faceValue: 10, paidUpCapital: 1651000000, nav: 105,
    description: "BSCCL operates Bangladesh's international submarine cable gateways for global internet connectivity.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 0, government: 73.8, institution: 11.0 }),
    dividendHistory: dh([[2025, 35, 0], [2024, 30, 0], [2023, 30, 0], [2022, 25, 0], [2021, 25, 0]]),
  },
  { code: "PRIMEBANK", name: "Prime Bank Limited", sector: "Banking", board: "Main Board", category: "A",
    price: 21.4, change: 0.1, changePct: 0.47, prevClose: 21.3, open: 21.3, high: 21.5, low: 21.2,
    volume: 4700000, marketCap: 24300000000, pe: 8.6, eps: 2.49, dividendYield: 5.6, bookValue: 26, freeFloat: 55,
    weekHigh52: 25, weekLow52: 17, faceValue: 10, paidUpCapital: 11329000000, nav: 26,
    description: "Prime Bank Limited is a private commercial bank in Bangladesh, providing corporate, retail and SME banking.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 36.5, foreign: 1.0, institution: 22.0 }),
    dividendHistory: dh([[2025, 12.5, 0], [2024, 12, 0], [2023, 17.5, 0], [2022, 12.5, 0], [2021, 15, 0]]),
  },
  { code: "EBL", name: "Eastern Bank Limited", sector: "Banking", board: "Main Board", category: "A",
    price: 34.6, change: 0.3, changePct: 0.87, prevClose: 34.3, open: 34.3, high: 34.7, low: 34.2,
    volume: 2100000, marketCap: 36900000000, pe: 7.1, eps: 4.87, dividendYield: 4.8, bookValue: 39, freeFloat: 41,
    weekHigh52: 40, weekLow52: 28, faceValue: 10, paidUpCapital: 10657000000, nav: 39,
    description: "Eastern Bank Limited is a leading private commercial bank in Bangladesh, focused on corporate and digital banking.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 31.0, foreign: 2.0, institution: 26.0 }),
    dividendHistory: dh([[2025, 17.5, 0], [2024, 17.5, 0], [2023, 25, 0], [2022, 25, 0], [2021, 17.5, 0]]),
  },
  { code: "CITYBANK", name: "The City Bank Limited", sector: "Banking", board: "Main Board", category: "A",
    price: 24.2, change: -0.2, changePct: -0.82, prevClose: 24.4, open: 24.4, high: 24.5, low: 24.0,
    volume: 6300000, marketCap: 28800000000, pe: 6.4, eps: 3.78, dividendYield: 4.1, bookValue: 31, freeFloat: 49,
    weekHigh52: 30, weekLow52: 18, faceValue: 10, paidUpCapital: 11874000000, nav: 31,
    description: "The City Bank Limited is a private commercial bank in Bangladesh known for retail and credit card products.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 38.0, foreign: 1.2, institution: 18.0 }),
    dividendHistory: dh([[2025, 10, 0], [2024, 10, 0], [2023, 12.5, 0], [2022, 10, 0], [2021, 10, 0]]),
  },
  { code: "UNILEVERCL", name: "Unilever Consumer Care Bangladesh", sector: "Consumer Staples", board: "Main Board", category: "A",
    price: 2640, change: 14, changePct: 0.53, prevClose: 2626, open: 2628, high: 2655, low: 2624,
    volume: 38000, marketCap: 32500000000, pe: 26.3, eps: 100.38, dividendYield: 1.8, bookValue: 320, freeFloat: 18,
    weekHigh52: 3050, weekLow52: 2280, faceValue: 10, paidUpCapital: 123100000, nav: 320,
    description: "Unilever Consumer Care Bangladesh produces personal care, home care and OTC products under leading global brands.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 82.0, foreign: 0.4, institution: 9.0 }),
    dividendHistory: dh([[2025, 480, 0], [2024, 440, 0], [2023, 420, 0], [2022, 400, 0], [2021, 0, 0]]),
  },
  { code: "RECKITTBEN", name: "Reckitt Benckiser Bangladesh", sector: "Consumer Staples", board: "Main Board", category: "A",
    price: 5210, change: 25, changePct: 0.48, prevClose: 5185, open: 5188, high: 5230, low: 5180,
    volume: 12000, marketCap: 24600000000, pe: 22.5, eps: 231.56, dividendYield: 3.4, bookValue: 480, freeFloat: 18,
    weekHigh52: 5800, weekLow52: 4300, faceValue: 10, paidUpCapital: 472500000, nav: 480,
    description: "Reckitt Benckiser Bangladesh manufactures hygiene, health and home brands including Dettol and Harpic.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 82.6, foreign: 0, institution: 8.6 }),
    dividendHistory: dh([[2025, 1800, 0], [2024, 1700, 0], [2023, 1600, 0], [2022, 1400, 0], [2021, 1200, 0]]),
  },
  { code: "BSRMLTD", name: "BSRM Limited", sector: "Engineering", board: "Main Board", category: "A",
    price: 142.8, change: 1.5, changePct: 1.06, prevClose: 141.3, open: 141.5, high: 143.4, low: 141.2,
    volume: 1300000, marketCap: 36400000000, pe: 15.0, eps: 9.52, dividendYield: 2.1, bookValue: 132, freeFloat: 33,
    weekHigh52: 168, weekLow52: 118, faceValue: 10, paidUpCapital: 2552000000, nav: 132,
    description: "BSRM Limited is a leading steel producer in Bangladesh with focus on high-grade construction rebar.",
    hq: "Chattogram",
    sharePattern: pat({ sponsor: 51.0, foreign: 0.3, institution: 21.5 }),
    dividendHistory: dh([[2025, 22, 0], [2024, 20, 0], [2023, 20, 0], [2022, 22, 0], [2021, 18, 0]]),
  },
  { code: "GPHISPAT", name: "GPH Ispat Limited", sector: "Engineering", board: "Main Board", category: "A",
    price: 39.6, change: 0.3, changePct: 0.76, prevClose: 39.3, open: 39.4, high: 39.8, low: 39.2,
    volume: 2400000, marketCap: 18700000000, pe: 12.4, eps: 3.19, dividendYield: 3.3, bookValue: 35, freeFloat: 36,
    weekHigh52: 48, weekLow52: 32, faceValue: 10, paidUpCapital: 4723000000, nav: 35,
    description: "GPH Ispat is a leading steel manufacturer in Bangladesh with one of the largest mill complexes in the country.",
    hq: "Chattogram",
    sharePattern: pat({ sponsor: 47.0, foreign: 0.6, institution: 18.5 }),
    dividendHistory: dh([[2025, 13, 0], [2024, 10, 0], [2023, 12, 0], [2022, 15, 0], [2021, 13, 0]]),
  },
  { code: "BSRMSP", name: "Bangladesh Shipping Corporation", sector: "Marine Transport", board: "Main Board", category: "A",
    price: 105.2, change: 1.1, changePct: 1.06, prevClose: 104.1, open: 104.2, high: 105.8, low: 104.0,
    volume: 720000, marketCap: 16100000000, pe: 11.2, eps: 9.39, dividendYield: 3.8, bookValue: 88, freeFloat: 20,
    weekHigh52: 126, weekLow52: 88, faceValue: 10, paidUpCapital: 1525000000, nav: 88,
    description: "Bangladesh Shipping Corporation is the state-owned national flag carrier operating ocean-going vessels.",
    hq: "Chattogram",
    sharePattern: pat({ sponsor: 0, government: 80.0, institution: 8.0 }),
    dividendHistory: dh([[2025, 14, 0], [2024, 12, 0], [2023, 10, 0], [2022, 10, 0], [2021, 8, 0]]),
  },
  { code: "BSCPLC", name: "Bangladesh Steel Re-Rolling Mills", sector: "Engineering", board: "Main Board", category: "B",
    price: 56.4, change: -0.3, changePct: -0.53, prevClose: 56.7, open: 56.7, high: 56.9, low: 56.1,
    volume: 850000, marketCap: 11200000000, pe: 14.8, eps: 3.81, dividendYield: 1.4, bookValue: 41, freeFloat: 42,
    weekHigh52: 72, weekLow52: 48, faceValue: 10, paidUpCapital: 1988000000, nav: 41,
    description: "Bangladesh Steel Re-Rolling Mills produces steel products for construction and infrastructure.",
    hq: "Chattogram",
    sharePattern: pat({ sponsor: 45.0, foreign: 0, institution: 16.0 }),
    dividendHistory: dh([[2025, 8, 0], [2024, 6, 0], [2023, 8, 0], [2022, 10, 0], [2021, 6, 0]]),
  },
  { code: "APEXFOOT", name: "Apex Footwear Limited", sector: "Tannery & Leather", board: "Main Board", category: "A",
    price: 245.6, change: 1.4, changePct: 0.57, prevClose: 244.2, open: 244.5, high: 246.4, low: 244.0,
    volume: 60000, marketCap: 2750000000, pe: 18.2, eps: 13.5, dividendYield: 2.0, bookValue: 188, freeFloat: 32,
    weekHigh52: 286, weekLow52: 198, faceValue: 10, paidUpCapital: 112000000, nav: 188,
    description: "Apex Footwear is one of Bangladesh's largest footwear manufacturers and retailers.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 50.0, foreign: 0, institution: 18.0 }),
    dividendHistory: dh([[2025, 50, 0], [2024, 45, 0], [2023, 40, 0], [2022, 50, 0], [2021, 40, 0]]),
  },
  { code: "BATA", name: "Bata Shoe Company Bangladesh", sector: "Tannery & Leather", board: "Main Board", category: "A",
    price: 728, change: -3, changePct: -0.41, prevClose: 731, open: 730, high: 734, low: 727,
    volume: 30000, marketCap: 9960000000, pe: 24.0, eps: 30.33, dividendYield: 1.9, bookValue: 295, freeFloat: 30,
    weekHigh52: 880, weekLow52: 640, faceValue: 10, paidUpCapital: 136800000, nav: 295,
    description: "Bata Shoe Company Bangladesh is a leading manufacturer and retailer of footwear under the Bata brand.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 70.0, foreign: 0, institution: 12.0 }),
    dividendHistory: dh([[2025, 140, 0], [2024, 130, 0], [2023, 120, 0], [2022, 110, 0], [2021, 100, 0]]),
  },
  { code: "MJLBD", name: "MJL Bangladesh Limited", sector: "Fuel & Power", board: "Main Board", category: "A",
    price: 86.3, change: 0.7, changePct: 0.82, prevClose: 85.6, open: 85.7, high: 86.6, low: 85.5,
    volume: 480000, marketCap: 27400000000, pe: 13.2, eps: 6.54, dividendYield: 3.5, bookValue: 62, freeFloat: 30,
    weekHigh52: 102, weekLow52: 72, faceValue: 10, paidUpCapital: 3173000000, nav: 62,
    description: "MJL Bangladesh is a leading lubricant blender and distributor, marketing Mobil-branded lubricants.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 60.0, foreign: 0, institution: 16.0 }),
    dividendHistory: dh([[2025, 28, 0], [2024, 25, 0], [2023, 25, 0], [2022, 30, 0], [2021, 22, 0]]),
  },
  { code: "ROBINTEX", name: "Robintex Bangladesh", sector: "Textile", board: "Main Board", category: "Z",
    price: 11.4, change: -0.6, changePct: -5.00, prevClose: 12.0, open: 12.0, high: 12.0, low: 11.4,
    volume: 1400000, marketCap: 670000000, pe: -8.2, eps: -1.39, dividendYield: 0, bookValue: 14, freeFloat: 55,
    weekHigh52: 18.4, weekLow52: 9.8, faceValue: 10, paidUpCapital: 588000000, nav: 14,
    description: "Robintex Bangladesh manufactures knit textiles for the domestic and export markets.",
    hq: "Gazipur",
    sharePattern: pat({ sponsor: 30.0, foreign: 0, institution: 5.0 }),
    dividendHistory: dh([[2025, 0, 0], [2024, 0, 0], [2023, 0, 0], [2022, 0, 5], [2021, 0, 0]]),
  },
  { code: "ALLTEX", name: "Alltex Industries", sector: "Textile", board: "Main Board", category: "Z",
    price: 17.4, change: 0.4, changePct: 2.35, prevClose: 17.0, open: 17.1, high: 17.5, low: 17.0,
    volume: 1900000, marketCap: 1100000000, pe: -22.3, eps: -0.78, dividendYield: 0, bookValue: 9, freeFloat: 70,
    weekHigh52: 22, weekLow52: 12, faceValue: 10, paidUpCapital: 632000000, nav: 9,
    description: "Alltex Industries manufactures cotton yarn and fabrics in Bangladesh.",
    hq: "Narsingdi",
    sharePattern: pat({ sponsor: 26.0, foreign: 0, institution: 4.0 }),
    dividendHistory: dh([[2025, 0, 0], [2024, 0, 0], [2023, 0, 0], [2022, 0, 0], [2021, 0, 0]]),
  },
  { code: "FAREASTFI", name: "Fareast Finance & Investment", sector: "Financial Services", board: "Main Board", category: "Z",
    price: 4.2, change: 0.1, changePct: 2.44, prevClose: 4.1, open: 4.1, high: 4.2, low: 4.1,
    volume: 2300000, marketCap: 720000000, pe: -3.8, eps: -1.11, dividendYield: 0, bookValue: 2, freeFloat: 78,
    weekHigh52: 6.4, weekLow52: 3.6, faceValue: 10, paidUpCapital: 1710000000, nav: 2,
    description: "Fareast Finance is a non-bank financial institution offering lease and term loans in Bangladesh.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 16.0, foreign: 0, institution: 6.0 }),
    dividendHistory: dh([[2025, 0, 0], [2024, 0, 0], [2023, 0, 0], [2022, 0, 0], [2021, 0, 0]]),
  },
  { code: "AAMRATECH", name: "Aamra Technologies", sector: "IT", board: "Main Board", category: "N",
    price: 38.1, change: 0.6, changePct: 1.60, prevClose: 37.5, open: 37.5, high: 38.4, low: 37.4,
    volume: 850000, marketCap: 2270000000, pe: 16.4, eps: 2.32, dividendYield: 1.3, bookValue: 26, freeFloat: 38,
    weekHigh52: 44, weekLow52: 28, faceValue: 10, paidUpCapital: 596000000, nav: 26,
    description: "Aamra Technologies provides ICT infrastructure, internet bandwidth and cloud services in Bangladesh.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 46.0, foreign: 0, institution: 13.0 }),
    dividendHistory: dh([[2025, 10, 0], [2024, 8, 0], [2023, 8, 0], [2022, 6, 0], [2021, 5, 0]]),
  },
  { code: "BDCOM", name: "BDCOM Online Limited", sector: "IT", board: "Main Board", category: "A",
    price: 41.7, change: 0.4, changePct: 0.97, prevClose: 41.3, open: 41.3, high: 41.9, low: 41.2,
    volume: 920000, marketCap: 1830000000, pe: 22.2, eps: 1.88, dividendYield: 1.0, bookValue: 18, freeFloat: 36,
    weekHigh52: 50, weekLow52: 32, faceValue: 10, paidUpCapital: 439000000, nav: 18,
    description: "BDCOM Online is a leading internet service and IT solutions provider in Bangladesh.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 44.0, foreign: 0, institution: 15.0 }),
    dividendHistory: dh([[2025, 10, 0], [2024, 10, 0], [2023, 8, 0], [2022, 8, 0], [2021, 5, 0]]),
  },
  { code: "ICBAMCL2", name: "ICB AMCL Second Mutual Fund", sector: "Mutual Fund", board: "Main Board", category: "A",
    price: 7.2, change: 0.0, changePct: 0.00, prevClose: 7.2, open: 7.2, high: 7.3, low: 7.1,
    volume: 1100000, marketCap: 720000000, pe: 0, eps: 0.65, dividendYield: 6.9, bookValue: 9.5, freeFloat: 80,
    weekHigh52: 9, weekLow52: 6.5, faceValue: 10, paidUpCapital: 1000000000, nav: 9.5,
    description: "ICB AMCL Second Mutual Fund is a closed-end mutual fund managed by ICB Asset Management.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 20.0, foreign: 0, institution: 12.0 }),
    dividendHistory: dh([[2025, 5, 0], [2024, 5, 0], [2023, 5.5, 0], [2022, 5, 0], [2021, 4, 0]]),
  },
  { code: "1JANATAMF", name: "1st Janata Bank Mutual Fund", sector: "Mutual Fund", board: "Main Board", category: "A",
    price: 3.1, change: 0.2, changePct: 6.90, prevClose: 2.9, open: 2.9, high: 3.1, low: 2.9,
    volume: 11200000, marketCap: 970000000, pe: 0, eps: 0.32, dividendYield: 9.7, bookValue: 7, freeFloat: 80,
    weekHigh52: 4, weekLow52: 2.5, faceValue: 10, paidUpCapital: 3132000000, nav: 7,
    description: "1st Janata Bank Mutual Fund is a closed-end mutual fund sponsored by Janata Bank.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 18.0, foreign: 0, institution: 10.0 }),
    dividendHistory: dh([[2025, 3, 0], [2024, 5, 0], [2023, 4, 0], [2022, 3, 0], [2021, 2, 0]]),
  },
  { code: "RUPALIINS", name: "Rupali Insurance Company", sector: "Insurance", board: "Main Board", category: "A",
    price: 56.8, change: 0.4, changePct: 0.71, prevClose: 56.4, open: 56.4, high: 57.0, low: 56.2,
    volume: 360000, marketCap: 3680000000, pe: 19.6, eps: 2.90, dividendYield: 2.6, bookValue: 32, freeFloat: 41,
    weekHigh52: 64, weekLow52: 44, faceValue: 10, paidUpCapital: 647000000, nav: 32,
    description: "Rupali Insurance is a general insurance company in Bangladesh providing fire, marine and motor coverage.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 45.0, foreign: 0, institution: 14.0 }),
    dividendHistory: dh([[2025, 15, 0], [2024, 12, 0], [2023, 12, 0], [2022, 10, 0], [2021, 10, 0]]),
  },
  { code: "DELTALIFE", name: "Delta Life Insurance", sector: "Insurance", board: "Main Board", category: "A",
    price: 134.6, change: -0.4, changePct: -0.30, prevClose: 135.0, open: 134.9, high: 135.6, low: 134.0,
    volume: 240000, marketCap: 16700000000, pe: 21.8, eps: 6.17, dividendYield: 2.2, bookValue: 78, freeFloat: 25,
    weekHigh52: 156, weekLow52: 108, faceValue: 10, paidUpCapital: 1240000000, nav: 78,
    description: "Delta Life Insurance is the largest private-sector life insurer in Bangladesh.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 55.0, foreign: 0, institution: 18.0 }),
    dividendHistory: dh([[2025, 30, 0], [2024, 25, 0], [2023, 30, 0], [2022, 25, 0], [2021, 20, 0]]),
  },
  { code: "TECHNO", name: "Techno Drugs Limited", sector: "Pharmaceuticals", board: "Main Board", category: "N",
    price: 96.5, change: 1.8, changePct: 1.90, prevClose: 94.7, open: 94.8, high: 97.0, low: 94.5,
    volume: 1200000, marketCap: 9650000000, pe: 18.0, eps: 5.36, dividendYield: 1.5, bookValue: 38, freeFloat: 30,
    weekHigh52: 112, weekLow52: 78, faceValue: 10, paidUpCapital: 1000000000, nav: 38,
    description: "Techno Drugs is a Bangladeshi pharmaceutical company, recently listed on the DSE main board.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 52.0, foreign: 0, institution: 16.0 }),
    dividendHistory: dh([[2025, 12, 0], [2024, 0, 0], [2023, 0, 0], [2022, 0, 0], [2021, 0, 0]]),
  },
  { code: "NAVANACNG", name: "Navana CNG Limited", sector: "Power & Energy", board: "Main Board", category: "B",
    price: 33.2, change: -0.2, changePct: -0.60, prevClose: 33.4, open: 33.4, high: 33.5, low: 33.0,
    volume: 380000, marketCap: 1980000000, pe: 20.0, eps: 1.66, dividendYield: 1.8, bookValue: 28, freeFloat: 42,
    weekHigh52: 42, weekLow52: 26, faceValue: 10, paidUpCapital: 596000000, nav: 28,
    description: "Navana CNG operates CNG conversion and refilling stations across Bangladesh.",
    hq: "Dhaka",
    sharePattern: pat({ sponsor: 40.0, foreign: 0, institution: 12.0 }),
    dividendHistory: dh([[2025, 6, 0], [2024, 5, 0], [2023, 7, 0], [2022, 8, 0], [2021, 0, 0]]),
  },
];

/* Build a deterministic 1D price series for any company */
export function buildDaySeries(co: Company) {
  const times = ["09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00"];
  const range = Math.max(0.01, co.high - co.low);
  return times.map((t, i) => ({
    t,
    v:
      Math.round(
        (co.open +
          Math.sin((i + co.price) / 1.6) * range * 0.5 +
          (i / (times.length - 1)) * (co.price - co.open)) * 100
      ) / 100,
  }));
}

export function buildSeries(co: Company, period: "1D" | "1W" | "1M" | "3M" | "1Y" | "All") {
  if (period === "1D") return buildDaySeries(co);
  const counts: Record<string, number> = { "1W": 5, "1M": 22, "3M": 65, "1Y": 52, All: 60 };
  const n = counts[period];
  const start = period === "All" ? co.weekLow52 * 0.92 : co.weekLow52 + (co.price - co.weekLow52) * 0.5;
  const end = co.price;
  const amp = (co.weekHigh52 - co.weekLow52) * 0.15;
  return Array.from({ length: n }, (_, i) => {
    const ratio = i / (n - 1);
    const base = start + (end - start) * ratio;
    const wiggle = Math.sin((i + co.code.length) / 2.4) * amp + Math.cos(i / 1.7) * amp * 0.4;
    let label = String(i + 1);
    if (period === "1W") label = ["Mon", "Tue", "Wed", "Thu", "Fri"][i];
    if (period === "1M") label = `D${i + 1}`;
    if (period === "3M") label = `W${i + 1}`;
    if (period === "1Y") label = `W${i + 1}`;
    if (period === "All") label = `'${(13 + Math.floor(i / 5)).toString().padStart(2, "0")}`;
    return { t: label, v: Math.round((base + wiggle) * 100) / 100 };
  });
}

export function formatBDT(n: number): string {
  const cr = n / 10_000_000;
  if (cr >= 100_000) return `৳ ${(cr / 100_000).toFixed(2)} Lakh Cr`;
  if (cr >= 1) return `৳ ${cr.toLocaleString(undefined, { maximumFractionDigits: 0 })} Cr`;
  return `৳ ${n.toLocaleString()}`;
}

export function formatVolume(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

export function findCompany(code: string): Company | undefined {
  return companies.find((c) => c.code.toLowerCase() === code.toLowerCase());
}
