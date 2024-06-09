import Colors from '@styles/colors';
import { Fonts } from '@styles/fonts';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from 'react-native';
import { useCallback, useState } from 'react';

import Text from './Text';
import IconButton, { IconButtonProps } from './IconButton';

export type TextInputProps = {
  label: string;
  errorText?: string;
  error?: boolean;
  icon?: IconButtonProps['icon'];
  disabled?: boolean;
  alwaysShowIcon?: boolean;
  onIconPress?: IconButtonProps['onPress'];
} & RNTextInputProps;

const INPUT_BORDER_RADIUS = 10; // as in Figma :)

export function TextInput({
  error,
  label,
  alwaysShowIcon = false,
  errorText = 'Input validation error',
  style,
  icon,
  disabled,
  onIconPress,
  ...props
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <View
      style={[
        styles.verticalContainer,
        style, // pass the style prop to the outer container
      ]}
    >
      <Text variant="label" style={disabled ? styles.labelDisabled : styles.labelEnabled}>
        {label}
      </Text>

      <View
        style={[
          styles.horizontalContainer,
          isFocused ? styles.focusedHorizontalContainer : error && styles.errorHorizontalContainer,
        ]}
      >
        <RNTextInput
          {...props}
          style={{
            paddingHorizontal: INPUT_BORDER_RADIUS,
            flex: 1,
            fontSize: 15,
            fontWeight: 'medium',
            fontFamily: Fonts.Poppins.Medium,
            lineHeight: 20,
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          editable={!disabled}
        />

        {!!(icon && (props.value?.length || alwaysShowIcon)) && (
          <IconButton
            onPress={onIconPress}
            style={{ paddingVertical: 0, paddingTop: 5 }}
            icon={icon}
            iconSize={18}
          />
        )}
      </View>

      {error && !disabled && (
        <Text variant="caption" style={styles.errorText}>
          {errorText}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  verticalContainer: {
    paddingHorizontal: 16,
    flexDirection: 'column',
    width: '100%',
  },
  horizontalContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
    backgroundColor: Colors.WHITE,
    borderRadius: INPUT_BORDER_RADIUS,
  },
  errorHorizontalContainer: {
    borderColor: Colors.ERROR,
    borderWidth: 2,
  },
  focusedHorizontalContainer: {
    borderColor: Colors.PLUM500,
    borderWidth: 2,
  },
  errorText: {
    color: Colors.ERROR,
    marginTop: 4,
    textAlign: 'right',
  },
  labelEnabled: {
    color: Colors.WHITE,
  },
  labelDisabled: {
    color: Colors.GRAY100,
  },
});

export default TextInput;
