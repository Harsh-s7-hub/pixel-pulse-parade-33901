import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Briefcase, GraduationCap, Award, Code, Rocket, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TimelineEvent {
  id: string;
  type: "education" | "work" | "achievement" | "project";
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
  highlights: string[];
  skills: string[];
  icon: typeof GraduationCap;
  color: string;
}

const TimelinePage = () => {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('[data-timeline-item]');
    elements.forEach((el) => observerRef.current?.observe(el));
    
    return () => {
      elements.forEach((el) => observerRef.current?.unobserve(el));
    };
  }, []);

  const timeline: TimelineEvent[] = [
    {
      id: "1",
      type: "work",
      title: "Senior Full Stack Developer",
      organization: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      startDate: "Jan 2023",
      endDate: "Present",
      description: "Leading development of enterprise-scale web applications and mentoring junior developers.",
      highlights: [
        "Led a team of 5 developers in rebuilding the core platform using React and Node.js",
        "Improved application performance by 60% through optimization and refactoring",
        "Implemented CI/CD pipeline reducing deployment time by 75%",
        "Mentored 3 junior developers, helping them advance to mid-level positions"
      ],
      skills: ["React", "Node.js", "AWS", "TypeScript", "PostgreSQL", "Docker"],
      icon: Briefcase,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "2",
      type: "achievement",
      title: "AWS Solutions Architect Professional Certification",
      organization: "Amazon Web Services",
      location: "Remote",
      startDate: "Jan 2024",
      description: "Achieved AWS Solutions Architect Professional certification, validating expertise in cloud architecture.",
      highlights: [
        "Scored in the top 10% of exam takers",
        "Demonstrated advanced cloud architecture design skills",
        "Validated expertise in security, scalability, and cost optimization"
      ],
      skills: ["AWS", "Cloud Architecture", "DevOps"],
      icon: Award,
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: "3",
      type: "work",
      title: "Full Stack Developer",
      organization: "Digital Solutions Ltd.",
      location: "Austin, TX",
      startDate: "Jun 2021",
      endDate: "Dec 2022",
      description: "Developed and maintained multiple client-facing web applications using modern tech stack.",
      highlights: [
        "Built 8+ production-ready web applications for diverse clients",
        "Reduced API response time by 40% through database optimization",
        "Collaborated with UX team to improve user satisfaction by 35%",
        "Introduced automated testing, increasing code coverage to 85%"
      ],
      skills: ["React", "Express", "MongoDB", "Redis", "Jest", "Git"],
      icon: Briefcase,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "4",
      type: "project",
      title: "Open Source Contribution - React Component Library",
      organization: "GitHub Community",
      location: "Remote",
      startDate: "Mar 2021",
      endDate: "Present",
      description: "Created and maintain a popular React component library with 2.5K+ GitHub stars.",
      highlights: [
        "Built 50+ reusable, accessible React components",
        "Achieved 2.5K+ GitHub stars and 500+ forks",
        "Published comprehensive documentation and examples",
        "Active community with 100+ contributors"
      ],
      skills: ["React", "TypeScript", "Storybook", "Testing Library"],
      icon: Code,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "5",
      type: "work",
      title: "Junior Web Developer",
      organization: "StartUp Ventures",
      location: "Remote",
      startDate: "Aug 2020",
      endDate: "May 2021",
      description: "First professional role, focusing on frontend development and learning industry best practices.",
      highlights: [
        "Developed responsive web interfaces using React and Tailwind CSS",
        "Participated in daily standups and agile development process",
        "Fixed 100+ bugs and implemented 30+ features",
        "Learned modern development workflows and collaboration tools"
      ],
      skills: ["React", "JavaScript", "CSS", "Git", "Agile"],
      icon: Briefcase,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "6",
      type: "education",
      title: "Bachelor of Technology in Computer Science",
      organization: "State University of Technology",
      location: "California, USA",
      startDate: "Aug 2016",
      endDate: "May 2020",
      description: "Comprehensive computer science education with focus on software engineering and web technologies.",
      highlights: [
        "Graduated with 3.8 GPA (Honors)",
        "President of Computer Science Club (2019-2020)",
        "Led team project that won Best Innovation Award at Tech Fest 2019",
        "Completed senior thesis on 'Optimizing React Application Performance'"
      ],
      skills: ["Data Structures", "Algorithms", "Database Systems", "Web Development", "Software Engineering"],
      icon: GraduationCap,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "7",
      type: "achievement",
      title: "First Internship & Web Development Journey Begins",
      organization: "Local Web Agency",
      location: "California, USA",
      startDate: "Jun 2018",
      endDate: "Aug 2018",
      description: "First hands-on experience in professional web development during summer internship.",
      highlights: [
        "Built first production website for a local business",
        "Learned HTML, CSS, and JavaScript fundamentals",
        "Collaborated with designers and senior developers",
        "Discovered passion for web development"
      ],
      skills: ["HTML", "CSS", "JavaScript", "WordPress"],
      icon: Rocket,
      color: "from-cyan-500 to-blue-500"
    }
  ];

  const getIcon = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "education":
        return GraduationCap;
      case "work":
        return Briefcase;
      case "achievement":
        return Award;
      case "project":
        return Code;
      default:
        return Rocket;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/3 to-accent/3 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
            Professional Timeline
          </h1>
          <div className="w-32" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16 relative">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center justify-center relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-50 animate-pulse-glow" />
            <div className="relative p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full border-2 border-primary/30">
              <Rocket className="h-10 w-10 text-primary animate-float" />
            </div>
            <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-accent animate-pulse" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
            My Professional{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Journey
            </span>
          </h2>
          
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-1 w-12 bg-gradient-to-r from-transparent to-primary rounded-full" />
            <div className="h-1 w-24 bg-gradient-primary rounded-full animate-pulse-glow" />
            <div className="h-1 w-12 bg-gradient-to-l from-transparent to-accent rounded-full" />
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From engineering student to senior developer - A timeline of{" "}
            <span className="text-primary font-semibold">growth</span>,{" "}
            <span className="text-accent font-semibold">learning</span>, and{" "}
            <span className="text-primary font-semibold">achievements</span>
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto relative">
          {/* Animated Vertical line with gradient */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary via-accent to-primary opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary via-accent to-primary animate-shimmer" 
                 style={{ 
                   backgroundSize: "200% 200%",
                   animation: "shimmer 3s linear infinite"
                 }} 
            />
          </div>

          <div className="space-y-16">
            {timeline.map((event, index) => {
              const Icon = event.icon;
              const isEven = index % 2 === 0;
              const isVisible = visibleItems.has(event.id);

              return (
                <div
                  key={event.id}
                  id={event.id}
                  data-timeline-item
                  className={`relative flex items-center ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } transition-all duration-1000 ${
                    isVisible 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-20"
                  }`}
                  style={{ 
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Timeline dot with pulse animation */}
                  <div className="absolute left-4 md:left-1/2 w-16 h-16 -ml-8 flex items-center justify-center z-10">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${event.color} opacity-20 animate-ping`} 
                         style={{ animationDuration: "3s" }} 
                    />
                    <div className={`absolute inset-2 rounded-full bg-gradient-to-br ${event.color} opacity-40 blur-md`} />
                    <div className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${event.color} flex items-center justify-center shadow-glow border-4 border-background group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-7 w-7 text-white animate-pulse" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`w-full md:w-[calc(50%-3rem)] ${isEven ? "md:pr-12 pl-24 md:pl-0" : "md:pl-12 pl-24 md:pr-0"}`}>
                    <Card className={`
                      relative overflow-hidden
                      bg-gradient-card border-border/50 
                      hover:border-primary/50 
                      transition-all duration-500 
                      hover:shadow-card hover:shadow-glow
                      group cursor-pointer
                      ${isVisible ? "scale-100" : "scale-95"}
                      hover:scale-[1.02]
                    `}>
                      {/* Shimmer effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      
                      <div className={`h-1.5 bg-gradient-to-r ${event.color} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                      </div>
                      
                      <CardHeader className="relative">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <CardTitle className="text-2xl text-foreground group-hover:text-primary transition-colors duration-300 flex items-center gap-2">
                            {event.title}
                            <Sparkles className="h-4 w-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                          </CardTitle>
                          <Badge 
                            variant="secondary" 
                            className={`
                              bg-gradient-to-br ${event.color} 
                              text-white border-0 
                              whitespace-nowrap
                              animate-bounce-in
                              shadow-lg
                            `}
                            style={{ animationDelay: `${index * 100 + 200}ms` }}
                          >
                            {event.type}
                          </Badge>
                        </div>
                        <CardDescription className="space-y-2">
                          <div className="font-semibold text-foreground text-base">{event.organization}</div>
                          <div className="text-sm text-muted-foreground">{event.location}</div>
                          <div className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            {event.startDate} {event.endDate && `- ${event.endDate}`}
                          </div>
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-6 relative">
                        <p className="text-muted-foreground leading-relaxed text-base">
                          {event.description}
                        </p>

                        {event.highlights.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                              <div className="h-1 w-8 bg-gradient-primary rounded-full" />
                              Key Highlights
                            </h4>
                            <ul className="space-y-2.5">
                              {event.highlights.map((highlight, i) => (
                                <li 
                                  key={i} 
                                  className={`
                                    flex gap-3 text-sm text-muted-foreground
                                    opacity-0 animate-fade-in
                                  `}
                                  style={{ 
                                    animationDelay: `${index * 100 + 300 + i * 100}ms`,
                                    animationFillMode: "forwards"
                                  }}
                                >
                                  <span className={`text-primary mt-1 text-lg font-bold bg-gradient-to-br ${event.color} bg-clip-text text-transparent`}>
                                    ▸
                                  </span>
                                  <span className="flex-1">{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {event.skills.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                              <div className="h-1 w-8 bg-gradient-primary rounded-full" />
                              Skills & Technologies
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {event.skills.map((skill, i) => (
                                <Badge 
                                  key={i} 
                                  variant="secondary" 
                                  className={`
                                    bg-secondary/50 hover:bg-secondary/80
                                    text-secondary-foreground text-xs font-medium
                                    transition-all duration-300
                                    hover:scale-110 hover:shadow-md
                                    cursor-default
                                    opacity-0 animate-scale-in
                                  `}
                                  style={{ 
                                    animationDelay: `${index * 100 + 500 + i * 50}ms`,
                                    animationFillMode: "forwards"
                                  }}
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll indicator at bottom */}
        <div className="text-center mt-20 animate-fade-in-up" style={{ animationDelay: "1s" }}>
          <p className="text-muted-foreground text-sm">
            This is just the beginning of the journey... ✨
          </p>
        </div>
      </main>
    </div>
  );
};

export default TimelinePage;
