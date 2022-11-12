import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { assetCache } from "../components/asset-cache/assetCache";
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

const useCachedResources = () => {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          "OpenSans-ExtraBold": require("../../assets/fonts/OpenSans/OpenSans-ExtraBold.ttf"),
          "OpenSans-Medium": require("../../assets/fonts/OpenSans/OpenSans-Medium.ttf"),
          "OpenSans-Regular": require("../../assets/fonts/OpenSans/OpenSans-Regular.ttf"),
          "OpenSans-Bold": require("../../assets/fonts/OpenSans/OpenSans-Bold.ttf"),
          "Montserrat-Regular": require("../../assets/fonts/Montserrat-Regular.ttf"),
          "Montserrat-SemiBold": require("../../assets/fonts/Montserrat/Montserrat-SemiBold.ttf"),
          "Montserrat-Bold": require("../../assets/fonts/Montserrat/Montserrat-Bold.ttf"),
          "Pages-icon": require("../../assets/fonts/Pages/pages-icon.ttf"),
          "Pages-icon2": require("../../assets/fonts/Pages/pages2-icon.ttf"),
        });

        const assets: [string, string, string][] = [
          [ "hero-image", require("../../assets/images/hero.png"), 'png' ],
          [ "hero-image-opaque", require("../../assets/images/hero_opaque.png"), 'png' ],
          [ "background-image", require("../../assets/images/background.jpg"), 'jpg' ],
          [ "logo-image", require("../../assets/images/logo.png"), 'png' ]
        ]
        assets.forEach( async r => { 
          const expoAsset = await Asset.fromModule(r[1]).downloadAsync();
          const c = await FileSystem.readAsStringAsync(expoAsset.localUri ?? "", { encoding: "base64" })
          await assetCache.setItem(r[0], `data:image/${r[2]};base64,${c}`) 
        } )

      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}

export default useCachedResources;
