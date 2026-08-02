package com.rishi.graphql_demo.service;

import com.rishi.graphql_demo.model.*;
import com.rishi.graphql_demo.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final RepositoryRepository repositoryRepository;

    public DatabaseSeeder(UserRepository userRepository, PostRepository postRepository, CommentRepository commentRepository, RepositoryRepository repositoryRepository) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.repositoryRepository = repositoryRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) {
            System.out.println(">>> [DevGrid Seeder] Database already populated with tutorial data.");
            return;
        }

        System.out.println(">>> [DevGrid Seeder] Initializing PostgreSQL database with developer social graph...");

        // 1. Create Developer Users
        User rishi = new User("u1", "rishi_dev", "https://api.dicebear.com/7.x/bottts/svg?seed=rishi", "rishi-kumaar", 5000, UserRole.ADMIN);
        User dan = new User("u2", "dan_abramov", "https://api.dicebear.com/7.x/bottts/svg?seed=dan", "gaearon", 4500, UserRole.MODERATOR);
        User martin = new User("u3", "martin_fowler", "https://api.dicebear.com/7.x/bottts/svg?seed=martin", "martinfowler", 8200, UserRole.DEVELOPER);
        User linus = new User("u4", "linus_torvalds", "https://api.dicebear.com/7.x/bottts/svg?seed=linus", "torvalds", 9999, UserRole.ADMIN);

        userRepository.saveAll(List.of(rishi, dan, martin, linus));

        // 2. Create GitHub Repositories in Social Graph
        Repository r1 = new Repository("repo1", "devgrid-graphql-suite", 1250, "https://github.com/rishi/devgrid-graphql-suite", rishi);
        Repository r2 = new Repository("repo2", "redux", 60000, "https://github.com/reduxjs/redux", dan);
        Repository r3 = new Repository("repo3", "refactoring-patterns-java", 15000, "https://github.com/martinfowler/refactoring", martin);
        Repository r4 = new Repository("repo4", "linux-kernel", 180000, "https://github.com/torvalds/linux", linus);
        Repository r5 = new Repository("repo5", "git", 55000, "https://github.com/git/git", linus);

        repositoryRepository.saveAll(List.of(r1, r2, r3, r4, r5));

        // 3. Create Tech Posts (Articles & Code Snippets)
        Post p1 = new Post("p1", "Why GraphQL Conquers REST in Modern Social Graphs",
                "In traditional REST architecture, displaying an interconnected newsfeed with profiles, engagement stats, and nested discussion chains requires cascading N+1 network requests from client to server. GraphQL replaces this fragmented architecture by enabling clients to specify a structured graph hierarchy in a single HTTP request.",
                "", "ARTICLE", PostCategory.TUTORIAL, 180, true, "2026-08-01 10:00:00", rishi);

        Post p2 = new Post("p2", "Custom React 19 Apollo Client Hooks with Suspense",
                "Here is an optimized snippet illustrating how to pair Apollo Client's useSuspenseQuery with Tailwind CSS animation frames for zero-layout-shift UI rendering.",
                "const { data } = useSuspenseQuery(GET_FEED, {\n  variables: { category: 'TUTORIAL', limit: 10 },\n  fetchPolicy: 'cache-and-network'\n});\nreturn <DeveloperFeed items={data.allPosts} />;",
                "CODESNIPPET", PostCategory.SHOWCASE, 240, true, "2026-08-01 11:30:00", dan);

        Post p3 = new Post("p3", "Refactoring from 100 REST Micro-Endpoints to 1 Batched Schema",
                "When enterprise architectures decompose monoliths into services, REST APIs rapidly mutate into hundreds of fragmented endpoints. Introducing a unified Spring Boot GraphQL schema boundary decouples client UI iteration cycles from relational database schema migrations.",
                "", "ARTICLE", PostCategory.DISCUSSION, 310, true, "2026-08-01 14:15:00", martin);

        Post p4 = new Post("p4", "Git kernel DAG structure vs GraphQL Schema Type Trees",
                "Under the hood, Git models commit histories as Directed Acyclic Graphs (DAGs). Interestingly, GraphQL query execution traces traverse analogous cyclic graphs during resolver evaluation.",
                "struct commit_list {\n    struct commit *item;\n    struct commit_list *next;\n};\n// Resolving commit ancestry mirrors GraphQL interface polymorphism!",
                "CODESNIPPET", PostCategory.NEWS, 490, true, "2026-08-01 16:45:00", linus);

        Post p5 = new Post("p5", "Understanding Apollo Client Caching: Cache-First vs Network-Only",
                "Apollo Client incorporates an advanced normalized in-memory cache architecture (InMemoryCache). When you switch fetch policies from network-only to cache-first, queries resolve instantaneously in 0ms without hitting the internet wire.",
                "", "ARTICLE", PostCategory.TUTORIAL, 215, true, "2026-08-02 09:15:00", rishi);

        Post p6 = new Post("p6", "Implementing Spring Boot @BatchMapping to prevent N+1 database hits",
                "If your GraphQL server relies on standard @SchemaMapping for relational fields like Post.author or Post.comments, executing a feed query for 50 posts generates 101 database SELECT statements. Here is how Spring Boot's @BatchMapping intercepts those resolutions into 1 IN query.",
                "@BatchMapping\npublic Map<Post, User> author(List<Post> posts) {\n    Set<String> authorIds = posts.stream().map(p -> p.getAuthor().getId()).collect(Collectors.toSet());\n    List<User> authors = userRepository.findAllById(authorIds);\n    return mapAuthorsToPosts(posts, authors);\n}",
                "CODESNIPPET", PostCategory.TUTORIAL, 380, true, "2026-08-02 12:00:00", rishi);

        postRepository.saveAll(List.of(p1, p2, p3, p4, p5, p6));

        // 4. Create Discussion Comments
        Comment c1 = new Comment("c1", "Brilliant breakdown! Removing the N+1 client network trips reduced our app startup latency by 70%.", 15, "2026-08-01 10:30:00", p1, dan);
        Comment c2 = new Comment("c2", "Agreed. The declarative schema contracts make frontend-backend contract testing effortless.", 22, "2026-08-01 11:00:00", p1, martin);
        Comment c3 = new Comment("c3", "The combination of Suspense with normalized cache identifiers is pure gold.", 18, "2026-08-01 12:15:00", p2, rishi);
        Comment c4 = new Comment("c4", "Clean architecture principles apply perfectly here: GraphQL is the ultimate UI abstraction boundary.", 45, "2026-08-01 15:00:00", p3, dan);
        Comment c5 = new Comment("c5", "Even in C/Linux engineering, data structure visualization is half the battle won.", 88, "2026-08-01 17:20:00", p4, rishi);
        Comment c6 = new Comment("c6", "This @BatchMapping implementation is essential for high-throughput enterprise Spring servers!", 34, "2026-08-02 12:45:00", p6, martin);

        commentRepository.saveAll(List.of(c1, c2, c3, c4, c5, c6));

        System.out.println(">>> [DevGrid Seeder] PostgreSQL successfully seeded with complete GraphQL mastery dataset!");
    }
}
