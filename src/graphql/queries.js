import gql from "graphql-tag";

export const USER_INFO = gql`
  query user($email: String!) {
    user(email: $email) {
      username
      email
      roles
      favorites
      _id
    }
  }
`;

export const MY_COMPOSTS = gql`
  query {
    myComposts {
      _id
      title
      manager
      email
      address {
        street
        zipcode
        city
        coordinates {
          lat
          lng
        }
      }
      photo {
        filename
        file
      }
      phone
      website
      type
      user {
        username
        email
      }
    }
  }
`;

export const COMPOSTS = gql`
  query {
    composts {
      _id
      title
      manager
      email
      address {
        street
        zipcode
        city
        coordinates {
          lat
          lng
        }
      }
      photo {
        filename
        file
      }
      phone
      website
      type
      user {
        username
        email
      }
    }
  }
`;
