import { useNavigation } from "@react-navigation/native";
import { Icon, TopNavigationAction, useTheme } from "@ui-kitten/components";
import { EvaStatus } from "@ui-kitten/components/devsupport";
import React, { memo } from "react";
import { ColorValue, StyleProp, StyleSheet, TouchableOpacity, ViewStyle, View } from "react-native";

import Text from "./text";

type NavigationActionProps = {
  icon?: string;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  backgroundColor?: string | ColorValue;
  onPress?: () => void;
  title?: string;
  titleStatus?: EvaStatus | "body" | "white";
  status?: "basic" | "primary" | "snow" | "blue" | "opacity"|"secondary";
  size?: "giant" | "large" | "medium" | "small"; // giant-58-icon-24 large-48-icon-24  medium-40-icon-24  small-32-icon-16
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  fontFamily?: string;
  fontSize?: number;
  color?: string | ColorValue;
}

const NavigationAction = memo(
  ({
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginHorizontal,
    marginVertical,
    onPress,
    icon,
    title,
    size = "giant",
    status = "basic",
    titleStatus,
    disabled,
    backgroundColor,
    style,
    fontFamily,
    fontSize,
    color,
  }: NavigationActionProps) => {
    const themes = useTheme();

    const { goBack } = useNavigation();
    const _onPress = React.useCallback(() => {
      if (onPress) {
        onPress && onPress();
      } else {
        goBack();
      }
    }, [onPress, goBack]);

    const getIconColor = (
      status: "basic" | "primary" | "snow" | "blue" | "opacity"| "secondary"
    ): string => {
      switch (status) {
        case "basic":
          return themes["icon-basic-color"];
        case "primary":
          return themes["color-primary-100"];
        case "snow":
          return themes["text-snow-color"];
        case "blue":
          return themes["text-blue-color"];
        case "opacity":
          return themes["color-basic-1500"];
        case "secondary":
          return themes["color-basic-700"];
        default:
          return themes["color-primary-100"];
      }
    };

    const getSize = (size: "giant" | "large" | "medium" | "small"): number => {
      switch (size) {
        case "giant":
          return 58;
        case "large":
          return 48;
        case "medium":
          return 40;
        case "small":
          return 32;
        default:
          return 32;
      }
    };

    const getSizeIcon = (
      size: "giant" | "large" | "medium" | "small"
    ): number => {
      switch (size) {
        case "giant":
          return 24;
        case "large":
          return 20;
        case "medium":
          return 20;
        case "small":
          return 16;
        default:
          return 24;
      }
    };

    const getBorderRadius = (
      size: "giant" | "large" | "medium" | "small"
    ): number => {
      switch (size) {
        case "giant":
          return 48;
        case "large":
          return 24;
        case "medium":
          return 24;
        case "small":
          return 8;
        default:
          return 0;
      }
    };

    return title ? (
      <TouchableOpacity
        style={{
          flex: 1, 
          flexDirection: 'row', 
          justifyContent: 'center', 
          alignItems: 'center', 
          backgroundColor: backgroundColor, 
          borderRadius: 3
         }}
        disabled={disabled}
        activeOpacity={0.7}
        onPress={_onPress}
      >
        <Text style={{
          fontFamily: fontFamily, fontSize: fontSize, lineHeight: fontSize, paddingVertical: 10, color: color }} category="body" status={titleStatus}>
          {title}
        </Text>
      </TouchableOpacity>
    ) : (
      <TopNavigationAction
        onPress={_onPress}
        disabled={disabled}
        activeOpacity={0.7}
        style={[
          styles.container,
          style,
          {
            marginBottom: marginBottom,
            marginTop: marginTop,
            marginLeft: marginLeft,
            marginRight: marginRight,
            marginHorizontal: marginHorizontal,
            marginVertical: marginVertical,
            height: getSize(size),
            width: getSize(size),
            borderRadius: getBorderRadius(size),
            backgroundColor: backgroundColor,
          },
        ]}
        icon={(props) => (
          <Icon
            {...props}
            pack="assets"
            name={icon || "arrowLeft"}
            style={[
              {
                height: getSizeIcon(size),
                width: getSizeIcon(size),
              },
              { tintColor: getIconColor(status) },
            ]}
          />
        )}
      />
    );
  }
);

export default NavigationAction;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
