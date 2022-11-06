import { useCallback, useContext, useEffect, useState } from "react";
import React from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import CustCheckbox from "../../components/cust-checkbox";
import SectionTitle from "../../components/section-title";
import LocalizationContext from "../../localization/localization-context";
import { UserProfile as UserProfileModel } from "../../models/user-profile/user-profile";

const UserProfile = (props: UserProfileProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const [userProfile, setUserProfile] = useState<UserProfileModel>(
    props.profile
  );

  return (
    <KeyboardAwareScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.profileDetails}>
            <SectionTitle
              title={t("USER_PROFILE_USER_SETTINGS").toUpperCase()}
            />
            <Text>
              {userProfile.firstName} {userProfile.lastName}
            </Text>
            <Text>{userProfile.username}</Text>
            <Text>{userProfile.email}</Text>
            <Text>{userProfile.lang}</Text>
          </View>

          <View style={styles.profileDetails}>
            <SectionTitle
              title={t("USER_PROFILE_NOTIFICATION_SETTINGS").toUpperCase()}
            />
            <CustCheckbox
              name={"notifyOnNewNote"}
              isChecked={userProfile.notifyOnNewNote}
              label={t("USER_PROFILE_NEWNOTE_NOTIFICATION_LABEL")}
            />
            <CustCheckbox
              name={"notifyOnStatusNew"}
              isChecked={userProfile.notifyOnStatusNew}
              label={t("USER_PROFILE_STATUS_NEW_NOTIFICATION_LABEL")}
            />
            <CustCheckbox
              name={"notifyOnStatusNew"}
              isChecked={userProfile.notifyOnStatusProgress}
              label={t("USER_PROFILE_STATUS_PROGRESS_NOTIFICATION_LABEL")}
            />
            <CustCheckbox
              name={"notifyOnStatusPending"}
              isChecked={userProfile.notifyOnStatusPending}
              label={t("USER_PROFILE_STATUS_PENDING_NOTIFICATION_LABEL")}
            />
            <CustCheckbox
              name={"notifyOnStatusResolved"}
              isChecked={userProfile.notifyOnStatusResolved}
              label={t("USER_PROFILE_STATUS_RESOLVED_NOTIFICATION_LABEL")}
            />
            <CustCheckbox
              name={"notifyOnStatusClosed"}
              isChecked={userProfile.notifyOnStatusClosed}
              label={t("USER_PROFILE_STATUS_CLOSED_NOTIFICATION_LABEL")}
            />
            <CustCheckbox
              name={"notifyOnMyTicketsOnly"}
              isChecked={userProfile.notifyOnMyTicketsOnly}
              label={t("USER_PROFILE_TICKETS_NOTIFICATION_LABEL")}
            />
            <CustCheckbox
              name={"allowNewsletters"}
              isChecked={userProfile.allowNewsletters}
              label={t("USER_PROFILE_NEWSLETTER_NOTIFICATION_LABEL")}
            />
            <CustCheckbox
              name={"notifyOnNewDocument"}
              isChecked={userProfile.notifyOnNewDocument}
              label={t("USER_PROFILE_NEWDOCUMENT_NOTIFICATION_LABEL")}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

type UserProfileProps = {
  profile: UserProfileModel;
};

const styles = StyleSheet.create({
  profileDetails: {
    marginTop: "2.5%",
  },

  container: {
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
});
export default UserProfile;
