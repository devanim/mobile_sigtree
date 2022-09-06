import {
  Icon,
  Input,
  Layout,
  StyleService,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import React from "react";
import Text from "components/Text";
import HStack from "components/HStack";
import useLayout from "hooks/useLayout";
import Content from "components/Content";
import { TouchableOpacity, View, Image } from "react-native";
import { Controller, useForm } from "react-hook-form";
import useImagePicker from "hooks/useImagePicker";

const CreatePost = () => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const { top, width, height, bottom } = useLayout();
  const [img, setImage] = React.useState<string>();
  const widthImage = width - 32;
  const heightImage = 179 * (height / 812);
  const [takePhoto, choosePhoto] = useImagePicker();
  const [photo, setPhoto] = React.useState<string>();

  const {
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "Add Title Here",
      subtitle: "",
      describer: "",
      type: "",
    },
  });
  const handleChoosePhoto = () => choosePhoto((i) => setPhoto(i?.uri), [1, 1]);
  return (
    <Container style={styles.container} useSafeArea={false}>
      <Layout style={[styles.header, { paddingTop: top + 8 }]} level="2">
        <HStack itemsCenter>
          <NavigationAction icon="leftArrow" />
          <Text status="primary" marginRight={16}>
            Post
          </Text>
        </HStack>
        <Text category="title2" marginHorizontal={16} marginBottom={4}>
          Create Post
        </Text>
      </Layout>
      <Content contentContainerStyle={styles.content}>
        {photo ? (
          <TouchableOpacity activeOpacity={0.7} onPress={handleChoosePhoto}>
            <Image
              resizeMode="cover"
              resizeMethod="scale"
              style={{
                width: widthImage,
                height: heightImage,
                borderRadius: 8,
              }}
              source={{ uri: photo }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleChoosePhoto}
            activeOpacity={0.54}
            style={[
              styles.imageField,
              { width: widthImage, height: heightImage },
            ]}
          >
            <Icon
              pack="assets"
              name="image"
              style={{ tintColor: theme["color-basic-100"] }}
            />
            <Text category="subhead" status={"placeholder"} marginTop={8}>
              Add image
            </Text>
          </TouchableOpacity>
        )}
        <Controller
          name="title"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Add Title Here"
              status={"transparent"}
              size="title"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              onPressIn={() => setValue("title", "")}
            />
          )}
        />
        <Controller
          name="subtitle"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              status={"transparent"}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="“ your sub title "
              size="large"
            />
          )}
        />
        <Controller
          name="describer"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Say something your idea"
              status={"transparent"}
              size="large"
              multiline
            />
          )}
        />
        <HStack style={styles.button} justify="flex-start">
          <Layout style={styles.layoutIcon}>
            <Icon pack="assets" name="flag" />
          </Layout>
          <Layout>
            <Text category="headline" marginBottom={4}>
              Location
            </Text>
            <Text status={"placeholder"} category="caption1">
              991 Harvest Elk Mount, Dallas, MA 58621
            </Text>
          </Layout>
        </HStack>
        <HStack style={styles.button} justify="flex-start">
          <Layout style={styles.layoutIcon}>
            <Icon pack="assets" name="priceTag" />
          </Layout>
          <Layout>
            <Text category="headline" marginBottom={4}>
              Tags
            </Text>
            <Text status={"placeholder"} category="caption1">
              eg: metmoi, reading, ecommerce...
            </Text>
          </Layout>
        </HStack>
      </Content>
      <Layout
        style={[styles.fitBottom, { paddingBottom: bottom + 8 }]}
        level="2"
      >
        <Controller
          name="type"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              status={"transparent"}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Type here"
              size="large"
            />
          )}
        />
      </Layout>
    </Container>
  );
};
export default CreatePost;
const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  imageField: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "color-salmon-100",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonChangeImage: {
    alignSelf: "center",
    marginTop: 12,
  },
  button: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    borderColor: "background-basic-color-2",
    marginBottom: 16,
  },
  layoutIcon: {
    padding: 12,
    marginRight: 16,
  },
  fitBottom: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});
