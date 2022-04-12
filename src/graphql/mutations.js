import gql from "graphql-tag";

// role = ['user' or 'admin']
export const CREATE_USER = gql`
  mutation createUser(
    $username: String!
    $password: String!
    $passwordConfirm: String!
    $email: String!
    $role: [String]!
  ) {
    createUser(
      createUserInput: {
        username: $username
        email: $email
        password: $password
        passwordConfirm: $passwordConfirm
        roles: $role
      }
    ) {
      email
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($username: String!) {
    removeUser(username: $username) {
      username
    }
  }
`;

// type = ['private' or 'public']
export const CREATE_COMPOST = gql`
  mutation createCompost(
    $title: String!
    $email: String
    $type: String
    $phone: String
    $website: String
    $street: String
    $city: String
    $zipcode: Int
    $lat: Float!
    $lng: Float!
    $user: String!
  ) {
    createCompost(
      createCompostInput: [
        {
          title: $title
          email: $email
          type: $type
          phone: $phone
          website: $website
          address: {
            street: $street
            city: $city
            zipcode: $zipcode
            coordinates: { lat: $lat, lng: $lng }
          }
          user: $user
        }
      ]
    ) {
      title
    }
  }
`;
