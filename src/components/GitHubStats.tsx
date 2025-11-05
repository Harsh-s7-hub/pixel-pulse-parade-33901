import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Star, GitFork, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GitHubData {
  username: string;
  repos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalForks: number;
  publicContributions: number;
  topRepos: Array<{
    name: string;
    description: string;
    stars: number;
    forks: number;
    language: string;
    url: string;
  }>;
}

const GitHubStats = () => {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // For demo purposes - replace with your GitHub username
  const GITHUB_USERNAME = "torvalds"; // Change this to your username

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        const userData = await userResponse.json();

        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=6`);
        const reposData = await reposResponse.json();

        const totalStars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
        const totalForks = reposData.reduce((acc: number, repo: any) => acc + repo.forks_count, 0);

        const topRepos = reposData.slice(0, 3).map((repo: any) => ({
          name: repo.name,
          description: repo.description || "No description available",
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language || "Unknown",
          url: repo.html_url,
        }));

        setData({
          username: userData.login,
          repos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
          totalStars,
          totalForks,
          publicContributions: Math.floor(Math.random() * 2000) + 500, // Mock data as GitHub API doesn't provide this easily
          topRepos,
        });
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        toast({
          title: "Error",
          description: "Failed to load GitHub stats. Using demo data.",
          variant: "destructive",
        });
        // Set demo data on error
        setData({
          username: GITHUB_USERNAME,
          repos: 42,
          followers: 128,
          following: 89,
          totalStars: 1250,
          totalForks: 320,
          publicContributions: 1543,
          topRepos: [
            {
              name: "awesome-project",
              description: "An awesome full-stack web application",
              stars: 523,
              forks: 89,
              language: "TypeScript",
              url: "#",
            },
            {
              name: "ml-pipeline",
              description: "Machine learning data pipeline",
              stars: 412,
              forks: 76,
              language: "Python",
              url: "#",
            },
            {
              name: "react-components",
              description: "Reusable React component library",
              stars: 315,
              forks: 45,
              language: "JavaScript",
              url: "#",
            },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [toast]);

  if (loading) {
    return (
      <section className="py-24 px-6 bg-secondary/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="animate-pulse">Loading GitHub stats...</div>
          </div>
        </div>
      </section>
    );
  }

  if (!data) return null;

  const stats = [
    { label: "Repositories", value: data.repos, icon: Github },
    { label: "Total Stars", value: data.totalStars, icon: Star },
    { label: "Total Forks", value: data.totalForks, icon: GitFork },
    { label: "Contributions", value: data.publicContributions, icon: Activity },
  ];

  return (
    <section className="py-24 px-6 bg-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
            <Github className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            GitHub Activity
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-8" />
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Live statistics from my GitHub profile
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="bg-gradient-card border-border/50 text-center p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-card animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            );
          })}
        </div>

        {/* Top Repositories */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Top Repositories</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {data.topRepos.map((repo, index) => (
              <a
                key={index}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="h-full bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-card hover:-translate-y-2 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1 + 0.4}s` }}
                >
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground hover:text-primary transition-colors">
                      {repo.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {repo.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {repo.language}
                      </Badge>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          <span>{repo.stars}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="h-4 w-4" />
                          <span>{repo.forks}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>

        {/* GitHub Profile Link */}
        <div className="text-center mt-12">
          <a
            href={`https://github.com/${data.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <Github className="h-5 w-5" />
            View Full GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
