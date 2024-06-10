import Colors from '@styles/colors';
import commonStyles from '@styles/commonStyles';
import { GET_MESSAGES_IN_ROOM_QUERY } from '@graphql/queries';
import { RoomDetails, RoomListing } from '@constants/types';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useMemo } from 'react';
import { useQuery } from '@apollo/client';

import IconButton from './IconButton';
import Text from './Text';
import { dateDifferenceReadable, getLastMessage } from '../../utils';

export type RoomListItemProps = {
  room: RoomListing;
  onPress: () => void;
};

export function RoomListItem({ room, onPress }: RoomListItemProps) {
  const { data, loading, error } = useQuery<{ room: RoomDetails }>(GET_MESSAGES_IN_ROOM_QUERY, {
    variables: {
      id: room.id,
    },
  });

  const lastMessage = useMemo(() => getLastMessage(data?.room), [data]);

  return (
    <TouchableOpacity style={commonStyles.bigSurface} onPress={onPress}>
      <View style={[commonStyles.bigSurface, styles.container]}>
        <View>
          {/* view above fixes align */}
          <IconButton icon="person" />
        </View>

        <Text variant="caption" style={styles.lastMessageText}>
          {loading ? '...' : error ? '---' : dateDifferenceReadable(lastMessage?.insertedAt)}
        </Text>

        <View style={styles.textsContainer}>
          <Text variant="h4">{room.name}</Text>
          <Text variant="body">Lorem ipsum</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textsContainer: {
    flex: 1,
    paddingVertical: 22,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  lastMessageText: {
    textAlign: 'right',
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default RoomListItem;
