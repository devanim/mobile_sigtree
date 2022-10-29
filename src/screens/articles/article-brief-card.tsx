import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { Chip } from 'react-native-paper';
import ArticleBrief from "src/models/article/article-brief";

const ArticleBriefCard = (props: ArticleBriefCardProps): JSX.Element => {
  const localizedDate = new Date(
    props.articleBrief.timestamp
  ).toLocaleDateString();

  const onArticlePress = (articleId: number) => {
    props.onArticleSelected(articleId);
  };

  const onTagPress = (tag: string) => {
    props.onTagSelected(tag);
  }

  return (
    <>
      <Pressable onPress={() => onArticlePress(props.articleBrief.id)}>
        <View style={styles.containerCard}>
          <Image
            style={styles.image}
            source={{ uri: `${props.articleBrief.image}` }}
          />
          <View style={styles.textView}>
            <Text style={styles.title}>
              {props.articleBrief.title}
            </Text>
            <Text style={styles.text}>
              {props.articleBrief.excerpt}
            </Text>
            <Text style={styles.dateText}>Date: {localizedDate}</Text>
          </View>
        </View>
      </Pressable>
      <View style={styles.tagsContainer}>
        {props.articleBrief.tagsArray.map((item) => (
          <Chip onPress={() => onTagPress(item)} style={styles.chip}>{item}</Chip>
        ))}
      </View>
    </>
  );
};

type ArticleBriefCardProps = {
  articleBrief: ArticleBrief;
  onArticleSelected: (articleId: number) => void;
  onTagSelected: (tag: string) => void;
};

const styles = StyleSheet.create({
  containerCard: {
    backgroundColor: "#fff",
    width: "100%",
    // marginBottom: 1,
    borderBottomColor: "#000",
    flex: 2,
    flexDirection: "row"
  },
  chip: {
    marginHorizontal: '2%',
    backgroundColor: '#fff',
    borderRadius: 0,
    borderColor: '#ccc',
    borderWidth: 1
  },
  text: {
    margin: 5,
    color: "#000",
  },
  dateText: {
    margin: 5,
    color: "#000",
    fontSize: 10,
  },
  title: {
    margin: 5,
    color: "#000",
    fontWeight: "bold"
  },
  textView: {
    flex: 3,
    padding: 5,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    width: '25%',
    height: '100%',
    resizeMode: 'contain',
  },
  dateView: {
    width: '17%',
    alignContent: "center",
    marginTop: '5%'
  },
  tagsContainer: {
    flex: 4,
    flexDirection: "row",
    backgroundColor: "#FFF",
    marginBottom: 2,
  },
  tagsPressable: {
    borderWidth: 1,
    borderColor: "#000",
    marginRight: 1
  }
});

export default ArticleBriefCard;
