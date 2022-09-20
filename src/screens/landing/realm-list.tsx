import { useCallback } from "react";
import RealmDetails from "../../models/realm-details";
import { realmListStyles } from "./realm-list-styles";
import AdMob from "components/AdMob";
import { FlatList } from "react-native";
import { Button } from "@ui-kitten/components";
import { View } from "react-native";

const RealmList = (props: RealmListProps): JSX.Element => {
  const realmList: LandingPageRealms[] = [];
      
  props.storedRealms.forEach((item: RealmDetails) => {
    realmList.push({
      children: item.name, 
      onPress: () => { props.onRealmSelected(item); }, 
      onCancel: (realmName: string) => { props.onRemoveRealm(realmName);}
    });
  });

  const renderItem = useCallback(({ item }) => {
    return item.ads ? 
      ( <AdMob marginTop={8} /> ) : 
      (
        <View style={realmListStyles.horizontalView}>
          <Button style={realmListStyles.button} {...item} size={'small'}/>
          <Button style={realmListStyles.button} children={"X"} onPress={() => item.onCancel(item.children)} size={'small'}/>
        </View>
      );
  }, []);

  return <FlatList
      data={realmList || []}
      renderItem={renderItem}
      keyExtractor={(i, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      contentContainerStyle={realmListStyles.contentContainerStyle}
    />;
};

interface RealmListProps {
  storedRealms: RealmDetails[];
  onRealmSelected: Function;
  onRemoveRealm: Function;
}

interface LandingPageRealms {
  children: string;
  onPress: Function;
  onCancel: Function;
}

export default RealmList;