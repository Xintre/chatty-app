import Colors from '@styles/colors';
import commonStyles from '@styles/commonStyles';
import { Room } from '@constants/types';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import IconButton from './IconButton';
import Text from './Text';

export type RoomListItemProps = {
  room: Room;
  onPress: () => void;
};

export function RoomListItem({ room, onPress }: RoomListItemProps) {
  return (
    <TouchableOpacity style={commonStyles.bigSurface} onPress={onPress}>
      <View style={[commonStyles.bigSurface, styles.container]}>
        <View>
          {/* view above fixes align */}
          <IconButton icon="person" />
        </View>

        <Text variant="caption" style={styles.lastMessageText}>
          24 m ago
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
    paddingVertical: 8,
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
