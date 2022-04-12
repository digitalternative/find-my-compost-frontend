import gql from "graphql-tag";

export const USER_INFO = gql`
  query user($email: String!) {
    user(email: $email) {
      username
      email
      roles
      _id
    }
  }
`;

export const MY_COMPOSTS = gql`
  query {
    myComposts {
      _id
      title
      address {
        street
        zipcode
        city
        coordinates {
          lat
          lng
        }
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
      address {
        street
        zipcode
        city
        coordinates {
          lat
          lng
        }
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
