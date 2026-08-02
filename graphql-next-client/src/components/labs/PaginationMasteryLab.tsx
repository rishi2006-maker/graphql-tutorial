'use client';

import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { ListOrdered, ArrowRight, ArrowLeft, RefreshCw, Check, Zap } from 'lucide-react';

const GET_OFFSET_POSTS = gql`
  query GetOffsetPosts($limit: Int!, $offset: Int!) {
    postsOffset(limit: $limit, offset: $offset) {
      id
      title
      category
      upvotes
      author {
        username
      }
    }
  }
`;

const GET_CURSOR_POSTS = gql`
  query GetCursorPosts($first: Int!, $after: String) {
    postsConnection(first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          title
          category
          upvotes
          author {
            username
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const PaginationMasteryLab: React.FC = () => {
  const [offsetPage, setOffsetPage] = useState<number>(0);
  const pageSize = 3;
  const { data: offsetData, loading: offsetLoading }: any = useQuery(GET_OFFSET_POSTS, {
    variables: { limit: pageSize, offset: offsetPage * pageSize },
  });

  const { data: cursorData, loading: cursorLoading, fetchMore }: any = useQuery(GET_CURSOR_POSTS, {
    variables: { first: 3, after: null },
  });

  const handleNextCursor = () => {
    const endCursor = cursorData?.postsConnection?.pageInfo?.endCursor;
    if (!endCursor) return;
    fetchMore({
      variables: { after: endCursor },
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title Banner */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 md:p-8 space-y-4 shadow-xl">
        <span className="text-xs font-mono font-bold uppercase text-blue-400 tracking-wider">Module 6 (Server Performance)</span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Pagination Architectures: Offset vs. Relay Cursor Connections
        </h2>
        <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
          When rendering massive feeds, pagination is mandatory. While traditional <strong className="text-blue-300">Offset-Based Pagination</strong> (<code className="font-mono">limit/offset</code>) is straightforward, adding new posts while a user scrolls causes skipped or duplicated UI elements. GraphQL industry conventions champion <strong className="text-pink-400">Relay Cursor Connections</strong> (<code className="font-mono">first/after</code> with <code className="font-mono">edges &amp; nodes</code>) for robust infinite scrolling!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Offset Pagination Studio */}
        <div className="rounded-3xl bg-slate-900/70 border border-blue-500/40 p-6 shadow-xl space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded-xl bg-blue-950 text-blue-300 font-mono font-bold text-xs border border-blue-700/50">
                  OFFSET SLICING
                </span>
                <h3 className="text-base font-bold text-white">postsOffset(limit, offset)</h3>
              </div>
            </div>

            <div className="mt-4 space-y-3 min-h-[260px]">
              {offsetLoading && <p className="text-slate-400 text-xs p-4">Slicing rows...</p>}
              {offsetData?.postsOffset?.map((p: any) => (
                <div key={p.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-blue-400 font-mono font-bold mr-2">#{p.id}</span>
                    <span className="text-white font-semibold">{p.title}</span>
                  </div>
                  <span className="text-slate-400">@{p.author?.username}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
            <button
              onClick={() => setOffsetPage(Math.max(0, offsetPage - 1))}
              disabled={offsetPage === 0 || offsetLoading}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Previous Page
            </button>
            <span className="text-xs font-mono text-slate-300">Page {offsetPage + 1} (Offset: {offsetPage * pageSize})</span>
            <button
              onClick={() => setOffsetPage(offsetPage + 1)}
              disabled={(offsetData?.postsOffset?.length || 0) < pageSize}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 transition"
            >
              Next Page <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Relay Cursor Connection Studio */}
        <div className="rounded-3xl bg-slate-900/70 border border-pink-500/40 p-6 shadow-xl space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded-xl bg-pink-950 text-pink-300 font-mono font-bold text-xs border border-pink-700/50">
                  RELAY CONNECTION
                </span>
                <h3 className="text-base font-bold text-white">postsConnection(first, after)</h3>
              </div>
            </div>

            <div className="mt-4 space-y-3 min-h-[260px]">
              {cursorLoading && <p className="text-slate-400 text-xs p-4">Navigating cursors...</p>}
              {cursorData?.postsConnection?.edges?.map((edge: any) => (
                <div key={edge.cursor} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">{edge.node.title}</span>
                    <span className="text-emerald-400 font-bold">{edge.node.upvotes} Upvotes</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>Node ID: {edge.node.id}</span>
                    <span>Cursor: &quot;{edge.cursor}&quot;</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
            <div className="text-xs font-mono text-pink-300">
              Has Next Page: <strong className="text-white uppercase">{String(cursorData?.postsConnection?.pageInfo?.hasNextPage || false)}</strong>
            </div>
            <button
              onClick={handleNextCursor}
              disabled={!cursorData?.postsConnection?.pageInfo?.hasNextPage}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-pink-600/30 transition transform active:scale-95"
            >
              <span>Load More (Cursor Merge)</span>
              <Zap className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
