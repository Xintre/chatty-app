import Colors from '@styles/colors';
import IconButton from '@components/design/IconButton';
import Text from '@components/design/Text';
import commonStyles from '@styles/commonStyles';
import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from 'expo-router';

export type ScreenProps = {
  icons?: ReactNode[];
  showBackButton?: boolean;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function Screen({ title, subtitle, children, icons, showBackButton = true }: ScreenProps) {
  const { canGoBack, goBack } = useNavigation();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ minHeight: '100%', alignContent: 'stretch' }}
    >
      <View style={commonStyles.section}>
        <View style={[commonStyles.bigSurface, styles.titleContainer]}>
          <View style={styles.actions}>
            {showBackButton && canGoBack() && (
              <IconButton
                onPress={goBack}
                icon="chevron-left"
                style={{ alignSelf: 'center', marginLeft: 6 }}
              />
            )}

            <Text variant="h2" style={[styles.plumTitle, { alignSelf: 'center' }]}>
              {title}
            </Text>
          </View>

          {!!icons?.length && <View style={styles.actions}>{icons}</View>}
        </View>

        {!!subtitle && (
          <Text variant="h3" style={styles.whiteSubitle}>
            {subtitle}
          </Text>
        )}
      </View>

      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.BLUE300 },
  plumTitle: {
    marginTop: 30,
    color: Colors.PLUM500,
    marginHorizontal: 20,
  },
  whiteSubitle: {
    color: Colors.WHITE,
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  titleContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default Screen;
