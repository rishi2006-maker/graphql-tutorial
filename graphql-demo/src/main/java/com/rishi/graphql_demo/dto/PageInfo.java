package com.rishi.graphql_demo.dto;

public class PageInfo {
    private Boolean hasNextPage;
    private String endCursor;

    public PageInfo(Boolean hasNextPage, String endCursor) {
        this.hasNextPage = hasNextPage;
        this.endCursor = endCursor;
    }

    public Boolean getHasNextPage() { return hasNextPage; }
    public String getEndCursor() { return endCursor; }
}
