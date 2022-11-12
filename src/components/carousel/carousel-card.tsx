import * as React from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-paper';
import normalize from '../../utils/normalize';

// const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const CarouselCard = (props: CarouselCardProps): JSX.Element => {
  return (
    <Card style={{
      // transform: [{ scaleX: -1 }],
      borderRadius: 2, backgroundColor: '#fff',
      minHeight: 120 }} >
      {/* <Card.Title title={props.title} subtitle={props.title} /> */}
      <Card.Content>
        <Text style={{ fontFamily: 'OpenSans-Bold', fontWeight: 'bold', fontSize: normalize(18), paddingTop: 0, paddingBottom: 10, color: '#000' }}>{props.title}</Text>
        <Text onPress={() => props.onItemSelected(props.id)} style={{ fontFamily: 'OpenSans-Bold', fontWeight: 'bold', fontSize: normalize(13), paddingTop: 0, paddingBottom: 0, color: '#2d218f' }}>{"Read more"}</Text>
      </Card.Content>
      {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
      {/* <Card.Actions> */}
      {/* </Card.Actions> */}
    </Card>
  );
}

type CarouselCardProps = {
  title: string;
  id: number;
  onItemSelected: (id: number) => void;
}

export default CarouselCard;