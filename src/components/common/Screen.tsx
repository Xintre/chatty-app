import * as SecureStore from 'expo-secure-store';
import Colors from '@styles/colors';
import Corners from '@styles/corners';
import IconButton from '@components/design/IconButton';
import SecureStoreKeys from '@constants/SecureStoreKeys';
import Text from '@components/design/Text';
import commonStyles from '@styles/commonStyles';
import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';

export type ScreenProps = {
  icons?: ReactNode[];
  showBackButton?: boolean;
  title: string;
  subtitle?: string;
  backgroundColor?: string;
  children: ReactNode;
};

export function Screen({
  title,
  subtitle,
  children,
  icons,
  showBackButton = true,
  backgroundColor = Colors.BLUE100,
}: ScreenProps) {
  const { canGoBack, goBack } = useNavigation();
  const { replace } = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        {
          backgroundColor,
        },
      ]}
    >
      <View
        style={[
          commonStyles.section,
          {
            width: '100%',
            borderBottomLeftRadius: Corners.BIG,
            borderBottomRightRadius: Corners.BIG,
            backgroundColor: Colors.BLUE300,
            marginBottom: 10,
          },
        ]}
      >
        <View style={[styles.titleContainer, styles.actions]}>
          {showBackButton && canGoBack() && (
            <IconButton
              onPress={goBack}
              icon="chevron-left"
              style={{ alignSelf: 'center', marginLeft: 6 }}
            />
          )}

          <Text
            variant="h2"
            style={[styles.plumTitle, { alignSelf: 'center' }]}
            onLongPress={() => {
              console.log('Logging out on user request');

              SecureStore.deleteItemAsync(SecureStoreKeys.token).then(() => {
                replace('logIn');
              });
            }}
          >
            {title}
          </Text>

          <View
            style={[
              styles.actions,
              {
                alignContent: 'center',
                paddingRight: 10,
                justifyContent: 'flex-end',
                gap: 10,
              },
            ]}
          >
            {!!icons?.length && icons}
          </View>
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
  container: { flex: 1 },
  contentContainer: {
    minHeight: '100%',
    alignContent: 'stretch',
  },
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
    justifyContent: 'space-between',
  },
});

export default Screen;
