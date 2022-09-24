import React, { useState } from "react";
import { View } from "react-native";
import UserProfile from "./user-profile";
import { Button } from "@ui-kitten/components";
import TermsOfService from "../../components/terms-of-service";

const UserContainer = (): JSX.Element => {
  const [showTOS, setShowTOS] = useState<boolean>(false);

  const toggleUserProfile = () => {
    alert(showTOS);
    if (showTOS) {
      return <TermsOfService buildingId={undefined} onCancel={() => setShowTOS(false)}/>
    }

    return <UserProfile />;
  }

  return (
    <View>
      <Button children={"Read Tems of Services"} onPress={() => setShowTOS(true)} size={'small'}/>
      {toggleUserProfile()}
    </View>
  );
};

export default UserContainer;