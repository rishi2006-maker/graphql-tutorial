package com.rishi.graphql_demo.dto;

public class PerformanceReport {
    private String mode;
    private Integer totalPostsFetched;
    private Integer simulatedSqlQueriesExecuted;
    private Long executionTimeMs;
    private String explanation;

    public PerformanceReport(String mode, Integer totalPostsFetched, Integer simulatedSqlQueriesExecuted, Long executionTimeMs, String explanation) {
        this.mode = mode;
        this.totalPostsFetched = totalPostsFetched;
        this.simulatedSqlQueriesExecuted = simulatedSqlQueriesExecuted;
        this.executionTimeMs = executionTimeMs;
        this.explanation = explanation;
    }

    public String getMode() { return mode; }
    public Integer getTotalPostsFetched() { return totalPostsFetched; }
    public Integer getSimulatedSqlQueriesExecuted() { return simulatedSqlQueriesExecuted; }
    public Long getExecutionTimeMs() { return executionTimeMs; }
    public String getExplanation() { return explanation; }
}
