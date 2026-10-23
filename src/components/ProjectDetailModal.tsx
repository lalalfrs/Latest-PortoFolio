import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Check, Copy, ExternalLink, Terminal, X } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';
import { StudioArtwork } from './StudioArtwork';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSelectNeighbor: (direction: 'prev' | 'next') => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onSelectNeighbor,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture'>('overview');
  const [copiedCloneUrl, setCopiedCloneUrl] = useState(false);

  useEffect(() => {
    setActiveTab('overview');
    setCopiedCloneUrl(false);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onSelectNeighbor('next');
      } else if (e.key === 'ArrowLeft') {
        onSelectNeighbor('prev');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [project, onClose, onSelectNeighbor]);

  const handleCopyClone = () => {
    if (!project) return;
    const cmd = `git clone https://github.com/hilalalfaris/${project.id}.git`;
    navigator.clipboard?.writeText(cmd);
    setCopiedCloneUrl(true);
    setTimeout(() => setCopiedCloneUrl(false), 2000);
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/75 backdrop-blur-sm overflow-y-auto"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FAFAFA] dark:bg-[#0B0B0D] text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 shadow-2xl"
          >
            {/* Top Modal Sticky Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 px-6 py-4 bg-[#FAFAFA]/90 dark:bg-[#0B0B0D]/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 tabular-nums">
                <span>CASE STUDY {project.index}</span>
                <span aria-hidden="true">·</span>
                <span>{project.category}</span>
                <span aria-hidden="true">·</span>
                <span>{project.year}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelectNeighbor('prev')}
                  className="px-2.5 py-1.5 text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 rounded-md transition-colors whitespace-nowrap shrink-0"
                  title="Previous project (Left Arrow)"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() => onSelectNeighbor('next')}
                  className="px-2.5 py-1.5 text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 rounded-md transition-colors whitespace-nowrap shrink-0"
                  title="Next project (Right Arrow)"
                >
                  Next
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close case study modal"
                  className="ml-2 inline-flex items-center justify-center w-9 h-9 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 transition-colors shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 md:p-10 space-y-8">
              {/* Hero Showcase Artwork */}
              <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
                <StudioArtwork variant={project.artworkVariant} className="min-h-[260px] sm:min-h-[320px]" />
              </div>

              {/* Title & Metadata Block */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-mono tabular-nums">
                    <span>{project.role}</span>
                    <span aria-hidden="true">·</span>
                    <span>Duration: {project.duration}</span>
                  </div>
                  <h2
                    id="modal-project-title"
                    className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white"
                  >
                    {project.title}
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400 text-base">
                    {project.subtitle}
                  </p>
                </div>

                {/* Segmented View Switcher inside Modal */}
                <div className="flex items-center gap-1 p-1 bg-zinc-200/70 dark:bg-zinc-900 rounded-lg self-start md:self-end shrink-0">
                  <button
                    type="button"
                    onClick={() => setActiveTab('overview')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      activeTab === 'overview'
                        ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                    }`}
                  >
                    Case Overview
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('architecture')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      activeTab === 'architecture'
                        ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                    }`}
                  >
                    Architecture &amp; Code
                  </button>
                </div>
              </div>

              {/* Metrics Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="p-4 rounded-xl bg-zinc-100/80 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80"
                  >
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">{metric.label}</div>
                    <div className="font-mono text-xl font-semibold text-zinc-950 dark:text-white mt-1 tabular-nums">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>

              {activeTab === 'overview' ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h3 className="font-display text-sm font-semibold text-zinc-950 dark:text-white">
                        01. The Engineering Challenge
                      </h3>
                      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {project.challenge}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display text-sm font-semibold text-zinc-950 dark:text-white">
                        02. Architectural Solution
                      </h3>
                      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <h3 className="font-display text-sm font-semibold text-zinc-950 dark:text-white mb-3">
                      03. Key Engineering Deliverables
                    </h3>
                    <ul className="space-y-2">
                      {project.keyHighlights.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300"
                        >
                          <span className="font-mono text-xs text-zinc-400 mt-0.5 tabular-nums">
                            0{idx + 1}.
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="rounded-xl bg-zinc-900 text-zinc-100 p-5 border border-zinc-800 font-mono text-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <span className="flex items-center gap-2 text-zinc-400">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Repository Quick Clone</span>
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyClone}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors whitespace-nowrap shrink-0"
                      >
                        {copiedCloneUrl ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Command</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="text-zinc-300 overflow-x-auto py-1">
                      git clone https://github.com/hilalalfaris/{project.id}.git &amp;&amp; npm install &amp;&amp; npm run dev
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-sm font-semibold text-zinc-950 dark:text-white">
                      Technical Stack &amp; Tooling
                    </h3>
                    <p className="text-sm font-mono text-zinc-600 dark:text-zinc-400">
                      {project.techStack.join(' · ')}
                    </p>
                  </div>
                </div>
              )}

              {/* Bottom Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                  {project.techStack.join(' · ')}
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Source Code</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
                  >
                    <span>Live Preview</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
