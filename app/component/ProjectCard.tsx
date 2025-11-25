// components/ProjectCard.tsx
"use client";

import React, { useRef } from "react";
import { ExternalLink } from "lucide-react";

type ProjectCardProps = {
  title: string;
  description?: string;
  src?: string;       // external URL to load inside iframe
  srcDoc?: string;    // raw HTML string to render in iframe
  tags?: string[];
  height?: number;    // iframe height in px (fixed for uniform previews)
  externalLink?: string;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  src,
  srcDoc,
  tags = [],
  height = 460,
  externalLink,
}) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const openInNew = () => {
    if (src) {
      window.open(src, "_blank");
      return;
    }
    if (srcDoc) {
      const blob = new Blob([srcDoc], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    }
  };

  return (
    <div className="bg-slate-900/40 border border-white/8 rounded-2xl p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-lg truncate">{title}</h3>
          {description && <p className="text-slate-400 text-sm mt-1 line-clamp-3">{description}</p>}
          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span key={t} className="text-xs text-cyan-400 bg-white/2 px-2 py-1 rounded-md">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {externalLink && (
            <a
              href={externalLink}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-md bg-white/3 hover:bg-white/5 transition"
              title="Open external link"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Unified preview wrapper with consistent border and fixed height */}
      <div
        className="mt-4 rounded-lg overflow-hidden border border-white/12 bg-black/10"
        style={{ height: height, display: "flex", flexDirection: "column" }}
      >
        <iframe
          ref={iframeRef}
          title={`preview-${title}`}
          src={src}
          srcDoc={srcDoc}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          style={{
            width: "100%",
            height: "100%",
            border: "0",
            display: "block",
            background: "#fff",
          }}
        />

        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/60 border-t border-white/6">
          <div className="text-xs text-slate-400">
            Preview Mode
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={openInNew}
              className="text-sm font-medium px-3 py-2 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 transition"
              title="Open preview in new tab"
            >
              Open in new tab
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
