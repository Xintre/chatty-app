import moment from 'moment';
import { Message, RoomDetails } from '@constants/types';

/**
 * Gets the last message from the room details.
 * @param roomDetails the room to get details for
 * @returns the last Message in the room or null if there are no messages / input is undefined
 */
export function getLastMessage(roomDetails?: RoomDetails): Message | null {
  if (roomDetails) {
    if (roomDetails.messages.length === 0) return null;

    return roomDetails.messages[roomDetails.messages.length - 1];
  } else {
    return null;
  }
}

/**
 * Takes a date string and returns a human-readable string of the difference between the date and now.
 */
export function dateDifferenceReadable(dateStr?: string): string {
  if (dateStr) {
    return moment(dateStr).fromNow();
  } else {
    return 'N/A';
  }
}
