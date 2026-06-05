export type Company = {
  code: string;
  name: string;
  sector: string;
  board: string;
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
  description: string;
  founded: number;
  hq: string;
  employees?: number;
  website?: string;
  financials?: {
    revenue: string;
    netProfit: string;
    netMargin: string;
    roe: string;
    debtEquity: string;
  };
  shareholders?: { name: string; pct: number }[];
  recentAnnouncements?: { type: string; date: string; summary: string }[];
};

export const companies: Company[] = [
  {
    code: "BATBC",
    name: "British American Tobacco Bangladesh",
    sector: "Consumer Staples",
    board: "Main Board",
    price: 211.5,
    change: 1.6,
    changePct: 0.77,
    prevClose: 209.9,
    open: 210.1,
    high: 213.2,
    low: 209.5,
    volume: 28400000,
    marketCap: 8245000000000,
    pe: 14.2,
    eps: 14.9,
    dividendYield: 2.14,
    bookValue: 98.4,
    freeFloat: 30,
    weekHigh52: 248,
    weekLow52: 188.5,
    description:
      "BAT Bangladesh is the country's leading tobacco company, manufacturing and marketing cigarettes under brands including Benson & Hedges, John Player Gold Leaf, and Camel.",
    founded: 1910,
    hq: "Dhaka",
    employees: 1400,
    website: "batbangladesh.com",
    financials: {
      revenue: "৳ 4,820 Cr",
      netProfit: "৳ 1,240 Cr",
      netMargin: "25.7%",
      roe: "21.4%",
      debtEquity: "0.08x",
    },
    shareholders: [
      { name: "British American Tobacco", pct: 70.0 },
      { name: "ICB", pct: 3.2 },
      { name: "General public", pct: 26.8 },
    ],
    recentAnnouncements: [
      { type: "Dividend", date: "Jun 03", summary: "Final cash dividend of 450% declared for FY2025" },
      { type: "AGM notice", date: "May 22", summary: "AGM scheduled for June 28, 2026 at Le Méridien Dhaka" },
      { type: "Price sensitive", date: "May 14", summary: "Q1 results: revenue +9.4% YoY, EPS ৳ 3.81" },
    ],
  },
  {
    code: "GRAMEENS",
    name: "Grameenphone Ltd",
    sector: "Telecom",
    board: "Main Board",
    price: 28.4,
    change: 0.5,
    changePct: 1.79,
    prevClose: 27.9,
    open: 28,
    high: 28.8,
    low: 27.8,
    volume: 24700000,
    marketCap: 2380000000000,
    pe: 18.4,
    eps: 1.54,
    dividendYield: 3.1,
    bookValue: 12.2,
    freeFloat: 44,
    weekHigh52: 34.5,
    weekLow52: 24.1,
    description:
      "Grameenphone is Bangladesh's largest mobile telecommunications operator with over 82 million subscribers, offering voice, data, and digital financial services.",
    founded: 1997,
    hq: "Dhaka",
    employees: 2300,
    website: "grameenphone.com",
    financials: {
      revenue: "৳ 16,200 Cr",
      netProfit: "৳ 3,540 Cr",
      netMargin: "21.8%",
      roe: "62.0%",
      debtEquity: "0.45x",
    },
    shareholders: [
      { name: "Telenor Mobile Communications", pct: 55.8 },
      { name: "Grameen Telecom", pct: 34.2 },
      { name: "General public", pct: 10.0 },
    ],
    recentAnnouncements: [
      { type: "AGM notice", date: "Jun 02", summary: "Annual General Meeting scheduled for June 25, 2026" },
      { type: "Dividend", date: "Apr 18", summary: "Interim cash dividend of 130% recommended" },
      { type: "Price sensitive", date: "Mar 30", summary: "Spectrum acquisition update for 700 MHz band" },
    ],
  },
  {
    code: "RENATA",
    name: "Renata Limited",
    sector: "Pharmaceuticals",
    board: "Main Board",
    price: 1240,
    change: -8,
    changePct: -0.64,
    prevClose: 1248,
    open: 1248,
    high: 1255,
    low: 1238,
    volume: 4200000,
    marketCap: 1680000000000,
    pe: 22.1,
    eps: 56.1,
    dividendYield: 1.8,
    bookValue: 310,
    freeFloat: 25,
    weekHigh52: 1480,
    weekLow52: 1050,
    description:
      "Renata Limited is one of Bangladesh's leading pharmaceutical companies, manufacturing prescription medicines, OTC products, and animal health products.",
    founded: 1972,
    hq: "Dhaka",
    employees: 5800,
    website: "renata-ltd.com",
    financials: {
      revenue: "৳ 3,180 Cr",
      netProfit: "৳ 580 Cr",
      netMargin: "18.2%",
      roe: "18.0%",
      debtEquity: "0.32x",
    },
    shareholders: [
      { name: "Sponsor directors", pct: 51.0 },
      { name: "ICB", pct: 8.4 },
      { name: "General public", pct: 40.6 },
    ],
    recentAnnouncements: [
      { type: "Price sensitive", date: "Jun 01", summary: "Board approves rights share issuance at 1:5 ratio" },
      { type: "Dividend", date: "May 10", summary: "Final cash dividend of 110% for FY2025" },
      { type: "AGM notice", date: "Apr 28", summary: "AGM scheduled for June 12, 2026" },
    ],
  },
  {
    code: "SQPHARMA",
    name: "Square Pharmaceuticals Ltd",
    sector: "Pharmaceuticals",
    board: "Main Board",
    price: 190.2,
    change: 2.1,
    changePct: 1.11,
    prevClose: 188.1,
    open: 188.5,
    high: 191,
    low: 188,
    volume: 18200000,
    marketCap: 3240000000000,
    pe: 19.8,
    eps: 9.61,
    dividendYield: 2.4,
    bookValue: 72.5,
    freeFloat: 32,
    weekHigh52: 220,
    weekLow52: 160,
    description:
      "Square Pharmaceuticals is Bangladesh's largest pharmaceutical company by revenue, exporting to over 40 countries and manufacturing more than 500 formulations.",
    founded: 1958,
    hq: "Dhaka",
    employees: 9200,
    website: "squarepharma.com.bd",
    financials: {
      revenue: "৳ 7,420 Cr",
      netProfit: "৳ 1,820 Cr",
      netMargin: "24.5%",
      roe: "19.6%",
      debtEquity: "0.04x",
    },
    shareholders: [
      { name: "Sponsor / Directors", pct: 48.5 },
      { name: "Institutions", pct: 19.5 },
      { name: "General public", pct: 32.0 },
    ],
    recentAnnouncements: [
      { type: "Dividend", date: "May 26", summary: "Final cash dividend of 105% recommended" },
      { type: "Price sensitive", date: "Apr 14", summary: "Q3 results: EPS ৳ 2.41, revenue +6.8% YoY" },
      { type: "AGM notice", date: "Mar 20", summary: "AGM scheduled for May 15, 2026" },
    ],
  },
  {
    code: "WALTONHIL",
    name: "Walton Hi-Tech Industries",
    sector: "Engineering",
    board: "Main Board",
    price: 1620,
    change: 4.8,
    changePct: 0.3,
    prevClose: 1615.2,
    open: 1616,
    high: 1628,
    low: 1612,
    volume: 1800000,
    marketCap: 8910000000000,
    pe: 26.4,
    eps: 61.36,
    dividendYield: 0.9,
    bookValue: 420,
    freeFloat: 9.9,
    weekHigh52: 1920,
    weekLow52: 1340,
    description:
      "Walton Hi-Tech is Bangladesh's leading electronics manufacturer, producing refrigerators, air conditioners, televisions, and mobile phones under the Walton brand.",
    founded: 2006,
    hq: "Dhaka",
    employees: 28000,
    website: "waltonbd.com",
    financials: {
      revenue: "৳ 8,140 Cr",
      netProfit: "৳ 1,860 Cr",
      netMargin: "22.9%",
      roe: "14.6%",
      debtEquity: "0.22x",
    },
    shareholders: [
      { name: "Walton family (sponsors)", pct: 90.1 },
      { name: "Institutions", pct: 4.2 },
      { name: "General public", pct: 5.7 },
    ],
    recentAnnouncements: [
      { type: "Price sensitive", date: "Jun 04", summary: "First 7-tonne floor-standing AC line commissioned" },
      { type: "Dividend", date: "May 20", summary: "Final cash dividend of 30% recommended" },
      { type: "AGM notice", date: "Apr 30", summary: "AGM scheduled for June 22, 2026" },
    ],
  },
  {
    code: "ISLAMIBNK",
    name: "Islami Bank Bangladesh",
    sector: "Banking",
    board: "Main Board",
    price: 32.1,
    change: -0.3,
    changePct: -0.93,
    prevClose: 32.4,
    open: 32.5,
    high: 32.6,
    low: 31.9,
    volume: 32100000,
    marketCap: 1860000000000,
    pe: 9.2,
    eps: 3.49,
    dividendYield: 4.1,
    bookValue: 28.4,
    freeFloat: 58,
    weekHigh52: 38.8,
    weekLow52: 28.2,
    description:
      "Islami Bank Bangladesh is the country's largest private commercial bank operating under Islamic Shariah principles, with over 400 branches nationwide.",
    founded: 1983,
    hq: "Dhaka",
    employees: 19500,
    website: "islamibankbd.com",
    financials: {
      revenue: "৳ 13,420 Cr",
      netProfit: "৳ 1,180 Cr",
      netMargin: "8.8%",
      roe: "12.3%",
      debtEquity: "n/a",
    },
    shareholders: [
      { name: "Sponsor directors", pct: 30.0 },
      { name: "Institutions", pct: 24.5 },
      { name: "General public", pct: 45.5 },
    ],
    recentAnnouncements: [
      { type: "Regulatory", date: "May 31", summary: "BSEC query response regarding unusual price movement" },
      { type: "Dividend", date: "Apr 22", summary: "Cash dividend of 10% declared for FY2025" },
      { type: "AGM notice", date: "Mar 28", summary: "AGM scheduled for May 24, 2026" },
    ],
  },
  {
    code: "BRAC",
    name: "BRAC Bank Limited",
    sector: "Banking",
    board: "Main Board",
    price: 48.3,
    change: 0.6,
    changePct: 1.26,
    prevClose: 47.7,
    open: 47.8,
    high: 48.6,
    low: 47.6,
    volume: 21900000,
    marketCap: 1340000000000,
    pe: 11.4,
    eps: 4.24,
    dividendYield: 3.2,
    bookValue: 38.1,
    freeFloat: 62,
    weekHigh52: 56.2,
    weekLow52: 38.5,
    description:
      "BRAC Bank is a leading commercial bank in Bangladesh, known for its SME lending and digital banking services through the bKash mobile financial platform.",
    founded: 2001,
    hq: "Dhaka",
    employees: 8400,
    website: "bracbank.com",
    financials: {
      revenue: "৳ 9,820 Cr",
      netProfit: "৳ 920 Cr",
      netMargin: "9.4%",
      roe: "11.2%",
      debtEquity: "n/a",
    },
    shareholders: [
      { name: "BRAC", pct: 44.6 },
      { name: "Institutions", pct: 22.3 },
      { name: "General public", pct: 33.1 },
    ],
    recentAnnouncements: [
      { type: "Dividend", date: "May 18", summary: "Cash dividend of 17.5% declared" },
      { type: "Price sensitive", date: "Apr 10", summary: "bKash crosses 80 million registered users" },
      { type: "AGM notice", date: "Mar 12", summary: "AGM scheduled for May 8, 2026" },
    ],
  },
  {
    code: "DBBL",
    name: "Dutch-Bangla Bank Limited",
    sector: "Banking",
    board: "Main Board",
    price: 288,
    change: 2.3,
    changePct: 0.8,
    prevClose: 285.7,
    open: 286,
    high: 289.5,
    low: 285.5,
    volume: 8400000,
    marketCap: 2180000000000,
    pe: 12.8,
    eps: 22.5,
    dividendYield: 2.6,
    bookValue: 165,
    freeFloat: 40,
    weekHigh52: 320,
    weekLow52: 248,
    description:
      "Dutch-Bangla Bank is one of Bangladesh's most profitable private commercial banks, pioneering mobile and agent banking in the country.",
    founded: 1996,
    hq: "Dhaka",
    employees: 9100,
    website: "dutchbanglabank.com",
    financials: {
      revenue: "৳ 11,540 Cr",
      netProfit: "৳ 1,420 Cr",
      netMargin: "12.3%",
      roe: "13.8%",
      debtEquity: "n/a",
    },
    shareholders: [
      { name: "Sponsor directors", pct: 60.0 },
      { name: "Institutions", pct: 15.4 },
      { name: "General public", pct: 24.6 },
    ],
    recentAnnouncements: [
      { type: "Dividend", date: "Apr 30", summary: "Cash dividend of 50% recommended" },
      { type: "AGM notice", date: "Mar 22", summary: "AGM scheduled for May 18, 2026" },
      { type: "Price sensitive", date: "Feb 14", summary: "Nexus Pay surpasses 5 million active users" },
    ],
  },
  {
    code: "ACMELAB",
    name: "ACME Laboratories Limited",
    sector: "Pharmaceuticals",
    board: "Main Board",
    price: 79.4,
    change: 1.3,
    changePct: 1.66,
    prevClose: 78.1,
    open: 78.2,
    high: 80,
    low: 78,
    volume: 12400000,
    marketCap: 840000000000,
    pe: 16.2,
    eps: 4.9,
    dividendYield: 2.8,
    bookValue: 42.8,
    freeFloat: 35,
    weekHigh52: 94,
    weekLow52: 68,
    description:
      "ACME Laboratories is a leading pharmaceutical company in Bangladesh, manufacturing a wide range of dosage forms including tablets, capsules, injections, and syrups.",
    founded: 1954,
    hq: "Dhaka",
    employees: 4800,
    website: "acmeglobal.com",
    financials: {
      revenue: "৳ 2,180 Cr",
      netProfit: "৳ 280 Cr",
      netMargin: "12.8%",
      roe: "14.1%",
      debtEquity: "0.18x",
    },
    shareholders: [
      { name: "Sponsor directors", pct: 50.0 },
      { name: "Institutions", pct: 17.5 },
      { name: "General public", pct: 32.5 },
    ],
    recentAnnouncements: [
      { type: "Price sensitive", date: "Jun 04", summary: "Transmission of shares following death of Managing Director" },
      { type: "Dividend", date: "May 12", summary: "Cash dividend of 22% declared" },
      { type: "AGM notice", date: "Apr 02", summary: "AGM scheduled for May 28, 2026" },
    ],
  },
  {
    code: "MARICO",
    name: "Marico Bangladesh Limited",
    sector: "Consumer Staples",
    board: "Main Board",
    price: 298,
    change: -0.6,
    changePct: -0.2,
    prevClose: 298.6,
    open: 299,
    high: 300.2,
    low: 297.4,
    volume: 6200000,
    marketCap: 1120000000000,
    pe: 28.4,
    eps: 10.49,
    dividendYield: 1.9,
    bookValue: 64.2,
    freeFloat: 25,
    weekHigh52: 340,
    weekLow52: 258,
    description:
      "Marico Bangladesh manufactures and markets personal care and food products under brands including Parachute, Saffola, and Hair & Care.",
    founded: 1999,
    hq: "Dhaka",
    employees: 700,
    website: "marico.com/bangladesh",
    financials: {
      revenue: "৳ 1,640 Cr",
      netProfit: "৳ 420 Cr",
      netMargin: "25.6%",
      roe: "82.5%",
      debtEquity: "0.02x",
    },
    shareholders: [
      { name: "Marico Limited (India)", pct: 75.0 },
      { name: "Institutions", pct: 12.4 },
      { name: "General public", pct: 12.6 },
    ],
    recentAnnouncements: [
      { type: "Dividend", date: "May 06", summary: "Final cash dividend of 750% recommended" },
      { type: "Price sensitive", date: "Apr 11", summary: "Q4 results: EPS ৳ 3.20, revenue +5.2% YoY" },
      { type: "AGM notice", date: "Mar 18", summary: "AGM scheduled for June 30, 2026" },
    ],
  },
];

/* Build a deterministic 1D price series for any company */
export function buildDaySeries(co: Company) {
  const times = ["09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00"];
  const range = co.high - co.low;
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

/* Build a longer trailing series for 1W/1M/3M/1Y/All — deterministic per code */
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
  const cr = n / 10_000_000; // 1 crore = 10 million
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
