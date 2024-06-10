/** Typing for room returned from usersRooms GraphQL query */
export type RoomListing = {
  id: string;
  name: string;
};

/** Typing for User type from GraphQL queries */
export type User = {
  firstName: string;
  lastName: string;
  id: string;
};

/** Typing for Message type from GraphQL queries */
export type Message = {
  body: string;
  id: string;
  insertedAt: string;
  /** sender info */
  user: User;
};

/** Typing for room returned from rooms GraphQL query */
export type RoomDetails = {
  messages: Message[];

  user: User;
};
