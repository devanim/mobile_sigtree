import React, { SetStateAction, useCallback, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Carousel , { Pagination } from 'react-native-snap-carousel';
import { Card, ActivityIndicator, Title } from 'react-native-paper';
import CarouselCard from "./carousel/carousel-card";
import normalize from '../utils/normalize';

const SnapCarousel = (props: SnapCarouselProps): JSX.Element => {
  const _renderItem = ({ item, index }:SnapCarouselItem) => {
    if(item.element) {
      return item.element;
    }
    return (
      <CarouselCard key={index} title={item.name} id={item.id} onItemSelected={item.onItemSelected} />
    );
  }

  const [indexSelected, setIndexSelected] = useState(0);

  const onSelect = (indexSelected: SetStateAction<number>) => {
    setIndexSelected(indexSelected);
  };

  return (
    <View style={styles.container}>
      <Card style={{ backgroundColor: 'transparent' }} mode='contained'>
        <Card.Content style={{ paddingHorizontal: 0, paddingVertical: 0 }}>
          <Title style={{ fontFamily: 'OpenSans-ExtraBold', fontWeight: '900', fontSize: normalize(18), paddingTop: 0, paddingBottom: 10, paddingLeft: 15, paddingRight: 15, color: '#ffffff' }}>{props.name}</Title>
            <View>
              {props.isLoading ? <ActivityIndicator /> : <></>}
              {!props.isLoading && props.data.length == 0 ? <Text style={{ flex: 1 }}>{props.nodata}</Text> : <></> }
              {!props.isLoading && props.data.length > 0 ?
              <>
                <Carousel
                  // ref={(c) => { this._carousel = c; }}
                  // layoutCardOffset={10}
                  layout={'default'}
                  data={props.data}
                  renderItem={_renderItem}
                  sliderWidth={props.sliderWidth}
                  itemWidth={props.itemWidth}
                  scrollEnabled={props.scrollEnabled}
                  onSnapToItem={index => onSelect(index)}
                  
                  inactiveSlideScale={0.95}
                  inactiveSlideOpacity={0.8}
                  lockScrollWhileSnapping={true}
                  enableMomentum={true}
                  decelerationRate={0.25}
                  enableSnap={true}

                  firstItem={0}
                  // containerCustomStyle={{
                  //   // transform: [{ scaleX: -1 }],
                  //   // marginLeft: 15
                  // }}
                  
                  // enableMomentum={false}
                  // decelerationRate={0}
                />
                <Pagination
                  inactiveDotColor='#fafafa'
                  dotColor={'white'}
                  activeDotIndex={indexSelected}
                  dotsLength={props.data.length}
                  animatedDuration={150}
                  inactiveDotScale={1}
                  containerStyle={{ backgroundColor: 'transparent', paddingVertical: 0, paddingTop: 10, paddingBottom: 0, justifyContent: "flex-start", paddingLeft: 15 }}
                  dotStyle={{ marginHorizontal: 0 }}
                  dotContainerStyle={{ marginHorizontal: 5 }}
                />
              </>
              : <></>}
            </View>
        </Card.Content>
      </Card>
    </View>
    
  );
};

type SnapCarouselItem = {
  item: SnapCarouselData;
  index: number
}
type SnapCarouselProps = {
  name: string;
  nodata?: string;
  isLoading?: boolean;
  sliderWidth: number;
  itemWidth: number;
  scrollEnabled?: boolean;
  data: SnapCarouselData[];
}

type SnapCarouselData = {
  id: number;
  name: string;
  element: JSX.Element;
  onItemSelected: (id: number) => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#000',
    backgroundColor: 'transparent',
    paddingTop: 30
  },
  img: {
    backgroundColor: 'transparent',
  },
});

export default SnapCarousel;
