import {
  Avatar,
  Icon,
  Layout,
  StyleService,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import IDivider from "components/IDivider";
import HStack from "components/HStack";
import Text from "components/Text";
import dayjs from "dayjs";
import useToggle from "hooks/useToggle";
import React from "react";
import { TouchableOpacity, View } from "react-native";
export interface CommentItemProps {
  user: {
    name: string;
    status: OnlineStatus;
    avatar: {
      path: string;
    };
  };
  comment: string;
  liked: number;
  commended: number;
  fire: boolean;
  isLike: boolean;
  isCommended: boolean;
  createAt: Date;
}
interface ItemProps {
  item: CommentItemProps;
}
const CommentItem = ({ item }: ItemProps) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const [liked, toggleLike] = useToggle(item.isLike);
  const DotOnline = React.useCallback(({ status }) => {
    return (
      <Layout
        style={[
          styles.online,
          {
            backgroundColor:
              status === OnlineStatus.online
                ? theme["background-basic-color-4"]
                : theme["background-basic-color-6"],
          },
        ]}
      />
    );
  }, []);

  const onMenu = () => {};
  const onUser = () => {};
  const onFire = () => {};
  return (
    <View>
      <HStack mh={16} mb={16}>
        <HStack justify="flex-start">
          <HStack mr={12} onPress={onUser}>
            <Avatar source={{ uri: item.user.avatar.path }} />
            <DotOnline status={item.user.status} />
          </HStack>
          <View>
            <Text>{item.user.name}</Text>
            <Text>{dayjs().to(dayjs(item.createAt))}</Text>
          </View>
        </HStack>
        <HStack onPress={onMenu}>
          <Icon pack="assets" name="menu" style={styles.menu} />
        </HStack>
      </HStack>
      <Text marginLeft={16} marginRight={32}>
        {item.comment}
      </Text>
      <IDivider margin={16} />
      <HStack mh={16}>
        <HStack justify="flex-start" itemsCenter>
          <HStack justify="flex-start" mr={32} itemsCenter onPress={toggleLike}>
            <Icon
              pack="assets"
              name="like"
              style={[
                styles.icon20,
                {
                  tintColor: liked
                    ? theme["text-primary-color"]
                    : theme["text-snow-color"],
                },
              ]}
            />
            <Text
              category="headline"
              status="snow"
              marginTop={4}
              marginLeft={8}
            >
              {liked ? item.liked + 1 : item.liked}
            </Text>
          </HStack>
          <HStack justify="flex-start" itemsCenter>
            <Icon
              pack="assets"
              name="chat"
              style={[
                styles.icon20,
                {
                  tintColor: item.isCommended
                    ? theme["text-primary-color"]
                    : theme["text-snow-color"],
                },
              ]}
            />
            <Text category="headline" status="snow" marginLeft={8}>
              {item.isCommended ? item.commended + 1 : item.commended}
            </Text>
          </HStack>
        </HStack>
        <TouchableOpacity onPress={onFire}>
          <Icon pack="assets" name="fire" style={styles.icon20} />
        </TouchableOpacity>
      </HStack>
      <IDivider marginVertical={16} marginLeft={16} />
    </View>
  );
};
export default CommentItem;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  menu: {
    tintColor: "text-placeholder-color",
  },
  online: {
    width: 14,
    height: 14,
    borderWidth: 2,
    borderRadius: 99,
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  icon20: {
    width: 20,
    height: 20,
    tintColor: "text-snow-color",
  },
});

export enum OnlineStatus {
  offline = "Offline",
  online = "Online",
}
