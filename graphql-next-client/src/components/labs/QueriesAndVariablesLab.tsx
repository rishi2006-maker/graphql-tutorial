'use client';

import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Search, Sliders, Play, Terminal, CheckSquare, Square, RefreshCw } from 'lucide-react';

const GET_POSTS_WITH_PARAMS = gql`
  query GetDeveloperFeed($category: PostCategory, $limit: Int, $withAuthor: Boolean!, $withTimestamp: Boolean!) {
    allPosts(category: $category, limit: $limit) {
      id
      title
      category
      upvotes
      postType
      createdAt @include(if: $withTimestamp)
      author @skip(if: $withAuthor) {
        username
        reputationScore
      }
    }
  }
`;

export const QueriesAndVariablesLab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [limit, setLimit] = useState<number>(5);
  const [skipAuthor, setSkipAuthor] = useState<boolean>(false);
  const [includeTimestamp, setIncludeTimestamp] = useState<boolean>(true);

  const { data, loading, error, refetch }: any = useQuery(GET_POSTS_WITH_PARAMS, {
    variables: {
      category: selectedCategory === 'ALL' ? null : selectedCategory,
      limit: Number(limit),
      withAuthor: skipAuthor,
      withTimestamp: includeTimestamp,
    },
    fetchPolicy: 'network-only',
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Module Title Banner */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 md:p-8 space-y-4 shadow-xl">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase text-purple-400 tracking-wider">Module 2</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
              Queries, Variables &amp; Schema Directives
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              GraphQL enables dynamic filtering directly within the query syntax. Try toggling the schema directives <code className="text-pink-300 bg-pink-950/60 px-1.5 py-0.5 rounded font-mono">@skip</code> and <code className="text-pink-300 bg-pink-950/60 px-1.5 py-0.5 rounded font-mono">@include</code> below to instruct the server on which relational fields to exclude or include!
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/30 transition transform active:scale-95"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refetch Live Database</span>
          </button>
        </div>

        {/* Interactive GUI Control Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 block">Filter Category ($category):</label>
            <select
              value={selectedCategory || 'ALL'}
              onChange={(e) => setSelectedCategory(e.target.value === 'ALL' ? null : e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-medium text-white focus:outline-none focus:border-purple-500 transition"
            >
              <option value="ALL">ALL CATEGORIES</option>
              <option value="TUTORIAL">TUTORIAL</option>
              <option value="SHOWCASE">SHOWCASE</option>
              <option value="DISCUSSION">DISCUSSION</option>
              <option value="NEWS">NEWS</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 block">Result Limit ($limit): {limit}</label>
            <input
              type="range"
              min="1"
              max="10"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          <div className="space-y-2 flex flex-col justify-end">
            <button
              onClick={() => setSkipAuthor(!skipAuthor)}
              className="flex items-center space-x-2.5 px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200 transition"
            >
              {skipAuthor ? <CheckSquare className="w-4 h-4 text-pink-400" /> : <Square className="w-4 h-4 text-slate-600" />}
              <span>@skip(if: $withAuthor)</span>
            </button>
          </div>

          <div className="space-y-2 flex flex-col justify-end">
            <button
              onClick={() => setIncludeTimestamp(!includeTimestamp)}
              className="flex items-center space-x-2.5 px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200 transition"
            >
              {includeTimestamp ? <CheckSquare className="w-4 h-4 text-emerald-400" /> : <Square className="w-4 h-4 text-slate-600" />}
              <span>@include(if: $withTimestamp)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Code & Response Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* GraphQL Request Column */}
        <div className="rounded-3xl bg-slate-900/70 border border-purple-500/40 p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2 font-mono">
                <Terminal className="w-4 h-4 text-purple-400" /> Live GraphQL Query Payload
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-950 text-purple-200 border border-purple-800/60">
                POST /graphql
              </span>
            </div>
            <pre className="text-xs font-mono text-purple-200 bg-slate-950 p-4 rounded-2xl border border-slate-800/80 mt-4 overflow-x-auto leading-relaxed">
{`query GetDeveloperFeed(
  $category: PostCategory = ${selectedCategory ? `"${selectedCategory}"` : 'null'}
  $limit: Int = ${limit}
  $withAuthor: Boolean = ${skipAuthor}
  $withTimestamp: Boolean = ${includeTimestamp}
) {
  allPosts(category: $category, limit: $limit) {
    id
    title
    category
    upvotes
    postType
    createdAt @include(if: $withTimestamp)
    author @skip(if: $withAuthor) {
      username
      reputationScore
    }
  }
}`}
            </pre>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 to-slate-950 border border-purple-800/40 text-[11px] text-slate-300 leading-relaxed">
            <strong className="text-purple-300">Why Directives Matter:</strong> Directives like <code className="text-pink-300 font-mono">@skip</code> and <code className="text-emerald-300 font-mono">@include</code> allow frontends to alter query shape dynamically without duplicating GraphQL string declarations.
          </div>
        </div>

        {/* Live Database JSON Output Column */}
        <div className="rounded-3xl bg-slate-900/70 border border-emerald-500/40 p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2 font-mono">
                <Play className="w-4 h-4 text-emerald-400" /> Live PostgreSQL JSON Response
              </span>
              {loading ? (
                <span className="text-[10px] font-mono px-2 py-0.5 bg-yellow-950 text-yellow-300 border border-yellow-800 rounded animate-pulse">Fetching...</span>
              ) : (
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-emerald-950 text-emerald-200 border border-emerald-800/60">200 OK</span>
              )}
            </div>
            {error ? (
              <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-600 text-rose-200 text-xs font-mono mt-4">
                Error connecting to backend: {error.message}. Ensure Spring Boot server is running on port 8080!
              </div>
            ) : (
              <pre className="text-xs font-mono text-emerald-300 bg-slate-950 p-4 rounded-2xl border border-slate-800/80 mt-4 overflow-x-auto max-h-[420px]">
                {loading ? 'Executing query via Apollo Client...' : JSON.stringify(data, null, 2)}
              </pre>
            )}
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 font-mono">
            Notice how fields vanish instantly from the JSON body when you toggle the directives above! Zero server code reloads needed.
          </div>
        </div>
      </div>
    </div>
  );
};
