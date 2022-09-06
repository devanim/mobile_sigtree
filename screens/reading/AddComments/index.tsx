import {
  StyleService,
  TopNavigation,
  useStyleSheet,
} from "@ui-kitten/components";
import Container from "components/Container";
import Content from "components/Content";
import NavigationAction from "components/NavigationAction";
import _ from "lodash";
import React from "react";
import CommentItem, { CommentItemProps, OnlineStatus } from "./CommentItem";
const AddComments = () => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction icon="leftArrow" />}
        title="Comments (13)"
      />
      <Content contentContainerStyle={styles.content}>
        {_.map(DATA, (comment, index) => {
          return <CommentItem item={comment} key={comment.user.name + index} />;
        })}
      </Content>
    </Container>
  );
};
export default AddComments;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 16,
  },
});

const DATA: CommentItemProps[] = [
  {
    commended: 259,
    fire: false,
    liked: 139,
    isLike: true,
    isCommended: false,
    comment:
      "Non-fungible tokens (NFTs) seem to have exploded out of the ether this year.",
    createAt: new Date(),
    user: {
      name: "Christine Stewart",
      status: OnlineStatus.offline,
      avatar: {
        path: "https://user-images.githubusercontent.com/87011701/182331841-70fde5c1-0f4f-4612-a0b3-7074d5d888d2.png",
      },
    },
  },
  {
    commended: 259,
    comment:
      "An NFT is a digital asset that represents real-world objects like art",
    fire: false,
    liked: 139,
    isLike: false,
    isCommended: false,
    createAt: new Date(),
    user: {
      name: "Tommy Armstrong",
      status: OnlineStatus.online,
      avatar: {
        path: "https://user-images.githubusercontent.com/87011701/182331874-0ba8f7aa-852e-4ecf-8d23-52a1ef6c4622.png",
      },
    },
  },
];
