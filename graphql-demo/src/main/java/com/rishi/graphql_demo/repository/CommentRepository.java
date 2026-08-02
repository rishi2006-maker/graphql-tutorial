package com.rishi.graphql_demo.repository;

import com.rishi.graphql_demo.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, String> {
    List<Comment> findByPostId(String postId);
    List<Comment> findByAuthorId(String authorId);
    List<Comment> findByPostIdIn(List<String> postIds);
}
