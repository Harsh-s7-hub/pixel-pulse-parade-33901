import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import GitHubStats from "@/components/GitHubStats";
import Contact from "@/components/Contact";

const Index = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          } else {
            // Remove from visible when scrolling away
            setVisibleSections((prev) => {
              const newSet = new Set(prev);
              newSet.delete(entry.target.id);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -100px 0px" }
    );

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('[data-section]');
    elements.forEach((el) => observerRef.current?.observe(el));
    
    return () => {
      elements.forEach((el) => observerRef.current?.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      
      <div 
        id="about"
        data-section
        className={`transition-all duration-1000 ${
          visibleSections.has("about") 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-20"
        }`}
      >
        <About />
      </div>

      <div 
        id="projects"
        data-section
        className={`transition-all duration-1000 ${
          visibleSections.has("projects") 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-20"
        }`}
        style={{ transitionDelay: "100ms" }}
      >
        <Projects />
      </div>

      <div 
        id="skills"
        data-section
        className={`transition-all duration-1000 ${
          visibleSections.has("skills") 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-20"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        <Skills />
      </div>

      <div 
        id="github"
        data-section
        className={`transition-all duration-1000 ${
          visibleSections.has("github") 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-20"
        }`}
        style={{ transitionDelay: "300ms" }}
      >
        <GitHubStats />
      </div>

      <div 
        id="contact"
        data-section
        className={`transition-all duration-1000 ${
          visibleSections.has("contact") 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-20"
        }`}
        style={{ transitionDelay: "400ms" }}
      >
        <Contact />
      </div>
      
      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/50 bg-background">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2025 Harsh Soni Portfolio. All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
