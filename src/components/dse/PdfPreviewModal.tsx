import { useEffect, useRef } from "react";
import { X, Download, Printer } from "lucide-react";

type Props = {
  blobUrl: string;
  filename: string;
  onClose: () => void;
};

export function PdfPreviewModal({ blobUrl, filename, onClose }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handlePrint = () => {
    const win = iframeRef.current?.contentWindow;
    if (win) {
      try {
        win.focus();
        win.print();
        return;
      } catch {
        /* fall through */
      }
    }
    window.open(blobUrl, "_blank");
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ background: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      <div
        className="mx-auto my-6 flex flex-col w-[95vw] max-w-[1100px] h-[calc(100vh-48px)] rounded-md overflow-hidden shadow-2xl"
        style={{ background: "var(--surface, #fff)", border: "1px solid rgb(0 0 0 / 0.15)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Toolbar */}
        <div
          className="flex items-center justify-between px-4 py-2 border-b"
          style={{ borderColor: "rgb(0 0 0 / 0.1)", background: "var(--bg, #f6f6f6)" }}
        >
          <div className="text-[13px] font-semibold truncate" style={{ color: "var(--ink, #111)" }}>
            {filename}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium border transition hover:opacity-80"
              style={{ borderColor: "rgb(0 0 0 / 0.15)", color: "var(--ink, #111)" }}
            >
              <Download className="w-3.5 h-3.5" /> Download
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium border transition hover:opacity-80"
              style={{ borderColor: "rgb(0 0 0 / 0.15)", color: "var(--ink, #111)" }}
            >
              <Printer className="w-3.5 h-3.5" /> Print
            </button>
            <button
              onClick={onClose}
              aria-label="Close"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium border transition hover:opacity-80"
              style={{ borderColor: "rgb(0 0 0 / 0.15)", color: "var(--ink, #111)" }}
            >
              <X className="w-3.5 h-3.5" /> Close
            </button>
          </div>
        </div>

        {/* Preview */}
        <iframe
          ref={iframeRef}
          src={blobUrl}
          title={filename}
          className="flex-1 w-full"
          style={{ border: 0, background: "#525659" }}
        />
      </div>
    </div>
  );
}
