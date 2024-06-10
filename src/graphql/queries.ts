import { gql } from '@apollo/client';

export const GET_USERS_ROOMS_QUERY = gql`
  query usersRooms {
    usersRooms {
      rooms {
        id
        name
      }
    }
  }
`;

export const GET_MESSAGES_IN_ROOM_QUERY = gql`
  query room($id: ID!) {
    room(id: $id) {
      messages {
        body
        id
        insertedAt
        user {
          firstName
          lastName
          id
        }
      }
    }
  }
`;
