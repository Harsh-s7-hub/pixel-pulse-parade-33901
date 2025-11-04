import { Card } from "@/components/ui/card";
import { Code2, Palette, Rocket, Award, Users, Zap } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const About = () => {
  const highlights = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable, scalable code that stands the test of time",
    },
    {
      icon: Palette,
      title: "Beautiful Design",
      description: "Creating stunning interfaces that users love to interact with",
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Building fast, optimized applications for the best user experience",
    },
  ];

  const stats = [
    { icon: Award, value: "50+", label: "Projects Completed" },
    { icon: Users, value: "30+", label: "Happy Clients" },
    { icon: Zap, value: "5+", label: "Years Experience" },
  ];

  return (
    <section id="about" className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-8 animate-shimmer bg-[length:1000px_100%]" 
               style={{ backgroundImage: 'linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)' }} />
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate about crafting exceptional digital experiences that make a difference
          </p>
        </div>

        {/* Main content with photo */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Photo section with animations */}
          <div className="relative animate-slide-in-left">
            <div className="relative z-10">
              {/* Rotating border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur-xl opacity-30 animate-rotate-slow" 
                   style={{ transform: 'scale(1.1)' }} />
              
              {/* Main photo container */}
              <div className="relative bg-gradient-card p-2 rounded-2xl shadow-glow">
                <div className="relative overflow-hidden rounded-xl">
                  <img 
                    src={profilePhoto} 
                    alt="Professional portrait" 
                    className="w-full h-auto object-cover rounded-xl hover:scale-105 transition-transform duration-500"
                  />
                  {/* Overlay gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                </div>
              </div>

              {/* Decorative floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-float" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
            </div>
          </div>

          {/* Text content */}
          <div className="animate-slide-in-right space-y-6">
            <div className="space-y-4">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Your Name</span>
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A passionate full-stack developer with a keen eye for design and a commitment to building 
                exceptional digital experiences. I specialize in creating modern, responsive web applications 
                that not only look great but perform flawlessly.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With years of experience in the industry, I've worked with startups and established companies 
                to bring their visions to life through clean code and intuitive user interfaces.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={index}
                    className="text-center group cursor-default"
                  >
                    <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Highlights cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card 
                key={index}
                className="group relative p-8 bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-card hover:-translate-y-3 animate-bounce-in overflow-hidden"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
