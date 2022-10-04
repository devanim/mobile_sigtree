import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { UserProfile as UserProfileModel } from "../../models/user-profile/user-profile";
import { ResponseStatus } from "../../utils/response-status-enum";
import Text from "../../components/text";
import { mockUserProfile } from "./mock-user-profile";
import { userProfileStyle } from "./user-profile-style";
import Checkbox from "../../components/Checkbox";

const UserProfile = (): JSX.Element => {
  const [userProfile, setUserProfile] = useState<UserProfileModel | undefined>(undefined);

  useEffect(() => {
    //TODO - replace with axios call to back-end
    const requestResponse = mockUserProfile;

    if (requestResponse.status === ResponseStatus.fail) {
      alert(`User profile could not be found`)
    }

    setUserProfile(requestResponse.data);
  }, []);

  return (
    <View style={userProfileStyle.containerCard}>
      <Text style={userProfileStyle.default}>
        Actualizati setarile de utilizator
      </Text>
      <View style={userProfileStyle.breakLine} />
      {/* <View style={userProfileStyle.twoColumns}> */}
        <View style={[userProfileStyle.allignLeft]}>
          <Text style={userProfileStyle.default}>UTILIZATOR</Text>
          <Text style={userProfileStyle.default}>{userProfile?.username}</Text>
        </View>
        <Text style={[userProfileStyle.allignRight, userProfileStyle.default]}>De ce nu pot schimba asta?</Text>
      {/* </View> */}
      <Text style={userProfileStyle.default} category="call-out" status="placeholder">
        {`Fist Name: ${userProfile?.firstName}`}
      </Text>
      <Text style={userProfileStyle.default} category="call-out" status="placeholder">
        {`Last Name: ${userProfile?.lastName}`}
      </Text>
      <Text style={userProfileStyle.default} category="call-out" status="placeholder">
        {`Email: loremIpsum@test.com`}
      </Text>
      <Text style={userProfileStyle.default} category="call-out" status="placeholder">
        {`Language: ${userProfile?.lang}`}
      </Text>
      <Text style={userProfileStyle.default}>
        Actualizati setarile pentru notificari
      </Text>
      <View style={userProfileStyle.breakLine} />
      <View style={userProfileStyle.checkboxContainer}>
        <Checkbox checked={userProfile?.notifyOnNewNote} style={userProfileStyle.checkbox}/>
        <Text style={[userProfileStyle.label, userProfileStyle.default]}>Primeste notificari despre note noi</Text>
      </View>
      <View style={userProfileStyle.checkboxContainer}>
        <Checkbox checked={userProfile?.notifyOnStatusNew} style={userProfileStyle.checkbox}/>
        <Text style={[userProfileStyle.label, userProfileStyle.default]}>Notificare status - Nou</Text>
      </View>
      <View style={userProfileStyle.checkboxContainer}>
        <Checkbox checked={userProfile?.notifyOnStatusProgress} style={userProfileStyle.checkbox}/>
        <Text style={[userProfileStyle.label, userProfileStyle.default]}>Notificare status - In Progres</Text>
      </View>
      <View style={userProfileStyle.checkboxContainer}>
        <Checkbox checked={userProfile?.notifyOnStatusPending} style={userProfileStyle.checkbox}/>
        <Text style={[userProfileStyle.label, userProfileStyle.default]}>Notificare status - In Asteptare</Text>
      </View>
      <View style={userProfileStyle.checkboxContainer}>
        <Checkbox checked={userProfile?.notifyOnStatusResolved} style={userProfileStyle.checkbox}/>
        <Text style={[userProfileStyle.label, userProfileStyle.default]}>Notificare status - Rezolvat</Text>
      </View>
      <View style={userProfileStyle.checkboxContainer}>
        <Checkbox checked={userProfile?.notifyOnStatusClosed} style={userProfileStyle.checkbox}/>
        <Text style={[userProfileStyle.label, userProfileStyle.default]}>Notificare status - Inchis</Text>
      </View>
      <View style={userProfileStyle.checkboxContainer}>
        <Checkbox checked={userProfile?.notifyOnMyTicketsOnly} style={userProfileStyle.checkbox}/>
        <Text style={[userProfileStyle.label, userProfileStyle.default]}>Primeste notificari doar pentru tichetele/serviciile mele</Text>
      </View>
      <View style={userProfileStyle.checkboxContainer}>
        <Checkbox checked={userProfile?.allowNewsletters} style={userProfileStyle.checkbox}/>
        <Text style={[userProfileStyle.label, userProfileStyle.default]}>Newsletter</Text>
      </View>
      <View style={userProfileStyle.checkboxContainer}>
        <Checkbox checked={userProfile?.notifyOnNewDocument} style={userProfileStyle.checkbox}/>
        <Text style={[userProfileStyle.label, userProfileStyle.default]}>Notificare document adaugat</Text>
      </View>
    </View>
  );
};

export default UserProfile;