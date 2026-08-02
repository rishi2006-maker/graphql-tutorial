package com.rishi.graphql_demo.repository;

import com.rishi.graphql_demo.model.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

@org.springframework.stereotype.Repository
public interface RepositoryRepository extends JpaRepository<Repository, String> {
    List<Repository> findByOwnerId(String ownerId);
}
