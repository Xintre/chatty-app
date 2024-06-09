import { StyleSheet } from 'react-native';

import Corners from './corners';

export const commonStyles = StyleSheet.create({
  fill: { flex: 1 },
  centerBothDirections: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWH: {
    width: '100%',
    height: '100%',
  },
  bigSurface: {
    borderRadius: Corners.BIG,
  },
  mediumSurface: {
    borderRadius: Corners.MEDIUM,
  },
  smallSurface: {
    borderRadius: Corners.SMALL,
  },
});

export default commonStyles;
