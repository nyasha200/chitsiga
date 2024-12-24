import { gql } from "@apollo/client";

export const GET_PAGE_DATA = gql`
  query GetPageData($slug: String!) {
    pageCollection(where: { slug: $slug }) {
      items {
        title
        details{
          json
        }
        slug
      }
    }
  }
`;

export const GET_HOMEPAGE_DATA = gql`
  query GetHomepageData {
    bannerItemCollection(limit: 5) {
      items {
        title
        project {
          slug
          coverImage {
            url
          }
        }
      }
    }
    cardCollection(where: { type: "testimony" }) {
      items {
        type
        title
        description
        image {
          url
        }
      }
    }
    completedProjects: projectCollection(
      order: sys_publishedAt_DESC
      where: { stage: "completed" }
      limit: 3
    ) {
      items {
        title
        stage
        location
        slug
        coverImage {
          url
        }
      }
    }
    underConstructionProjects: projectCollection(
      order: sys_publishedAt_DESC
      where: { stage: "construction" }
      limit: 2
    ) {
      items {
        title
        slug
        stage
        location
        coverImage {
          url
        }
      }
    }
    detailCards: homepageCardCollection {
      items {
        title
        description
        buttonText
        link
        image {
          url
        }
      }
    }
  }
`;

export const GET_PROJECTS = gql`
  query GetProjects($stage: String) {
    projectCollection(where: { stage: $stage }) {
      items {
        title
        slug
        location
        stage
        coverImage {
          url
        }
      }
    }
  }
`;

export const GET_CONTACT_LINKS = gql`
  query GetContactLinks {
    contactLinkCollection {
      items {
        text
        link
        logo {
          url
        }
      }
    }
  }
`

export const GET_PROJECT = gql`
query GetProject($slug: String!) {
  projectCollection(where: { slug: $slug }) {
    items {
      title
      location
      client
      stage
      coverImage {
        url
      }
      galleryCollection {
        items {
          url
          description
          width
          height
        }
      }
    }
  }
}
`;

export const GET_RELATED_PROJECTS = gql`
  query GetRelatedProjects($stage: String!, $slug: String!) {
    projectCollection(
      limit: 3
      where: { stage: $stage, slug_not: $slug }
      order: sys_publishedAt_DESC
    ) {
      items {
        title
        location
        client
        slug
        coverImage {
          url
        }
      }
    }
  }
`;
