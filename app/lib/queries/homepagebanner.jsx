export const HOME_PAGE_METAOBJECT_QUERY = `#graphql
  query HomePageMetaobjects {
    metaobjects(type: "home_page_banner", first: 10) {
      nodes {
        id
        fields {
          key
          value
          references(first: 10) {
            nodes {
              __typename

              ... on MediaImage {
                image {
                  url
                  src
                  altText
                  width
                  height
                }
              }

              ... on Collection {
                id
                handle
                title
              }
            }
          }
        }
      }
    }
  }
`;