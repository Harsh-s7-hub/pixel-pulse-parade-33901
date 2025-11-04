import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Eye } from "lucide-react";
import { useState } from "react";
import ProjectDetailModal from "./ProjectDetailModal";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React, Node.js, and Stripe integration",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      gradient: "from-cyan-500 to-blue-500",
      previewUrl: "https://example-ecommerce-demo.vercel.app",
      files: [
        {
          name: "App.tsx",
          language: "typescript",
          code: `import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Products } from './pages/Products';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;`
        },
        {
          name: "products.api.ts",
          language: "typescript",
          code: `import { stripe } from './stripe';
import { db } from './database';

export async function getProducts() {
  const products = await db.products.findMany({
    include: { images: true }
  });
  return products;
}

export async function createCheckout(items: CartItem[]) {
  const session = await stripe.checkout.sessions.create({
    line_items: items.map(item => ({
      price: item.priceId,
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: process.env.SUCCESS_URL,
    cancel_url: process.env.CANCEL_URL,
  });
  return session;
}`
        }
      ]
    },
    {
      title: "Task Management App",
      description: "Collaborative task manager with real-time updates and team features",
      tags: ["TypeScript", "React", "Firebase", "Tailwind"],
      gradient: "from-teal-500 to-cyan-500",
      previewUrl: "https://example-tasks-demo.vercel.app",
      files: [
        {
          name: "TaskBoard.tsx",
          language: "typescript",
          code: `import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useFirebase } from './hooks/useFirebase';

export const TaskBoard = () => {
  const [columns, setColumns] = useState({});
  const { updateTask, subscribeToTasks } = useFirebase();

  useEffect(() => {
    const unsubscribe = subscribeToTasks((tasks) => {
      const grouped = groupTasksByStatus(tasks);
      setColumns(grouped);
    });
    return unsubscribe;
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    
    updateTask(draggableId, {
      status: destination.droppableId,
      order: destination.index
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {/* Render columns and tasks */}
    </DragDropContext>
  );
};`
        }
      ]
    },
    {
      title: "Portfolio CMS",
      description: "Custom content management system for portfolio websites",
      tags: ["Next.js", "Prisma", "tRPC", "PostgreSQL"],
      gradient: "from-blue-500 to-teal-500",
      files: [
        {
          name: "schema.prisma",
          language: "prisma",
          code: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Project {
  id          String   @id @default(cuid())
  title       String
  description String
  content     String
  images      Image[]
  tags        Tag[]
  published   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Image {
  id        String  @id @default(cuid())
  url       String
  alt       String
  project   Project @relation(fields: [projectId], references: [id])
  projectId String
}

model Tag {
  id       String    @id @default(cuid())
  name     String    @unique
  projects Project[]
}`
        },
        {
          name: "router.ts",
          language: "typescript",
          code: `import { router, publicProcedure } from './trpc';
import { z } from 'zod';
import { prisma } from './prisma';

export const appRouter = router({
  projects: {
    list: publicProcedure.query(async () => {
      return await prisma.project.findMany({
        where: { published: true },
        include: { images: true, tags: true }
      });
    }),
    
    create: publicProcedure
      .input(z.object({
        title: z.string(),
        description: z.string(),
        content: z.string(),
        tags: z.array(z.string()),
      }))
      .mutation(async ({ input }) => {
        return await prisma.project.create({
          data: input
        });
      }),
  },
});`
        }
      ]
    },
    {
      title: "Analytics Dashboard",
      description: "Real-time analytics dashboard with interactive data visualizations",
      tags: ["React", "D3.js", "WebSocket", "Redis"],
      gradient: "from-cyan-600 to-teal-600",
      previewUrl: "https://example-analytics-demo.vercel.app",
      files: [
        {
          name: "RealtimeChart.tsx",
          language: "typescript",
          code: `import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useWebSocket } from './hooks/useWebSocket';

export const RealtimeChart = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [data, setData] = useState<DataPoint[]>([]);
  const { subscribe } = useWebSocket();

  useEffect(() => {
    const unsubscribe = subscribe('analytics', (newPoint) => {
      setData(prev => [...prev.slice(-50), newPoint]);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.timestamp))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([height, 0]);

    const line = d3.line()
      .x(d => x(d.timestamp))
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX);

    svg.select('.line')
      .datum(data)
      .attr('d', line);
  }, [data]);

  return <svg ref={svgRef} width={800} height={400} />;
};`
        }
      ]
    },
  ];

  const handleProjectClick = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section id="projects" className="py-24 px-6 bg-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-8" />
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of my recent work and passion projects
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="group bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-card hover:-translate-y-2 animate-scale-in overflow-hidden cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleProjectClick(project)}
            >
              <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
              <CardHeader>
                <CardTitle className="text-2xl text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-primary/50 hover:border-primary hover:bg-primary/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProjectClick(project);
                    }}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-primary/50 hover:border-primary hover:bg-primary/10"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-primary/50 hover:border-primary hover:bg-primary/10"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <ProjectDetailModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          project={selectedProject}
        />
      </div>
    </section>
  );
};

export default Projects;
