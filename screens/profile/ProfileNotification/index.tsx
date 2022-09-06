import useToggle from "hooks/useToggle";
import React from "react";
import { View } from "react-native";
import Text from "components/Text";
import {
  Icon,
  Layout,
  StyleService,
  Toggle,
  TopNavigation,
  useStyleSheet,
} from "@ui-kitten/components";
import NavigationAction from "components/NavigationAction";
import Container from "components/Container";
import Content from "components/Content";
import HStack, { HStackProps } from "components/HStack";

interface NotificationToggleProps extends HStackProps {
  title: string;
  onPress(): void;
  checked: boolean;
}
const ProfileNotification = () => {
  const styles = useStyleSheet(themedStyles);

  const [whenOpenApp, setWhenOpen] = useToggle();
  const [varible, toggleVarible] = useToggle(true);
  const [messageComing, toggleMessageComing] = useToggle();
  const [groupMessage, toggleGroupMessage] = useToggle(true);
  const [birthdayFriend, toggleBirthdayFriend] = useToggle(true);
  const [diary, toggleDiary] = useToggle(true);

  const NotificationToggle = React.useCallback(
    ({ title, onPress, checked, ...rest }: NotificationToggleProps) => {
      return (
        <HStack
          ph={10}
          pv={10}
          border={12}
          {...rest}
          level="2"
          onPress={onPress}
        >
          <HStack>
            <Layout style={styles.layoutIcon} level="7">
              <Icon pack="assets" name="heart" style={styles.iconHeart} />
            </Layout>
            <View>
              <Text category="headline">{title}</Text>
              <Text status={"placeholder"} category="footnote">
                {checked ? "ON" : "OFF"}
              </Text>
            </View>
          </HStack>
          <Toggle onChange={onPress} checked={checked} />
        </HStack>
      );
    },
    []
  );
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction icon="leftArrow" />}
        title="Notifications"
      />
      <Content contentContainerStyle={styles.contentContainer}>
        <Text category="call-out" marginLeft={8} uppercase status={"primary"}>
          general
        </Text>
        <NotificationToggle
          title={"When open app"}
          onPress={setWhenOpen}
          checked={whenOpenApp}
          mv={16}
        />
        <NotificationToggle
          title={"Varible"}
          onPress={toggleVarible}
          checked={varible}
          mb={16}
        />
        <NotificationToggle
          title={"Message coming"}
          onPress={toggleMessageComing}
          checked={messageComing}
          mb={32}
        />
        <Text category="call-out" marginLeft={8} uppercase status={"primary"}>
          message
        </Text>
        <NotificationToggle
          title={"Group message"}
          onPress={toggleGroupMessage}
          checked={groupMessage}
          mt={16}
          mb={32}
        />
        <Text category="call-out" marginLeft={8} uppercase status={"primary"}>
          events
        </Text>
        <NotificationToggle
          title={"Birthday Friends"}
          onPress={toggleBirthdayFriend}
          checked={birthdayFriend}
          mv={16}
        />
        <NotificationToggle
          title={"Diary"}
          onPress={toggleDiary}
          checked={diary}
        />
      </Content>
    </Container>
  );
};
export default ProfileNotification;
const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  iconHeart: {
    tintColor: "color-basic-100",
    margin: 12,
  },
  layoutIcon: {
    borderRadius: 99,
    marginRight: 16,
  },
});
