import React from "react";
import { View, ScrollView } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";

import Text from "../text";
import { Images } from "assets/images";
import ArticleBriefCard from "../../screens/articles/article-brief-card";

const Carousel = (props: CarouselProps): JSX.Element => {
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.container}>
      <Text category="title3" marginBottom={16} status="white">
        {props.name}
      </Text>
      <ScrollView
        horizontal
        contentContainerStyle={styles.content}
        showsHorizontalScrollIndicator={false}
      >
        {props.data.map((item, _) => {
          return (
            <ArticleBriefCard key={_} articleBrief={item.data} onArticleSelected={item.onSelected}/>
          );
        })}
      </ScrollView>
    </View>
  );
};

interface CarouselProps {
  name: string;
  data: CarouselData[];
}

interface CarouselData {
  data: any;
  onSelected: Function;
}

export default Carousel;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  img: {
    borderRadius: 8,
    marginRight: 16,
  },
  content: {
    paddingRight: 16,
  },
});

const data = [
  {
    id: 0,
    image: Images.gallery01,
  },
  {
    id: 1,
    image: Images.gallery02,
  },
  {
    id: 2,
    image: Images.gallery03,
  },
  {
    id: 3,
    image: Images.gallery01,
  },
];
