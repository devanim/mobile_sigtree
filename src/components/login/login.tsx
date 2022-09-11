import React, { useContext, useState } from "react";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  Icon,
  Layout,
  Input,
  Button,
} from "@ui-kitten/components";

import Text from "components/Text";
import Container from "components/Container";
import useLayout from "hooks/useLayout";
import { loginStyles } from "./login-styles";
import RealmContext from "../../context/RealmContext";

const Login = (props: LoginProps): JSX.Element => {
  const { top } = useLayout();
  const [hide, setHide] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const {realmData: data, setRealm} = useContext(RealmContext);


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container style={loginStyles.container} level="1">
        <Layout level="4" style={[ loginStyles.layout, { paddingTop: top } ]}>
          <View style={loginStyles.topView}>
            <Text marginTop={12} marginBottom={16} category="title3">
              Login into {data?.name ?? ""} realm
            </Text>
            <Input status="basic" placeholder="Username" value={user} onChangeText={setUser} style={{ marginBottom: 16 }} />
            <Input
              secureTextEntry={hide}
              value={password}
              onChangeText={setPassword}
              status="basic"
              placeholder="Password"
              accessoryRight={(props) => (
                <TouchableOpacity onPress={() => { setHide(!hide); }}>
                  <Icon {...props} pack="assets" name={hide ? "eye" : "eyeHide"} />
                </TouchableOpacity>
              )}
            />

            <View style={loginStyles.bottomLayout}>
              <Button style={loginStyles.button} size="large" children="Sign In" />
              <Button style={loginStyles.button} size="large" children="Show Realms" onPress={() => props.toggleRealmsCallback()}/>
            </View>
          </View>
        </Layout>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Login;

interface LoginProps {
  toggleRealmsCallback: Function;
}