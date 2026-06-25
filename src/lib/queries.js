export const GET_HEADER_CATEGORIES = `
  query GetHeaderCategories {
    categories(first: 100) {
      nodes {
        name
        slug
        count
      }
    }
  }
`;