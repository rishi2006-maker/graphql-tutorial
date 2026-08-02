'use client';

import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import { Edit3, ThumbsUp, Send, CheckCircle2, MessageSquare, Flame, Sparkles } from 'lucide-react';

const GET_ALL_POSTS = gql`
  query GetAllPostsForMutations {
    allPosts(limit: 6) {
      id
      title
      content
      codeSnippet
      category
      upvotes
      createdAt
      author {
        id
        username
        reputationScore
      }
    }
    allUsers {
      id
      username
      reputationScore
      role
    }
  }
`;

const CREATE_POST_MUTATION = gql`
  mutation PublishDeveloperPost($input: PostInput!) {
    createPost(input: $input) {
      id
      title
      category
      postType
      upvotes
      createdAt
      author {
        username
        reputationScore
      }
    }
  }
`;

const UPVOTE_MUTATION = gql`
  mutation UpvoteDevPost($postId: ID!) {
    upvotePost(postId: $postId) {
      id
      upvotes
    }
  }
`;

export const MutationsAndCacheLab: React.FC = () => {
  const { data, loading, refetch }: any = useQuery(GET_ALL_POSTS);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('TUTORIAL');
  const [selectedAuthorId, setSelectedAuthorId] = useState('u1');
  const [publishStatus, setPublishStatus] = useState<string | null>(null);

  const [createPost, { loading: creating }] = useMutation(CREATE_POST_MUTATION, {
    onCompleted: (res: any) => {
      setPublishStatus(`Successfully published post "${res.createPost.title}"! Apollo InMemoryCache automatically synchronized.`);
      setTitle('');
      setContent('');
      refetch();
    },
  });

  const [upvotePost] = useMutation(UPVOTE_MUTATION);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    createPost({
      variables: {
        input: {
          title,
          content: content || 'Interactive discussion thread...',
          codeSnippet: '',
          category,
          postType: 'ARTICLE',
          authorId: selectedAuthorId,
        },
      },
    });
  };

  const handleUpvote = (postId: string) => {
    upvotePost({
      variables: { postId },
      // Notice: Because upvotePost returns { id, upvotes }, Apollo InMemoryCache automatically matches the ID and updates the UI instantly without a full database requery!
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Module Header */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 md:p-8 space-y-4 shadow-xl">
        <span className="text-xs font-mono font-bold uppercase text-pink-400 tracking-wider">Module 3</span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Mutations &amp; Apollo Normalized Cache Sync
        </h2>
        <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
          In GraphQL, <strong className="text-pink-400">Mutations</strong> modify database state. A superpower of Apollo Client is its <code className="text-purple-300 bg-purple-950/60 px-1.5 py-0.5 rounded font-mono">InMemoryCache</code>: when a mutation returns an entity with its <code className="font-mono text-emerald-300">id</code> and updated fields (like upvote counts), Apollo automatically merges the modification across all visible components without triggering redundant HTTP refetches!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Publisher Studio Form */}
        <div className="lg:col-span-5 rounded-3xl bg-slate-900/70 border border-pink-500/40 p-6 shadow-xl space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2.5 border-b border-slate-800 pb-4">
              <Edit3 className="w-5 h-5 text-pink-400" />
              <h3 className="text-lg font-bold text-white">DevGrid Publisher Studio</h3>
            </div>

            <form onSubmit={handlePublish} className="mt-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Author Account:</label>
                <select
                  value={selectedAuthorId}
                  onChange={(e) => setSelectedAuthorId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-medium text-white focus:border-pink-500 focus:outline-none"
                >
                  {data?.allUsers?.map((u: any) => (
                    <option key={u.id} value={u.id}>
                      @{u.username} ({u.role} - {u.reputationScore} rep)
                    </option>
                  )) || <option value="u1">@rishi_dev (ADMIN)</option>}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Article / Discussion Title:</label>
                <input
                  type="text"
                  placeholder="e.g., Implementing Distributed Tracing in Apollo Server"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-600 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Category Tag:</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-medium text-white focus:border-pink-500 focus:outline-none"
                >
                  <option value="TUTORIAL">TUTORIAL</option>
                  <option value="SHOWCASE">SHOWCASE</option>
                  <option value="DISCUSSION">DISCUSSION</option>
                  <option value="NEWS">NEWS</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Body Content:</label>
                <textarea
                  rows={4}
                  placeholder="Share your developer wisdom..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-600 focus:border-pink-500 focus:outline-none custom-scrollbar"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={creating}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-pink-600/30 transition transform active:scale-95"
              >
                {creating ? <span>Publishing to PostgreSQL...</span> : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Execute createPost Mutation</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {publishStatus && (
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/60 text-emerald-200 text-xs font-medium flex items-center space-x-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>{publishStatus}</span>
            </div>
          )}
        </div>

        {/* Live Developer Social Feed (Reactive Cards) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" /> Live Reactive Social Graph
            </span>
            <span className="text-xs text-slate-400 font-mono">Click upvotes to see 0ms cache merge!</span>
          </div>

          <div className="space-y-4 max-h-[620px] overflow-y-auto pr-1 custom-scrollbar">
            {loading && <p className="text-slate-400 text-xs p-4">Loading posts from Spring Boot...</p>}
            {data?.allPosts?.map((post: any) => (
              <div key={post.id} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-slate-700 transition duration-200 shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="px-2.5 py-0.5 rounded-lg bg-indigo-950 border border-indigo-700/50 text-[10px] font-extrabold text-indigo-300 uppercase font-mono">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      by <strong className="text-purple-300 font-bold">@{post.author?.username}</strong>
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{post.createdAt || 'Just now'}</span>
                </div>

                <h4 className="text-base font-bold text-white tracking-tight">{post.title}</h4>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{post.content}</p>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => handleUpvote(post.id)}
                    className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-pink-950/50 border border-slate-800 hover:border-pink-600/50 text-slate-300 hover:text-pink-300 transition text-xs font-bold group"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-pink-400 group-hover:scale-125 transition-transform" />
                    <span>Upvote ({post.upvotes})</span>
                  </button>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Normalized Cache ID: Post:{post.id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
