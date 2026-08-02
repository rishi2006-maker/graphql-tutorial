Here are the **Spring for GraphQL annotations** you'll use in practice. These are the ones worth learning for interviews and production.

| Annotation                 | Purpose                                                                | Example                          |
| -------------------------- | ---------------------------------------------------------------------- | -------------------------------- |
| `@Controller`              | Marks a GraphQL controller that contains resolver methods.             | `@Controller`                    |
| `@QueryMapping`            | Maps a GraphQL **Query** field to a Java method.                       | `books()`                        |
| `@MutationMapping`         | Maps a GraphQL **Mutation** field to a Java method.                    | `createBook()`                   |
| `@SubscriptionMapping`     | Maps a GraphQL **Subscription** field (real-time).                     | `newMessages()`                  |
| `@SchemaMapping`           | Maps any field of a GraphQL type. Used for nested object resolution.   | `author(Book book)`              |
| `@BatchMapping`            | Resolves multiple objects in one batch (solves the N+1 query problem). | `authors(List<Book>)`            |
| `@Argument`                | Reads an argument from the GraphQL query.                              | `@Argument Long id`              |
| `@Arguments`               | Binds all GraphQL arguments into a Java object.                        | `@Arguments BookInput input`     |
| `@ProjectedPayload`        | Maps GraphQL input into a projection interface instead of a class.     | `BookProjection`                 |
| `@ContextValue`            | Reads values stored in the GraphQL execution context.                  | Authentication, request metadata |
| `@LocalContextValue`       | Reads values from a local field execution context.                     | Nested resolvers                 |
| `@AuthenticationPrincipal` | Injects the authenticated user (Spring Security).                      | Current logged-in user           |

---

# 1. `@Controller`

Marks the class as a GraphQL controller.

```java
@Controller
public class BookController {
}
```

---

# 2. `@QueryMapping`

Used for **reading data**.

Schema:

```graphql
type Query {
    books: [Book]
}
```

Java:

```java
@QueryMapping
public List<Book> books() {
    return repository.findAll();
}
```

Equivalent to REST:

```java
@GetMapping("/books")
```

---

# 3. `@MutationMapping`

Used for **creating, updating, deleting**.

Schema:

```graphql
type Mutation {
    createBook(title:String!): Book
}
```

Java:

```java
@MutationMapping
public Book createBook(@Argument String title) {
    ...
}
```

Equivalent to:

```java
@PostMapping
```

---

# 4. `@SubscriptionMapping`

Used for **real-time** updates.

Schema:

```graphql
type Subscription {
    messageAdded: Message
}
```

Java:

```java
@SubscriptionMapping
public Flux<Message> messageAdded() {
    ...
}
```

Uses WebSockets.

---

# 5. `@SchemaMapping`

Resolves a field of another object.

Schema

```graphql
type Book {
    title: String
    author: Author
}
```

Java

```java
@SchemaMapping
public Author author(Book book) {
    return authorRepository.findByBookId(book.id());
}
```

When the client requests:

```graphql
query {
    books {
        title
        author {
            name
        }
    }
}
```

Spring calls `author()` for each `Book`.

---

# 6. `@BatchMapping`

Optimizes nested queries.

Without batching:

```text
100 Books
     │
     ▼
100 SQL queries
```

With batching:

```text
100 Books
      │
      ▼
1 SQL query
```

Example

```java
@BatchMapping
public Map<Book, Author> author(List<Book> books) {
    ...
}
```

Very important for performance.

---

# 7. `@Argument`

Reads one GraphQL argument.

Schema

```graphql
type Query {
    book(id: ID!): Book
}
```

Java

```java
@QueryMapping
public Book book(@Argument Long id) {
    return repository.findById(id).orElseThrow();
}
```

Query

```graphql
query {
    book(id:1) {
        title
    }
}
```

---

# 8. `@Arguments`

Maps multiple arguments into one object.

Instead of

```java
@Argument String title,
@Argument String author,
@Argument Integer pages
```

Use

```java
public Book createBook(@Arguments BookInput input) {
}
```

where

```java
record BookInput(
    String title,
    String author,
    Integer pages
){}
```

Cleaner for large inputs.

---

# 9. `@ProjectedPayload`

Maps input to an interface instead of a DTO.

```java
@ProjectedPayload
interface BookProjection {

    String getTitle();

    String getAuthor();
}
```

Useful for projections and partial views.

---

# 10. `@ContextValue`

Access data stored in the GraphQL context.

Example

```java
public Book books(
        @ContextValue String tenantId
){
}
```

Often used for:

* Tenant ID
* Locale
* Request ID
* Custom metadata

---

# 11. `@LocalContextValue`

Shares data between nested resolvers.

```java
@LocalContextValue
```

Less commonly used, mainly for advanced resolver coordination.

---

# 12. `@AuthenticationPrincipal`

With Spring Security:

```java
@QueryMapping
public User me(
    @AuthenticationPrincipal UserDetails user
){
}
```

Returns the currently authenticated user.

---

# Annotation Mapping to REST

| GraphQL                | REST Equivalent                                            |
| ---------------------- | ---------------------------------------------------------- |
| `@QueryMapping`        | `@GetMapping`                                              |
| `@MutationMapping`     | `@PostMapping`, `@PutMapping`, `@DeleteMapping`            |
| `@SubscriptionMapping` | WebSocket endpoint                                         |
| `@Argument`            | `@RequestParam` / `@PathVariable` / `@RequestBody`         |
| `@SchemaMapping`       | No direct REST equivalent; resolves nested object fields   |
| `@BatchMapping`        | No direct REST equivalent; batches nested field resolution |
| `@Controller`          | `@RestController` (or `@Controller` in MVC)                |

---

# Learn in this order

1. `@Controller`
2. `@QueryMapping`
3. `@Argument`
4. `@MutationMapping`
5. `@SchemaMapping`
6. `@BatchMapping`
7. `@SubscriptionMapping`
8. `@Arguments`
9. `@ContextValue`
10. `@LocalContextValue`
11. `@AuthenticationPrincipal`
12. `@ProjectedPayload`

The **first six** are the ones you'll use in almost every Spring GraphQL application. The remaining annotations are more specialized but become valuable as your APIs grow in complexity.
