import { Text, View, Pressable } from "react-native";
import carouselCardStyles from "./carousel-card-styles";

const CarouselCard = (props: CarouselCardProps): JSX.Element => {
  return (
    <Pressable onPress={() => props.onItemSelected(props.id)}>
      <View style={carouselCardStyles.container}>
        <Text style={carouselCardStyles.text}>{props.title}</Text>
      </View>
    </Pressable>
  );
}

type CarouselCardProps = {
  title: string;
  id: number;
  onItemSelected: (id: number) => void;
}

export default CarouselCard;