package com.rishi.graphql_demo.dto;

import java.util.List;

public class PostConnection {
    private List<PostEdge> edges;
    private PageInfo pageInfo;

    public PostConnection(List<PostEdge> edges, PageInfo pageInfo) {
        this.edges = edges;
        this.pageInfo = pageInfo;
    }

    public List<PostEdge> getEdges() { return edges; }
    public PageInfo getPageInfo() { return pageInfo; }
}
