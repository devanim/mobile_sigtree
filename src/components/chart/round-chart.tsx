import { Dimensions, Text, View } from "react-native";
import roundChartStyles from "./round-chart-styles";
import { PieChart } from 'react-native-chart-kit';
import Statistics from "../../models/dashboard/statistics";
import { useContext } from "react";
import LocalizationContext from "../../localization/localization-context";
import React from "react";

const RoundChart = (props: RoundChartProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const data: RoundChartData[] = [];

  const createDataArray = () => {
    data.push({
      name: t("PRIORITY_LOW"), 
      value: props.data?.pct_low ?? 0, 
      color: 'rgba(131, 167, 234, 1)', 
      legendFontColor: '#7F7F7F', 
      legendFontSize: 15
    });

    data.push({
      name: t("PRIORITY_MID"), 
      value: props.data?.pct_medium ?? 0, 
      color: 'blue', 
      legendFontColor: '#7F7F7F', 
      legendFontSize: 15
    });

    data.push({
      name: t("PRIORITY_HIGH"), 
      value: props.data?.pct_high ?? 0, 
      color: 'red', 
      legendFontColor: '#7F7F7F', 
      legendFontSize: 15
    });
  }
  const screenWidth = Dimensions.get('window').width * 0.9;
  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    }
  };
  createDataArray();
  
  return (
    <View style={roundChartStyles.container}>
      <Text style={roundChartStyles.text}>{t("STATISTICS_TITLE")}</Text>
      <PieChart
        data={data}
        width={screenWidth}
        height={250}
        chartConfig={chartConfig}
        accessor="value"
        backgroundColor="transparent"
        paddingLeft="15"
      />
    </View>
  );
};

type RoundChartProps = {
  data: Statistics | undefined;
}

type RoundChartData = {
  name: string;
  value: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

export default RoundChart;