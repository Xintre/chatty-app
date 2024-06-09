import { Fonts } from '@styles/fonts';
import { ReactNode } from 'react';
import { StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';

export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'button'
  | 'label'
  | 'title'
  | 'caption'
  | 'body'
  | 'specialText';

export type TextProps = {
  children: ReactNode;
  variant: TextVariant;
  style?: StyleProp<TextStyle>;
} & RNTextProps;

export function Text({ children, variant, style, ...props }: TextProps) {
  return (
    <RNText {...props} style={[styles[variant], style]}>
      {children}
    </RNText>
  );
}

export default Text;

const styles = {
  h1: {
    fontSize: 36,
    fontWeight: 'semibold',
    fontFamily: Fonts.Poppins.Bold,
    lineHeight: 42,
  },
  h2: {
    fontSize: 28,
    fontWeight: 'semibold',
    fontFamily: Fonts.Poppins.Bold,
    lineHeight: 42,
  },
  h3: {
    fontSize: 22,
    fontWeight: 'semibold',
    fontFamily: Fonts.Poppins.Bold,
    lineHeight: 33,
  },
  h4: {
    fontSize: 16,
    fontWeight: 'semibold',
    fontFamily: Fonts.Poppins.SemiBold,
    lineHeight: 24,
  },
  button: {
    fontSize: 16,
    fontWeight: 'semibold',
    fontFamily: Fonts.Poppins.SemiBold,
    letterSpacing: 0.01 * 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'medium',
    fontFamily: Fonts.Poppins.Medium,
  },
  title: {
    fontSize: 15,
    fontWeight: 'medium',
    fontFamily: Fonts.Poppins.Medium,
    lineHeight: 20,
  },
  caption: {
    fontSize: 10,
    fontWeight: 'regular',
    fontFamily: Fonts.OpenSans.Regular,
    lineHeight: 10,
  },
  body: {
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: Fonts.OpenSans.Regular,
  },
  specialText: {
    fontSize: 12,
    fontWeight: 'normal',
    fontFamily: Fonts.OpenSans.Regular,
    lineHeight: 16,
  },
} as Record<TextVariant, TextStyle>;
