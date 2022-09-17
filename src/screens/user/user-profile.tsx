import { useEffect, useState } from "react";
import { View } from "react-native";
import { UserProfile as UserProfileModel } from "src/models/user-profile/user-profile";
import { ResponseStatus } from "../../utils/response-status-enum";
import Text from "../../components/Text";
import { mockUserProfile } from "./mock-user-profile";

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
    <View>
      <Text marginTop={8} category="title1">
        {`Username: ${userProfile?.username}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Fist Name: ${userProfile?.firstName}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Last Name: ${userProfile?.lastName}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Language: ${userProfile?.lang}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Phone Number: ${userProfile?.phoneNumber}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Notify on new note: ${userProfile?.notifyOnNewNote}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Notify on status new: ${userProfile?.notifyOnStatusNew}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Notify on status progress: ${userProfile?.notifyOnStatusProgress}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Notify on status pending: ${userProfile?.notifyOnStatusPending}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Notify on status resolved: ${userProfile?.notifyOnStatusResolved}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Notify on status closed: ${userProfile?.notifyOnStatusClosed}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Notify on my tickets only: ${userProfile?.notifyOnMyTicketsOnly}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Allow newsletters: ${userProfile?.allowNewsletters}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Notify on new document: ${userProfile?.notifyOnNewDocument}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Role: ${userProfile?.role}`}
      </Text>
      <Text marginTop={8} category="call-out" status="placeholder">
        {`Default Building Id: ${userProfile?.defaultBuildingId}`}
      </Text>
    </View>
  );
};

export default UserProfile;