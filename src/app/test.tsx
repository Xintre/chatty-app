import { Text } from "react-native";
import { useNavigation } from "expo-router";

export default function Test() {
  const { goBack } = useNavigation();
  return (
    <Text
      onPress={() => {
        goBack();
      }}
    >
      TEST!
    </Text>
  );
}
