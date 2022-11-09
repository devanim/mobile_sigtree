import { Dimensions, Platform, PixelRatio } from 'react-native';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 13 PRO MAX
const scale = SCREEN_WIDTH / 1284;

export function Normalize(size: number) {
  return size;
  // const newSize = size * scale
  // if (Platform.OS === 'ios') {
  //   return Math.round(PixelRatio.roundToNearestPixel(newSize))
  // } else {
  //   return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  // }
}
