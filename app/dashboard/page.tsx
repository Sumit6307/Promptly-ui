"use client";

import { useState } from "react";
import {
  RocketIcon,
  StarIcon,
  ClockIcon,
  FlameIcon,
  BookmarkIcon,
  LayoutDashboardIcon,
} from "lucide-react";

interface Tool {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
}

const categories = ["Marketing", "Design", "Productivity", "Coding", "Writing"];
const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboardIcon },
  { label: "Recent Tools", icon: ClockIcon },
  { label: "New Tools", icon: RocketIcon },
  { label: "Bookmarked", icon: BookmarkIcon },
  { label: "Trending", icon: FlameIcon },
];

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Marketing");

  const dummyTools: Tool[] = Array.from({ length: 250 }).map((_, i) => ({
    id: `tool-${i}`,
    name: `AI Tool ${i + 1}`,
    description: `An innovative tool that boosts your productivity ${i + 1}`,
    logoUrl: `https://api.dicebear.com/7.x/icons/svg?seed=${i}`,
  }));

  const filterTools = (tools: Tool[]) =>
    tools.filter((tool) =>
      tool.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0E1E] to-[#1C1B2E] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-[#141322] p-6 space-y-6 sticky top-0 hidden md:block">
        <h1 className="text-2xl font-bold text-white">🚀 AI Tools</h1>
        <nav className="space-y-2">
          {sidebarItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="flex items-center gap-3 text-left w-full text-white/80 hover:bg-[#1C1B2E] p-3 rounded-lg transition-all"
            >
              <Icon className="h-5 w-5 text-[#9B7BFF]" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="space-y-3 pt-4">
          <h3 className="text-white text-sm uppercase tracking-wide">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1 text-xs rounded-full border transition-all font-medium whitespace-nowrap ${
                  activeCategory === category
                    ? "bg-[#9B7BFF] border-[#9B7BFF] text-white"
                    : "bg-[#1B1A2D] border-white/10 text-white/60 hover:border-[#9B7BFF]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-8 py-6 space-y-12">
        {/* Top Search */}
        <div className="sticky top-0 z-50 bg-[#0F0E1E]/90 backdrop-blur-lg py-4">
          <input
            type="text"
            placeholder="Search 300+ AI tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-[#1B1A2D] text-white placeholder-white/50 shadow-md focus:outline-none focus:ring-2 focus:ring-[#9B7BFF] transition-all duration-200"
          />
        </div>

        {/* Sections */}
        <Section title={`Recommended for ${activeCategory}`}>
          <ToolGrid tools={filterTools(dummyTools.slice(0, 6))} />
        </Section>

        <Section title="🚀 New & Trending">
          <ToolGrid tools={filterTools(dummyTools.slice(6, 12))} />
        </Section>

        <Section title="🕘 Your Recent Tools">
          <ToolGrid tools={filterTools(dummyTools.slice(12, 18))} />
        </Section>

        <Section title="⭐ Bookmarked">
          <ToolGrid tools={filterTools(dummyTools.slice(18, 24))} />
        </Section>

        <Section title="🔥 Trending Tools">
          <ToolGrid tools={filterTools(dummyTools.slice(24, 30))} />
        </Section>
      </main>
    </div>
  );
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section>
    <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white tracking-wide">
      <span className="bg-gradient-to-r from-[#9B7BFF] to-[#4C3DFF] bg-clip-text text-transparent">
        {title}
      </span>
    </h2>
    {children}
  </section>
);

const ToolGrid = ({ tools }: { tools: Tool[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
    {tools.map((tool) => (
      <ToolCard key={tool.id} tool={tool} />
    ))}
  </div>
);

const ToolCard = ({ tool }: { tool: Tool }) => (
  <div className="bg-[#1B1A2D]/90 border border-white/10 rounded-xl p-4 hover:border-[#9B7BFF] hover:shadow-[0_0_30px_#9B7BFF44] transition-all cursor-pointer group backdrop-blur-md">
    <img
      src={tool.logoUrl}
      alt={tool.name}
      className="w-12 h-12 mb-3 rounded-md"
    />
    <h3 className="text-lg font-semibold group-hover:text-[#9B7BFF]">{tool.name}</h3>
    <p className="text-sm text-white/60 mt-1">{tool.description}</p>
  </div>
);
