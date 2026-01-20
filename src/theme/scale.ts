import { Dimensions, PixelRatio } from "react-native";

const { width } = Dimensions.get("window");
const BASE_WIDTH = 375; // 피그마 기준

export const rs = (size: number) => {
  const scaled = (width / BASE_WIDTH) * size;
  return PixelRatio.roundToNearestPixel(scaled);
};
