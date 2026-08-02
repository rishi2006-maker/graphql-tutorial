'use client';

import React from 'react';
import { Compass, Server, Database, Layers, CheckCircle2, Zap, ShieldCheck, Code2 } from 'lucide-react';

export const OverviewLab: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/50 via-indigo-950/70 to-slate-900 border border-purple-500/40 p-8 shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-purple-300 bg-purple-950/80 border border-purple-700/50 shadow-inner">
            <Zap className="w-3.5 h-3.5 text-purple-400" /> Complete Full-Stack Learning Hub
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            DevGrid: Modern Developer Social Graph
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Welcome to the ultimate interactive GraphQL mastery platform! Designed as both an enterprise starter application and a self-documenting reference manual based on <code className="text-pink-400 bg-slate-950 px-2 py-0.5 rounded font-mono font-bold">graphql.pdf</code>. Whenever you return to this workspace, you can explore live network calls, test mutations against PostgreSQL, and inspect best-practice design patterns.
          </p>
        </div>
      </div>

      {/* System Architecture Diagram Card */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-8 space-y-6 shadow-xl">
        <h3 className="text-xl font-bold text-white flex items-center gap-2.5 border-b border-slate-800 pb-4">
          <Layers className="w-6 h-6 text-indigo-400" /> Full-Stack Architectural Blueprint
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {/* Client Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-pink-500/30 shadow-lg relative overflow-hidden group hover:border-pink-500/60 transition">
            <div className="w-12 h-12 rounded-2xl bg-pink-950/80 border border-pink-700 text-pink-400 flex items-center justify-center mx-auto mb-4">
              <Code2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">1. Next.js + Apollo Client</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standalone frontend serving interactive labs. Manages state via normalized <code className="text-pink-300 font-mono">InMemoryCache</code> and declarative query hooks.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex justify-center items-center gap-1.5 text-[11px] text-pink-300 font-mono font-semibold">
              <span>Port: 3000</span> &bull; <span>Apollo Provider</span>
            </div>
          </div>

          {/* Server Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-purple-500/30 shadow-lg relative overflow-hidden group hover:border-purple-500/60 transition">
            <div className="w-12 h-12 rounded-2xl bg-purple-950/80 border border-purple-700 text-purple-400 flex items-center justify-center mx-auto mb-4">
              <Server className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">2. Spring Boot GraphQL Server</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Processes single endpoint requests. Resolves queries via <code className="text-purple-300 font-mono">@QueryMapping</code> and prevents N+1 DB bottlenecks with <code className="text-purple-300 font-mono">@BatchMapping</code>.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex justify-center items-center gap-1.5 text-[11px] text-purple-300 font-mono font-semibold">
              <span>Port: 8080/graphql</span> &bull; <span>Spring Data JPA</span>
            </div>
          </div>

          {/* Database Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-blue-500/30 shadow-lg relative overflow-hidden group hover:border-blue-500/60 transition">
            <div className="w-12 h-12 rounded-2xl bg-blue-950/80 border border-blue-700 text-blue-400 flex items-center justify-center mx-auto mb-4">
              <Database className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">3. PostgreSQL Database (Docker)</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Persistent relational storage containerized in Docker. Auto-seeded on initial server boot with rich developer accounts, repositories, and technical discussions.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex justify-center items-center gap-1.5 text-[11px] text-blue-300 font-mono font-semibold">
              <span>Port: 5433</span> &bull; <span>devgrid db</span>
            </div>
          </div>
        </div>
      </div>

      {/* Complete PDF Concept Coverage Matrix */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-8 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
              <ShieldCheck className="w-6 h-6 text-emerald-400" /> Comprehensive GraphQL Concept Checklist
            </h3>
            <p className="text-xs text-slate-400 mt-1">Every core concept from your study guide is actively demonstrated across the sidebar modules:</p>
          </div>
          <span className="px-3 py-1 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded-xl font-mono text-xs font-bold self-start">
            100% Roadmap Coverage
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-medium text-slate-300">
          {[
            "Queries & Parameterized Arguments",
            "Field Aliases & Response Renaming",
            "Schema Directives (@skip, @include)",
            "Mutations (Create, Update State)",
            "Strong Type System & Scalars",
            "Enumeration Types (PostCategory)",
            "Interfaces (Polymorphic FeedItem)",
            "Unions (FeedSearchResult)",
            "Inline Fragments (... on Type)",
            "N+1 Database Query Problem",
            "DataLoaders (@BatchMapping)",
            "Offset vs Cursor Relay Pagination",
            "Real-time Subscriptions & Polling",
            "Apollo InMemoryCache Normalization",
            "Fetch Policies (Cache-First, etc.)"
          ].map((item, idx) => (
            <div key={idx} className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-950/70 border border-slate-800/70">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="truncate">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
