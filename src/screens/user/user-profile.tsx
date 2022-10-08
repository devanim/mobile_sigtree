import { ScrollView, View, Text } from "react-native";

import CustCheckbox from "../../components/cust-checkbox";
import SectionTitle from "../../components/section-title";

import { userProfileStyle } from "./user-profile-style";
import { UserProfile as UserProfileModel } from "../../models/user-profile/user-profile";

const UserProfile = (props: UserProfileProps): JSX.Element => {
  const userProfile = props.profile;

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

type UserProfileProps = {
  profile: UserProfileModel
}

export default UserProfile;