import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div 
        className="absolute inset-0 bg-gradient-hero animate-gradient bg-[length:200%_200%] opacity-90"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(28, 37, 46, 0.95) 0%, rgba(28, 40, 50, 0.9) 50%, rgba(22, 44, 48, 0.85) 100%), url(${heroBg})`,
          backgroundSize: '200% 200%, cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 border-2 border-primary/20 rounded-lg animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-20 w-16 h-16 border-2 border-accent/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-1/4 w-12 h-12 border-2 border-primary/30 rotate-45 animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-block mb-6 px-6 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium animate-bounce-in backdrop-blur-sm">
            ✨ Available for Freelance Work
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
            Creative Developer
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Building <span className="text-primary font-semibold">beautiful</span>, <span className="text-accent font-semibold">functional</span> digital experiences with modern web technologies
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              size="lg" 
              className="group bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_hsl(180_85%_55%/0.5)] animate-glow"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/50 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
            </Button>
          </div>

          {/* Social links */}
          <div className="flex gap-6 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative p-3 text-muted-foreground hover:text-primary transition-all duration-300"
            >
              <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
              <Github className="relative h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative p-3 text-muted-foreground hover:text-primary transition-all duration-300"
            >
              <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
              <Linkedin className="relative h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a 
              href="mailto:hello@example.com"
              className="group relative p-3 text-muted-foreground hover:text-primary transition-all duration-300"
            >
              <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
              <Mail className="relative h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
