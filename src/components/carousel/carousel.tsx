import { Layout } from "@ui-kitten/components";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card, ActivityIndicator, Title } from 'react-native-paper';

import CarouselCard from "./carousel-card";

const Carousel = (props: CarouselProps): JSX.Element => {
  return (
    <Layout style={styles.container} level='1'>
      <Card style={{ backgroundColor: '#fff' }} mode='contained'>
        <Card.Content>
          <Title>{props.name}</Title>
            <View style={styles.contentView}>
              {props.isLoading ? <ActivityIndicator /> : <></>}
              {!props.isLoading && props.data.length == 0 ? <Text style={{ flex: 1 }}>{props.nodata}</Text> : <></> }
              {!props.isLoading && props.data.length > 0 ?
                <ScrollView horizontal contentContainerStyle={styles.content} showsHorizontalScrollIndicator={false}>
                  {props.data.map((item, idx) => (
                    <CarouselCard key={idx} title={item.title} id={item.id} onItemSelected={item.onItemSelected} />
                  ))}
                </ScrollView>
              : <></>}
            </View>
        </Card.Content>
      </Card>
    </Layout>
  );
};

type CarouselProps = {
  name: string;
  nodata: string;
  isLoading: boolean;
  data: CarouselData[];
}

type CarouselData = {
  id: number;
  title: string;
  onItemSelected: (id: number) => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#000',
    marginLeft: '5%',
    marginTop: '1%',
    marginRight: '5%',
    marginBottom: '1%',
  },
  contentView: {
    height: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    borderRadius: 8,
    marginRight: 16,
  },
  content: {
    paddingRight: 16,
    paddingBottom: 8,
    paddingTop: 8,
  },
});

export default Carousel;
