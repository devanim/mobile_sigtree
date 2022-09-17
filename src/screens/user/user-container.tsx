import React from "react";
import { View } from "react-native";
import UserProfile from "./user-profile";

const UserContainer = (): JSX.Element => {
  return (
    <View>
      <UserProfile />
    </View>
  );
};

export default UserContainer;