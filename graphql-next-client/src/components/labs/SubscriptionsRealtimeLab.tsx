'use client';

import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Radio, RefreshCw, Wifi, Activity, Play, Square, ShieldAlert } from 'lucide-react';

const GET_LIVE_FEED_POLL = gql`
  query GetLiveSocialStats {
    allPosts(limit: 4) {
      id
      title
      upvotes
      category
      author {
        username
      }
    }
    allUsers {
      id
      username
      reputationScore
    }
  }
`;

export const SubscriptionsRealtimeLab: React.FC = () => {
  const { data, loading, startPolling, stopPolling, refetch }: any = useQuery(GET_LIVE_FEED_POLL);
  const [isPolling, setIsPolling] = useState(false);
  const [pollIntervalMs, setPollIntervalMs] = useState(2500);

  const togglePolling = () => {
    if (isPolling) {
      stopPolling();
      setIsPolling(false);
    } else {
      startPolling(pollIntervalMs);
      setIsPolling(true);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title Banner */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 md:p-8 space-y-4 shadow-xl">
        <span className="text-xs font-mono font-bold uppercase text-rose-400 tracking-wider">Module 7 (Client Mastery &amp; Realtime)</span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Real-Time Synchronization &amp; Apollo Polling
        </h2>
        <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
          While GraphQL Subscriptions over WebSockets or Server-Sent Events (SSE) stream backend events directly over open channels, Apollo Client also supports lightweight **Live Polling** (<code className="font-mono text-emerald-300">startPolling</code>). When enabled, Apollo executes intermittent background delta syncs against our Spring Boot server, instantly keeping user metrics and upvote scores aligned!
        </p>
      </div>

      {/* Real-time Control Studio */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 md:p-8 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-2xl border flex items-center justify-center ${isPolling ? 'bg-rose-950 border-rose-500 text-rose-400 animate-pulse' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
              <Radio className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Live Feed Synchronizer</h3>
              <p className="text-xs text-slate-400">Status: {isPolling ? <span className="text-rose-400 font-bold">ACTIVE (Polling every {pollIntervalMs / 1000}s)</span> : 'STANDBY'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={togglePolling}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition shadow-lg transform active:scale-95 ${
                isPolling ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
              }`}
            >
              {isPolling ? (
                <>
                  <Square className="w-4 h-4 fill-white" />
                  <span>Stop Live Polling</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Apollo Live Polling</span>
                </>
              )}
            </button>

            <button
              onClick={() => refetch()}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition"
              title="Manual Refetch"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Metrics Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Posts Live */}
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 border-b border-slate-900 pb-3">
              <span>LIVE POST UPVOTES</span>
              <Activity className="w-4 h-4 text-pink-400" />
            </div>
            <div className="space-y-3">
              {loading && <p className="text-slate-500 text-xs">Checking live database state...</p>}
              {data?.allPosts?.map((p: any) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                  <span className="font-bold text-white truncate max-w-[220px]">{p.title}</span>
                  <span className="px-2.5 py-1 rounded-lg bg-pink-950 border border-pink-600 text-pink-300 font-mono font-black">
                    {p.upvotes} UPVOTES
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Developer Reputation Board */}
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 border-b border-slate-900 pb-3">
              <span>LIVE DEVELOPER LEADERBOARD</span>
              <Wifi className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="space-y-3">
              {data?.allUsers?.map((u: any, idx: number) => (
                <div key={u.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[10px] text-slate-300">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-purple-300">@{u.username}</span>
                  </div>
                  <span className="text-emerald-400 font-mono font-extrabold">
                    {u.reputationScore} REP
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
