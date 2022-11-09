import React from 'react';
import { Card, Title, Text } from 'react-native-paper';

// const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const CarouselCard = (props: CarouselCardProps): JSX.Element => {
  return (
    <Card onPress={() => props.onItemSelected(props.id)} style={{ borderRadius: 2, backgroundColor: '#fff', marginRight: 10, minWidth: 200 }} >
      {/* <Card.Title title={props.title} subtitle={props.title} /> */}
      <Card.Content>
        <Title style={{ fontFamily: 'OpenSans-Medium', fontWeight: '600', fontSize: 20, paddingTop: 0, paddingBottom: 10, color: '#000' }}>{props.title}</Title>
      </Card.Content>
      {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
      {/* <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions> */}
    </Card>
  );
}

type CarouselCardProps = {
  title: string;
  id: number;
  onItemSelected: (id: number) => void;
}

export default CarouselCard;