import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as React from 'react';
import { StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { Appbar } from 'react-native-paper';

import { useKeycloak } from "../../keycloak/useKeycloak";
import { AppStackParamList } from "../../routing/route-screens";

const AppBar = (props: AppBarProps): React.ReactElement => {
  const { logout } = useKeycloak();

  const { goBack, navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  const onLogout = () => {
    logout();
    navigate("HomeScreen", { screen: "HomeScreen" });
  }

  const image = props.image ? props.image : undefined;

  return (
    <Appbar.Header style={styles.header}>
      {
        props.noBack ?
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            paddingRight: 10
          }}
          activeOpacity={0.7}
        >
          <Text style={{ color: '#fff', fontFamily: 'Pages-icon', fontSize: 30 }} >{'\u{e629}'}</Text> 
        </TouchableOpacity> :
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            paddingRight: 10
          }}
          activeOpacity={0.7}
          onPress={goBack}
        >
          <Text style={{ fontFamily: 'Pages-icon', fontSize: 30, paddingVertical: 20 }}>{'\u{e629}'}</Text>
        </TouchableOpacity>
      }
      {
        image ? 
        <Image source={image} style={styles.imageProperties}></Image> : 
        <Appbar.Content title={props.title} titleStyle={styles.titleStyle} />
      }
      {
        props.logout ?
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingLeft: 10
          }}
          activeOpacity={0.7}
          onPress={onLogout}
        >
          <Text style={{ fontFamily: 'Pages-icon2', fontSize: 30 }} >{'\u{e900}'}</Text> 
        </TouchableOpacity> :
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingLeft: 10
          }}
          activeOpacity={0.7}
        >
          <Text style={{ color: '#fff', fontFamily: 'Pages-icon2', fontSize: 30 }} >{'\u{e900}'}</Text> 
        </TouchableOpacity>
        
      }
    </Appbar.Header>
  );
}

type AppBarProps = {
  title: string;
  image?: any;
  logout?: boolean;
  noBack?: boolean;
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(230, 230, 230, 0.7)',
    // borderBottomColor: '#ccc',
    // borderBottomWidth: 1,
    // elevation: 20,
    width: '100%',
    overflow: 'hidden',
    // paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    // elevation: 5,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    // justifyContent: 'space-between'
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    textAlign: "center",
    width: "100%",
    fontSize: 24,
    fontWeight: '900',
    fontFamily: "OpenSans-ExtraBold"
  },
  imageProperties: {
    height: 30,
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    resizeMode: 'contain'
  }
});

export default AppBar;