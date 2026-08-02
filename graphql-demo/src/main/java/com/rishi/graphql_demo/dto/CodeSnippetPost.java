package com.rishi.graphql_demo.dto;

import com.rishi.graphql_demo.model.Post;

public class CodeSnippetPost {
    private Post post;

    public CodeSnippetPost(Post post) { this.post = post; }

    public String getId() { return post.getId(); }
    public String getTitle() { return post.getTitle(); }
    public String getCodeSnippet() { return post.getCodeSnippet(); }
    public String getCreatedAt() { return post.getCreatedAt(); }
    public com.rishi.graphql_demo.model.User getAuthor() { return post.getAuthor(); }
    public Integer getUpvotes() { return post.getUpvotes(); }
}
