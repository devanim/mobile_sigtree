import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TopNavigation } from "@ui-kitten/components";
import axios from "axios";
import { AppStackParamList } from "../../routing/route-screens";

import NavigationAction from "../../components/navigation-action";
import Container from "../../components/container";
import TermsOfService from "../../components/terms-of-service";

import { tosScreenStyles } from "./tos-screen-styles";
import { useEffect } from "react";
import { TOS } from "src/models/tos/tos";

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
    const baseUrl = "https://customer1.sigtree.com";
    const url = `${baseUrl}/api/v1/tos/1?all=false`;
    const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJYVG11RFZKXzczanp1RURyV0duY09iNzFaQkFKWUhLM2xsc29va084T2drIn0.eyJleHAiOjE2NjUyMTM1NzMsImlhdCI6MTY2NTIxMzI3MywianRpIjoiNWY5NzEzOWUtMTBiMi00NTcwLTkzMTktYWQ3MzFjNmQ5Y2ZkIiwiaXNzIjoiaHR0cHM6Ly9zc28uc2lndHJlZS5jb20vYXV0aC9yZWFsbXMvY3VzdG9tZXIxIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjA2ZTI1MWU4LWY0MmMtNDM5NS1hYTQ4LTQyY2Q0YzdkM2E2YSIsInR5cCI6IkJlYXJlciIsImF6cCI6InNpZ3RyZWUiLCJzZXNzaW9uX3N0YXRlIjoiMmRjZWI3ZTEtOGNhZi00MGJlLThlZmYtMmJhYTRlMzkyMzhhIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zaWd0cmVlIiwidW1hX2F1dGhvcml6YXRpb24iLCJURU5BTlQiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiIyZGNlYjdlMS04Y2FmLTQwYmUtOGVmZi0yYmFhNGUzOTIzOGEiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zaWd0cmVlIiwidW1hX2F1dGhvcml6YXRpb24iLCJURU5BTlQiXSwibmFtZSI6IlNvZnRFeHBlcnRzIEEtMSIsInByZWZlcnJlZF91c2VybmFtZSI6InNvZnRleHBlcnRzLmExIiwiZ2l2ZW5fbmFtZSI6IlNvZnRFeHBlcnRzIiwidXNlcklkIjoiMTgiLCJmYW1pbHlfbmFtZSI6IkEtMSIsImVtYWlsIjoic29mdGV4cGVydHMuYTFAc29mdGV4cGVydHMuY29tIn0.MYNrVDM5AzivtBAYiypPPrTycSgRxnUS8aE0NFlMexMPhcvXPANn71UvsP2HhdrLcjKxhI2xg4Nmj0_HT1SXH7WTX144YeWv6QEgSJgBxOFl7BX3SycLhbnyKqHupd02CskRAhsAkwUVIDApb6QdyWFOiO6Y0HTmH4W6gPKKooX3Q2RwgOKuxRXYa48V6jSHXysC_yb6TOGG4EmtqdRPVDUaP1vRe_1u612jPwj09D5WYR3SZ3Xw39BeCATmb_UZgGvSypXKIjqMUDcxKvu9RXHhHuWGa1WtXzxCoWRABDPh95Kf--HgnoyrqdSnshhXgIx7VFrzz2miD00cI63y0Q";

    try {
      const response = await axios.get<TOS>(url, { headers: { 'Authorization': `Bearer ${token}` } });
      
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