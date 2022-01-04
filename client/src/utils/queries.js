import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query GetUsers {
    Users {
      _id
      PhoneId
      email
    }
  }
`;

export const QUERY_SINGLE_USER_ID = gql`
  query getusers($id: ID!) {
    User(id: $id) {
      PhoneId
      email
      password
    }
  }
`;

export const QUERY_SINGLE_USER_EP = gql`
  query getSingleUser($email: String!, $password: String!) {
    SingleUser(email: $email, password: $password) {
      _id
      PhoneId
    }
  }
`;
