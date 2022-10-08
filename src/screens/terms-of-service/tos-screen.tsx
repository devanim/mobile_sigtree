import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TopNavigation } from "@ui-kitten/components";
import axios from "axios";
import { AppStackParamList } from "../../routing/route-screens";

import NavigationAction from "../../components/navigation-action";
import Container from "../../components/container";
import TermsOfService from "../../components/terms-of-service";

import { tosScreenStyles } from "./tos-screen-styles";
import { useEffect } from "react";
import { TOS } from "../../models/tos/tos";
import { AUTH_MOCK, SCREEN_URL } from "../../models/mock-auth";

const TOSScreen = () => {
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();

  useEffect(() => {
    
    // const source = axios.CancelToken.source();
    
    // const [isLoading, setIsLoading] = useState(false);
    // const [hasError, setErrorFlag] = useState(false);
    // const [userId, setUserId] = useState(1);
    // const [user, setUser] = useState(null);

    fetchUsers();
    // return () => source.cancel("Data fetching cancelled");
  }, []);

  const fetchUsers = async () => {
    
    try {
      const response = await axios.get<TOS>(SCREEN_URL.TOS_URL, { headers: { 'Authorization': `Bearer ${AUTH_MOCK.TOKEN}` } });
      
      alert(`response ${JSON.stringify(response.data)}`);
    } catch (error) {
      alert(`error: ${JSON.stringify(error)}`);
    }
  }

  return (
  <Container style={tosScreenStyles.container}>
    <TopNavigation accessoryLeft={() => <NavigationAction onPress={goBack} />} title="Terms of service"/>
    <TermsOfService buildingId={undefined}/>
  </Container>
  );
};

/*
    <View style={styles.wrapperStyle}>
        {!isLoading && !hasError && user && <User userObject={user} />}
      </View>
      <View style={styles.wrapperStyle}>
        {isLoading && <Text> Loading </Text>}
        {!isLoading && hasError && <Text> An error has occurred </Text>}
      </View>
*/

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "dodgerblue",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
//   },
//   wrapperStyle: {
//     minHeight: 128,
//   },
//   buttonStyles: {
//     padding: 100,
//   },
// });

export default TOSScreen;