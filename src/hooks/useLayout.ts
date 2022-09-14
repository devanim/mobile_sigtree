import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const useLayout = (): LayoutHookResponse => {
  const { top, bottom } = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  return { width, height, top, bottom };
};

interface LayoutHookResponse {
  width: number;
  height: number;
  top: number;
  bottom: number;
}

export default useLayout;
