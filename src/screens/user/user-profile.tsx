import React, { useEffect, useState } from "react";
import axios from "axios";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";

import CustCheckbox from "../../components/cust-checkbox";
import SectionTitle from "../../components/section-title";
import { AUTH_MOCK, SCREEN_URL } from "../../models/mock-auth";
import { UserProfile as UserProfileModel } from "../../models/user-profile/user-profile";

import { userProfileStyle } from "./user-profile-style";
import { UserProfilePayload } from "src/models/user-profile/user-profile-payload";

const UserProfile = (): JSX.Element => {
  const [userProfile, setUserProfile] = useState<UserProfileModel|undefined>(undefined);

  useEffect(() => {
    const source = axios.CancelToken.source();
    
    getUserProfileDetails();

    return () => source.cancel("Data fetching cancelled");
  }, []);

  const getUserProfileDetails = async () => {
    try {
      const response = await axios.get<UserProfilePayload>(SCREEN_URL.USER_PROFILE_URL, { headers: { 'Authorization': `Bearer ${AUTH_MOCK.TOKEN}` } });
      
      if (response.status == 200) {
        setUserProfile(response.data.data);
      }
      else {
        //TODO - set error state
      }
    } catch (error) {
      alert(`error: ${JSON.stringify(error)}`);
      //TODO - set error state 
    }
  }

  if (!userProfile){
    return (<ActivityIndicator />)
  }

  return (
    <ScrollView style={userProfileStyle.containerCard}>
      <SectionTitle title="User settings"/>

      <View style={userProfileStyle.twoColumns}>
        <Text style={userProfileStyle.labelBox}>User</Text>
        <Text style={userProfileStyle.textBox}>{userProfile.username}</Text>
      </View>
      <View style={userProfileStyle.twoColumns}>
        <Text style={userProfileStyle.labelBox}>Firstname: </Text>
        <Text style={userProfileStyle.textBox}>{userProfile.firstName}</Text>
      </View>
      <View style={userProfileStyle.twoColumns}>
        <Text style={userProfileStyle.labelBox}>Lastname: </Text>
        <Text style={userProfileStyle.textBox}>{userProfile.lastName}</Text>
      </View>
      <View style={userProfileStyle.twoColumns}>
        <Text style={userProfileStyle.labelBox}>Email: </Text>
        <Text style={userProfileStyle.textBox}>{userProfile.email}</Text>
      </View>
      <View style={userProfileStyle.twoColumns}>
        <Text style={userProfileStyle.labelBox}>Language: </Text>
        <Text style={userProfileStyle.textBox}>{userProfile.lang}</Text>
      </View>

      <SectionTitle title="Notification settings"/>

      <CustCheckbox isChecked={userProfile.notifyOnNewNote} label="Primeste notificari despre note noi"/>
      <CustCheckbox isChecked={userProfile.notifyOnStatusNew} label="Notificare status - Nou"/>
      <CustCheckbox isChecked={userProfile.notifyOnStatusProgress} label="Notificare status - In Progress"/>
      <CustCheckbox isChecked={userProfile.notifyOnStatusPending} label="Notificare status - In Asteptare"/>
      <CustCheckbox isChecked={userProfile.notifyOnStatusResolved} label="Notificare status - Rezolvat"/>
      <CustCheckbox isChecked={userProfile.notifyOnStatusClosed} label="Notificare status - Inchis"/>
      <CustCheckbox isChecked={userProfile.notifyOnMyTicketsOnly} label="Primeste notificari doar pentru tichetele/serviciile mele"/>
      <CustCheckbox isChecked={userProfile.allowNewsletters} label="Newsletter"/>
      <CustCheckbox isChecked={userProfile.notifyOnNewDocument} label="Notificare document adaugat"/>
    </ScrollView>
  );
};

export default UserProfile;