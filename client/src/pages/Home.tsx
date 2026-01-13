import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useReels } from "@/hooks/use-reels";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { ArrowRight, Play, CheckCircle2, Scissors, Zap, MonitorPlay, Video, Focus, Lightbulb, Volume2, VolumeX, Instagram, ExternalLink } from "lucide-react";
import { useRef, useState, useEffect, useMemo } from "react";
import swikarImg from "@assets/WhatsApp_Image_2025-12-21_at_7.39.16_AM-modified_1768180277526.jpeg";
import capcutLogo from "@assets/download-fotor-bg-remover-2026011272327_1768181984520.png";
import davinciLogo from "@assets/download_(1)-fotor-bg-remover-2026011272349_1768181965393.png";
import timelineBg from "@assets/Video-Editing_1768186420410.jpeg";

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = `rgba(212, 175, 55, ${Math.random() * 0.3 + 0.1})`;
      }

      update(w: number, h: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse interaction
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (150 - distance) / 150;
          this.x -= forceDirectionX * force * 2;
          this.y -= forceDirectionY * force * 2;
        }

        if (this.x > w) this.x = 0;
        else if (this.x < 0) this.x = w;
        if (this.y > h) this.y = 0;
        else if (this.y < 0) this.y = h;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const w = canvas.width;
      const h = canvas.height;
      const numberOfParticles = (w * h) / 15000;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(w, h));
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      particles.forEach((particle) => {
        particle.update(w, h);
        particle.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-40"
    />
  );
}

export default function Home() {
  const { data: reels, isLoading } = useReels();
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />

      {/* --- HERO SECTION --- */}
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen min-h-[600px] flex items-center pt-20 md:pt-0 overflow-hidden bg-transparent">
        {/* Cinematic Background Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: `url(${timelineBg})` }}
          />
          {/* Deep Navy to Transparent Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0E14] via-[#0B0E14]/80 md:via-[#0B0E14]/60 to-transparent opacity-90 md:opacity-100" />
          <ParticleBackground />
        </div>

        <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/10 rounded-full blur-[80px] md:blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-blue-500/5 rounded-full blur-[70px] md:blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-4 lg:gap-8 items-center h-full relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left flex flex-col justify-center"
          >
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
              <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-medium text-primary backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Available for Freelance
              </div>
              <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-[10px] md:text-xs font-bold text-indigo-400 backdrop-blur-sm">
                Short-Form Editor
              </div>
              <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-primary/20 border border-primary/30 text-[10px] md:text-xs font-bold text-primary backdrop-blur-sm">
                Creative Director
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-4 text-white drop-shadow-2xl">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Swikar</span>.
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-[#F5F5F7] mb-6 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light drop-shadow-md [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
              I help creators and brands turn raw footage into engaging visual stories that stop the scroll.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                onClick={() => document.getElementById('showreel')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-6 py-3 bg-primary text-black rounded-full font-bold text-base hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-primary/20"
              >
                View My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-6 py-3 bg-transparent border border-primary text-primary rounded-full font-bold text-base hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Let's Talk
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-first lg:order-last group/viewfinder max-w-[280px] sm:max-w-xs mx-auto lg:max-w-md w-full"
          >
            {/* Viewfinder Corners */}
            <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-primary z-20 transition-all group-hover/viewfinder:scale-110" />
            <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-primary z-20 transition-all group-hover/viewfinder:scale-110" />
            <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-primary z-20 transition-all group-hover/viewfinder:scale-110" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-primary z-20 transition-all group-hover/viewfinder:scale-110" />

            {/* REC Icon */}
            <div className="absolute top-3 right-3 z-30 flex items-center gap-2 bg-black/40 px-2 py-1 rounded-md backdrop-blur-sm">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
              <span className="text-[10px] font-bold text-white tracking-widest uppercase">● REC</span>
            </div>

            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60" />

              <img
                src={swikarImg}
                alt="Swikar - Video Editor"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 transform hover:scale-105"
              />

              <div className="absolute bottom-4 left-4 z-20 bg-white/5 backdrop-blur-xl p-3 rounded-xl border border-white/10 shadow-2xl origin-bottom-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-black">
                    <Scissors className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white max-w-[200px] leading-snug">
                      Mastering modern pacing and social media aesthetics
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- REELS SHOWCASE --- */}
      <section id="reels" className="py-24 md:py-32 bg-background relative" ref={targetRef}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-display mb-4">Featured Showreel</h2>
              <p className="text-muted-foreground max-w-lg">
                Engaging vertical content optimized for TikTok, Instagram Reels, and YouTube Shorts I created.
              </p>
            </div>

            <button className="text-white border-b border-primary pb-1 hover:text-primary transition-colors flex items-center gap-2">
              View All Projects <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="aspect-[9/16] rounded-2xl bg-white/5 animate-pulse" />
              ))
            ) : reels && reels.length > 0 ? (
              reels.map((reel) => (
                <ReelCard key={reel.id} reel={reel} />
              ))
            ) : (
              [1, 2, 3].map((item) => (
                <div key={item} className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 cursor-pointer">
                  <img
                    src={`https://images.unsplash.com/photo-${item === 1 ? '1611162617474-5b21e879e113' : item === 2 ? '1611162616475-46b635cb6868' : '1536240478700-b869070f9279'}?w=600&q=80&fit=crop`}
                    alt="Reel thumbnail"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 text-white group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <Play className="w-5 h-5 fill-current" />
                    </div>
                    <h3 className="text-xl font-bold mb-1">High Energy Edits</h3>
                    <p className="text-sm text-white/60">Music Video • VFX</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* --- TOOLS OF THE TRADE --- */}
      <section className="py-24 bg-zinc-950 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display mb-6">Tools of the Trade</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              I leverage the best tools in the industry to create seamless, high-quality content.
            </p>
          </div>

          <div className="flex flex-col items-center gap-12 md:gap-20">
            {/* Main Tools Row */}
            <div className="flex flex-row justify-center gap-12 md:gap-32">
              <OrbitIcon
                name="CapCut"
                glowColor="rgba(59, 130, 246, 0.5)"
                delay={0}
              />
              <OrbitIcon
                name="DaVinci"
                glowColor="rgba(16, 185, 129, 0.5)"
                delay={2}
              />
            </div>

            {/* AI Toolkit Row */}
            <div className="flex flex-col items-center">
              <p className="text-xs uppercase tracking-[0.3em] font-bold text-white/30 mb-8">AI Toolkit</p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                {[
                  { name: "Runway", icon: "/tools/runway.png" },
                  { name: "ElevenLabs", icon: "/tools/elevenlabs.png" },
                  { name: "Topaz AI", icon: "/tools/topaz.jpg" }
                ].map((tool, i) => (
                  <motion.div
                    key={tool.name}
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut"
                    }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden p-4 group-hover:border-primary/50 transition-colors">
                      <img
                        src={tool.icon}
                        alt={tool.name}
                        className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = `<span class="text-xs font-bold text-white/60">${tool.name[0]}</span>`;
                        }}
                      />
                    </div>
                    <span className="text-xs uppercase tracking-widest text-white/40">{tool.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CREATIVE DIRECTION SECTION --- */}
      <section className="py-24 md:py-32 bg-background border-t border-primary/10">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-display mb-4">Production & Direction</h2>
            <p className="text-muted-foreground max-w-2xl text-lg italic">
              "I don't just edit; I help you craft the vision from the first frame."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <Video className="w-6 h-6 text-primary" />,
                title: "Videography & Lighting",
                desc: "High-quality raw footage capture with a focus on cinematic lighting and visual storytelling."
              },
              {
                icon: <Focus className="w-6 h-6 text-primary" />,
                title: "Shot Composition",
                desc: "Setting up the frame to ensure every shot looks premium before the edit starts."
              },
              {
                icon: <Lightbulb className="w-6 h-6 text-primary" />,
                title: "On-Set Direction",
                desc: "Directing shoots and guiding creators to get the best on-camera performance."
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 md:p-8 rounded-3xl bg-card border-transparent border hover:border-primary transition-all duration-500 shadow-xl shadow-black/20"
              >
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-foreground leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROCESS SECTION --- */}
      <section id="process" className="py-24 border-y border-white/5 bg-zinc-900/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block">My Workflow</span>
            <h2 className="text-4xl font-display">How I Work</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {[
              {
                icon: <MonitorPlay className="w-6 h-6" />,
                title: "01. Strategy & Setup",
                desc: "We discuss your vision, target audience, and style. I organize footage and prepare the narrative structure."
              },
              {
                icon: <Scissors className="w-6 h-6" />,
                title: "02. The Edit",
                desc: "I craft the story, add dynamic cuts, motion graphics, sound design, and color grading to bring it to life."
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "03. Refine & Deliver",
                desc: "We review the cut together. I apply final polish and deliver high-quality files ready for upload."
              }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <div className="bg-black border border-white/10 p-8 rounded-2xl hover:border-primary/50 transition-colors duration-300 h-full group">
                  <div className="w-12 h-12 bg-zinc-900 rounded-full border border-white/10 flex items-center justify-center mb-6 text-white group-hover:text-primary group-hover:border-primary/50 transition-all">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">Let's Create Magic</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Ready to elevate your content? I'm currently accepting new freelance projects.
            </p>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=swikarcheetri21@gmail.com&su=Project%20Inquiry&body=Hi%20Swikar,%20I'd%20love%20to%20discuss%20a%20video%20project..."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-5 bg-white text-black text-xl font-bold rounded-full hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] transform hover:-translate-y-1"
            >
              swikarcheetri21@gmail.com
            </a>

            <p className="mt-8 text-sm text-white/40 uppercase tracking-widest font-medium">
              Response time: Within 24 Hours
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function OrbitIcon({ name, glowColor, delay }: { name: string, glowColor: string, delay: number }) {
  const logo = name === "CapCut" ? capcutLogo : davinciLogo;
  return (
    <motion.div
      animate={{
        y: [0, -15, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
      className="flex flex-col items-center gap-4 group"
    >
      <div
        className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center relative transition-all duration-500 group-hover:border-primary/50 overflow-hidden p-6 shadow-2xl"
        style={{
          boxShadow: `0 0 40px -10px ${glowColor}`
        }}
      >
        <img
          src={logo}
          alt={name}
          className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110"
        />
      </div>
      <span className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground group-hover:text-primary transition-colors">
        {name === "CapCut" ? "CapCut" : "DaVinci Resolve"}
      </span>
    </motion.div>
  );
}

function ReelCard({ reel }: { reel: any }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTogglePlay = (e: React.MouseEvent) => {
    // Only toggle play if clicking main card, not specific controls
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play().catch(console.error);
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click (play/pause)
    if (!videoRef.current) return;

    // Toggle mute state
    const newMutedState = !videoRef.current.muted;
    videoRef.current.muted = newMutedState;
    setIsMuted(newMutedState);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 cursor-pointer shadow-lg"
      onClick={handleTogglePlay}
    >
      <video
        ref={videoRef}
        src={reel.videoUrl}
        // poster removed as per request to show video first frame
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />

      <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent transition-opacity duration-300 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-60 group-hover:opacity-80'}`} />

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300">
          <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/30 group-hover:scale-110 transition-transform duration-300">
            <Play className="w-6 h-6 fill-primary text-primary ml-1" />
          </div>
        </div>
      )}

      {/* Mute Button */}
      <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={handleToggleMute}
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 text-white hover:bg-primary hover:border-primary transition-all"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      <div className={`absolute bottom-0 left-0 right-0 p-6 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent ${isPlaying ? 'translate-y-full group-hover:translate-y-0' : 'translate-y-4 group-hover:translate-y-0'}`}>
        <h3 className="text-xl font-bold mb-1 text-white">{reel.title}</h3>
        <p className="text-sm text-white/70 line-clamp-2">{reel.description}</p>
      </div>
    </motion.div>
  );
}
