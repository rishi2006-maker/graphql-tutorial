package com.rishi.graphql_demo.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "posts")
public class Post {

    @Id
    private String id;

    private String title;

    @Column(length = 5000)
    private String content;

    @Column(length = 5000)
    private String codeSnippet;

    private String postType; // "ARTICLE" or "CODESNIPPET" for GraphQL Interfaces/Unions

    @Enumerated(EnumType.STRING)
    private PostCategory category;

    private Integer upvotes;
    private Boolean isPublished;
    private String createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private User author;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Comment> comments = new ArrayList<>();

    public Post() {}

    public Post(String id, String title, String content, String codeSnippet, String postType, PostCategory category, Integer upvotes, Boolean isPublished, String createdAt, User author) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.codeSnippet = codeSnippet;
        this.postType = postType;
        this.category = category;
        this.upvotes = upvotes;
        this.isPublished = isPublished;
        this.createdAt = createdAt;
        this.author = author;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getCodeSnippet() { return codeSnippet; }
    public void setCodeSnippet(String codeSnippet) { this.codeSnippet = codeSnippet; }

    public String getPostType() { return postType; }
    public void setPostType(String postType) { this.postType = postType; }

    public PostCategory getCategory() { return category; }
    public void setCategory(PostCategory category) { this.category = category; }

    public Integer getUpvotes() { return upvotes; }
    public void setUpvotes(Integer upvotes) { this.upvotes = upvotes; }

    public Boolean getIsPublished() { return isPublished; }
    public void setIsPublished(Boolean isPublished) { this.isPublished = isPublished; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

    public User getAuthor() { return author; }
    public void setAuthor(User author) { this.author = author; }

    public List<Comment> getComments() { return comments; }
    public void setComments(List<Comment> comments) { this.comments = comments; }
}
