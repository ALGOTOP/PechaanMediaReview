import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowRight, ArrowUpRight, ChevronRight, ChevronLeft } from "lucide-react";

interface ReelProject {
  num: string;
  title: string;
  category: string;
  tools: string;
  description: string;
  thumbnail: string;
  featured: string;
  video: string;
  year: string;
}

const projects: ReelProject[] = [
  {
    num: "01",
    title: "KENETIK - 3D Motion Ad + Brand Identity",
    category: "Film & Motion",
    tools: "Blender · After Effects · Premiere Pro · DaVinci",
    description: "3D motion identity and full brand campaign for an energy drink built around kinetic force",
    thumbnail: "/thumbnails/kenetik_thumb.png",
    featured: "/thumbnails/kenetik_hero.png",
    video: "https://ia803108.us.archive.org/17/items/ketone.-drink.-2025.final-6/Ketone.Drink.2025.final%286%29.mp4",
    year: "2025",
  },
  {
    num: "02",
    title: "TRULY - 4D Graphic Post + Ad",
    category: "Film & Production",
    tools: "Cinema 4D · Redshift · After Effects",
    description: "4D graphic post-production and high-impact advertising campaign for a lifestyle brand",
    thumbnail: "/thumbnails/truly_thumb.png",
    featured: "/thumbnails/truly_hero.png",
    video: "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/110c2cbf42fc32faec789114fdda0196.mp4",
    year: "2025",
  },
  {
    num: "03",
    title: "Denver Fragrances - Videography",
    category: "Film & Production",
    tools: "Sony FX3 · DaVinci Resolve · Lightroom",
    description: "Cinematic fragrance campaign shot on location, colour-graded to a signature editorial tone",
    thumbnail: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&q=80",
    featured: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=1600&q=90",
    video: "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/Denver%20Fragrance%20Videography%20adverts%20Final.Cut%289%29~2.mp4",
    year: "2025",
  },
  {
    num: "04",
    title: "Kinstu By BRIZO - Motion Ad + Major Rebranding",
    category: "Brand Identity",
    tools: "Canon R5 · After Effects · Adobe Premiere Pro · Cinema 4D",
    description: "Full motion campaign and major visual rebranding for the Kintsu Kitchen Collection by Brizo",
    thumbnail: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=800&q=80",
    featured: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=1600&q=90",
    video: "https://ia600504.us.archive.org/32/items/from-klick-pin-cf-kintsur-kitchen-collection-by-brizo-video-in-2025-kitchen-coll/From%20KlickPin%20CF%20Kintsu%C2%AE%20Kitchen%20Collection%20by%20Brizo%20%5BVideo%5D%20in%202025%20_%20Kitchen%20collection%20Motion%20design%20Motion%20design%20video.mp4",
    year: "2025",
  },
  {
    num: "05",
    title: "CellCosmet - Creative Direction",
    category: "Brand Identity",
    tools: "Illustrator · After Effects · Premiere Pro · Maxon Cinema 4D",
    description: "Creative direction and motion design for a luxury Swiss skincare brand",
    thumbnail: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",
    featured: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&q=90",
    video: "https://ia601506.us.archive.org/2/items/110c-2cbf-42fc-32faec-789114fdda-0196/From%20KlickPin%20CF%20Motion%20inspiration%20-%20cellCosmet%20%5BVideo%5D%20en%202025%20_%20Anuncios%20creativos%20Disenos%20de%20unas%20Fondos%20para%20fotografia.mp4",
    year: "2025",
  },
  {
    num: "06",
    title: "URÉE - 3D Motion Ad",
    category: "Film & Motion",
    tools: "Blender · After Effects · Premiere Pro",
    description: "Luxury 3D motion ad for a high-end serum and oils brand, shot in a single cinematic sequence",
    thumbnail: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    featured: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=90",
    video: "https://ia600501.us.archive.org/26/items/ure-e-serums-oils-luxury-graphic-design-motion-graphics-design-cut-8-finalized/UR%C3%88E%20Serums%20%26%20Oils%20Luxury%20graphic%20design%20Motion%20graphics%20design%20Cut%288%29%20Finalized.mp4",
    year: "2025",
  },
];

function useMousePosition(ref: React.RefObject<HTMLElement | null>) {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setPos({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
    };
    el.addEventListener("mousemove", update);
    return () => el.removeEventListener("mousemove", update);
  }, []);
  return pos;
}

export default function Showreel() {
  const [active, setActive] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition(heroRef as React.RefObject<HTMLElement>);
  const touchStartX = useRef<number | null>(null);

  const goNext = () => setActive((p) => (p + 1) % projects.length);
  const goPrev = () => setActive((p) => (p - 1 + projects.length) % projects.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      delta < 0 ? goNext() : goPrev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="relative bg-[#080808] text-white overflow-hidden"
      data-testid="section-showreel"
    >
      {/* ── TOP HEADER BAR ── */}
      <div className="max-w-[1680px] mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between py-6 border-b border-white/10">
          <span className="text-[10px] tracking-[0.25em] font-mono text-white/35 uppercase">
            Pehchaan Media
          </span>
          <span className="text-[10px] tracking-[0.25em] font-mono text-white/35 uppercase">
            Selected Work — 2024 / 2025
          </span>
        </div>
      </div>

      {/* ── SECTION TITLE ── */}
      <div className="max-w-[1680px] mx-auto px-6 md:px-10 pt-10 pb-6 flex items-end justify-between">
        <h2
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tighter"
          data-testid="text-showreel-title"
        >
          The Reel
        </h2>
        <div className="hidden md:flex items-center gap-2 text-white/40 text-sm pb-2">
          <span className="font-mono text-xs tracking-widest">
            {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* ── HERO FRAME ── */}
      <div className="max-w-[1680px] mx-auto px-6 md:px-10">
        <div
          ref={heroRef}
          className="relative w-full overflow-hidden rounded-lg cursor-pointer"
          style={{ aspectRatio: "16/7" }}
          onClick={() => setModalOpen(true)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          data-testid="button-play-showreel"
        >
          {/* Featured image with parallax */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${projects[active].featured})`,
                  transform: `scale(1.06) translate(${(mouse.x - 0.5) * -2}%, ${(mouse.y - 0.5) * -2}%)`,
                  transition: "transform 1.8s ease-out",
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/10 pointer-events-none" />

          {/* Tab dots — top left */}
          <div className="absolute top-6 left-6 flex gap-2 z-10">
            {projects.map((_, i) => (
              <button
                key={i}
                className={`h-0.5 rounded-full transition-all duration-500 ${
                  i === active ? "bg-white w-8" : "bg-white/25 w-4 hover:bg-white/50"
                }`}
                onClick={(e) => { e.stopPropagation(); setActive(i); }}
                data-testid={`button-tab-${i}`}
              />
            ))}
          </div>

          {/* Play button — center */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="relative flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <motion.div
                className="absolute w-20 h-20 rounded-full border border-white/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                style={{
                  backgroundImage:
                    "conic-gradient(from 0deg, transparent 70%, rgba(255,255,255,0.5) 100%)",
                }}
              />
              <div className="w-16 h-16 rounded-full border border-white/30 backdrop-blur-sm bg-white/5 flex items-center justify-center">
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              </div>
            </div>
          </div>

          {/* Prev / Next arrows — right side, inside container */}
          <div className="absolute right-5 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 bg-[#141414]/80 backdrop-blur-sm text-white/40 hover:text-white/80 hover:border-white/25 hover:bg-[#1e1e1e]/90 transition-all duration-200"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              data-testid="button-prev-project"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 bg-[#141414]/80 backdrop-blur-sm text-white/40 hover:text-white/80 hover:border-white/25 hover:bg-[#1e1e1e]/90 transition-all duration-200"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              data-testid="button-next-project"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Project info — bottom */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10 flex items-end justify-between pointer-events-none"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div>
                <p className="text-[10px] font-mono tracking-[0.2em] text-white/50 uppercase mb-2">
                  {projects[active].category} · {projects[active].year}
                </p>
                <h3 className="text-2xl md:text-4xl font-bold tracking-tight">
                  {projects[active].title}
                </h3>
                <p className="text-white/60 text-sm mt-1 hidden md:block max-w-md">
                  {projects[active].description}
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-white/50 text-xs font-mono">
                <span className="opacity-60">Play Reel</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── PROJECT INDEX ── */}
      <div className="max-w-[1680px] mx-auto px-6 md:px-10 mt-2">
        <div className="border-t border-white/10">
          {projects.map((project, i) => (
            <ProjectRow
              key={i}
              project={project}
              index={i}
              isActive={active === i}
              isExpanded={expanded === i}
              onEnter={() => setActive(i)}
              onToggle={() => setExpanded(expanded === i ? null : i)}
            />
          ))}
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="max-w-[1680px] mx-auto px-6 md:px-10">
        <div className="border-t border-white/10 py-8 flex items-center justify-between">
          <div className="flex items-center gap-8 text-white/30 text-[11px] font-mono tracking-widest uppercase">
            <span>120+ Projects</span>
            <span className="hidden md:inline text-white/10">·</span>
            <span className="hidden md:inline">2 Years</span>
            <span className="hidden md:inline text-white/10">·</span>
            <span className="hidden md:inline">80+ Clients</span>
          </div>
          <a
            href="#work"
            className="group flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors duration-300"
            data-testid="link-view-all-work"
          >
            View All Work
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* ── FULLSCREEN MODAL ── */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setModalOpen(false)}
            data-testid="modal-showreel"
          >
            <motion.div
              className="relative w-full max-w-6xl mx-6"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative w-full bg-[#111] rounded-lg overflow-hidden"
                style={{ aspectRatio: "16/9" }}
              >
                <video
                  key={projects[active].video}
                  src={projects[active].video}
                  controls
                  autoPlay
                  className="w-full h-full object-contain bg-black"
                  data-testid="video-player"
                />
              </div>
              <button
                className="absolute -top-10 right-0 text-white/40 hover:text-white text-xs font-mono tracking-widest uppercase transition-colors"
                onClick={() => setModalOpen(false)}
                data-testid="button-close-modal"
              >
                Close ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectRow({
  project,
  index,
  isActive,
  isExpanded,
  onEnter,
  onToggle,
}: {
  project: ReelProject;
  index: number;
  isActive: boolean;
  isExpanded: boolean;
  onEnter: () => void;
  onToggle: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative border-b border-white/[0.07] cursor-pointer overflow-hidden"
      onMouseEnter={() => { setHovered(true); onEnter(); }}
      onMouseLeave={() => setHovered(false)}
      onClick={onToggle}
      data-testid={`row-project-${index}`}
    >
      {/* Thumbnail slide-in from right on hover (desktop only) */}
      <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[38%] pointer-events-none overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ x: hovered ? "0%" : "100%" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${project.thumbnail})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/50 to-transparent" />
        </motion.div>
      </div>

      {/* Row content */}
      <div className="relative z-10 flex items-center gap-4 md:gap-8 py-5 md:py-6">
        {/* Number */}
        <span
          className="text-4xl md:text-6xl font-bold tabular-nums leading-none shrink-0 transition-all duration-500"
          style={{
            color: isActive || hovered ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.06)",
          }}
        >
          {project.num}
        </span>

        {/* Title + tools */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight leading-tight">
            {project.title}
          </h3>
          <p className="text-white/30 text-[11px] font-mono tracking-wider mt-1 hidden md:block">
            {project.tools}
          </p>
        </div>

        {/* Category + year — hidden when thumbnail would cover */}
        <div className="hidden md:flex items-center gap-6 shrink-0">
          <span className="text-[10px] font-mono tracking-[0.18em] text-white/35 uppercase border border-white/10 px-3 py-1.5 rounded-full">
            {project.category}
          </span>
          <span className="text-[10px] font-mono text-white/25">{project.year}</span>
        </div>

        {/* Arrow */}
        <div
          className="shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 mr-2 md:mr-4"
          style={{
            borderColor: isActive ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)",
            backgroundColor: isActive ? "rgba(255,255,255,0.05)" : "transparent",
          }}
        >
          <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.3 }}>
            <ArrowRight className="w-3.5 h-3.5 text-white/40" />
          </motion.div>
        </div>
      </div>

      {/* Expanded image strip */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="relative overflow-hidden rounded-md mb-5"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 200, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <img
              src={project.featured}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="text-white/70 text-sm max-w-lg">{project.description}</p>
              <p className="text-[10px] font-mono tracking-widest text-white/40 uppercase mt-1">
                {project.category} · {project.year}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
