import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const { navigate } = useNavigation();

  return (
    <Text
      onPress={() => {
        // @ts-ignore next line
        navigate("test");
        console.log("!");
      }}
    >
      Home!
    </Text>
  );
}
