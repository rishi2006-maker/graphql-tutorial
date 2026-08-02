'use client';

import React from 'react';
import { TUTORIAL_MODULES, ModuleId, TutorialModule } from '../types/tutorial';
import { 
  Compass, GitCompare, Search, Edit3, Layers, Zap, 
  ListOrdered, Radio, Database, ChevronRight, BookOpen 
} from 'lucide-react';

interface SidebarProps {
  activeModule: ModuleId;
  onSelectModule: (id: ModuleId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeModule, onSelectModule }) => {
  const renderIcon = (iconName: string, active: boolean) => {
    const iconProps = { 
      className: `w-5 h-5 transition-transform duration-200 ${active ? 'scale-110 text-white' : 'text-slate-400 group-hover:text-purple-300'}` 
    };
    switch (iconName) {
      case 'Compass': return <Compass {...iconProps} />;
      case 'GitCompare': return <GitCompare {...iconProps} />;
      case 'Search': return <Search {...iconProps} />;
      case 'Edit3': return <Edit3 {...iconProps} />;
      case 'Layers': return <Layers {...iconProps} />;
      case 'Zap': return <Zap {...iconProps} />;
      case 'ListOrdered': return <ListOrdered {...iconProps} />;
      case 'Radio': return <Radio {...iconProps} />;
      case 'Database': return <Database {...iconProps} />;
      default: return <BookOpen {...iconProps} />;
    }
  };

  const categories = ['CORE CONCEPTS', 'SCHEMA & TYPES', 'SERVER PERFORMANCE', 'CLIENT MASTERY'] as const;

  return (
    <aside className="w-full lg:w-80 border-r border-slate-800/80 bg-slate-950/50 backdrop-blur-xl h-auto lg:h-[calc(100vh-80px)] overflow-y-auto flex flex-col justify-between custom-scrollbar">
      <div className="p-4 space-y-6">
        {categories.map((cat) => {
          const modules = TUTORIAL_MODULES.filter(m => m.category === cat);
          return (
            <div key={cat} className="space-y-2">
              <h3 className="px-3 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                {cat}
              </h3>
              <div className="space-y-1">
                {modules.map((mod) => {
                  const isActive = activeModule === mod.id;
                  return (
                    <button
                      key={mod.id}
                      onClick={() => onSelectModule(mod.id)}
                      className={`w-full group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all duration-200 font-medium ${
                        isActive
                          ? 'bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-indigo-600/20 border border-purple-500/50 text-white shadow-lg shadow-purple-950/50'
                          : 'text-slate-300 hover:bg-slate-900/70 hover:text-white border border-transparent hover:border-slate-800'
                      }`}
                    >
                      <div className="flex items-center space-x-3.5 min-w-0">
                        <div className={`p-2 rounded-lg transition-colors ${
                          isActive ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-900 group-hover:bg-slate-800'
                        }`}>
                          {renderIcon(mod.iconName, isActive)}
                        </div>
                        <div className="truncate">
                          <p className="text-sm font-semibold truncate tracking-tight">{mod.title}</p>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">{mod.subtitle}</p>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${isActive ? 'translate-x-0.5 text-purple-400 font-bold' : 'group-hover:translate-x-0.5'}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Educational Footer Card */}
      <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-indigo-800/50 shadow-xl">
        <div className="flex items-center space-x-2.5 text-indigo-300 font-bold text-xs uppercase tracking-wide mb-1">
          <BookOpen className="w-4 h-4 text-indigo-400" />
          <span>Study Companion</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Each module below corresponds directly to concepts from <code className="text-pink-300 bg-pink-950/50 px-1 py-0.5 rounded font-mono">graphql.pdf</code>. Interact with the UI controls to observe real-time schema resolutions!
        </p>
      </div>
    </aside>
  );
};
