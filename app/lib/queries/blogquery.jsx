export 
const BLOGS_QUERY = `#graphql
fragment BlogArticle on Article {
  id
  title
  handle
  publishedAt
  excerpt
  content
  image {
    url
    altText
    width
    height
    src
  }
}

query Blogs {
  blogs(first: 1) {
    nodes {
      id
      title
      handle
      articles(first: 5) {
        nodes {
          ...BlogArticle
        }
      }
    }
  }
}`;
