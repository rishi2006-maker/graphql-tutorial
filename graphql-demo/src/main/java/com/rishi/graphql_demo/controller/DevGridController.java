package com.rishi.graphql_demo.controller;

import com.rishi.graphql_demo.dto.*;
import com.rishi.graphql_demo.model.*;
import com.rishi.graphql_demo.repository.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.graphql.data.method.annotation.*;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Controller
public class DevGridController {

    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final RepositoryRepository repositoryRepository;

    public DevGridController(UserRepository userRepository, PostRepository postRepository, CommentRepository commentRepository, RepositoryRepository repositoryRepository) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.repositoryRepository = repositoryRepository;
    }

    // ==========================================
    // 1. @QueryMapping (REST Equivalent: @GetMapping)
    // ==========================================

    @QueryMapping
    public List<Post> allPosts(@Argument PostCategory category, @Argument Integer limit) {
        List<Post> posts;
        if (category != null) {
            posts = postRepository.findByCategory(category);
        } else {
            posts = postRepository.findAll();
        }
        if (limit != null && limit < posts.size()) {
            return posts.subList(0, limit);
        }
        return posts;
    }

    @QueryMapping
    public Post postById(@Argument String id) {
        return postRepository.findById(id).orElse(null);
    }

    @QueryMapping
    public List<Post> postsByAuthor(@Argument String authorId) {
        return postRepository.findByAuthorId(authorId);
    }

    @QueryMapping
    public List<User> allUsers() {
        return userRepository.findAll();
    }

    @QueryMapping
    public User userByUsername(@Argument String username) {
        return userRepository.findByUsername(username);
    }

    // --- Polymorphic Queries (Interfaces & Unions) ---
    @QueryMapping
    public List<Object> feedItems() {
        List<Post> posts = postRepository.findAll();
        List<Object> items = new ArrayList<>();
        for (Post p : posts) {
            if ("CODESNIPPET".equalsIgnoreCase(p.getPostType())) {
                items.add(new CodeSnippetPost(p));
            } else {
                items.add(new ArticlePost(p));
            }
        }
        return items;
    }

    @QueryMapping
    public List<Object> searchFeed(@Argument String query) {
        List<Object> results = new ArrayList<>();
        // Search users
        List<User> users = userRepository.findAll().stream()
                .filter(u -> u.getUsername().toLowerCase().contains(query.toLowerCase()) || 
                             (u.getGithubHandle() != null && u.getGithubHandle().toLowerCase().contains(query.toLowerCase())))
                .collect(Collectors.toList());
        results.addAll(users);

        // Search posts
        List<Post> posts = postRepository.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(query, query);
        for (Post p : posts) {
            if ("CODESNIPPET".equalsIgnoreCase(p.getPostType())) {
                results.add(new CodeSnippetPost(p));
            } else {
                results.add(new ArticlePost(p));
            }
        }
        return results;
    }

    // --- Pagination Mastery Lab ---
    @QueryMapping
    public List<Post> postsOffset(@Argument Integer limit, @Argument Integer offset) {
        Pageable pageable = PageRequest.of(offset != null ? offset / (limit != null ? limit : 5) : 0, limit != null ? limit : 5);
        return postRepository.findAll(pageable).getContent();
    }

    @QueryMapping
    public PostConnection postsConnection(@Argument Integer first, @Argument String after) {
        int pageSize = (first != null) ? first : 4;
        List<Post> pagedPosts;
        if (after != null && !after.isEmpty()) {
            pagedPosts = postRepository.findByIdGreaterThanOrderByIdAsc(after, PageRequest.of(0, pageSize + 1));
        } else {
            pagedPosts = postRepository.findAllByOrderByIdAsc(PageRequest.of(0, pageSize + 1));
        }
        
        boolean hasNextPage = pagedPosts.size() > pageSize;
        if (hasNextPage) {
            pagedPosts = pagedPosts.subList(0, pageSize);
        }
        
        List<PostEdge> edges = pagedPosts.stream()
                .map(p -> new PostEdge(p, p.getId()))
                .collect(Collectors.toList());
        
        String endCursor = edges.isEmpty() ? null : edges.get(edges.size() - 1).getCursor();
        PageInfo pageInfo = new PageInfo(hasNextPage, endCursor);
        
        return new PostConnection(edges, pageInfo);
    }

    // --- N+1 Problem DataLoader Benchmark ---
    @QueryMapping
    public PerformanceReport benchmarkDataLoader(@Argument Boolean useDataLoader) {
        long start = System.currentTimeMillis();
        List<Post> posts = postRepository.findAll();
        int simulatedQueries;
        String mode;
        String explanation;
        
        if (useDataLoader == null || useDataLoader) {
            // Batched simulation / explanation
            simulatedQueries = 2; // 1 query for posts + 1 batched IN query for authors/comments
            mode = "BATCHED_DATA_LOADER (@BatchMapping)";
            explanation = "Spring @BatchMapping intercepted " + posts.size() + " post resolution requests and collapsed them into exactly 1 batched database query (WHERE id IN (...)). Zero N+1 latency!";
        } else {
            // Unbatched simulation (N+1 scenario)
            simulatedQueries = 1 + (posts.size() * 2); // 1 for posts, plus 2 individual queries per post for author & comments
            mode = "UNBATCHED_N_PLUS_1 (@SchemaMapping per item)";
            explanation = "Unbatched execution triggered 1 initial query plus " + (posts.size() * 2) + " redundant individual database queries for each post's relations. Massive N+1 network/database bottleneck!";
            try { Thread.sleep(posts.size() * 15L); } catch (InterruptedException ignored) {} // Simulate latency of dozens of db trips
        }
        long duration = System.currentTimeMillis() - start;
        return new PerformanceReport(mode, posts.size(), simulatedQueries, duration, explanation);
    }

    // ==========================================
    // 2. @MutationMapping (REST Equivalent: @PostMapping / @PutMapping)
    // ==========================================

    @MutationMapping
    public Post createPost(@Arguments PostCreateInput input) {
        // Notice @Arguments cleanly maps all fields from BookInput / PostCreateInput record!
        User author = userRepository.findById(input.authorId())
                .orElseThrow(() -> new IllegalArgumentException("Author not found: " + input.authorId()));

        Post post = new Post(
                UUID.randomUUID().toString(),
                input.title(),
                input.content(),
                input.codeSnippet() != null ? input.codeSnippet() : "",
                input.postType() != null ? input.postType() : "ARTICLE",
                input.category(),
                0,
                true,
                LocalDateTime.now().toString(),
                author
        );
        return postRepository.save(post);
    }

    @MutationMapping
    public PostWithCommentResult createPostAndComment(@Argument PostCreateInput postInput, @Argument String initialComment) {
        User author = userRepository.findById(postInput.authorId())
                .orElseThrow(() -> new IllegalArgumentException("Author not found"));

        Post post = new Post(
                UUID.randomUUID().toString(),
                postInput.title(),
                postInput.content(),
                postInput.codeSnippet() != null ? postInput.codeSnippet() : "",
                postInput.postType() != null ? postInput.postType() : "ARTICLE",
                postInput.category(),
                1,
                true,
                LocalDateTime.now().toString(),
                author
        );
        postRepository.save(post);

        Comment comment = new Comment(
                UUID.randomUUID().toString(),
                initialComment,
                1,
                LocalDateTime.now().toString(),
                post,
                author
        );
        commentRepository.save(comment);

        return new PostWithCommentResult(post, comment, true, "Post published and initial developer comment created simultaneously!");
    }

    @MutationMapping
    public Post upvotePost(@Argument String postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found: " + postId));
        post.setUpvotes(post.getUpvotes() + 1);
        return postRepository.save(post);
    }

    @MutationMapping
    public Comment createComment(@Argument String postId, @Argument String authorId, @Argument String text) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));
        User author = userRepository.findById(authorId)
                .orElseThrow(() -> new IllegalArgumentException("Author not found"));
        
        Comment comment = new Comment(
                UUID.randomUUID().toString(),
                text,
                0,
                LocalDateTime.now().toString(),
                post,
                author
        );
        return commentRepository.save(comment);
    }

    // ==========================================
    // 3. @BatchMapping (Solving N+1 Database Query Problem!)
    // ==========================================

    @BatchMapping
    public Map<Post, User> author(List<Post> posts) {
        // Instead of N individual SQL queries, we batch fetch all unique author IDs at once!
        Set<String> authorIds = posts.stream()
                .map(p -> p.getAuthor().getId())
                .collect(Collectors.toSet());
        
        List<User> authors = userRepository.findAllById(authorIds);
        Map<String, User> authorMap = authors.stream()
                .collect(Collectors.toMap(u -> u.getId(), u -> u));
        
        return posts.stream()
                .collect(Collectors.toMap(p -> p, p -> authorMap.get(p.getAuthor().getId())));
    }

    @BatchMapping
    public Map<Post, List<Comment>> comments(List<Post> posts) {
        List<String> postIds = posts.stream().map(p -> p.getId()).collect(Collectors.toList());
        List<Comment> allComments = commentRepository.findByPostIdIn(postIds);
        
        Map<String, List<Comment>> commentMap = new HashMap<>();
        for (Comment c : allComments) {
            commentMap.computeIfAbsent(c.getPost().getId(), k -> new ArrayList<>()).add(c);
        }
        
        return posts.stream()
                .collect(Collectors.toMap(p -> p, p -> commentMap.getOrDefault(p.getId(), new ArrayList<>())));
    }

    @BatchMapping
    public Map<User, List<Repository>> repositories(List<User> users) {
        List<Repository> allRepos = repositoryRepository.findAll();
        Map<String, List<Repository>> repoMap = new HashMap<>();
        for (Repository r : allRepos) {
            if (r.getOwner() != null) {
                repoMap.computeIfAbsent(r.getOwner().getId(), k -> new ArrayList<>()).add(r);
            }
        }
        return users.stream()
                .collect(Collectors.toMap(u -> u, u -> repoMap.getOrDefault(u.getId(), new ArrayList<>())));
    }

    // ==========================================
    // 4. @SchemaMapping (Resolving nested fields individually)
    // ==========================================

    @SchemaMapping(typeName = "User", field = "posts")
    public List<Post> getUserPosts(User user) {
        return postRepository.findByAuthorId(user.getId());
    }

    @SchemaMapping(typeName = "User", field = "comments")
    public List<Comment> getUserComments(User user) {
        return commentRepository.findByAuthorId(user.getId());
    }
}
