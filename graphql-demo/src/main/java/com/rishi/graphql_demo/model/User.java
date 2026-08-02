package com.rishi.graphql_demo.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    private String id;

    private String username;
    private String avatar;
    private String githubHandle;
    private Integer reputation;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Repository> repositories = new ArrayList<>();

    public User() {}

    public User(String id, String username, String avatar, String githubHandle, Integer reputation, UserRole role) {
        this.id = id;
        this.username = username;
        this.avatar = avatar;
        this.githubHandle = githubHandle;
        this.reputation = reputation;
        this.role = role;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public String getGithubHandle() { return githubHandle; }
    public void setGithubHandle(String githubHandle) { this.githubHandle = githubHandle; }

    public Integer getReputation() { return reputation; }
    public void setReputation(Integer reputation) { this.reputation = reputation; }

    public UserRole getRole() { return role; }
    public void setRole(UserRole role) { this.role = role; }

    public List<Post> getPosts() { return posts; }
    public void setPosts(List<Post> posts) { this.posts = posts; }

    public List<Comment> getComments() { return comments; }
    public void setComments(List<Comment> comments) { this.comments = comments; }

    public List<Repository> getRepositories() { return repositories; }
    public void setRepositories(List<Repository> repositories) { this.repositories = repositories; }
}
