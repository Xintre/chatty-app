import Text from '@components/design/Text';
import { Colors } from '@styles/colors';
import { ScrollView, StyleSheet } from 'react-native';

import Divider from '../design/Divider';

export function Playground() {
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Text variant="h1" style={styles.plumTitle}>
        Playground ⚛️
      </Text>

      <Divider />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    gap: 8,
  },
  plumTitle: {
    color: Colors.PLUM500,
    textAlign: 'center',
  },
  plumTitle2: {
    color: Colors.PLUM400,
    textAlign: 'center',
  },
});

export default Playground;
