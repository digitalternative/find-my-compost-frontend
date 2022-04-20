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
  mutation removeUser($email: String!) {
    removeUser(email: $email) {
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $_id: String!
    $username: String
    $password: String
    $passwordConfirm: String
    $email: String
    $roles: [String]
    $favorites: [String]
  ) {
    updateUser(
      updateUserInput: {
        _id: $_id
        username: $username
        password: $password
        passwordConfirm: $passwordConfirm
        email: $email
        roles: $roles
        favorites: $favorites
      }
    ) {
      email
    }
  }
`;

// type = ['private' or 'public']
export const CREATE_COMPOST = gql`
  mutation createCompost(
    $title: String!
    $email: String
    $manager: String!
    $type: String!
    $phone: String
    $website: String
    $street: String
    $city: String
    $zipcode: Int
    $lat: Float!
    $lng: Float!
    $user: String!
    $filename: String
    $file: String
  ) {
    createCompost(
      createCompostInput: [
        {
          title: $title
          email: $email
          manager: $manager
          type: $type
          phone: $phone
          website: $website
          address: {
            street: $street
            city: $city
            zipcode: $zipcode
            coordinates: { lat: $lat, lng: $lng }
          }
          photo: { file: $file, filename: $filename }
          user: $user
        }
      ]
    ) {
      title
    }
  }
`;

export const REMOVE_COMPOST = gql`
  mutation removeCompost($_id: String!) {
    removeCompost(_id: $_id) {
      title
    }
  }
`;

// type = ['private' or 'public']
export const UPDATE_COMPOST = gql`
  mutation updateCompost(
    $_id: String!
    $title: String!
    $email: String
    $manager: String!
    $type: String
    $phone: String
    $website: String
    $street: String
    $city: String
    $zipcode: Int
    $lat: Float!
    $lng: Float!
    $filename: String
    $file: String
  ) {
    updateCompost(
      updateCompostInput: {
        _id: $_id
        title: $title
        email: $email
        manager: $manager
        type: $type
        phone: $phone
        website: $website
        address: {
          street: $street
          city: $city
          zipcode: $zipcode
          coordinates: { lat: $lat, lng: $lng }
        }
        photo: { file: $file, filename: $filename }
      }
    ) {
      title
    }
  }
`;
