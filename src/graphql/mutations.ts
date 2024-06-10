import { gql } from '@apollo/client';

export const REGISTER_USER_MUTATION = gql`
  mutation registerUser(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    registerUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      passwordConfirmation: $passwordConfirmation
    ) {
      id
    }
  }
`;

export const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($body: String!, $roomID: String!) {
    sendMessage(body: $body, roomId: $roomID) {
      body
    }
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`;
