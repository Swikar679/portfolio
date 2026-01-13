import { Instagram, Youtube, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="font-display text-2xl font-bold tracking-tight mb-2">
              SWIKAR<span className="text-primary">.</span>
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Crafting visual narratives through motion and rhythm.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-muted-foreground hover:text-white hover:scale-110 transition-all duration-300">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-white hover:scale-110 transition-all duration-300">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-white hover:scale-110 transition-all duration-300">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-white hover:scale-110 transition-all duration-300">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Swikar. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
