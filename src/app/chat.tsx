import Button from '@components/design/Button';
import Colors from '@styles/colors';
import Loader from '@components/misc/Loader';
import Screen from '@components/common/Screen';
import Text from '@components/design/Text';
import Toast from 'react-native-root-toast';
import commonStyles from '@styles/commonStyles';
import { GET_MESSAGES_IN_ROOM_QUERY } from '@graphql/queries';
import { GiftedChat } from 'react-native-gifted-chat';
import { Message, RoomDetails } from '@constants/types';
import { SEND_MESSAGE_MUTATION } from '@graphql/mutations';
import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useMutation, useQuery } from '@apollo/client';

export function Chat() {
  const { roomId, roomName } = useLocalSearchParams<{
    roomId: string;
    roomName: string;
  }>();

  const {
    data: roomQueryData,
    loading: roomQueryLoading,
    error: roomQueryError,
    refetch: roomQueryRefetch,
  } = useQuery<{ room: RoomDetails }>(GET_MESSAGES_IN_ROOM_QUERY, {
    variables: {
      id: roomId,
    },
    pollInterval: 1000, // once per second is fast enough :)
  });

  const [sendMessage] = useMutation<{
    message: Message;
  }>(SEND_MESSAGE_MUTATION, {
    onError(error) {
      console.error('Error sending message', error);

      Toast.show('Error sending message, try again!');
    },
    onCompleted() {
      console.log('Message sent!');
    },
  });

  return (
    <Screen title={roomName!}>
      <View style={[commonStyles.fill, styles.background]}>
        {roomQueryLoading ? (
          <Loader />
        ) : roomQueryError ? (
          <View style={[commonStyles.fill, { paddingHorizontal: 18 }]}>
            <Text
              variant="h3"
              style={{ color: Colors.ERROR, textAlign: 'center', marginBottom: 20 }}
            >
              Error loading data - {roomQueryError.name}
            </Text>

            <Text variant="body" style={{ color: Colors.ERROR, textAlign: 'center' }}>
              {roomQueryError.message}
            </Text>

            <Button variant="filled" onPress={() => roomQueryRefetch()} style={{ marginTop: 20 }}>
              Retry
            </Button>
          </View>
        ) : (
          <GiftedChat
            messages={roomQueryData?.room.messages.map((message) => ({
              _id: message.id,
              text: message.body,
              createdAt: new Date(message.insertedAt),
              user: {
                _id: message.user.id,
                name: `${message.user.firstName} ${message.user.lastName}`,
              },
              received: message.user.id !== roomQueryData?.room.user.id,
            }))}
            onSend={(messages) => {
              for (const message of messages) {
                console.log(`Sending message '${message.text}'`);

                sendMessage({
                  variables: {
                    body: message.text,
                    roomID: roomId,
                  },
                });
              }
            }}
            renderMessageText={(message) => (
              <Text
                variant="body"
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  color: message.currentMessage?.received ? 'black' : 'white',
                }}
              >
                {message.currentMessage?.text}
              </Text>
            )}
            user={{
              _id: roomQueryData?.room.user.id ?? '---',
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
