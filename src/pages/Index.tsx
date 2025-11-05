import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import GitHubStats from "@/components/GitHubStats";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <GitHubStats />
      <Contact />
      
      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/50 bg-background">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 Portfolio. Built with React & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
