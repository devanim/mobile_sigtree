import { Card, Text } from 'react-native-paper';

const CarouselCard = (props: CarouselCardProps): JSX.Element => {
  return (
    <Card onPress={() => props.onItemSelected(props.id)} style={{ backgroundColor: '#fff', marginHorizontal: 5 }} >
      <Card.Title title={props.title} />
    </Card>
  );
}

type CarouselCardProps = {
  title: string;
  id: number;
  onItemSelected: (id: number) => void;
}

export default CarouselCard;