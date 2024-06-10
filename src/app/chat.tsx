import Button from '@components/design/Button';
import Colors from '@styles/colors';
import Loader from '@components/misc/Loader';
import Screen from '@components/common/Screen';
import Text from '@components/design/Text';
import commonStyles from '@styles/commonStyles';
import { GET_MESSAGES_IN_ROOM_QUERY, GET_USERS_ROOMS_QUERY } from '@graphql/queries';
import { GiftedChat } from 'react-native-gifted-chat';
import { RoomDetails } from '@constants/types';
import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@apollo/client';

export type ChatProps = {};

export function Chat() {
  const { roomId, roomName } = useLocalSearchParams<{ roomId: string; roomName: string }>();

  const { data, loading, error, refetch } = useQuery<{ room: RoomDetails }>(
    GET_MESSAGES_IN_ROOM_QUERY,
    {
      variables: {
        id: roomId,
      },
      pollInterval: 1000, // once per second is fast enough :)
    },
  );

  return (
    <Screen title={roomName!}>
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
          <GiftedChat
            messages={data?.room.messages.map((message) => ({
              _id: message.id,
              text: message.body,
              createdAt: new Date(message.insertedAt),
              user: {
                _id: message.user.id,
                name: `${message.user.firstName} ${message.user.lastName}`,
              },
            }))}
            // onSend={(messages) => onSend(messages)}
            user={{
              _id: data?.room.user.id ?? '---',
            }}
          />
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
});

export default Chat;
