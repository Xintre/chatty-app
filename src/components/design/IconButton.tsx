import Colors from '@styles/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { useCallback, useMemo, useState } from 'react';

export type IconButtonProps = {
  icon: keyof (typeof MaterialIcons)['glyphMap']; // I love TS: let's extract the keys since the authors forgot about types :)
  iconSize?: number;
  selected?: boolean;
  background?: boolean;
} & PressableProps;

export function IconButton({
  selected = false,
  background = false,
  iconSize = 24,
  icon,
  style,
  ...props
}: IconButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const onPressIn = useCallback(() => {
    setIsPressed(true);
  }, []);

  const onPressOut = useCallback(() => {
    setIsPressed(false);
  }, []);

  const textColor = useMemo(
    () =>
      props.disabled
        ? Colors.GRAY300
        : background
          ? selected
            ? isPressed
              ? Colors.GRAY300
              : Colors.WHITE
            : isPressed
              ? Colors.PLUM600
              : Colors.PLUM500
          : isPressed
            ? Colors.PLUM600
            : Colors.PLUM500,
    [selected, background, isPressed, props.disabled],
  );

  return (
    <Pressable
      {...props}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        styles.pressable,
        {
          backgroundColor: background ? (selected ? Colors.PLUM500 : Colors.WHITE) : 'transparent',
        },
      ]}
    >
      <MaterialIcons name={icon} size={iconSize} color={textColor} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'baseline',
    padding: 10,
  },
});

export default IconButton;
