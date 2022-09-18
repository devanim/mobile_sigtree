import { useCallback } from "react";
import RealmDetails from "../../models/realm-details";
import { realmListStyles } from "./realm-list-styles";
import AdMob from "components/AdMob";
import { FlatList } from "react-native";
import { Button } from "@ui-kitten/components";

const RealmList = (props: RealmListProps): JSX.Element => {
  const tempRealms: LandingPageRealms[] = [];
      
  props.storedRealms.forEach((item: RealmDetails) => {
    tempRealms.push({children: item.name, onPress: () => {
      props.onRealmSelected(item);
    }});
  });

  const renderItem = useCallback(({ item }) => {
    return item.ads ? (<AdMob marginTop={8} />) : (<Button style={realmListStyles.button} {...item} size={'small'}/>);
  }, []);

  return <FlatList
      data={tempRealms || []}
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
}

interface LandingPageRealms {
  children: string;
  onPress: Function;
}

export default RealmList;