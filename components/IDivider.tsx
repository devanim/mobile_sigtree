import React from "react";
import { Divider, DividerProps } from "@ui-kitten/components";
interface IDividerProps extends DividerProps {
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  margin?: number;
}
const IDivider = ({
  margin,
  marginBottom,
  marginHorizontal,
  marginLeft,
  marginRight,
  marginTop,
  marginVertical,
  ...rest
}: IDividerProps) => {
  return (
    <Divider
      style={{
        margin: margin,
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginTop: marginTop,
        marginBottom: marginBottom,
        marginHorizontal: marginHorizontal,
        marginVertical: marginVertical,
      }}
      {...rest}
    />
  );
};
export default IDivider;
