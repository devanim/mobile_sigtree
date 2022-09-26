import {useTheme} from '@ui-kitten/components';
import React, {memo} from 'react';
import {FlexAlignType, TouchableOpacity, ViewProps} from 'react-native';

export interface HStackProps extends ViewProps {
  mt?: number;
  mb?: number;
  mh?: number;
  mv?: number;
  ml?: number;
  mr?: number;
  ph?: number;
  pv?: number;
  pb?: number;
  border?: number;
  margin?: number;
  width?: number;
  center?: boolean;
  fullWidth?: boolean;
  itemsCenter?: boolean;
  alignItems?: FlexAlignType;
  wrap?: boolean;
  onPress?(): void;
  level?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
  justify?:
    | 'center'
    | 'space-between'
    | 'flex-start'
    | 'flex-end'
    | 'space-around'
    | 'space-evenly'
    | undefined;
}

const HStack: React.FC<HStackProps> = memo(
  ({
    style,
    children,
    mt,
    mb,
    mh,
    mv,
    ml,
    mr,
    ph,
    pv,
    pb,
    margin,
    itemsCenter,
    alignItems,
    wrap,
    fullWidth,
    width,
    center,
    level,
    justify = 'space-between',
    onPress,
    border,
    ...props
  }) => {
    const theme = useTheme();
    return (
      <>
        <TouchableOpacity
          disabled={!onPress}
          activeOpacity={!onPress ? 1 : 0.54}
          onPress={onPress}
          style={[
            {
              borderRadius: border,
              width: fullWidth ? '100%' : width,
              alignItems: itemsCenter ? 'center' : alignItems,
              paddingHorizontal: ph,
              paddingBottom: pb,
              flexDirection: 'row',
              justifyContent: justify,
              marginTop: mt,
              marginBottom: mb,
              marginLeft: ml,
              marginRight: mr,
              marginHorizontal: mh,
              marginVertical: mv,
              alignSelf: center ? 'center' : undefined,
              flexWrap: wrap ? 'wrap' : undefined,
              margin: margin,
              paddingVertical: pv,
              backgroundColor: level
                ? theme[`background-basic-color-${level}`]
                : 'transparent',
            },
            style,
          ]}
          {...props}>
          {children}
        </TouchableOpacity>
      </>
    );
  },
);

export default HStack;
