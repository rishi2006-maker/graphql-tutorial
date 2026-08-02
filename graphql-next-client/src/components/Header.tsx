'use client';

import React from 'react';
import { Database, Server, Zap, BookOpen, ExternalLink, Activity } from 'lucide-react';

interface HeaderProps {
  activeModuleTitle: string;
  pdfRef: string;
}

export const Header: React.FC<HeaderProps> = ({ activeModuleTitle, pdfRef }) => {
  return (
    <header className="sticky top-0 z-40 flex flex-col md:flex-row items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl transition-all duration-300">
      {/* Brand Title & Active Module */}
      <div className="flex items-center space-x-4 mb-3 md:mb-0">
        <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-600 via-purple-600 to-indigo-600 p-[2px] shadow-lg shadow-pink-500/20 animate-pulse">
          <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-pink-400" />
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
              DevGrid GraphQL Mastery
            </h1>
            <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-pink-300 bg-pink-950/60 border border-pink-800/50 rounded-full shadow-inner">
              Next.js 15 + Apollo
            </span>
          </div>
          <p className="text-sm font-medium text-slate-300 flex items-center gap-2 mt-0.5">
            <span>Module:</span>
            <span className="text-white font-bold tracking-wide">{activeModuleTitle}</span>
          </p>
        </div>
      </div>

      {/* Concept Badges & Backend Server Health Indicator */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/60 shadow-sm transition hover:border-purple-500/50">
          <BookOpen className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-semibold text-slate-400">Guide Reference:</span>
          <span className="text-xs font-bold text-purple-200">{pdfRef}</span>
        </div>

        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 shadow-lg shadow-emerald-950/50">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <Server className="w-4 h-4 text-emerald-400 ml-1" />
          <span className="text-xs font-mono font-bold tracking-wide">Spring Boot 8080</span>
        </div>

        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-950/40 border border-blue-500/30 text-blue-300">
          <Database className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-mono font-bold">PostgreSql:5433</span>
        </div>

        <a
          href="http://localhost:8080/graphiql"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold shadow-md shadow-indigo-500/20 hover:from-indigo-500 hover:to-purple-500 transition-all transform active:scale-95"
        >
          <span>GraphiQL Studio</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </header>
  );
};
