'use client';

import React, { useState } from 'react';
import { GitCompare, ArrowRight, Zap, RefreshCw, Layers, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const RestVsGraphqlLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'simulation' | 'theory'>('simulation');
  const [restLoading, setRestLoading] = useState(false);
  const [restStep, setRestStep] = useState(0);
  const [restData, setRestData] = useState<any>(null);

  const [gqlLoading, setGqlLoading] = useState(false);
  const [gqlData, setGqlData] = useState<any>(null);

  // Simulate REST N+1 cascading fetch waterfall
  const runRestSimulation = async () => {
    setRestLoading(true);
    setRestStep(1);
    setRestData(null);
    
    // Step 1: GET /api/users/linus_torvalds
    await new Promise(r => setTimeout(r, 600));
    setRestStep(2);

    // Step 2: GET /api/users/u4/posts (N+1 secondary trip)
    await new Promise(r => setTimeout(r, 700));
    setRestStep(3);

    // Step 3: GET /api/users/u4/repos
    await new Promise(r => setTimeout(r, 550));
    setRestStep(4);

    // Step 4: GET /api/posts/p4/comments (Deep cascade)
    await new Promise(r => setTimeout(r, 650));
    
    setRestData({
      user: { id: 'u4', username: 'linus_torvalds', role: 'ADMIN', avatarUrl: '...', email: 'hidden@linux.org (Overfetched)' },
      posts: [{ id: 'p4', title: 'Git kernel DAG structure vs GraphQL Schema Type Trees', likes: 490 }],
      repos: [{ id: 'repo4', name: 'linux-kernel', stars: 180000 }],
      comments: [{ id: 'c5', author: 'rishi_dev', text: 'Even in C/Linux engineering, visualization is key!' }],
      stats: { totalRequests: 4, durationMs: 2500, dataSizeBytes: '14.2 KB (Overfetched unneeded fields)' }
    });
    setRestLoading(false);
  };

  // Simulate single-request GraphQL graph traversal
  const runGqlSimulation = async () => {
    setGqlLoading(true);
    setGqlData(null);
    
    await new Promise(r => setTimeout(r, 450));
    
    setGqlData({
      data: {
        userByUsername: {
          username: 'linus_torvalds',
          reputationScore: 9999,
          posts: [{ title: 'Git kernel DAG structure vs GraphQL Schema Type Trees', upvotes: 490 }],
          repositories: [{ name: 'linux-kernel', starCount: 180000 }]
        }
      },
      stats: { totalRequests: 1, durationMs: 450, dataSizeBytes: '2.1 KB (Exact requested payload only!)' }
    });
    setGqlLoading(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Educational Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-900/40 via-purple-900/30 to-indigo-950/50 border border-purple-700/50 p-6 md:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-pink-300 bg-pink-950/80 border border-pink-700/50">
              <GitCompare className="w-3.5 h-3.5" /> Core Architectural Difference
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              The REST Waterfall vs. GraphQL Unified Schema
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              In simple CRUD applications, REST endpoints work fine. However, in complex social graphs like DevGrid where developers create posts, repositories, and nested discussion chains, REST forces clients into cascading <strong className="text-pink-400">N+1 network request waterfalls</strong> and significant <strong className="text-pink-400">overfetching</strong>.
            </p>
          </div>
          <div className="flex bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('simulation')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'simulation' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Live Simulator
            </button>
            <button
              onClick={() => setActiveTab('theory')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'theory' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              PDF Concept Notes
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'simulation' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* REST API Simulator Column */}
          <div className="rounded-3xl bg-slate-900/70 border border-rose-500/30 p-6 shadow-xl space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-3">
                  <span className="p-2.5 rounded-2xl bg-rose-950/80 border border-rose-700/50 text-rose-400 font-extrabold font-mono">
                    REST
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">Multi-Endpoint Waterfall</h3>
                    <p className="text-xs text-rose-300">Cascading network roundtrips</p>
                  </div>
                </div>
                <button
                  onClick={runRestSimulation}
                  disabled={restLoading}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/30 transition transform active:scale-95"
                >
                  {restLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                  <span>Execute REST Fetch</span>
                </button>
              </div>

              {/* Network Step Indicator */}
              <div className="mt-6 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Network Request Waterfall:</p>
                <div className="space-y-2 font-mono text-xs">
                  <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${restStep >= 1 ? 'bg-rose-950/40 border-rose-500/60 text-rose-200 font-bold' : 'bg-slate-950 border-slate-800 text-slate-600'}`}>
                    <span>1. GET /api/users/linus_torvalds</span>
                    {restStep >= 1 && <span className="text-[10px] bg-rose-900/60 px-2 py-0.5 rounded text-rose-300">200 OK (600ms)</span>}
                  </div>
                  <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${restStep >= 2 ? 'bg-rose-950/40 border-rose-500/60 text-rose-200 font-bold' : 'bg-slate-950 border-slate-800 text-slate-600'}`}>
                    <span>2. GET /api/users/u4/posts</span>
                    {restStep >= 2 && <span className="text-[10px] bg-rose-900/60 px-2 py-0.5 rounded text-rose-300">200 OK (700ms)</span>}
                  </div>
                  <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${restStep >= 3 ? 'bg-rose-950/40 border-rose-500/60 text-rose-200 font-bold' : 'bg-slate-950 border-slate-800 text-slate-600'}`}>
                    <span>3. GET /api/users/u4/repositories</span>
                    {restStep >= 3 && <span className="text-[10px] bg-rose-900/60 px-2 py-0.5 rounded text-rose-300">200 OK (550ms)</span>}
                  </div>
                  <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${restStep >= 4 ? 'bg-rose-950/40 border-rose-500/60 text-rose-200 font-bold' : 'bg-slate-950 border-slate-800 text-slate-600'}`}>
                    <span>4. GET /api/posts/p4/comments</span>
                    {restStep >= 4 && <span className="text-[10px] bg-rose-900/60 px-2 py-0.5 rounded text-rose-300">200 OK (650ms)</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Result Stats */}
            {restData && (
              <div className="mt-6 p-4 rounded-2xl bg-rose-950/30 border border-rose-800/50 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-rose-300">
                  <span className="flex items-center gap-1.5"><AlertTriangle className="w-4 h-4 text-rose-400" /> Waterfall Bottleneck:</span>
                  <span>4 Sequential Requests (2,500 ms)</span>
                </div>
                <pre className="text-[11px] font-mono text-slate-300 bg-slate-950 p-3 rounded-xl overflow-x-auto max-h-48">
                  {JSON.stringify(restData, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* GraphQL API Simulator Column */}
          <div className="rounded-3xl bg-slate-900/70 border border-emerald-500/40 p-6 shadow-xl space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-3">
                  <span className="p-2.5 rounded-2xl bg-emerald-950/80 border border-emerald-700/50 text-emerald-400 font-extrabold font-mono">
                    GraphQL
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">Unified Graph Traversal</h3>
                    <p className="text-xs text-emerald-300">Single HTTP POST request</p>
                  </div>
                </div>
                <button
                  onClick={runGqlSimulation}
                  disabled={gqlLoading}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition transform active:scale-95"
                >
                  {gqlLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                  <span>Execute GraphQL Query</span>
                </button>
              </div>

              {/* GraphQL Query Preview */}
              <div className="mt-6 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Single Declarative Query sent to /graphql:</p>
                <pre className="text-xs font-mono text-emerald-300 bg-slate-950 p-4 rounded-2xl border border-emerald-900/50 overflow-x-auto leading-relaxed shadow-inner">
{`query GetProfile {
  userByUsername(username: "linus_torvalds") {
    username
    reputationScore
    posts {
      title
      upvotes
    }
    repositories {
      name
      starCount
    }
  }
}`}
                </pre>
              </div>
            </div>

            {/* GraphQL Result Stats */}
            {gqlData && (
              <div className="mt-6 p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/50 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Optimal Graph Resolution:</span>
                  <span>1 Single Request (450 ms)</span>
                </div>
                <pre className="text-[11px] font-mono text-emerald-200 bg-slate-950 p-3 rounded-xl overflow-x-auto max-h-48">
                  {JSON.stringify(gqlData, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* PDF Concept Notes View */
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-8 space-y-6 text-slate-300">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-purple-400" /> Key Takeaways from <span className="font-mono text-pink-300 bg-pink-950/60 px-2 py-0.5 rounded">graphql.pdf</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <h4 className="font-bold text-pink-400 text-base">1. Overfetching vs. Exact Data Contracting</h4>
              <p className="text-slate-400 leading-relaxed">
                In simple REST systems, endpoints return fixed payloads. If a UI card only needs a developer&apos;s username and reputation, calling <code className="text-slate-300">/api/users/:id</code> overfetches email address, role histories, and database metadata. GraphQL allows clients to specify exact field selections in a single contract.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <h4 className="font-bold text-purple-400 text-base">2. Underfetching & the N+1 Client Problem</h4>
              <p className="text-slate-400 leading-relaxed">
                When displaying a user profile with their 5 latest articles and top GitHub repositories, REST forces the client to wait for the user query to resolve before dispatching <code className="text-slate-300">/users/:id/posts</code> and <code className="text-slate-300">/users/:id/repos</code>. This cascading delay degraded mobile network UX, leading Facebook to create GraphQL in 2012.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <h4 className="font-bold text-indigo-400 text-base">3. Single Endpoint vs Resource Routing</h4>
              <p className="text-slate-400 leading-relaxed">
                REST structures APIs by URL path resource semantics (<code className="text-slate-300">GET /books</code>, <code className="text-slate-300">POST /comments</code>). GraphQL serves all requests over a single endpoint (<code className="text-slate-300">POST /graphql</code>), delegating routing logic to internal type trees and resolver maps on the Spring Boot backend.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <h4 className="font-bold text-emerald-400 text-base">4. Strong Type Validation at the Border</h4>
              <p className="text-slate-400 leading-relaxed">
                Because GraphQL enforces an explicit Schema (defined in <code className="text-slate-300">schema.graphqls</code>), incoming queries are syntactically checked against field names, data types, and nullability constraints before execution ever reaches your Java controller methods.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
