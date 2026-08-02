'use client';

import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Layers, Search, Code, FileText, User as UserIcon, Sparkles, BookOpen } from 'lucide-react';

const GET_POLYMORPHIC_FEED = gql`
  query SearchPolymorphicFeed($query: String!) {
    searchFeed(query: $query) {
      __typename
      ... on User {
        id
        username
        reputationScore
        githubHandle
        role
      }
      ... on ArticlePost {
        id
        title
        content
        category
        upvotes
        readTimeMinutes
        author {
          username
        }
      }
      ... on CodeSnippetPost {
        id
        title
        codeSnippet
        category
        upvotes
        language
        author {
          username
        }
      }
    }
  }
`;

export const TypeSystemExplorerLab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('GraphQL');
  const { data, loading, refetch }: any = useQuery(GET_POLYMORPHIC_FEED, {
    variables: { query: searchQuery },
    fetchPolicy: 'network-only',
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Module Banner */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 md:p-8 space-y-4 shadow-xl">
        <span className="text-xs font-mono font-bold uppercase text-indigo-400 tracking-wider">Module 4</span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Type System, Interfaces &amp; Polymorphic Unions
        </h2>
        <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
          One of the greatest highlights in <code className="text-pink-400 font-mono">graphql.pdf</code> is GraphQL&apos;s ability to query <strong className="text-indigo-400">Unions</strong> and <strong className="text-indigo-400">Interfaces</strong>. In our DevGrid schema, searching returns a union of <code className="text-purple-300 bg-slate-950 px-1 rounded font-mono">User | ArticlePost | CodeSnippetPost</code>. Using **inline fragments** (<code className="text-emerald-400 font-mono">... on Type</code>), Apollo Client renders specialized cards depending on the real-time runtime type!
        </p>
      </div>

      {/* Schema Structure Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-3xl bg-gradient-to-b from-indigo-950/50 to-slate-900 border border-indigo-500/40 space-y-2">
          <div className="flex items-center justify-between text-indigo-300 font-bold text-xs font-mono">
            <span>INTERFACE / UNION</span>
            <Layers className="w-4 h-4 text-indigo-400" />
          </div>
          <h4 className="text-base font-bold text-white">FeedSearchResult Union</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Allows a single GraphQL query array to contain totally diverse object types with varying field structures.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-gradient-to-b from-purple-950/50 to-slate-900 border border-purple-500/40 space-y-2">
          <div className="flex items-center justify-between text-purple-300 font-bold text-xs font-mono">
            <span>INLINE FRAGMENT</span>
            <Code className="w-4 h-4 text-purple-400" />
          </div>
          <h4 className="text-base font-bold text-white">... on CodeSnippetPost</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Extracts syntax highlighting metadata (<code className="text-purple-300 font-mono">language</code>) and raw code strings exclusively for code post types.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-gradient-to-b from-emerald-950/50 to-slate-900 border border-emerald-500/40 space-y-2">
          <div className="flex items-center justify-between text-emerald-300 font-bold text-xs font-mono">
            <span>METADATA FIELD</span>
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <h4 className="text-base font-bold text-white">__typename Introspection</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Apollo automatically injects <code className="text-emerald-300 font-mono">__typename</code> into queries so client components know how to render polymorphic results.
          </p>
        </div>
      </div>

      {/* Polymorphic Search Studio */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3 w-full sm:w-80">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search authors, articles, or snippets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
          <span className="text-xs font-mono text-indigo-300 bg-indigo-950/60 px-3 py-1 rounded-xl border border-indigo-800">
            Querying: searchFeed(query: &quot;{searchQuery}&quot;)
          </span>
        </div>

        <div className="space-y-4">
          {loading && <p className="text-slate-400 text-xs">Searching polymorphic graph...</p>}
          {!loading && data?.searchFeed?.length === 0 && (
            <p className="text-slate-400 text-xs p-4 text-center">No matching authors or posts found for query &quot;{searchQuery}&quot;. Try searching &quot;GraphQL&quot;, &quot;React&quot;, or &quot;Linus&quot;!</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data?.searchFeed?.map((item: any, idx: number) => {
              if (item.__typename === 'User') {
                return (
                  <div key={idx} className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/50 space-y-3 shadow-lg flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded bg-indigo-900/80 text-[10px] font-mono font-extrabold text-indigo-200 uppercase">
                          __typename: User
                        </span>
                        <UserIcon className="w-4 h-4 text-indigo-400" />
                      </div>
                      <h4 className="text-lg font-extrabold text-white mt-2">@{item.username}</h4>
                      <p className="text-xs text-indigo-300 font-medium mt-1">
                        Role: {item.role} &bull; GitHub: <span className="font-mono text-white">/{item.githubHandle}</span>
                      </p>
                    </div>
                    <div className="pt-2 border-t border-indigo-900/40 flex items-center justify-between text-[11px] text-slate-300 font-mono">
                      <span>Reputation Score</span>
                      <span className="text-indigo-400 font-bold">{item.reputationScore} PTS</span>
                    </div>
                  </div>
                );
              }

              if (item.__typename === 'ArticlePost') {
                return (
                  <div key={idx} className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/50 space-y-3 shadow-lg flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded bg-purple-900/80 text-[10px] font-mono font-extrabold text-purple-200 uppercase">
                          __typename: ArticlePost
                        </span>
                        <FileText className="w-4 h-4 text-purple-400" />
                      </div>
                      <h4 className="text-base font-extrabold text-white mt-2">{item.title}</h4>
                      <p className="text-xs text-slate-300 line-clamp-3 mt-1 leading-relaxed">{item.content}</p>
                    </div>
                    <div className="pt-2 border-t border-purple-900/40 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>By @{item.author?.username} &bull; {item.readTimeMinutes} min read</span>
                      <span className="text-purple-400 font-bold">{item.upvotes} Upvotes</span>
                    </div>
                  </div>
                );
              }

              if (item.__typename === 'CodeSnippetPost') {
                return (
                  <div key={idx} className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/50 space-y-3 shadow-lg flex flex-col justify-between md:col-span-2">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded bg-emerald-900/80 text-[10px] font-mono font-extrabold text-emerald-200 uppercase">
                          __typename: CodeSnippetPost ({item.language || 'JAVASCRIPT'})
                        </span>
                        <Code className="w-4 h-4 text-emerald-400" />
                      </div>
                      <h4 className="text-base font-extrabold text-white mt-2">{item.title}</h4>
                      <pre className="mt-3 p-4 rounded-xl bg-slate-950 text-emerald-300 font-mono text-xs overflow-x-auto border border-emerald-900/40 shadow-inner">
                        {item.codeSnippet}
                      </pre>
                    </div>
                    <div className="pt-2 border-t border-emerald-900/40 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>Shared by @{item.author?.username}</span>
                      <span className="text-emerald-400 font-bold">{item.upvotes} Upvotes</span>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
