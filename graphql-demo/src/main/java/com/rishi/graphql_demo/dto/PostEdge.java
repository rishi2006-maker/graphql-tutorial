package com.rishi.graphql_demo.dto;

import com.rishi.graphql_demo.model.Post;

public class PostEdge {
    private Post node;
    private String cursor;

    public PostEdge(Post node, String cursor) {
        this.node = node;
        this.cursor = cursor;
    }

    public Post getNode() { return node; }
    public String getCursor() { return cursor; }
}
