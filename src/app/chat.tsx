import Screen from '@components/common/Screen';
import Text from '@components/design/Text';
import { StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export type ChatProps = {};

export function Chat() {
  const { roomId, roomName } = useLocalSearchParams<{ roomId: string; roomName: string }>();

  return (
    <Screen title={roomName!}>
      <Text variant="specialText" style={styles.text}>
        TODO, room ID {roomId}
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  text: {},
});

export default Chat;
