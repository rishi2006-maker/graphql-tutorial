'use client';

import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Zap, AlertTriangle, CheckCircle2, Server, Clock, Database, Play } from 'lucide-react';

const RUN_BENCHMARK = gql`
  query RunDataLoaderBenchmark($useDataLoader: Boolean!) {
    benchmarkDataLoader(useDataLoader: $useDataLoader) {
      mode
      totalItemsResolved
      simulatedSqlQueries
      executionTimeMs
      explanation
    }
  }
`;

export const NPlus1DataLoaderLab: React.FC = () => {
  const [useDataLoader, setUseDataLoader] = useState<boolean>(true);
  const { data, loading, refetch }: any = useQuery(RUN_BENCHMARK, {
    variables: { useDataLoader },
    fetchPolicy: 'network-only',
  });

  const report = data?.benchmarkDataLoader;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Module Title Banner */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 md:p-8 space-y-4 shadow-xl">
        <span className="text-xs font-mono font-bold uppercase text-emerald-400 tracking-wider">Module 5 (Server Performance)</span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          The N+1 Database Query Bottleneck &amp; Spring DataLoaders
        </h2>
        <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
          The most critical operational warning in <code className="text-pink-400 font-mono">graphql.pdf</code> is the **N+1 Database Query Problem**. If you fetch 50 developer posts and each post resolves its author via simple individual field mapping (<code className="text-rose-300 font-mono">@SchemaMapping</code>), the server executes <strong className="text-rose-400">1 + 50 = 51 SQL SELECTs!</strong> Using Spring Boot&apos;s <code className="text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded font-mono">@BatchMapping</code>, resolutions are harvested and batched into exactly **1 single SQL IN Query**!
        </p>
      </div>

      {/* Interactive Benchmark Controller */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-8 shadow-xl space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-emerald-400" /> Live Postgres DataLoader Benchmark Studio
            </h3>
            <p className="text-xs text-slate-400 mt-1">Select an execution mode below and execute against the live Spring Boot server:</p>
          </div>

          <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 gap-2">
            <button
              onClick={() => { setUseDataLoader(false); refetch({ useDataLoader: false }); }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${!useDataLoader ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30' : 'text-slate-400 hover:text-white'}`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Unbatched (@SchemaMapping)</span>
            </button>
            <button
              onClick={() => { setUseDataLoader(true); refetch({ useDataLoader: true }); }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${useDataLoader ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' : 'text-slate-400 hover:text-white'}`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Batched DataLoader (@BatchMapping)</span>
            </button>
          </div>
        </div>

        {/* Real-time Benchmark Histogram Results */}
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm font-mono animate-pulse">
            Executing relational query benchmark on Spring Boot server...
          </div>
        ) : report ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* SQL Query Count Metric Card */}
            <div className={`p-6 rounded-3xl border flex flex-col justify-between shadow-xl ${report.simulatedSqlQueries > 5 ? 'bg-rose-950/20 border-rose-500/50' : 'bg-emerald-950/20 border-emerald-500/50'}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase font-bold text-slate-400">Database Trip Count</span>
                <Database className={`w-5 h-5 ${report.simulatedSqlQueries > 5 ? 'text-rose-400' : 'text-emerald-400'}`} />
              </div>
              <div className="my-6">
                <span className={`text-4xl md:text-5xl font-black font-mono tracking-tight ${report.simulatedSqlQueries > 5 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {report.simulatedSqlQueries} SQLs
                </span>
                <p className="text-xs text-slate-300 mt-2">
                  {report.simulatedSqlQueries > 5 ? 'Cascading N+1 redundant database queries triggered' : 'Collapsed into 1 main query + 1 batched IN query'}
                </p>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-500 ${report.simulatedSqlQueries > 5 ? 'bg-rose-500 w-full' : 'bg-emerald-500 w-[8%]'}`}></div>
              </div>
            </div>

            {/* Latency Timing Card */}
            <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase font-bold text-slate-400">Execution Latency</span>
                <Clock className="w-5 h-5 text-purple-400" />
              </div>
              <div className="my-6">
                <span className="text-4xl md:text-5xl font-black font-mono tracking-tight text-purple-300">
                  {report.executionTimeMs} ms
                </span>
                <p className="text-xs text-slate-400 mt-2">Total roundtrip resolver processing time</p>
              </div>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-xl w-fit">
                Items Evaluated: {report.totalItemsResolved} Posts
              </span>
            </div>

            {/* Explanation & Architectural take */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-950 border border-purple-500/40 flex flex-col justify-between shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase font-bold text-purple-300">Server Internal Resolution</span>
                <Zap className="w-5 h-5 text-pink-400" />
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-mono my-4 bg-slate-950/90 p-3.5 rounded-2xl border border-purple-900/50 shadow-inner">
                &quot;{report.explanation}&quot;
              </p>
              <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between pt-2 border-t border-slate-800/80">
                <span>Pattern: DataLoader Registry</span>
                <span className="text-emerald-400 font-bold">Recommended for Prod</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
