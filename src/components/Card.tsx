import React from "react";
import { Image, View, ImageSourcePropType } from "react-native";
import Text from "./Text";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import useLayout from "hooks/useLayout";
import cardStyles from "./card-styles";

const Card = ({details: { color, title, description, image, id }, animationShared}: CardProps): JSX.Element => {
  const { height, width, top } = useLayout();
  const widthItem = width - 80;

  const styleText = useAnimatedStyle(() => {
    const translateX = interpolate(
      animationShared.value,
      [(id - 1) * widthItem, id * widthItem, (id + 1) * widthItem],
      [widthItem / 2, 0, -widthItem / 2],
      Extrapolate.CLAMP
    );
    const scale = interpolate(
      animationShared.value,
      [(id - 1) * widthItem, id * widthItem, (id + 1) * widthItem],
      [0.61, 1, 0.61],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateX }, { scale }],
    };
  });

  return (
    <View style={{ width: widthItem, paddingTop: top }}>
      <Animated.View
        style={[
          {
            width: widthItem,
            height: height / 2.2,
            paddingRight: 16,
          },
        ]}
      >
        <View style={[cardStyles.image, { backgroundColor: color }]}>
          <Image source={image} />
        </View>
      </Animated.View>
      <Animated.View style={[styleText, cardStyles.textView]}>
        <Text marginTop={48} category="title1">
          {title}
        </Text>
        <Text marginTop={16} category="call-out" status="placeholder">
          {description}
        </Text>
      </Animated.View>
    </View>
  );
};

interface CardDetails {
  id: number;
  title: string;
  description: string;
  image: ImageSourcePropType;
  color: string;
}

interface CardProps {
  details: CardDetails;
  animationShared: Animated.SharedValue<number>;
}

export default Card;