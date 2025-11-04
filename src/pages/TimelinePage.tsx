import { ArrowLeft, Briefcase, GraduationCap, Award, Code, Rocket } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Professional Timeline</h1>
          <div className="w-24" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
            <Rocket className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            My Professional Journey
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-8" />
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            From engineering student to senior developer - A timeline of growth, learning, and achievements
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary"></div>

          <div className="space-y-12">
            {timeline.map((event, index) => {
              const Icon = event.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={event.id}
                  className={`relative flex items-center ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 -ml-4 flex items-center justify-center">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${event.color} flex items-center justify-center shadow-glow border-2 border-background`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${isEven ? "md:pr-12 pl-16 md:pl-0" : "md:pl-12 pl-16 md:pr-0"}`}>
                    <Card className="bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-card group">
                      <div className={`h-1 bg-gradient-to-r ${event.color}`} />
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                            {event.title}
                          </CardTitle>
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 whitespace-nowrap">
                            {event.type}
                          </Badge>
                        </div>
                        <CardDescription className="space-y-1">
                          <div className="font-medium text-foreground">{event.organization}</div>
                          <div className="text-sm">{event.location}</div>
                          <div className="text-sm text-primary">
                            {event.startDate} {event.endDate && `- ${event.endDate}`}
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {event.description}
                        </p>

                        {event.highlights.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2">Key Highlights</h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              {event.highlights.map((highlight, i) => (
                                <li key={i} className="flex gap-2">
                                  <span className="text-primary mt-1.5">•</span>
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {event.skills.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2">Skills & Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                              {event.skills.map((skill, i) => (
                                <Badge key={i} variant="secondary" className="bg-secondary/50 text-secondary-foreground text-xs">
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
      </main>
    </div>
  );
};

export default TimelinePage;
