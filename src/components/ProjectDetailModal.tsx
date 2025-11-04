import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Code2, Globe, FileCode, FolderOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProjectFile {
  name: string;
  language: string;
  code: string;
}

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    tags: string[];
    files?: ProjectFile[];
    previewUrl?: string;
    gradient: string;
  } | null;
}

const ProjectDetailModal = ({ isOpen, onClose, project }: ProjectDetailModalProps) => {
  if (!project) return null;

  const hasPreview = !!project.previewUrl;
  const hasCode = project.files && project.files.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] p-0 gap-0 bg-gradient-card border-primary/20">
        <DialogHeader className="px-6 py-4 border-b border-border/50">
          <div className={`h-1 absolute top-0 left-0 right-0 bg-gradient-to-r ${project.gradient}`} />
          <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3 mt-2">
            <FolderOpen className="h-6 w-6 text-primary" />
            {project.title}
          </DialogTitle>
          <p className="text-muted-foreground text-sm">{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {project.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                {tag}
              </Badge>
            ))}
          </div>
        </DialogHeader>

        <Tabs defaultValue={hasPreview ? "preview" : "code"} className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="mx-6 mt-4 bg-secondary/30 border border-border/50">
            {hasPreview && (
              <TabsTrigger value="preview" className="gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <Globe className="h-4 w-4" />
                Live Preview
              </TabsTrigger>
            )}
            {hasCode && (
              <TabsTrigger value="code" className="gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <Code2 className="h-4 w-4" />
                Source Code
              </TabsTrigger>
            )}
          </TabsList>

          {hasPreview && (
            <TabsContent value="preview" className="flex-1 px-6 pb-6 mt-4 overflow-hidden">
              <div className="h-full rounded-lg border-2 border-primary/20 bg-background overflow-hidden shadow-card">
                <iframe
                  src={project.previewUrl}
                  className="w-full h-full"
                  title={`${project.title} Preview`}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            </TabsContent>
          )}

          {hasCode && (
            <TabsContent value="code" className="flex-1 px-6 pb-6 mt-4 overflow-hidden">
              <ScrollArea className="h-full rounded-lg border border-border/50 bg-secondary/20">
                <div className="space-y-6 p-6">
                  {project.files?.map((file, index) => (
                    <div key={index} className="rounded-lg border border-primary/20 overflow-hidden bg-gradient-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="bg-secondary/50 px-4 py-2 border-b border-border/50 flex items-center gap-2">
                        <FileCode className="h-4 w-4 text-primary" />
                        <span className="text-sm font-mono text-foreground">{file.name}</span>
                      </div>
                      <SyntaxHighlighter
                        language={file.language}
                        style={vscDarkPlus}
                        customStyle={{
                          margin: 0,
                          padding: '1rem',
                          background: 'transparent',
                          fontSize: '0.875rem',
                        }}
                        showLineNumbers
                      >
                        {file.code}
                      </SyntaxHighlighter>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailModal;
