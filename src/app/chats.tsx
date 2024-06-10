import Button from '@components/design/Button';
import Colors from '@styles/colors';
import IconButton from '@components/design/IconButton';
import Loader from '@components/misc/Loader';
import RoomListItem from '@components/design/RoomListItem';
import Screen from '@components/common/Screen';
import Text from '@components/design/Text';
import commonStyles from '@styles/commonStyles';
import { GET_USERS_ROOMS_QUERY } from '@graphql/queries';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { RoomListing } from '@constants/types';
import { useQuery } from '@apollo/client';
import { useRouter } from 'expo-router';

export function ChatsScreen() {
  const { push } = useRouter();

  const { loading, error, data, refetch } = useQuery<{
    usersRooms: {
      rooms: RoomListing[];
    };
  }>(GET_USERS_ROOMS_QUERY);

  return (
    <Screen
      title="Rooms"
      showBackButton={false}
      icons={[
        <IconButton key="search" icon="search" background></IconButton>,
        <IconButton key="people" icon="people" background></IconButton>,
      ]}
    >
      <View style={[commonStyles.fill, styles.background]}>
        {loading ? (
          <Loader />
        ) : error ? (
          <View style={[commonStyles.fill, { paddingHorizontal: 18 }]}>
            <Text
              variant="h3"
              style={{ color: Colors.ERROR, textAlign: 'center', marginBottom: 20 }}
            >
              Error loading data - {error.name}
            </Text>

            <Text variant="body" style={{ color: Colors.ERROR, textAlign: 'center' }}>
              {error.message}
            </Text>

            <Button variant="filled" onPress={() => refetch()} style={{ marginTop: 20 }}>
              Retry
            </Button>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={[commonStyles.fill, styles.roomsList]}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
          >
            {data?.usersRooms.rooms?.map((room) => (
              <RoomListItem
                key={room.id}
                room={room}
                onPress={() =>
                  push({ pathname: 'chat', params: { roomId: room.id, roomName: room.name } })
                }
              />
            ))}
          </ScrollView>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.BLUE100,
    paddingVertical: 10,
    flex: 1,
  },
  roomsList: {
    gap: 14,
  },
});

export default ChatsScreen;
