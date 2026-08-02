'use client';

import React, { useState } from 'react';
import { TUTORIAL_MODULES, ModuleId } from '../types/tutorial';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { OverviewLab } from './labs/OverviewLab';
import { RestVsGraphqlLab } from './labs/RestVsGraphqlLab';
import { QueriesAndVariablesLab } from './labs/QueriesAndVariablesLab';
import { MutationsAndCacheLab } from './labs/MutationsAndCacheLab';
import { TypeSystemExplorerLab } from './labs/TypeSystemExplorerLab';
import { NPlus1DataLoaderLab } from './labs/NPlus1DataLoaderLab';
import { PaginationMasteryLab } from './labs/PaginationMasteryLab';
import { SubscriptionsRealtimeLab } from './labs/SubscriptionsRealtimeLab';
import { ApolloCachingLab } from './labs/ApolloCachingLab';

export const MainHub: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleId>('overview');

  const currentModule = TUTORIAL_MODULES.find((m) => m.id === activeModule) || TUTORIAL_MODULES[0];

  const renderActiveLab = () => {
    switch (activeModule) {
      case 'overview':
        return <OverviewLab />;
      case 'rest_vs_graphql':
        return <RestVsGraphqlLab />;
      case 'queries_variables':
        return <QueriesAndVariablesLab />;
      case 'mutations_cache':
        return <MutationsAndCacheLab />;
      case 'type_system':
        return <TypeSystemExplorerLab />;
      case 'n_plus_one':
        return <NPlus1DataLoaderLab />;
      case 'pagination':
        return <PaginationMasteryLab />;
      case 'subscriptions_polling':
        return <SubscriptionsRealtimeLab />;
      case 'apollo_caching':
        return <ApolloCachingLab />;
      default:
        return <OverviewLab />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-pink-600 selection:text-white relative overflow-hidden">
      {/* Background ambient neon glow spheres */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute top-[40%] left-[50%] translate-x-[-50%] w-[800px] h-[400px] bg-pink-600/10 rounded-full blur-[180px] pointer-events-none"></div>

      <Header activeModuleTitle={`${currentModule.title}`} pdfRef={currentModule.pdfReference} />

      <div className="flex-1 flex flex-col lg:flex-row relative z-10">
        <Sidebar activeModule={activeModule} onSelectModule={setActiveModule} />

        <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto custom-scrollbar">
          {renderActiveLab()}
        </main>
      </div>
    </div>
  );
};
