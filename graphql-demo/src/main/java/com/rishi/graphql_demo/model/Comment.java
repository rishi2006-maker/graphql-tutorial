package com.rishi.graphql_demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "comments")
public class Comment {

    @Id
    private String id;

    @Column(length = 2000)
    private String text;
    private Integer likes;
    private String createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private User author;

    public Comment() {}

    public Comment(String id, String text, Integer likes, String createdAt, Post post, User author) {
        this.id = id;
        this.text = text;
        this.likes = likes;
        this.createdAt = createdAt;
        this.post = post;
        this.author = author;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public Integer getLikes() { return likes; }
    public void setLikes(Integer likes) { this.likes = likes; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

    public Post getPost() { return post; }
    public void setPost(Post post) { this.post = post; }

    public User getAuthor() { return author; }
    public void setAuthor(User author) { this.author = author; }
}
