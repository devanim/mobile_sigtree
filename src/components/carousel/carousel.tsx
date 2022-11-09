import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card, ActivityIndicator, Title } from 'react-native-paper';

import CarouselCard from "./carousel-card";

const Carousel = (props: CarouselProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <Card style={{ backgroundColor: 'transparent' }} mode='contained'>
        <Card.Content style={{ paddingHorizontal: 0, paddingVertical: 0 }}>
          <Title style={{ fontFamily: 'OpenSans-ExtraBold', fontWeight: '900', fontSize: 26, paddingTop: 0, paddingBottom: 10, color: '#ffffff' }}>{props.name}</Title>
            <View style={styles.contentView}>
              {props.isLoading ? <ActivityIndicator /> : <></>}
              {!props.isLoading && props.data.length == 0 ? <Text style={{ flex: 1 }}>{props.nodata}</Text> : <></> }
              {!props.isLoading && props.data.length > 0 ?
                <ScrollView horizontal contentContainerStyle={styles.content} showsHorizontalScrollIndicator={false}>
                  {props.data.map((item, idx) => (
                    <CarouselCard key={idx} title={item.name} id={item.id} onItemSelected={item.onItemSelected} />
                  ))}
                </ScrollView>
              : <></>}
            </View>
        </Card.Content>
      </Card>
    </View>
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
  name: string;
  onItemSelected: (id: number) => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#000',
    backgroundColor: 'transparent',
    paddingTop: 30
  },
  contentView: {
    // height: 200,
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  img: {
    // borderRadius: 8,
    // marginRight: 16,
    backgroundColor: 'transparent',
    // marginLeft: '5%',
    // marginTop: '1%',
    // marginRight: '5%',
    // marginBottom: '1%',
  },
  // img: {
    // borderRadius: 8,
    // marginRight: 16,
  // },
  content: {
    // paddingRight: 16,
    // paddingBottom: 8,
    // paddingTop: 8,
  },
});

export default Carousel;
