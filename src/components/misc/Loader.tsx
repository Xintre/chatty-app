import commonStyles from '@styles/commonStyles';
import { ActivityIndicator, View } from 'react-native';

export default function Loader() {
  return (
    <View style={[commonStyles.centerBothDirections, commonStyles.fullWH]}>
      <ActivityIndicator animating={true} />
    </View>
  );
}
