import Colors from '@styles/colors';
import { StyleSheet, View } from 'react-native';

export type DividerProps = {
  secondary?: boolean;
};

export function Divider({ secondary }: DividerProps = { secondary: true }) {
  return (
    <View style={styles.dividerContainer}>
      <View style={[styles.divider, secondary && styles.secondary]} />
    </View>
  );
}

const styles = StyleSheet.create({
  dividerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  divider: {
    backgroundColor: Colors.PLUM500,
    width: '80%',
    height: 1.5,
    marginTop: 10,
    marginBottom: 18,
  },
  secondary: {
    width: '60%',
    backgroundColor: Colors.PLUM400,
  },
});

export default Divider;
