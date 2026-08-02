'use client';

import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Database, ShieldCheck, Zap, RefreshCw, Layers, Clock } from 'lucide-react';

const GET_CACHED_USERS = gql`
  query GetUsersForCacheTest {
    allUsers {
      id
      username
      role
      reputationScore
    }
  }
`;

export const ApolloCachingLab: React.FC = () => {
  const [fetchPolicy, setFetchPolicy] = useState<any>('cache-first');
  const [lastQueryDuration, setLastQueryDuration] = useState<number | null>(null);

  const { data, loading, refetch }: any = useQuery(GET_CACHED_USERS, {
    fetchPolicy: fetchPolicy,
    notifyOnNetworkStatusChange: true,
  });

  const handleTestExecution = async (policy: any) => {
    setFetchPolicy(policy);
    const start = performance.now();
    await refetch();
    const duration = Math.round(performance.now() - start);
    setLastQueryDuration(duration);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 md:p-8 space-y-4 shadow-xl">
        <span className="text-xs font-mono font-bold uppercase text-purple-400 tracking-wider">Module 8 (Client Mastery)</span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Apollo InMemoryCache &amp; Fetch Policy Deep Dive
        </h2>
        <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Apollo Client separates itself from generic HTTP clients through its sophisticated normalized cache architecture. By testing different **Fetch Policies** below, observe how <code className="text-pink-300 font-mono">cache-first</code> resolves instantly in ~0ms directly from RAM without hitting the wire, whereas <code className="text-emerald-300 font-mono">network-only</code> guarantees fresh database state!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => handleTestExecution('cache-first')}
          className={`p-6 rounded-3xl border cursor-pointer transition-all duration-200 shadow-xl flex flex-col justify-between ${fetchPolicy === 'cache-first' ? 'bg-purple-950/50 border-purple-500 shadow-purple-950/50 scale-[1.02]' : 'bg-slate-900/60 border-slate-800 hover:border-purple-800'}`}
        >
          <div>
            <span className="px-2.5 py-1 rounded bg-purple-900/80 text-purple-200 font-mono text-[10px] font-extrabold uppercase">
              DEFAULT POLICY
            </span>
            <h4 className="text-lg font-bold text-white mt-3">cache-first</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Checks local memory cache first. If matching IDs exist, resolves immediately without initiating an HTTP network request to Spring Boot.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between font-mono text-xs text-purple-300">
            <span>Expected Latency:</span>
            <strong className="text-emerald-400 font-bold">~0-2 ms</strong>
          </div>
        </div>

        <div 
          onClick={() => handleTestExecution('network-only')}
          className={`p-6 rounded-3xl border cursor-pointer transition-all duration-200 shadow-xl flex flex-col justify-between ${fetchPolicy === 'network-only' ? 'bg-pink-950/50 border-pink-500 shadow-pink-950/50 scale-[1.02]' : 'bg-slate-900/60 border-slate-800 hover:border-pink-800'}`}
        >
          <div>
            <span className="px-2.5 py-1 rounded bg-pink-900/80 text-pink-200 font-mono text-[10px] font-extrabold uppercase">
              ALWAYS FRESH
            </span>
            <h4 className="text-lg font-bold text-white mt-3">network-only</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Bypasses cached data and always executes an HTTP POST to <code className="text-slate-300 font-mono">/graphql</code>. Updates local cache with the incoming payload.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between font-mono text-xs text-pink-300">
            <span>Expected Latency:</span>
            <strong className="text-pink-400 font-bold">~25-80 ms</strong>
          </div>
        </div>

        <div 
          onClick={() => handleTestExecution('cache-and-network')}
          className={`p-6 rounded-3xl border cursor-pointer transition-all duration-200 shadow-xl flex flex-col justify-between ${fetchPolicy === 'cache-and-network' ? 'bg-emerald-950/50 border-emerald-500 shadow-emerald-950/50 scale-[1.02]' : 'bg-slate-900/60 border-slate-800 hover:border-emerald-800'}`}
        >
          <div>
            <span className="px-2.5 py-1 rounded bg-emerald-900/80 text-emerald-200 font-mono text-[10px] font-extrabold uppercase">
              HYBRID UX
            </span>
            <h4 className="text-lg font-bold text-white mt-3">cache-and-network</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Returns cached results instantly to render the UI while silently issuing an asynchronous background network request to re-synchronize data.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between font-mono text-xs text-emerald-300">
            <span>Expected Latency:</span>
            <strong className="text-indigo-300 font-bold">Instant + Sync</strong>
          </div>
        </div>
      </div>

      {/* Live Response Panel */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold text-slate-300 uppercase flex items-center gap-2">
            <Database className="w-4 h-4 text-purple-400" /> Active Normalized Cache Payload
          </span>
          {lastQueryDuration !== null && (
            <span className="text-xs font-mono bg-purple-950 text-purple-200 px-3 py-1 rounded-xl border border-purple-800 font-extrabold">
              Last Execution Latency: {lastQueryDuration} ms ({fetchPolicy})
            </span>
          )}
        </div>

        <pre className="text-xs font-mono text-purple-200 bg-slate-950 p-4 rounded-2xl overflow-x-auto max-h-[340px] border border-slate-800/80">
          {loading ? 'Refetching network wire...' : JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
};
