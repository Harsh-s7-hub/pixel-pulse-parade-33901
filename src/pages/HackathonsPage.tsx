import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Trophy, Calendar, MapPin, Users, ExternalLink, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Hackathon {
  id: string;
  name: string;
  organizer: string;
  date: string;
  location: string;
  position: string;
  prize?: string;
  projectName: string;
  description: string;
  technologies: string[];
  teamSize?: number;
  projectUrl?: string;
  imageUrl: string;
  achievements: string[];
}

const HackathonsPage = () => {
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hackathons: Hackathon[] = [
    {
      id: "1",
      name: "TechCrunch Disrupt Hackathon 2024",
      organizer: "TechCrunch",
      date: "March 2024",
      location: "San Francisco, CA",
      position: "1st Place Winner",
      prize: "$10,000",
      projectName: "AI-Powered Code Review Assistant",
      description: "Developed an intelligent code review tool that uses machine learning to identify bugs, security vulnerabilities, and suggest improvements. The tool integrates seamlessly with GitHub and provides real-time feedback to developers.",
      technologies: ["Python", "TensorFlow", "React", "Node.js", "GitHub API"],
      teamSize: 4,
      projectUrl: "https://github.com/example/project",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
      achievements: [
        "Best Overall Project",
        "Most Innovative Use of AI",
        "People's Choice Award"
      ]
    },
    {
      id: "2",
      name: "MIT Bitcoin Hackathon",
      organizer: "MIT",
      date: "January 2024",
      location: "Cambridge, MA",
      position: "2nd Place",
      prize: "$5,000",
      projectName: "Decentralized Supply Chain Tracker",
      description: "Built a blockchain-based solution for transparent supply chain management. The platform allows businesses to track products from manufacturing to delivery with immutable records.",
      technologies: ["Solidity", "Ethereum", "Web3.js", "React", "IPFS"],
      teamSize: 3,
      projectUrl: "https://github.com/example/blockchain-supply",
      imageUrl: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=500&fit=crop",
      achievements: [
        "Runner Up",
        "Best Blockchain Implementation"
      ]
    },
    {
      id: "3",
      name: "Google Cloud Next Hackathon",
      organizer: "Google",
      date: "November 2023",
      location: "Virtual",
      position: "Top 10 Finalist",
      projectName: "Smart City IoT Platform",
      description: "Created a comprehensive IoT platform for smart city management, integrating real-time data from various sensors to optimize traffic flow, energy usage, and public safety.",
      technologies: ["Google Cloud", "IoT Core", "BigQuery", "Firebase", "Angular"],
      teamSize: 5,
      imageUrl: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=500&fit=crop",
      achievements: [
        "Top 10 Finalist",
        "Best Use of Google Cloud Services"
      ]
    },
    {
      id: "4",
      name: "NASA Space Apps Challenge",
      organizer: "NASA",
      date: "October 2023",
      location: "Houston, TX",
      position: "Global Finalist",
      projectName: "Mars Terrain Analyzer",
      description: "Developed a machine learning model to analyze Mars rover images and identify potential landing sites and areas of scientific interest. The tool helps mission planners make data-driven decisions.",
      technologies: ["Python", "OpenCV", "TensorFlow", "NASA API", "React"],
      teamSize: 4,
      projectUrl: "https://github.com/example/mars-analyzer",
      imageUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=500&fit=crop",
      achievements: [
        "Global Finalist",
        "Best Space Technology Solution"
      ]
    }
  ];

  const handleHackathonClick = (hackathon: Hackathon) => {
    setSelectedHackathon(hackathon);
    setIsModalOpen(true);
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
          <h1 className="text-2xl font-bold text-foreground">Hackathons</h1>
          <div className="w-24" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
            <Trophy className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Hackathon Achievements
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-8" />
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Competitive coding events where innovation meets collaboration under tight deadlines
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
          <Card className="bg-gradient-card border-border/50 text-center p-6 animate-scale-in">
            <div className="text-3xl font-bold text-primary mb-1">{hackathons.length}</div>
            <div className="text-sm text-muted-foreground">Events Participated</div>
          </Card>
          <Card className="bg-gradient-card border-border/50 text-center p-6 animate-scale-in" style={{ animationDelay: "0.1s" }}>
            <div className="text-3xl font-bold text-primary mb-1">{hackathons.filter(h => h.position.includes('1st') || h.position.includes('Winner')).length}</div>
            <div className="text-sm text-muted-foreground">Wins</div>
          </Card>
          <Card className="bg-gradient-card border-border/50 text-center p-6 animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <div className="text-3xl font-bold text-primary mb-1">{hackathons.reduce((acc, h) => acc + h.achievements.length, 0)}</div>
            <div className="text-sm text-muted-foreground">Awards</div>
          </Card>
          <Card className="bg-gradient-card border-border/50 text-center p-6 animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <div className="text-3xl font-bold text-primary mb-1">{new Set(hackathons.flatMap(h => h.technologies)).size}</div>
            <div className="text-sm text-muted-foreground">Technologies Used</div>
          </Card>
        </div>

        {/* Hackathons Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {hackathons.map((hackathon, index) => (
            <Card
              key={hackathon.id}
              className="group bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-card hover:-translate-y-2 cursor-pointer overflow-hidden animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleHackathonClick(hackathon)}
            >
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={hackathon.imageUrl}
                  alt={hackathon.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-sm font-medium text-primary-foreground">{hackathon.position}</span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {hackathon.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {hackathon.organizer}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{hackathon.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{hackathon.location}</span>
                  </div>
                  {hackathon.teamSize && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>Team of {hackathon.teamSize}</span>
                    </div>
                  )}
                </div>
                <div className="font-semibold text-foreground mb-2">{hackathon.projectName}</div>
                <div className="flex flex-wrap gap-2">
                  {hackathon.technologies.slice(0, 3).map((tech, i) => (
                    <Badge key={i} variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {hackathon.technologies.length > 3 && (
                    <Badge variant="secondary" className="bg-muted text-muted-foreground text-xs">
                      +{hackathon.technologies.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Hackathon Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-card border-primary/20">
          {selectedHackathon && (
            <>
              <DialogHeader>
                <div className="relative h-64 -mx-6 -mt-6 mb-6 overflow-hidden">
                  <img
                    src={selectedHackathon.imageUrl}
                    alt={selectedHackathon.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="text-sm font-medium text-primary-foreground">{selectedHackathon.position}</span>
                  </div>
                  {selectedHackathon.prize && (
                    <div className="absolute top-4 left-4 bg-accent/90 backdrop-blur-sm rounded-full px-4 py-2">
                      <span className="text-sm font-medium text-primary-foreground">{selectedHackathon.prize}</span>
                    </div>
                  )}
                </div>
                <DialogTitle className="text-2xl font-bold text-foreground">
                  {selectedHackathon.name}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>{selectedHackathon.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>{selectedHackathon.location}</span>
                  </div>
                  {selectedHackathon.teamSize && (
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span>Team of {selectedHackathon.teamSize}</span>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Project: {selectedHackathon.projectName}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedHackathon.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedHackathon.technologies.map((tech, i) => (
                      <Badge key={i} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Achievements</h3>
                  <div className="space-y-2">
                    {selectedHackathon.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-center gap-2 text-muted-foreground">
                        <Award className="h-4 w-4 text-primary" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedHackathon.projectUrl && (
                  <Button
                    variant="outline"
                    className="w-full border-primary/50 hover:border-primary hover:bg-primary/10"
                    onClick={() => window.open(selectedHackathon.projectUrl, '_blank')}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Project on GitHub
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HackathonsPage;
