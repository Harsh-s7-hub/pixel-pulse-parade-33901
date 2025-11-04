import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Award, Calendar, Building2, ExternalLink, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  credentialUrl?: string;
  description: string;
  skills: string[];
  imageUrl: string;
  verified: boolean;
}

const CertificationsPage = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const certificates: Certificate[] = [
    {
      id: "1",
      title: "AWS Certified Solutions Architect - Professional",
      issuer: "Amazon Web Services",
      issueDate: "January 2024",
      expiryDate: "January 2027",
      credentialId: "AWS-SAP-2024-001",
      credentialUrl: "https://aws.amazon.com/verification",
      description: "Validates advanced technical skills and experience in designing distributed applications and systems on the AWS platform. Demonstrates ability to architect and deploy secure and robust applications.",
      skills: ["AWS", "Cloud Architecture", "Security", "Scalability", "Cost Optimization"],
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop",
      verified: true
    },
    {
      id: "2",
      title: "Professional Scrum Master I (PSM I)",
      issuer: "Scrum.org",
      issueDate: "October 2023",
      credentialId: "PSM-2023-456",
      credentialUrl: "https://scrum.org/verify",
      description: "Demonstrates fundamental level of Scrum mastery. Shows understanding of Scrum framework and how to apply it to maximize the value delivered by the Scrum Team.",
      skills: ["Scrum", "Agile", "Team Leadership", "Sprint Planning", "Stakeholder Management"],
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop",
      verified: true
    },
    {
      id: "3",
      title: "Google Cloud Professional Cloud Architect",
      issuer: "Google Cloud",
      issueDate: "August 2023",
      expiryDate: "August 2025",
      credentialId: "GCP-PCA-2023-789",
      credentialUrl: "https://cloud.google.com/certification/verify",
      description: "Professional Cloud Architects enable organizations to leverage Google Cloud technologies. Demonstrates ability to design, develop, and manage robust, secure, scalable, highly available, and dynamic solutions.",
      skills: ["Google Cloud Platform", "Architecture Design", "Infrastructure", "Security", "Migration"],
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop",
      verified: true
    },
    {
      id: "4",
      title: "Certified Kubernetes Administrator (CKA)",
      issuer: "Cloud Native Computing Foundation",
      issueDate: "June 2023",
      expiryDate: "June 2026",
      credentialId: "CKA-2023-321",
      credentialUrl: "https://training.linuxfoundation.org/certification/verify",
      description: "Demonstrates skills, knowledge, and competency to perform the responsibilities of a Kubernetes administrator. Covers core concepts, installation, networking, storage, security, and troubleshooting.",
      skills: ["Kubernetes", "Container Orchestration", "Docker", "DevOps", "System Administration"],
      imageUrl: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=500&fit=crop",
      verified: true
    },
    {
      id: "5",
      title: "MongoDB Certified Developer Associate",
      issuer: "MongoDB University",
      issueDate: "March 2023",
      credentialId: "MDB-DEV-2023-654",
      credentialUrl: "https://university.mongodb.com/verify",
      description: "Validates knowledge of MongoDB fundamentals and the ability to work with MongoDB in application development. Covers CRUD operations, indexing, aggregation framework, and best practices.",
      skills: ["MongoDB", "NoSQL", "Database Design", "Data Modeling", "Performance Optimization"],
      imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=500&fit=crop",
      verified: true
    },
    {
      id: "6",
      title: "Meta Front-End Developer Professional Certificate",
      issuer: "Meta (Facebook)",
      issueDate: "December 2022",
      credentialId: "META-FE-2022-987",
      credentialUrl: "https://coursera.org/verify/professional-cert",
      description: "Comprehensive program covering modern front-end development. Includes React, responsive design, version control, UI/UX principles, and full-stack fundamentals.",
      skills: ["React", "JavaScript", "HTML/CSS", "Version Control", "Responsive Design", "UI/UX"],
      imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop",
      verified: true
    }
  ];

  const handleCertClick = (cert: Certificate) => {
    setSelectedCert(cert);
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
          <h1 className="text-2xl font-bold text-foreground">Certifications</h1>
          <div className="w-24" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
            <Award className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Professional Certifications
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-8" />
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Industry-recognized certifications validating my expertise across various technologies and methodologies
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
          <Card className="bg-gradient-card border-border/50 text-center p-6 animate-scale-in">
            <div className="text-3xl font-bold text-primary mb-1">{certificates.length}</div>
            <div className="text-sm text-muted-foreground">Total Certifications</div>
          </Card>
          <Card className="bg-gradient-card border-border/50 text-center p-6 animate-scale-in" style={{ animationDelay: "0.1s" }}>
            <div className="text-3xl font-bold text-primary mb-1">{certificates.filter(c => c.verified).length}</div>
            <div className="text-sm text-muted-foreground">Verified</div>
          </Card>
          <Card className="bg-gradient-card border-border/50 text-center p-6 animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <div className="text-3xl font-bold text-primary mb-1">{new Set(certificates.flatMap(c => c.skills)).size}</div>
            <div className="text-sm text-muted-foreground">Skills Validated</div>
          </Card>
          <Card className="bg-gradient-card border-border/50 text-center p-6 animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <div className="text-3xl font-bold text-primary mb-1">{new Set(certificates.map(c => c.issuer)).size}</div>
            <div className="text-sm text-muted-foreground">Issuers</div>
          </Card>
        </div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <Card
              key={cert.id}
              className="group bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-card hover:-translate-y-2 cursor-pointer overflow-hidden animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleCertClick(cert)}
            >
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={cert.imageUrl}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {cert.verified && (
                  <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm rounded-full p-2">
                    <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {cert.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  {cert.issuer}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="h-4 w-4" />
                  <span>{cert.issueDate}</span>
                  {cert.expiryDate && (
                    <>
                      <span>→</span>
                      <span>{cert.expiryDate}</span>
                    </>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.slice(0, 3).map((skill, i) => (
                    <Badge key={i} variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {cert.skills.length > 3 && (
                    <Badge variant="secondary" className="bg-muted text-muted-foreground text-xs">
                      +{cert.skills.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Certificate Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-card border-primary/20">
          {selectedCert && (
            <>
              <DialogHeader>
                <div className="relative h-64 -mx-6 -mt-6 mb-6 overflow-hidden">
                  <img
                    src={selectedCert.imageUrl}
                    alt={selectedCert.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  {selectedCert.verified && (
                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-primary/90 backdrop-blur-sm rounded-full px-4 py-2">
                      <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
                      <span className="text-sm font-medium text-primary-foreground">Verified</span>
                    </div>
                  )}
                </div>
                <DialogTitle className="text-2xl font-bold text-foreground">
                  {selectedCert.title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <span className="font-medium">{selectedCert.issuer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>{selectedCert.issueDate}</span>
                    {selectedCert.expiryDate && (
                      <>
                        <span>→</span>
                        <span>{selectedCert.expiryDate}</span>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedCert.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Skills Validated</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.skills.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="bg-secondary/20 rounded-lg p-4 border border-border/50">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Credential Information</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Credential ID:</span> {selectedCert.credentialId}
                    </div>
                    {selectedCert.credentialUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 border-primary/50 hover:border-primary hover:bg-primary/10"
                        onClick={() => window.open(selectedCert.credentialUrl, '_blank')}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Verify Credential
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CertificationsPage;
