export type ModuleId =
  | 'overview'
  | 'rest_vs_graphql'
  | 'queries_variables'
  | 'mutations_cache'
  | 'type_system'
  | 'n_plus_one'
  | 'pagination'
  | 'subscriptions_polling'
  | 'apollo_caching';

export interface TutorialModule {
  id: ModuleId;
  title: String;
  subtitle: string;
  iconName: string;
  category: 'CORE CONCEPTS' | 'SCHEMA & TYPES' | 'SERVER PERFORMANCE' | 'CLIENT MASTERY';
  description: string;
  pdfReference: string;
}

export const TUTORIAL_MODULES: TutorialModule[] = [
  {
    id: 'overview',
    title: 'DevGrid Mastery Hub',
    subtitle: 'Interactive Roadmap & System Architecture',
    iconName: 'Compass',
    category: 'CORE CONCEPTS',
    description: 'Overview of how GraphQL solves modern social graph requirements over traditional REST APIs.',
    pdfReference: 'Introduction, Why GraphQL, Clients & Servers'
  },
  {
    id: 'rest_vs_graphql',
    title: 'REST vs. GraphQL Paradigm',
    subtitle: 'Network Waterfall vs Unified Graph Query',
    iconName: 'GitCompare',
    category: 'CORE CONCEPTS',
    description: 'Simulate cascading REST endpoints vs single-request GraphQL traversal on a real developer profile.',
    pdfReference: 'Queries, Serving over HTTP, Architectural Shift'
  },
  {
    id: 'queries_variables',
    title: 'Queries, Variables & Directives',
    subtitle: 'Dynamic Filtering, Aliases & Conditional Fields',
    iconName: 'Search',
    category: 'CORE CONCEPTS',
    description: 'Experiment with parameterized queries, field aliases, and conditional inclusion (@skip, @include).',
    pdfReference: 'Queries, Arguments, Variables, Directives, Aliases'
  },
  {
    id: 'mutations_cache',
    title: 'Mutations & Atomic Updates',
    subtitle: 'Modifying Postgres State & UI Synchronization',
    iconName: 'Edit3',
    category: 'CORE CONCEPTS',
    description: 'Publish developer articles, code snippets, and upvote content with automatic cache reactivity.',
    pdfReference: 'Mutations, Execution, Root Fields & Resolvers'
  },
  {
    id: 'type_system',
    title: 'Type System, Interfaces & Unions',
    subtitle: 'Polymorphic Social Feed Explorer',
    iconName: 'Layers',
    category: 'SCHEMA & TYPES',
    description: 'Explore scalars, enums, object types, and query polymorphic feeds using inline fragments (... on Type).',
    pdfReference: 'Schema, Types, Scalars, Enums, Interfaces, Unions, Fragments'
  },
  {
    id: 'n_plus_one',
    title: 'N+1 Database Problem & DataLoader',
    subtitle: 'Spring @BatchMapping Performance Benchmark',
    iconName: 'Zap',
    category: 'SERVER PERFORMANCE',
    description: 'Run live benchmarks testing unbatched @SchemaMapping execution against optimized @BatchMapping DataLoaders.',
    pdfReference: 'Execution, Asynchrony, Resolvers, N+1 Bottlenecks'
  },
  {
    id: 'pagination',
    title: 'Pagination Architecture Mastery',
    subtitle: 'Offset-based vs Relay Cursor Connection',
    iconName: 'ListOrdered',
    category: 'SERVER PERFORMANCE',
    description: 'Compare basic limit/offset pagination with industry-standard cursor connections and infinite scrolling.',
    pdfReference: 'Pagination, Connection Patterns, Edge & Node Structuring'
  },
  {
    id: 'subscriptions_polling',
    title: 'Subscriptions & Real-Time Sync',
    subtitle: 'WebSockets, SSE & Apollo Live Polling',
    iconName: 'Radio',
    category: 'CLIENT MASTERY',
    description: 'Experience real-time feed synchronization using Apollo Client live polling and websocket streaming paradigms.',
    pdfReference: 'Subscriptions, Real-Time Updates, WebSockets, SSE'
  },
  {
    id: 'apollo_caching',
    title: 'Apollo Client Caching Deep Dive',
    subtitle: 'InMemoryCache & Fetch Policy Laboratory',
    iconName: 'Database',
    category: 'CLIENT MASTERY',
    description: 'Test cache-first, network-only, and cache-and-network fetch policies on live database responses.',
    pdfReference: 'Client Architecture, Caching Strategies, Offline Performance'
  }
];
