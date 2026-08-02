package com.rishi.graphql_demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "repositories")
public class Repository {

    @Id
    private String id;

    private String name;
    private Integer stars;
    private String url;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    public Repository() {}

    public Repository(String id, String name, Integer stars, String url, User owner) {
        this.id = id;
        this.name = name;
        this.stars = stars;
        this.url = url;
        this.owner = owner;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getStars() { return stars; }
    public void setStars(Integer stars) { this.stars = stars; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public User getOwner() { return owner; }
    public void setOwner(User owner) { this.owner = owner; }
}
