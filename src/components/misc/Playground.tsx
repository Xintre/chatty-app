import Button from '@components/design/Button';
import Corners from '@styles/corners';
import Divider from '@components/design/Divider';
import IconButton from '@components/design/IconButton';
import Text from '@components/design/Text';
import { Colors } from '@styles/colors';
import { ScrollView, StyleSheet, View } from 'react-native';

export function Playground() {
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Text variant="h1" style={styles.plumTitle}>
        Playground ⚛️
      </Text>

      <Divider />

      <Text variant="h2" style={styles.plumTitle2}>
        Typography
      </Text>

      <Divider secondary />

      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="h4">Heading 4</Text>
      <Text variant="button">Button</Text>
      <Text variant="label">Label</Text>
      <Text variant="title">Title</Text>
      <Text variant="caption">Caption</Text>
      <Text variant="body">Body</Text>
      <Text variant="specialText">Special Text</Text>

      <Text variant="h2" style={styles.plumTitle2}>
        Button
      </Text>

      <Divider secondary />

      <Button variant="filled">Button - filled</Button>
      <Button variant="filled" icon="chevron-left">
        Button - filled (with icon)
      </Button>
      <Button variant="filled" disabled>
        Button - filled (disabled)
      </Button>

      <Button variant="text">Button - text</Button>
      <Button variant="text" icon="chevron-left">
        Button - text (with icon)
      </Button>
      <Button variant="text" disabled>
        Button - text (disabled)
      </Button>
      <Button variant="text" icon="chevron-left" disabled>
        Button - text (with icon, disabled)
      </Button>

      <Text variant="h2" style={styles.plumTitle2}>
        Icon Button
      </Text>

      <Divider secondary />

      <View style={styles.iconsGrid}>
        {/* IconButton - background (with icon) */}
        <IconButton background icon="people" />
        {/* IconButton - background (disabled) */}
        <IconButton background icon="people" disabled />

        {/* IconButton - selected, background (with icon) */}
        <IconButton selected background icon="people" />
        {/* IconButton - selected, background (disabled) */}
        <IconButton selected background icon="people" disabled />

        {/* IconButton - default */}
        <IconButton selected icon="people" />
        {/* IconButton - default (disabled) */}
        <IconButton selected icon="people" disabled />
      </View>
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
  iconsGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 60,
    paddingVertical: 40,
    paddingHorizontal: 20,
    flexWrap: 'wrap',
    backgroundColor: Colors.GRAY100,
    borderRadius: Corners.BIG,
  },
});

export default Playground;
