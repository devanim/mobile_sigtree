import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { AdMobBanner } from "expo-ads-admob";

interface Props {
  bannerSize?:
    | "banner"
    | "largeBanner"
    | "mediumRectangle"
    | "fullBanner"
    | "leaderboard"
    | "smartBannerPortrait"
    | "smartBannerLandscape";
  marginBottom?: number;
  marginTop?: number;
}

const AdMob = ({ marginBottom, marginTop, bannerSize = "banner" }: Props) => {
  const adUnitID = "ca-app-pub-6106751649082059/9578983336";

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        {
          alignItems: "center",
          marginBottom: marginBottom,
          marginTop: marginTop,
        },
      ]}
    >
      <AdMobBanner
        bannerSize={bannerSize}
        adUnitID={adUnitID}
        servePersonalizedAds
        onDidFailToReceiveAdWithError={(e) => console.log(e)}
      />
    </TouchableOpacity>
  );
};

export default AdMob;
