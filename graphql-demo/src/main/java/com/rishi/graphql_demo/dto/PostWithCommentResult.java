package com.rishi.graphql_demo.dto;

import com.rishi.graphql_demo.model.Comment;
import com.rishi.graphql_demo.model.Post;

public class PostWithCommentResult {
    private Post post;
    private Comment comment;
    private Boolean success;
    private String message;

    public PostWithCommentResult(Post post, Comment comment, Boolean success, String message) {
        this.post = post;
        this.comment = comment;
        this.success = success;
        this.message = message;
    }

    public Post getPost() { return post; }
    public Comment getComment() { return comment; }
    public Boolean getSuccess() { return success; }
    public String getMessage() { return message; }
}
