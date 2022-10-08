import { useContext } from "react";
import { ScrollView, View, Text } from "react-native";

import CustCheckbox from "../../components/cust-checkbox";
import SectionTitle from "../../components/section-title";
import { UserProfile as UserProfileModel } from "../../models/user-profile/user-profile";
import LocalizationContext from "../../localization/localization-context";

import { userProfileStyle } from "./user-profile-style";

const UserProfile = (props: UserProfileProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const userProfile = props.profile;

  return (
    <ScrollView style={userProfileStyle.containerCard}>
      <SectionTitle title="User settings"/>

      <View style={userProfileStyle.twoColumns}>
        <Text style={userProfileStyle.labelBox}>{t("USER_PROFILE_USER_LABEL")}</Text>
        <Text style={userProfileStyle.textBox}>{userProfile.username}</Text>
      </View>
      <View style={userProfileStyle.twoColumns}>
        <Text style={userProfileStyle.labelBox}>{t("USER_PROFILE_FIRST_NAME_LABEL")}</Text>
        <Text style={userProfileStyle.textBox}>{userProfile.firstName}</Text>
      </View>
      <View style={userProfileStyle.twoColumns}>
        <Text style={userProfileStyle.labelBox}>{t("USER_PROFILE_LAST_NAME_LABEL")}</Text>
        <Text style={userProfileStyle.textBox}>{userProfile.lastName}</Text>
      </View>
      <View style={userProfileStyle.twoColumns}>
        <Text style={userProfileStyle.labelBox}>{t("USER_PROFILE_EMAIL_LABEL")}</Text>
        <Text style={userProfileStyle.textBox}>{userProfile.email}</Text>
      </View>
      <View style={userProfileStyle.twoColumns}>
        <Text style={userProfileStyle.labelBox}>{t("USER_PROFILE_LANGUAGE_LABEL")}</Text>
        <Text style={userProfileStyle.textBox}>{userProfile.lang}</Text>
      </View>

      <SectionTitle title="Notification settings"/>

      <CustCheckbox isChecked={userProfile.notifyOnNewNote} label={t("USER_PROFILE_NEWNOTE_NOTIFICATION_LABEL")}/>
      <CustCheckbox isChecked={userProfile.notifyOnStatusNew} label={t("USER_PROFILE_STATUS_NEW_NOTIFICATION_LABEL")}/>
      <CustCheckbox isChecked={userProfile.notifyOnStatusProgress} label={t("USER_PROFILE_STATUS_PROGRESS_NOTIFICATION_LABEL")}/>
      <CustCheckbox isChecked={userProfile.notifyOnStatusPending} label={t("USER_PROFILE_STATUS_PENDING_NOTIFICATION_LABEL")}/>
      <CustCheckbox isChecked={userProfile.notifyOnStatusResolved} label={t("USER_PROFILE_STATUS_RESOLVED_NOTIFICATION_LABEL")}/>
      <CustCheckbox isChecked={userProfile.notifyOnStatusClosed} label={t("USER_PROFILE_STATUS_CLOSED_NOTIFICATION_LABEL")}/>
      <CustCheckbox isChecked={userProfile.notifyOnMyTicketsOnly} label={t("USER_PROFILE_TICKETS_NOTIFICATION_LABEL")}/>
      <CustCheckbox isChecked={userProfile.allowNewsletters} label={t("USER_PROFILE_NEWSLETTER_NOTIFICATION_LABEL")}/>
      <CustCheckbox isChecked={userProfile.notifyOnNewDocument} label={t("USER_PROFILE_NEWDOCUMENT_NOTIFICATION_LABEL")}/>
    </ScrollView>
  );
};

type UserProfileProps = {
  profile: UserProfileModel
}

export default UserProfile;