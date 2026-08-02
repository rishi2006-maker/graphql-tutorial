package com.rishi.graphql_demo.repository;

import com.rishi.graphql_demo.model.Post;
import com.rishi.graphql_demo.model.PostCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, String> {
    List<Post> findByCategory(PostCategory category);
    List<Post> findByUpvotesGreaterThanEqual(Integer minUpvotes);
    List<Post> findByAuthorId(String authorId);
    
    // For offset pagination
    Page<Post> findAll(Pageable pageable);
    
    // For cursor-based pagination
    List<Post> findByIdGreaterThanOrderByIdAsc(String id, Pageable pageable);
    List<Post> findAllByOrderByIdAsc(Pageable pageable);
    List<Post> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(String title, String content);
}
