import Button from '@components/design/Button';
import Divider from '@components/design/Divider';
import Text from '@components/design/Text';
import { Colors } from '@styles/colors';
import { ScrollView, StyleSheet } from 'react-native';

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
