import { Text, View } from "react-native";

const CarouselCard = (props: CarouselCardProps): JSX.Element => {
  return (
    <View>
      <Text>This is a carousel card</Text>
    </View>
  );
}

type CarouselCardProps = {
  title: string;
}

export default CarouselCard;