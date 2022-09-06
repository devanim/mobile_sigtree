import React from "react";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
  Input,
  Button,
} from "@ui-kitten/components";

import Text from "components/Text";
import Container from "components/Container";
import useLayout from "hooks/useLayout";

const Login = (props: LoginProps): JSX.Element => {
  const { top, bottom, width, height } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [hide, setHide] = React.useState(false);
  const handleCard = React.useCallback(() => {}, []);
  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container style={styles.container} level="1">
        <Layout
          level="4"
          style={[
            styles.layout,
            {
              paddingTop: top,
            },
          ]}
        >
          <View style={styles.topView}>
            <Text marginTop={12} marginBottom={16} category="title3">
              Login into {props.realmName} realm
            </Text>
            <Input
              status="basic"
              placeholder="Username"
              value={user}
              onChangeText={setUser}
              style={{ marginBottom: 16 }}
            />
            <Input
              secureTextEntry={hide}
              value={password}
              onChangeText={setPassword}
              status="basic"
              placeholder="Password"
              accessoryRight={(props) => (
                <TouchableOpacity
                  onPress={() => {
                    setHide(!hide);
                  }}
                >
                  <Icon
                    {...props}
                    pack="assets"
                    name={hide ? "eye" : "eyeHide"}
                  />
                </TouchableOpacity>
              )}
            />

            <View style={styles.bottomLayout}>
              <Button style={styles.button} size="large" children="Sign In" />
              <Button style={styles.button} size="large" children="Show Realms" onPress={() => props.toggleRealmsCallback()}/>
            </View>
          </View>
        </Layout>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Login;

interface LoginProps {
  realmName: string;
  toggleRealmsCallback: Function;
}

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  flatList: {
    alignItems: "center",
    paddingTop: 16,
  },
  btnBottom: {
    paddingBottom: 16,
  },
  bottomLayout: {
    flexDirection: "row",
    marginVertical: 24,
    alignItems: "center",
  },
  layout: {
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
  },
  topView: {
    marginHorizontal: 24,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  content: {
    flexWrap: "wrap",
    flex: 1,
    alignSelf: "center",
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginRight: 8,
    marginLeft: 28,
  },
  icon: {
    width: 48,
    height: 48,
  },
  topIcon: {
    tintColor: "icon-basic-color",
  },
});