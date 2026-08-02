package com.rishi.graphql_demo.dto;

import com.rishi.graphql_demo.model.PostCategory;

public record PostCreateInput(
    String title,
    String content,
    String codeSnippet,
    String postType,
    PostCategory category,
    String authorId
) {}
