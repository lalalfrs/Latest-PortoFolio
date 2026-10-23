/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Disc3,
  Moon,
  Search,
  Send,
  SlidersHorizontal,
  Sun,
} from 'lucide-react';
import {
  PORTFOLIO_METRICS,
  PROJECTS,
  ProjectCategory,
  ProjectItem,
  SKILL_GROUPS,
  TIMELINE_ITEMS,
  VIBE_NOTES,
} from './data/portfolioData';
import { StudioArtwork } from './components/StudioArtwork';
import { ProjectDetailModal } from './components/ProjectDetailModal';

type StudioPage = 'overview' | 'projects' | 'experience' | 'vibe' | 'contact';

const NAV_ITEMS: { id: StudioPage; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'vibe', label: 'Current Vibe' },
  { id: 'contact', label: 'Contact' },
];

const PROJECT_CATEGORIES: ProjectCategory[] = [
  'All',
  'Frontend UI',
  'Full-Stack',
  'Interactive Web',
];

const EASE_CURVE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('mono_studio_theme');
      if (saved === 'dark' || saved === 'light') {
        return saved === 'dark';
      }
    }
    return true; // Default to high-contrast monochrome dark gallery, toggleable anytime
  });

  const [activePage, setActivePage] = useState<StudioPage>('overview');
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [timelineFilter, setTimelineFilter] = useState<'All' | 'Experience' | 'Education'>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    scope: 'Frontend Development',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle');
  const [formError, setFormError] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      window.localStorage.setItem('mono_studio_theme', 'dark');
    } else {
      root.classList.remove('dark');
      window.localStorage.setItem('mono_studio_theme', 'light');
    }
  }, [darkMode]);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesCategory =
        activeCategory === 'All' || project.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.summary.toLowerCase().includes(query) ||
        project.techStack.some((t) => t.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const filteredTimeline = useMemo(() => {
    if (timelineFilter === 'All') return TIMELINE_ITEMS;
    return TIMELINE_ITEMS.filter((item) => item.type === timelineFilter);
  }, [timelineFilter]);

  const handleNavigate = (page: StudioPage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectNeighborProject = (direction: 'prev' | 'next') => {
    if (!selectedProject) return;
    const currentIndex = PROJECTS.findIndex((p) => p.id === selectedProject.id);
    if (currentIndex === -1) return;
    const nextIndex =
      direction === 'next'
        ? (currentIndex + 1) % PROJECTS.length
        : (currentIndex - 1 + PROJECTS.length) % PROJECTS.length;
    setSelectedProject(PROJECTS[nextIndex]);
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('hilal.alfaris@studio-mono.dev');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      setFormError('Please complete your name, email address, and project message.');
      return;
    }
    setFormError('');
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('submitted');
    }, 350);
  };

  const showSection = (section: Exclude<StudioPage, 'overview'>) =>
    activePage === 'overview' || activePage === section;

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#050505] text-zinc-950 dark:text-zinc-50 transition-colors duration-200 selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-950">
      {/* Strict 3-Zone Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#FAFAFA]/85 dark:bg-[#050505]/85 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800/90">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 sm:px-8 py-4">
          {/* Zone 1: Single Text Element Brand Wordmark */}
          <a
            href="#overview"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate('overview');
            }}
            className="font-display text-lg font-bold tracking-tight text-zinc-950 dark:text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-500"
          >
            Hilal Alfaris
          </a>

          {/* Zone 2: 5 Concise Single-Line Navigation Links */}
          <nav
            aria-label="Primary Studio Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600 dark:text-zinc-400"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(item.id);
                  }}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-zinc-950 dark:text-white'
                      : 'hover:text-zinc-950 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-underline"
                      transition={{ duration: 0.2, ease: EASE_CURVE }}
                      className="absolute inset-x-0 -bottom-1 h-0.5 bg-zinc-950 dark:bg-white"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action (Dark / Light Theme Toggle) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:opacity-90 transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              {darkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Secondary View Switcher (Scrollable Single-Line Bar for Small Screens) */}
      <div className="md:hidden border-b border-zinc-200 dark:border-zinc-900 bg-[#FAFAFA] dark:bg-[#050505] px-6 py-2.5 overflow-x-auto">
        <div className="flex items-center gap-5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={`py-1 whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'text-zinc-950 dark:text-white font-semibold underline underline-offset-4'
                    : 'hover:text-zinc-950 dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Fluid Page Transition Container */}
      <AnimatePresence mode="wait">
        <motion.main
          key={activePage}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: EASE_CURVE }}
          className="max-w-7xl mx-auto px-6 sm:px-8"
        >
          {/* Focused Page Sub-Header when viewing an isolated page */}
          {activePage !== 'overview' && (
            <div className="pt-8 pb-2 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 tabular-nums">
                <span>STUDIO VIEW</span>
                <span aria-hidden="true">/</span>
                <span className="text-zinc-900 dark:text-zinc-200 uppercase">
                  {activePage}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleNavigate('overview')}
                className="text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Return to Full Studio Overview
              </button>
            </div>
          )}

          {/* 1. HERO SECTION (Shown on Overview) */}
          {activePage === 'overview' && (
            <section id="overview" className="py-12 sm:py-16 lg:py-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
                {/* Left Column: Typographic Hierarchy */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE_CURVE }}
                  className="lg:col-span-7 flex flex-col justify-between space-y-8"
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 tabular-nums">
                      <span>01</span>
                      <span aria-hidden="true">·</span>
                      <span>Junior Web Developer</span>
                      <span aria-hidden="true">·</span>
                      <span>Jakarta, Indonesia</span>
                    </div>

                    <h1
                      className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.08] text-zinc-950 dark:text-white"
                      style={{ textWrap: 'balance' }}
                    >
                      Crafting minimalist web architecture with fluid motion.
                    </h1>

                    <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                      I am <strong className="font-medium text-zinc-900 dark:text-zinc-100">Hilal Alfaris</strong>, a Junior Web Developer specializing in React, TypeScript, and tactile UI engineering. I build accessible, high-contrast digital interfaces where clean code meets editorial precision.
                    </p>
                  </div>

                  {/* Primary Action & View Controls */}
                  <div className="pt-2 space-y-6">
                    <div className="flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleNavigate('projects')}
                        className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-medium rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>Explore Selected Works</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleNavigate('vibe')}
                        className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-lg border border-zinc-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <Disc3 className="w-4 h-4" />
                        <span>Listen to Current Vibe</span>
                      </button>
                    </div>

                    <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      <span>Core Stack:</span>
                      <span className="text-zinc-800 dark:text-zinc-300">
                        React 19 · TypeScript · Tailwind CSS · Framer Motion · Node.js
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Right Column: Large Visual Studio Container at Matching Height */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.08, ease: EASE_CURVE }}
                  className="lg:col-span-5 flex"
                >
                  <div
                    onClick={() => handleNavigate('projects')}
                    className="group relative w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 cursor-pointer"
                  >
                    <StudioArtwork
                      variant="hero-studio"
                      className="w-full h-full min-h-[380px] lg:h-full transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Full-Width 4-Column Metrics Row Below Hero Split */}
              <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {PORTFOLIO_METRICS.map((metric, idx) => (
                  <motion.div
                    key={metric.unit}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: idx * 0.05, ease: EASE_CURVE }}
                    className="space-y-1"
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white tabular-nums">
                        {metric.value}
                      </span>
                      <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                        {metric.unit}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {metric.context}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Subtle Editorial Marquee Divider on Overview */}
          {activePage === 'overview' && (
            <div
              aria-hidden="true"
              className="py-4 border-y border-zinc-200 dark:border-zinc-900 overflow-hidden select-none"
            >
              <div className="animate-marquee flex items-center gap-8 text-xs font-mono text-zinc-400 dark:text-zinc-500">
                {Array.from({ length: 2 }).map((_, groupIndex) => (
                  <div key={groupIndex} className="flex items-center gap-8 shrink-0">
                    <span>selected works</span>
                    <span>·</span>
                    <span>minimalist studio gallery</span>
                    <span>·</span>
                    <span>react &amp; typescript architecture</span>
                    <span>·</span>
                    <span>fluid framer motion transitions</span>
                    <span>·</span>
                    <span>wcag accessible interfaces</span>
                    <span>·</span>
                    <span>monochrome edition 2026</span>
                    <span>·</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. SELECTED PROJECTS SECTION (Bento Studio Gallery) */}
          {showSection('projects') && (
            <section id="projects" className="py-16 sm:py-20 space-y-10">
              {/* Section Header & Minimalist Filter Bar */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 tabular-nums">
                    <span>02</span>
                    <span aria-hidden="true">·</span>
                    <span>Selected Works</span>
                    <span aria-hidden="true">·</span>
                    <span>{filteredProjects.length} Curated Builds</span>
                  </div>
                  <h2
                    className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white"
                    style={{ textWrap: 'balance' }}
                  >
                    Architectural Web Projects
                  </h2>
                </div>

                {/* Minimalist Filter Tabs + Search Input */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  {/* Segmented Category Filter Control */}
                  <div
                    role="tablist"
                    aria-label="Filter projects by category"
                    className="flex items-center gap-1 p-1 bg-zinc-200/70 dark:bg-zinc-900 rounded-lg overflow-x-auto"
                  >
                    {PROJECT_CATEGORIES.map((category) => {
                      const active = activeCategory === category;
                      return (
                        <button
                          key={category}
                          role="tab"
                          aria-selected={active}
                          type="button"
                          onClick={() => setActiveCategory(category)}
                          className={`relative px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            active
                              ? 'text-zinc-950 dark:text-white'
                              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                          }`}
                        >
                          {active && (
                            <motion.span
                              layoutId="project-filter-pill"
                              transition={{ duration: 0.18, ease: EASE_CURVE }}
                              className="absolute inset-0 rounded-md bg-white dark:bg-zinc-800 shadow-xs"
                            />
                          )}
                          <span className="relative z-10">{category}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Minimalist Search Input */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filter by stack or title..."
                      aria-label="Filter projects by stack or title"
                      className="w-full sm:w-48 pl-8 pr-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Empty Filter State */}
              {filteredProjects.length === 0 ? (
                <div className="py-16 text-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/40 dark:bg-zinc-900/30 space-y-3">
                  <p className="font-display text-base font-medium text-zinc-800 dark:text-zinc-200">
                    No projects match the current filter criteria.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory('All');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 text-xs font-medium rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Reset Project Filters
                  </button>
                </div>
              ) : (
                /* Dynamic Bento Studio Grid */
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                      <motion.article
                        layout
                        key={project.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.24, ease: EASE_CURVE }}
                        onClick={() => setSelectedProject(project)}
                        className={`group rounded-2xl border border-zinc-200 dark:border-zinc-800/90 bg-white dark:bg-[#0B0B0D] overflow-hidden cursor-pointer flex flex-col justify-between transition-colors hover:border-zinc-400 dark:hover:border-zinc-600 ${
                          project.featuredSpan && activeCategory === 'All' && !searchQuery
                            ? 'md:col-span-2'
                            : 'md:col-span-1'
                        }`}
                      >
                        {/* Large Studio Artwork Framing */}
                        <div className="overflow-hidden border-b border-zinc-200 dark:border-zinc-800/80">
                          <StudioArtwork
                            variant={project.artworkVariant}
                            className={`w-full transition-transform duration-300 ease-out group-hover:scale-[1.02] ${
                              project.featuredSpan && activeCategory === 'All' && !searchQuery
                                ? 'min-h-[280px] sm:min-h-[340px]'
                                : 'min-h-[240px]'
                            }`}
                          />
                        </div>

                        {/* Unboxed Metadata & Editorial Card Body */}
                        <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-6">
                          <div className="space-y-2.5">
                            {/* Clean Unboxed Metadata Row */}
                            <div className="flex items-center justify-between gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400 tabular-nums">
                              <div className="flex items-center gap-2">
                                <span>{project.index}</span>
                                <span aria-hidden="true">·</span>
                                <span>{project.category}</span>
                                <span aria-hidden="true">·</span>
                                <span>{project.year}</span>
                              </div>
                              <span className="inline-flex items-center gap-1 text-zinc-700 dark:text-zinc-300 group-hover:translate-x-0.5 transition-transform">
                                <span>Inspect Case Study</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </span>
                            </div>

                            <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
                              {project.title}
                            </h3>

                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
                              {project.summary}
                            </p>
                          </div>

                          {/* Bottom Tech Stack & Primary Metric */}
                          <div className="pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                            <span className="text-zinc-500 dark:text-zinc-400">
                              {project.techStack.join(' · ')}
                            </span>
                            <span className="text-zinc-900 dark:text-zinc-200 tabular-nums">
                              {project.metrics[0].label}: {project.metrics[0].value}
                            </span>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </section>
          )}

          {/* 3. MY CURRENT VIBE SECTION (Spotify Album Embed) */}
          {showSection('vibe') && (
            <section
              id="vibe"
              className="py-16 sm:py-20 border-t border-zinc-200 dark:border-zinc-800"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                {/* Left Column: Curated Listening Context & Track Notes */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, ease: EASE_CURVE }}
                  className="lg:col-span-5 space-y-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 tabular-nums">
                      <span>03</span>
                      <span aria-hidden="true">·</span>
                      <span>My Current Vibe</span>
                      <span aria-hidden="true">·</span>
                      <span>On Repeat in the Studio</span>
                    </div>
                    <h2
                      className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white"
                      style={{ textWrap: 'balance' }}
                    >
                      Soundtrack to Clean Code
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Every fluid transition and layout rhythm in my work is shaped by the music playing in my headphones. Stream my current favorite album directly inside the studio below.
                    </p>
                  </div>

                  {/* Studio Listening Notes */}
                  <div className="space-y-4 pt-2">
                    {VIBE_NOTES.map((item) => (
                      <div
                        key={item.index}
                        className="pb-4 border-b border-zinc-200 dark:border-zinc-800/80 last:border-b-0"
                      >
                        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 tabular-nums">
                          <span>{item.index}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-zinc-900 dark:text-zinc-200 font-medium">
                            {item.context}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                          {item.note}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Right Column: User's Exact Embedded Spotify Player in Monochrome Studio Frame */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.06, ease: EASE_CURVE }}
                  className="lg:col-span-7"
                >
                  <div className="p-5 sm:p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0B0B0D] space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400 tabular-nums">
                      <span className="flex items-center gap-2">
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        <span>SPOTIFY STUDIO DECK · FAVORITE TRACKS</span>
                      </span>
                      <span>ALBUM ROTATION</span>
                    </div>

                    <iframe
                      data-testid="embed-iframe"
                      style={{ borderRadius: '12px' }}
                      src="https://open.spotify.com/embed/album/6SQaLfIqG305mqG6zY3FMM?utm_source=generator&si=786ea32ed0a04dec"
                      width="100%"
                      height="352"
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      title="My Current Vibe Spotify Album Player"
                    />

                    <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-mono pt-1">
                      <span>Interactive Playback Enabled</span>
                      <span>Select any track above to preview</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          )}

          {/* 4. EXPERIENCE, TIMELINE & SKILLS SECTION */}
          {showSection('experience') && (
            <section
              id="experience"
              className="py-16 sm:py-20 border-t border-zinc-200 dark:border-zinc-800 space-y-14"
            >
              {/* Section Header & Timeline Filter */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 tabular-nums">
                    <span>04</span>
                    <span aria-hidden="true">·</span>
                    <span>Experience &amp; Education</span>
                  </div>
                  <h2
                    className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white"
                    style={{ textWrap: 'balance' }}
                  >
                    Engineering Trajectory
                  </h2>
                </div>

                {/* Segmented Filter for Timeline */}
                <div className="flex items-center gap-1 p-1 bg-zinc-200/70 dark:bg-zinc-900 rounded-lg self-start sm:self-end">
                  {(['All', 'Experience', 'Education'] as const).map((tab) => {
                    const active = timelineFilter === tab;
                    return (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setTimelineFilter(tab)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs'
                            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                        }`}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Chronological Milestones List */}
              <div className="divide-y divide-zinc-200 dark:divide-zinc-800/90">
                {filteredTimeline.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: idx * 0.05, ease: EASE_CURVE }}
                    className="py-8 first:pt-0 last:pb-0 grid grid-cols-1 lg:grid-cols-12 gap-6"
                  >
                    {/* Left Column: Period & Location */}
                    <div className="lg:col-span-4 space-y-1">
                      <div className="font-mono text-sm font-medium text-zinc-900 dark:text-zinc-100 tabular-nums">
                        {item.period}
                      </div>
                      <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                        {item.organization} · {item.location}
                      </div>
                      <div className="text-xs font-serif italic text-zinc-500 dark:text-zinc-400 pt-1">
                        {item.type}
                      </div>
                    </div>

                    {/* Right Column: Role, Description, Achievements & Unboxed Stack */}
                    <div className="lg:col-span-8 space-y-4">
                      <h3 className="font-display text-xl font-bold text-zinc-950 dark:text-white">
                        {item.role}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {item.description}
                      </p>
                      <ul className="space-y-2">
                        {item.achievements.map((ach, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300"
                          >
                            <span className="font-mono text-xs text-zinc-400 mt-0.5 tabular-nums">
                              0{i + 1}.
                            </span>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                        {item.technologies.join(' · ')}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Technical Disciplines 3-Column Matrix */}
              <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-6">
                {SKILL_GROUPS.map((group, idx) => (
                  <div
                    key={group.category}
                    className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/90 bg-white dark:bg-[#0B0B0D] space-y-4"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-400 tabular-nums">
                      <span>DISCIPLINE 0{idx + 1}</span>
                      <span>CORE</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-zinc-950 dark:text-white">
                      {group.category}
                    </h3>
                    <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {group.items.join(' · ')}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 5. INTERACTIVE CONTACT STUDIO & SOCIAL LINKS */}
          {showSection('contact') && (
            <section
              id="contact"
              className="py-16 sm:py-20 border-t border-zinc-200 dark:border-zinc-800"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Column: Direct Contact Details & Social Channels */}
                <div className="lg:col-span-5 space-y-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 tabular-nums">
                      <span>05</span>
                      <span aria-hidden="true">·</span>
                      <span>Initiate Collaboration</span>
                    </div>
                    <h2
                      className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white"
                      style={{ textWrap: 'balance' }}
                    >
                      Available for Junior Web Developer Roles &amp; Builds
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Whether you are hiring a dedicated Junior Frontend/Full-Stack Web Developer or looking to collaborate on a web application, my inbox is open.
                    </p>
                  </div>

                  {/* Direct Email Copy Box */}
                  <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0B0B0D] space-y-3">
                    <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      Direct Studio Electronic Mail
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                        hilal.alfaris@studio-mono.dev
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        {copiedEmail ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Email</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Social Links Directory */}
                  <div className="space-y-3">
                    <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                       Elsewhere on the Web
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'GitHub', handle: '@hilalalfaris', href: 'https://github.com' },
                        { label: 'LinkedIn', handle: '/in/hilalalfaris', href: 'https://linkedin.com' },
                        { label: 'Read.cv', handle: 'read.cv/hilalalfaris', href: 'https://read.cv' },
                        { label: 'X / Twitter', handle: '@hilalalfaris_dev', href: 'https://x.com' },
                      ].map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800/90 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors flex items-center justify-between"
                        >
                          <div>
                            <div className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                              {social.label}
                            </div>
                            <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mt-0.5">
                              {social.handle}
                            </div>
                          </div>
                          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Interactive Contact Form */}
                <div className="lg:col-span-7">
                  <div className="p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0B0B0D]">
                    {formStatus === 'submitted' ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="py-12 text-center space-y-4"
                      >
                        <div className="w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-700 mx-auto flex items-center justify-center">
                          <Check className="w-5 h-5 text-zinc-900 dark:text-white" />
                        </div>
                        <h3 className="font-display text-xl font-bold text-zinc-950 dark:text-white">
                          Inquiry Received
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
                          Thank you, <span className="font-medium text-zinc-900 dark:text-zinc-100">{contactForm.name}</span>. Your message regarding <span className="font-mono text-xs">{contactForm.scope}</span> has been logged. I will respond within 24 hours.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setContactForm({
                              name: '',
                              email: '',
                              scope: 'Frontend Development',
                              message: '',
                            });
                            setFormStatus('idle');
                          }}
                          className="px-4 py-2 text-xs font-medium rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          Send Another Message
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-5" noValidate>
                        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
                          <span className="font-display text-base font-semibold text-zinc-950 dark:text-white">
                            Direct Studio Dispatch
                          </span>
                          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                            Response &lt; 24h
                          </span>
                        </div>

                        {formError && (
                          <div
                            role="alert"
                            className="p-3 rounded-lg border border-zinc-400 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100"
                          >
                            {formError}
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label
                              htmlFor="contact-name"
                              className="block text-xs font-mono text-zinc-600 dark:text-zinc-400"
                            >
                              Your Name
                            </label>
                            <input
                              id="contact-name"
                              type="text"
                              required
                              value={contactForm.name}
                              onChange={(e) =>
                                setContactForm((prev) => ({ ...prev, name: e.target.value }))
                              }
                              placeholder="Alex Rivera"
                              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-[#FAFAFA] dark:bg-zinc-900/70 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label
                              htmlFor="contact-email"
                              className="block text-xs font-mono text-zinc-600 dark:text-zinc-400"
                            >
                              Email Address
                            </label>
                            <input
                              id="contact-email"
                              type="email"
                              required
                              value={contactForm.email}
                              onChange={(e) =>
                                setContactForm((prev) => ({ ...prev, email: e.target.value }))
                              }
                              placeholder="alex@company.com"
                              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-[#FAFAFA] dark:bg-zinc-900/70 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors"
                            />
                          </div>
                        </div>

                        {/* Interactive Scope Selector */}
                        <div className="space-y-1.5">
                          <span className="block text-xs font-mono text-zinc-600 dark:text-zinc-400">
                            Inquiry Focus
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {[
                              'Frontend Development',
                              'Full-Time Junior Role',
                              'UI/UX Engineering',
                              'Freelance Collaboration',
                            ].map((scopeOption) => {
                              const selected = contactForm.scope === scopeOption;
                              return (
                                <button
                                  key={scopeOption}
                                  type="button"
                                  onClick={() =>
                                    setContactForm((prev) => ({ ...prev, scope: scopeOption }))
                                  }
                                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                                    selected
                                      ? 'border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950'
                                      : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400'
                                  }`}
                                >
                                  {scopeOption}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label
                            htmlFor="contact-message"
                            className="block text-xs font-mono text-zinc-600 dark:text-zinc-400"
                          >
                            Project or Role Details
                          </label>
                          <textarea
                            id="contact-message"
                            rows={4}
                            required
                            value={contactForm.message}
                            onChange={(e) =>
                              setContactForm((prev) => ({ ...prev, message: e.target.value }))
                            }
                            placeholder="Tell me about your team, timeline, or web project..."
                            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-[#FAFAFA] dark:bg-zinc-900/70 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors resize-y"
                          />
                        </div>

                        <div className="pt-2 flex items-center justify-between gap-4">
                          <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                            All fields required
                          </span>
                          <button
                            type="submit"
                            disabled={formStatus === 'submitting'}
                            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-medium rounded-lg bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:opacity-90 transition-opacity disabled:opacity-50 whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <span>
                              {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                            </span>
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}
        </motion.main>
      </AnimatePresence>

      {/* Minimalist Studio Footer */}
      <footer className="mt-16 border-t border-zinc-200 dark:border-zinc-800/90 py-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2 font-mono tabular-nums">
            <span>© {new Date().getFullYear()} Hilal Alfaris</span>
            <span aria-hidden="true">·</span>
            <span>Junior Web Developer</span>
          </div>

          <div className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className="hover:text-zinc-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* Interactive Case Study Lightbox Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectNeighbor={handleSelectNeighborProject}
      />
    </div>
  );
}
