import React from "react";
import { View, ScrollView } from "react-native";

import Text from "../text";
import CarouselCard from "./carousel-card";
import { carouselStyles } from "./carousel-style";

const Carousel = (props: CarouselProps): JSX.Element => {
  return (
    <View style={carouselStyles.container}>
      <Text category="title3" marginBottom={16} status="white">{props.name}</Text>
      <ScrollView horizontal contentContainerStyle={carouselStyles.content} showsHorizontalScrollIndicator={false}>
        {props.data.map((item, idx) => (
          <CarouselCard key={idx} title={item.title} id={item.id} onItemSelected={item.onItemSelected}/>
        ))}
      </ScrollView>
    </View>
  );
};

type CarouselProps = {
  name: string;
  data: CarouselData[];
}

type CarouselData = {
  id: number;
  title: string;
  onItemSelected: (id: number) => void;
}

export default Carousel;