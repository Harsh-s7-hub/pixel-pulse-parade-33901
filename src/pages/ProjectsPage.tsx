import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, Globe, FolderGit2 } from "lucide-react";
import { Link } from "react-router-dom";
import ProjectDetailModal from "@/components/ProjectDetailModal";

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include product catalog, shopping cart, checkout flow, and order management.",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe", "TypeScript"],
      gradient: "from-cyan-500 to-blue-500",
      previewUrl: "https://example-ecommerce-demo.vercel.app",
      githubUrl: "https://github.com/example/ecommerce",
      stars: 245,
      forks: 67,
      files: [
        {
          name: "src/App.tsx",
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
          name: "server/api/products.ts",
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
        },
        {
          name: "src/components/ProductCard.tsx",
          language: "typescript",
          code: `import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-2xl font-bold mt-2">\${product.price}</p>
        <Button 
          onClick={() => addItem(product)}
          className="w-full mt-4"
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};`
        }
      ]
    },
    {
      title: "Task Management App",
      description: "Collaborative task manager with real-time updates, drag-and-drop functionality, team features, and activity tracking.",
      tags: ["TypeScript", "React", "Firebase", "Tailwind CSS", "DnD"],
      gradient: "from-teal-500 to-cyan-500",
      previewUrl: "https://example-tasks-demo.vercel.app",
      githubUrl: "https://github.com/example/task-manager",
      stars: 189,
      forks: 43,
      files: [
        {
          name: "src/components/TaskBoard.tsx",
          language: "typescript",
          code: `import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useFirebase } from '@/hooks/useFirebase';
import { TaskCard } from './TaskCard';

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
      <div className="flex gap-4 overflow-x-auto">
        {Object.entries(columns).map(([columnId, column]) => (
          <Droppable key={columnId} droppableId={columnId}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-100 rounded-lg p-4 min-w-[300px]"
              >
                <h3 className="font-semibold mb-4">{column.title}</h3>
                {column.tasks.map((task, index) => (
                  <TaskCard key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};`
        },
        {
          name: "src/hooks/useFirebase.ts",
          language: "typescript",
          code: `import { useEffect, useCallback } from 'react';
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const useFirebase = () => {
  const subscribeToTasks = useCallback((callback: (tasks: Task[]) => void) => {
    const unsubscribe = onSnapshot(
      collection(db, 'tasks'),
      (snapshot) => {
        const tasks = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Task[];
        callback(tasks);
      }
    );
    return unsubscribe;
  }, []);

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, updates);
  };

  return { subscribeToTasks, updateTask };
};`
        }
      ]
    },
    {
      title: "Portfolio CMS",
      description: "Custom content management system for portfolio websites with admin panel, rich text editor, and dynamic page generation.",
      tags: ["Next.js", "Prisma", "tRPC", "PostgreSQL", "TailwindCSS"],
      gradient: "from-blue-500 to-teal-500",
      githubUrl: "https://github.com/example/portfolio-cms",
      stars: 312,
      forks: 89,
      files: [
        {
          name: "prisma/schema.prisma",
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
          name: "src/server/router.ts",
          language: "typescript",
          code: `import { router, publicProcedure } from './trpc';
import { z } from 'zod';
import { prisma } from './prisma';

export const appRouter = router({
  projects: {
    list: publicProcedure.query(async () => {
      return await prisma.project.findMany({
        where: { published: true },
        include: { images: true, tags: true },
        orderBy: { createdAt: 'desc' }
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
          data: {
            ...input,
            tags: {
              connectOrCreate: input.tags.map(tag => ({
                where: { name: tag },
                create: { name: tag }
              }))
            }
          }
        });
      }),
  },
});

export type AppRouter = typeof appRouter;`
        }
      ]
    },
    {
      title: "Analytics Dashboard",
      description: "Real-time analytics dashboard with interactive data visualizations, WebSocket updates, and comprehensive reporting features.",
      tags: ["React", "D3.js", "WebSocket", "Redis", "Node.js"],
      gradient: "from-cyan-600 to-teal-600",
      previewUrl: "https://example-analytics-demo.vercel.app",
      githubUrl: "https://github.com/example/analytics-dashboard",
      stars: 421,
      forks: 134,
      files: [
        {
          name: "src/components/RealtimeChart.tsx",
          language: "typescript",
          code: `import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useWebSocket } from '@/hooks/useWebSocket';

interface DataPoint {
  timestamp: Date;
  value: number;
}

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

    svg.selectAll('*').remove();

    const g = svg.append('g')
      .attr('transform', \`translate(\${margin.left},\${margin.top})\`);

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.timestamp) as [Date, Date])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) as number])
      .range([height, 0]);

    const line = d3.line<DataPoint>()
      .x(d => x(d.timestamp))
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);

    g.append('g')
      .attr('transform', \`translate(0,\${height})\`)
      .call(d3.axisBottom(x));

    g.append('g')
      .call(d3.axisLeft(y));
  }, [data]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Real-time Metrics</h3>
      <svg ref={svgRef} width={800} height={400} />
    </div>
  );
};`
        },
        {
          name: "server/websocket.ts",
          language: "typescript",
          code: `import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);
const server = createServer();
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  const subscriber = redis.duplicate();
  
  subscriber.subscribe('analytics', (err) => {
    if (err) {
      console.error('Failed to subscribe:', err);
      return;
    }
  });

  subscriber.on('message', (channel, message) => {
    ws.send(JSON.stringify({
      channel,
      data: JSON.parse(message)
    }));
  });

  ws.on('close', () => {
    subscriber.quit();
    console.log('Client disconnected');
  });
});

server.listen(3001, () => {
  console.log('WebSocket server running on port 3001');
});`
        }
      ]
    },
    {
      title: "Social Media Clone",
      description: "Full-featured social media platform with posts, comments, likes, real-time messaging, and user profiles.",
      tags: ["React", "Express", "MongoDB", "Socket.io", "Redux"],
      gradient: "from-pink-500 to-purple-500",
      previewUrl: "https://example-social-demo.vercel.app",
      githubUrl: "https://github.com/example/social-clone",
      stars: 567,
      forks: 203,
      files: [
        {
          name: "src/components/Feed.tsx",
          language: "typescript",
          code: `import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '@/store/postsSlice';
import { PostCard } from './PostCard';
import { CreatePost } from './CreatePost';

export const Feed = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector(state => state.posts);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-6">
      {user && <CreatePost />}
      
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))
      )}
    </div>
  );
};`
        },
        {
          name: "server/routes/posts.ts",
          language: "typescript",
          code: `import express from 'express';
import { Post } from '../models/Post';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username avatar')
      .populate('comments.user', 'username avatar')
      .sort({ createdAt: -1 })
      .limit(20);
    
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const post = new Post({
      content: req.body.content,
      image: req.body.image,
      author: req.user.id
    });
    
    await post.save();
    await post.populate('author', 'username avatar');
    
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    const likeIndex = post.likes.indexOf(req.user.id);
    
    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1);
    } else {
      post.likes.push(req.user.id);
    }
    
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update like' });
  }
});

export default router;`
        }
      ]
    },
    {
      title: "AI Chat Application",
      description: "Intelligent chat application with AI-powered responses, conversation history, and contextual understanding using GPT models.",
      tags: ["Next.js", "OpenAI", "Tailwind", "Prisma", "WebSocket"],
      gradient: "from-purple-500 to-indigo-500",
      previewUrl: "https://example-chat-demo.vercel.app",
      githubUrl: "https://github.com/example/ai-chat",
      stars: 892,
      forks: 267,
      files: [
        {
          name: "src/app/api/chat/route.ts",
          language: "typescript",
          code: `import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    stream: true,
    messages: [
      {
        role: 'system',
        content: 'You are a helpful AI assistant.'
      },
      ...messages
    ],
    temperature: 0.7,
    max_tokens: 1000
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}`
        },
        {
          name: "src/components/ChatInterface.tsx",
          language: "typescript",
          code: `import { useState } from 'react';
import { useChat } from 'ai/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

export const ChatInterface = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat'
  });

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={\`flex \${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }\`}
          >
            <div
              className={\`rounded-lg px-4 py-2 max-w-[80%] \${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-900'
              }\`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};`
        }
      ]
    }
  ];

  const handleProjectClick = (project: typeof projects[0]) => {
    setSelectedProject(project);
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
          <h1 className="text-2xl font-bold text-foreground">All Projects</h1>
          <div className="w-24" /> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Projects Grid */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
            <FolderGit2 className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Project Portfolio
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-8" />
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore all my projects with interactive previews and source code
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-card hover:-translate-y-2 animate-scale-in overflow-hidden cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleProjectClick(project)}
            >
              <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
              <CardHeader>
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors flex items-start justify-between gap-2">
                  <span>{project.title}</span>
                  <FolderGit2 className="h-5 w-5 text-primary flex-shrink-0" />
                </CardTitle>
                <CardDescription className="text-muted-foreground line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    ⭐ {project.stars || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    🔀 {project.forks || 0}
                  </span>
                </div>

                <div className="flex gap-2">
                  {project.previewUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-primary/50 hover:border-primary hover:bg-primary/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectClick(project);
                      }}
                    >
                      <Globe className="mr-1 h-3 w-3" />
                      Preview
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-primary/50 hover:border-primary hover:bg-primary/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProjectClick(project);
                    }}
                  >
                    <Github className="mr-1 h-3 w-3" />
                    Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <ProjectDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </div>
  );
};

export default ProjectsPage;
