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
