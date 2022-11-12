import { useNavigation } from "@react-navigation/native";
import { Icon, TopNavigationAction, useTheme } from "@ui-kitten/components";
import { EvaStatus } from "@ui-kitten/components/devsupport";
import React, { memo } from "react";
import { ColorValue, StyleProp, StyleSheet, TouchableOpacity, ViewStyle, View } from "react-native";
import normalize from '../utils/normalize';

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
  action?: string;
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
    action
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

    return (
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
          fontFamily: fontFamily, fontSize: normalize(fontSize), lineHeight: normalize(fontSize), paddingVertical: normalize(10), color: color }} category="body" status={titleStatus}>
          {title}
        </Text>
        <View style={styles.tabContainer}>
          {
            /// logic to get new tickets count
            action == 'tickets' && false ?
            <View style={styles.tabBadge}>
              <Text style={styles.tabBadgeText}>
                2
              </Text>
            </View>
            : null
          }
        </View>
      </TouchableOpacity>
    )
  }
);

export default NavigationAction;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  tabContainer: {
    position: 'relative',
  },
  tabBadge: {
    position: 'absolute',
    top: normalize(-15),
    right: normalize(-22),
    backgroundColor: '#DF474A',
    borderRadius: 100,
    paddingHorizontal: normalize(6),
    paddingVertical: normalize(0),
    zIndex: 2,
  },
  tabBadgeText: {
    color: 'white',
    fontSize: normalize(11),
    fontWeight: '600',
  },
});
