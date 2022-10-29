import { useContext } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";

import CustCheckbox from "../../components/cust-checkbox";
import SectionTitle from "../../components/section-title";
import { UserProfile as UserProfileModel } from "../../models/user-profile/user-profile";
import LocalizationContext from "../../localization/localization-context";
import React from "react";

const UserProfile = (props: UserProfileProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const userProfile = props.profile;

  return (
    <ScrollView>
      <SectionTitle title={t("USER_PROFILE_USER_SETTINGS").toUpperCase()} />
      <View style={styles.profileDetails}>
        <Text>{userProfile.firstName}{' '}{userProfile.lastName}</Text>
        <Text>{userProfile.username}</Text>
        <Text>{userProfile.email}</Text>
        <Text>{userProfile.lang}</Text>
      </View>
      <SectionTitle title={t("USER_PROFILE_NOTIFICATION_SETTINGS").toUpperCase()} />
      <View style={styles.profileDetails}>
        <CustCheckbox isChecked={userProfile.notifyOnNewNote} label={t("USER_PROFILE_NEWNOTE_NOTIFICATION_LABEL")} />
        <CustCheckbox isChecked={userProfile.notifyOnStatusNew} label={t("USER_PROFILE_STATUS_NEW_NOTIFICATION_LABEL")} />
        <CustCheckbox isChecked={userProfile.notifyOnStatusProgress} label={t("USER_PROFILE_STATUS_PROGRESS_NOTIFICATION_LABEL")} />
        <CustCheckbox isChecked={userProfile.notifyOnStatusPending} label={t("USER_PROFILE_STATUS_PENDING_NOTIFICATION_LABEL")} />
        <CustCheckbox isChecked={userProfile.notifyOnStatusResolved} label={t("USER_PROFILE_STATUS_RESOLVED_NOTIFICATION_LABEL")} />
        <CustCheckbox isChecked={userProfile.notifyOnStatusClosed} label={t("USER_PROFILE_STATUS_CLOSED_NOTIFICATION_LABEL")} />
        <CustCheckbox isChecked={userProfile.notifyOnMyTicketsOnly} label={t("USER_PROFILE_TICKETS_NOTIFICATION_LABEL")} />
        <CustCheckbox isChecked={userProfile.allowNewsletters} label={t("USER_PROFILE_NEWSLETTER_NOTIFICATION_LABEL")} />
        <CustCheckbox isChecked={userProfile.notifyOnNewDocument} label={t("USER_PROFILE_NEWDOCUMENT_NOTIFICATION_LABEL")} />
      </View>
    </ScrollView>
  );
};

type UserProfileProps = {
  profile: UserProfileModel
}

const styles = StyleSheet.create({
  profileDetails: {
    marginLeft: '5%',
  },

  container: {},
});
export default UserProfile;