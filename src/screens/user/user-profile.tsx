import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { UserProfile as UserProfileModel } from "../../models/user-profile/user-profile";
import { ResponseStatus } from "../../utils/response-status-enum";
import Text from "../../components/text";
import { mockUserProfile } from "./mock-user-profile";
import { userProfileStyle } from "./user-profile-style";
import CustCheckbox from "../../components/cust-checkbox";

const UserProfile = (): JSX.Element => {
  const [userProfile, setUserProfile] = useState<UserProfileModel>(mockUserProfile.data);

  useEffect(() => {
    //TODO - replace with axios call to back-end
    const requestResponse = mockUserProfile;

    if (requestResponse.status === ResponseStatus.fail) {
      alert(`User profile could not be found`)
    }

    setUserProfile(requestResponse.data);
  }, []);

  return (
    <ScrollView style={userProfileStyle.containerCard}>
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
      <CustCheckbox isChecked={userProfile?.notifyOnNewNote} label="Primeste notificari despre note noi"/>
      <CustCheckbox isChecked={userProfile?.notifyOnStatusNew} label="Notificare status - Nou"/>
      <CustCheckbox isChecked={userProfile?.notifyOnStatusProgress} label="Notificare status - In Progress"/>
      <CustCheckbox isChecked={userProfile?.notifyOnStatusPending} label="Notificare status - In Asteptare"/>
      <CustCheckbox isChecked={userProfile?.notifyOnStatusResolved} label="Notificare status - Rezolvat"/>
      <CustCheckbox isChecked={userProfile?.notifyOnStatusClosed} label="Notificare status - Inchis"/>
      <CustCheckbox isChecked={userProfile?.notifyOnMyTicketsOnly} label="Primeste notificari doar pentru tichetele/serviciile mele"/>
      <CustCheckbox isChecked={userProfile?.allowNewsletters} label="Newsletter"/>
      <CustCheckbox isChecked={userProfile?.notifyOnNewDocument} label="Notificare document adaugat"/>
    </ScrollView>
  );
};

export default UserProfile;