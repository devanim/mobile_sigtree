import React from "react";
import { View, ScrollView } from "react-native";

import Text from "../text";
import { carouselStyles } from "./carousel-style";

const Carousel = (props: CarouselProps): JSX.Element => {
  return (
    <View style={carouselStyles.container}>
      <Text category="title3" marginBottom={16} status="white">{props.name}</Text>
      <ScrollView horizontal contentContainerStyle={carouselStyles.content} showsHorizontalScrollIndicator={false}>
        {props.data.map((item) => { return (item.childComponent);})}
      </ScrollView>
    </View>
  );
};

type CarouselProps = {
  name: string;
  data: CarouselData[];
}

type CarouselData = {
  data: any;
  childComponent: JSX.Element;
}

export default Carousel;