import Colors from '@styles/colors';
import Corners from '@styles/corners';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { ReactNode, useCallback, useMemo, useState } from 'react';

import Text from './Text';

export type ButtonVariant = 'filled' | 'text';

export type ButtonProps = {
  children: ReactNode;
  variant: ButtonVariant;
  icon?: keyof (typeof MaterialIcons)['glyphMap']; // I love TS: let's extract the keys since the authors forgot about types :)
} & PressableProps;

export function Button({ children, variant, icon, style, ...props }: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const onPressIn = useCallback(() => {
    setIsPressed(true);
  }, []);

  const onPressOut = useCallback(() => {
    setIsPressed(false);
  }, []);

  const textColor = useMemo(
    () =>
      variant === 'filled'
        ? Colors.WHITE
        : // variant of button: text
          // if disabled, text should be gray
          props.disabled
          ? Colors.GRAY100
          : // if pressed, text should be plum600
            isPressed
            ? Colors.PLUM200
            : Colors.PLUM500,
    [isPressed, variant, props.disabled],
  );

  const backgroundColor = useMemo(
    () =>
      variant === 'text'
        ? undefined
        : props.disabled
          ? Colors.GRAY100
          : isPressed
            ? Colors.PLUM600
            : Colors.PLUM500,
    [variant, isPressed, props.disabled],
  );

  return (
    <Pressable
      {...props}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        styles.common,
        {
          backgroundColor,
        },
      ]}
    >
      {!!icon && <MaterialIcons name={icon} size={24} color={textColor} />}

      <Text
        variant="label"
        style={[
          {
            color: textColor,
          },
          styles.textCommon,
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  textCommon: {
    // fix to align text gutter to bottom to be ideally in the middle of the button
    transform: [
      {
        translateY: 1,
      },
    ],
  },
  common: {
    borderRadius: Corners.SMALL,
    paddingVertical: Corners.SMALL,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default Button;
