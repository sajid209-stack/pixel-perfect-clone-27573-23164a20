import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { buildSeries, formatBDT, formatVolume, type Company } from "@/data/companies";

const BRAND: [number, number, number] = [0, 0, 0];
const INK: [number, number, number] = [0, 0, 0];
const MUTED: [number, number, number] = [90, 90, 90];
const LINE: [number, number, number] = [200, 200, 200];

type Doc = jsPDF & { lastAutoTable?: { finalY: number } };

function money(n: number, d = 2) {
  return n.toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d });
}

function header(doc: Doc, co: Company) {
  const w = doc.internal.pageSize.getWidth();
  doc.setFillColor(...BRAND);
  doc.rect(0, 0, w, 22, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Dhaka Stock Exchange PLC", 14, 9);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text("Company Profile", 14, 15);
  doc.text(new Date().toLocaleString(), w - 14, 15, { align: "right" });

  // Title block
  doc.setTextColor(...INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(co.name, 14, 34);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...MUTED);
  doc.text(
    `${co.code}  ·  ${co.sector}  ·  DSE ${co.board}  ·  Category ${co.category}`,
    14,
    40
  );

  // Price block (right)
  const up = co.change >= 0;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(...INK);
  doc.text(`BDT ${money(co.price)}`, w - 14, 34, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...INK);
  doc.text(
    `${up ? "+" : ""}${money(co.change)} (${up ? "+" : ""}${money(co.changePct)}%) today`,
    w - 14,
    40,
    { align: "right" }
  );

  doc.setDrawColor(...LINE);
  doc.setLineWidth(0.3);
  doc.line(14, 46, w - 14, 46);
}

function footer(doc: Doc) {
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setDrawColor(...LINE);
    doc.line(14, h - 14, w - 14, h - 14);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.text(
      "Indicative data — refer to official DSE disclosures before investing. dsebd.org",
      14,
      h - 8
    );
    doc.text(`Page ${i} / ${pages}`, w - 14, h - 8, { align: "right" });
  }
}

function sectionTitle(doc: Doc, label: string, y: number) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...BRAND);
  doc.text(label.toUpperCase(), 14, y);
  doc.setDrawColor(...BRAND);
  doc.setLineWidth(0.6);
  doc.line(14, y + 1.5, 14 + doc.getTextWidth(label.toUpperCase()), y + 1.5);
  return y + 6;
}

function kvTable(doc: Doc, y: number, rows: [string, string][]) {
  autoTable(doc, {
    startY: y,
    body: rows,
    theme: "grid",
    styles: { fontSize: 9, cellPadding: 2.2, textColor: INK, lineColor: LINE, lineWidth: 0.1 },
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 55, textColor: MUTED, fillColor: [248, 250, 251] },
      1: { cellWidth: "auto" },
    },
    margin: { left: 14, right: 14 },
  });
  return (doc.lastAutoTable?.finalY ?? y) + 6;
}

function drawLineChart(
  doc: Doc,
  y: number,
  data: { t: string; v: number }[],
  opts: { title?: string; height?: number } = {}
) {
  const pageW = doc.internal.pageSize.getWidth();
  const left = 14;
  const right = pageW - 14;
  const width = right - left;
  const h = opts.height ?? 60;
  const padL = 14; // for y-axis labels
  const padB = 8;
  const padT = 4;
  const plotL = left + padL;
  const plotR = right - 2;
  const plotT = y + padT;
  const plotB = y + h - padB;

  // Frame
  doc.setDrawColor(...LINE);
  doc.setLineWidth(0.2);
  doc.rect(left, y, width, h);

  if (!data.length) return y + h + 4;

  const vs = data.map((d) => d.v);
  const min = Math.min(...vs);
  const max = Math.max(...vs);
  const span = max - min || 1;

  // Gridlines + Y labels (4 steps)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...MUTED);
  for (let i = 0; i <= 4; i++) {
    const ratio = i / 4;
    const yy = plotB - (plotB - plotT) * ratio;
    const val = min + span * ratio;
    doc.setDrawColor(235, 235, 235);
    doc.line(plotL, yy, plotR, yy);
    doc.text(val.toFixed(1), plotL - 1, yy + 1.2, { align: "right" });
  }

  // X labels (first, mid, last)
  const xAt = (i: number) => plotL + ((plotR - plotL) * i) / (data.length - 1 || 1);
  const yAt = (v: number) => plotB - ((v - min) / span) * (plotB - plotT);
  const marks = [0, Math.floor(data.length / 2), data.length - 1];
  marks.forEach((i) => {
    doc.text(String(data[i].t), xAt(i), plotB + 5, { align: "center" });
  });

  // Line
  doc.setDrawColor(...INK);
  doc.setLineWidth(0.5);
  for (let i = 1; i < data.length; i++) {
    doc.line(xAt(i - 1), yAt(data[i - 1].v), xAt(i), yAt(data[i].v));
  }

  return y + h + 6;
}

function drawBarChart(
  doc: Doc,
  y: number,
  data: { label: string; v: number }[],
  opts: { height?: number } = {}
) {
  const pageW = doc.internal.pageSize.getWidth();
  const left = 14;
  const right = pageW - 14;
  const width = right - left;
  const h = opts.height ?? 55;
  const padL = 14;
  const padB = 8;
  const padT = 4;
  const plotL = left + padL;
  const plotR = right - 2;
  const plotT = y + padT;
  const plotB = y + h - padB;

  doc.setDrawColor(...LINE);
  doc.setLineWidth(0.2);
  doc.rect(left, y, width, h);

  if (!data.length) return y + h + 4;

  const max = Math.max(...data.map((d) => d.v), 1);
  const bw = ((plotR - plotL) / data.length) * 0.6;
  const step = (plotR - plotL) / data.length;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...MUTED);
  for (let i = 0; i <= 4; i++) {
    const ratio = i / 4;
    const yy = plotB - (plotB - plotT) * ratio;
    doc.setDrawColor(235, 235, 235);
    doc.line(plotL, yy, plotR, yy);
    doc.text((max * ratio).toFixed(1), plotL - 1, yy + 1.2, { align: "right" });
  }

  data.forEach((d, i) => {
    const bh = (d.v / max) * (plotB - plotT);
    const x = plotL + step * i + (step - bw) / 2;
    doc.setFillColor(60, 60, 60);
    doc.rect(x, plotB - bh, bw, bh, "F");
    doc.setTextColor(...MUTED);
    doc.text(d.label, x + bw / 2, plotB + 5, { align: "center" });
  });

  return y + h + 6;
}


export function exportCompanyPdf(co: Company) {
  const doc = new jsPDF({ unit: "mm", format: "a4" }) as Doc;
  header(doc, co);

  let y = 54;

  // Key statistics
  y = sectionTitle(doc, "Key Statistics", y);
  const totalShares = Math.round(co.paidUpCapital / co.faceValue);
  y = kvTable(doc, y, [
    ["Market Cap", formatBDT(co.marketCap)],
    ["P/E Ratio", money(co.pe)],
    ["EPS", money(co.eps)],
    ["NAV / Share", money(co.nav)],
    ["Dividend Yield", `${money(co.dividendYield)}%`],
    ["Free Float", `${money(co.freeFloat, 1)}%`],
    ["52W High / Low", `${money(co.weekHigh52)} / ${money(co.weekLow52)}`],
    ["Day High / Low", `${money(co.high)} / ${money(co.low)}`],
    ["Volume", formatVolume(co.volume)],
    ["Prev. Close / Open", `${money(co.prevClose)} / ${money(co.open)}`],
  ]);

  // Price trend chart (1Y)
  if (y > 200) { doc.addPage(); y = 20; }
  y = sectionTitle(doc, "Price Trend (1Y)", y);
  y = drawLineChart(doc, y, buildSeries(co, "1Y"), { height: 60 });

  // Dividend chart
  if (co.dividendHistory?.length) {
    if (y > 210) { doc.addPage(); y = 20; }
    y = sectionTitle(doc, "Dividend Trend (Cash %)", y);
    y = drawBarChart(
      doc,
      y,
      co.dividendHistory.map((d) => ({ label: String(d.year), v: d.cash })),
      { height: 50 }
    );
  }

  // Basics
  y = sectionTitle(doc, "Company Basics", y);
  y = kvTable(doc, y, [
    ["Scrip Code", String(co.scripCode ?? "—")],
    ["Instrument", co.instrumentType ?? "Equity"],
    ["Listing Year", String(co.listingYear ?? "—")],
    ["Face Value", `BDT ${money(co.faceValue)}`],
    ["Paid-up Capital", formatBDT(co.paidUpCapital)],
    ["Authorised Capital", formatBDT(co.paidUpCapital * 2)],
    ["Total Outstanding Shares", totalShares.toLocaleString()],
    ["Market Lot", "1"],
    ["Electronic Share", "Yes"],
    ["Year End", co.yearEnd ?? "31 December"],
    ["Operational Status", co.operationalStatus ?? "Active"],
    ["Credit Rating (LT / ST)", `${co.creditRating?.longTerm ?? "—"} / ${co.creditRating?.shortTerm ?? "—"}`],
  ]);

  // Shareholding pattern
  if (co.sharePattern) {
    y = sectionTitle(doc, "Shareholding Pattern (%)", y);
    const p = co.sharePattern;
    autoTable(doc, {
      startY: y,
      head: [["Sponsor/Director", "Government", "Institution", "Foreign", "Public"]],
      body: [[money(p.sponsor, 1), money(p.government, 1), money(p.institution, 1), money(p.foreign, 1), money(p.public, 1)]],
      theme: "striped",
      styles: { fontSize: 9, cellPadding: 2.2, textColor: INK, lineColor: LINE, lineWidth: 0.1 },
      headStyles: { fillColor: BRAND, textColor: [255, 255, 255], fontStyle: "bold" },
      margin: { left: 14, right: 14 },
    });
    y = (doc.lastAutoTable?.finalY ?? y) + 6;
  }

  // Dividend history
  if (co.dividendHistory?.length) {
    if (y > 240) { doc.addPage(); y = 20; }
    y = sectionTitle(doc, "Dividend History", y);
    autoTable(doc, {
      startY: y,
      head: [["Year", "Cash (%)", "Stock (%)", "Yield (%)"]],
      body: co.dividendHistory.map((d) => [
        String(d.year),
        money(d.cash, 1),
        money(d.stock, 1),
        d.yieldPct != null ? money(d.yieldPct, 2) : "—",
      ]),
      theme: "striped",
      styles: { fontSize: 9, cellPadding: 2.2, textColor: INK, lineColor: LINE, lineWidth: 0.1 },
      headStyles: { fillColor: BRAND, textColor: [255, 255, 255], fontStyle: "bold" },
      columnStyles: { 1: { halign: "right" }, 2: { halign: "right" }, 3: { halign: "right" } },
      margin: { left: 14, right: 14 },
    });
    y = (doc.lastAutoTable?.finalY ?? y) + 6;
  }

  // Interim financials
  if (co.interimFinancials?.length) {
    if (y > 220) { doc.addPage(); y = 20; }
    y = sectionTitle(doc, "Interim Financials", y);
    autoTable(doc, {
      startY: y,
      head: [["Metric", "Q1", "Q2", "H1", "Q3", "9M", "Annual"]],
      body: co.interimFinancials.map((r) => [
        r.metric,
        r.q1 != null ? money(r.q1) : "—",
        r.q2 != null ? money(r.q2) : "—",
        r.half != null ? money(r.half) : "—",
        r.q3 != null ? money(r.q3) : "—",
        r.nine != null ? money(r.nine) : "—",
        r.annual != null ? money(r.annual) : "—",
      ]),
      theme: "striped",
      styles: { fontSize: 8.5, cellPadding: 2, textColor: INK, lineColor: LINE, lineWidth: 0.1 },
      headStyles: { fillColor: BRAND, textColor: [255, 255, 255], fontStyle: "bold" },
      columnStyles: { 0: { fontStyle: "bold" } },
      margin: { left: 14, right: 14 },
    });
    y = (doc.lastAutoTable?.finalY ?? y) + 6;
  }

  // Multi-year financials
  if (co.multiYearFinancials?.length) {
    if (y > 220) { doc.addPage(); y = 20; }
    y = sectionTitle(doc, "Annual Financials (BDT mn)", y);
    autoTable(doc, {
      startY: y,
      head: [["Year", "EPS (Basic)", "NAV", "Profit", "Comprehensive", "Reserve", "OCI"]],
      body: co.multiYearFinancials.map((r) => [
        String(r.year),
        r.epsBasic != null ? money(r.epsBasic) : "—",
        r.nav != null ? money(r.nav) : "—",
        r.profit != null ? money(r.profit, 1) : "—",
        r.comprehensive != null ? money(r.comprehensive, 1) : "—",
        r.reserve != null ? money(r.reserve, 1) : "—",
        r.oci != null ? money(r.oci, 1) : "—",
      ]),
      theme: "striped",
      styles: { fontSize: 8.5, cellPadding: 2, textColor: INK, lineColor: LINE, lineWidth: 0.1 },
      headStyles: { fillColor: BRAND, textColor: [255, 255, 255], fontStyle: "bold" },
      margin: { left: 14, right: 14 },
    });
    y = (doc.lastAutoTable?.finalY ?? y) + 6;
  }

  // Recent announcements
  if (co.recentAnnouncements?.length) {
    if (y > 220) { doc.addPage(); y = 20; }
    y = sectionTitle(doc, "Recent Disclosures", y);
    autoTable(doc, {
      startY: y,
      head: [["Date", "Type", "Summary"]],
      body: co.recentAnnouncements.map((a) => [a.date, a.type, a.summary]),
      theme: "striped",
      styles: { fontSize: 9, cellPadding: 2.2, textColor: INK, lineColor: LINE, lineWidth: 0.1 },
      headStyles: { fillColor: BRAND, textColor: [255, 255, 255], fontStyle: "bold" },
      columnStyles: { 0: { cellWidth: 24 }, 1: { cellWidth: 34 } },
      margin: { left: 14, right: 14 },
    });
    y = (doc.lastAutoTable?.finalY ?? y) + 6;
  }

  // Company details
  if (y > 230) { doc.addPage(); y = 20; }
  y = sectionTitle(doc, "Company Details", y);
  y = kvTable(doc, y, [
    ["Registered Office", co.registeredOffice ?? `${co.hq}, Bangladesh`],
    ["Factory Address", co.factoryAddress ?? "—"],
    ["Phone", co.phone ?? "—"],
    ["Email", co.email ?? "—"],
    ["Website", co.website ?? "—"],
    ["Company Secretary", co.companySecretary?.name ?? "—"],
    ["Secretary Email", co.companySecretary?.email ?? "—"],
    ["Last AGM", co.agmDate ?? "—"],
  ]);

  // About
  if (co.description) {
    if (y > 250) { doc.addPage(); y = 20; }
    y = sectionTitle(doc, "About", y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(...INK);
    const w = doc.internal.pageSize.getWidth() - 28;
    const lines = doc.splitTextToSize(co.description, w);
    doc.text(lines, 14, y);
  }

  footer(doc);
  const blobUrl = doc.output("bloburl");
  const win = window.open(blobUrl, "_blank");
  if (!win) {
    // Popup blocked — fall back to saving
    doc.save(`${co.code}-company-profile.pdf`);
  }
}
