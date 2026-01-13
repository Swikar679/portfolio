import { Link } from "wouter";
import { Film, User, Mail, Grid, PlayCircle, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import navBg from "@assets/Video-Editing_1768186420410.jpeg";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: "showreel", label: "Showreel", icon: <PlayCircle className="w-4 h-4" /> },
    { id: "reels", label: "Work", icon: <Grid className="w-4 h-4" /> },
    { id: "process", label: "Process", icon: <Film className="w-4 h-4" /> },
    { id: "contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen ? "py-4 bg-[#0B0E14]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl" : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center relative z-10">
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="cursor-pointer group"
        >
          <span className="font-display font-bold text-2xl tracking-tighter text-white group-hover:text-primary transition-colors duration-300">
            SWIKAR<span className="text-primary">.</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-sm font-medium text-white/70 hover:text-white hover:text-glow transition-all duration-300 flex items-center gap-2"
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => scrollToSection("contact")}
            className="px-5 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            Hire Me
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0B0E14] border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-lg font-medium text-white/70 hover:text-white flex items-center gap-3 py-2 border-b border-white/5"
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection("contact")}
                className="mt-4 w-full py-4 bg-primary text-black font-bold rounded-xl"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
