import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { realmSelectorStyles } from "./realm-selector-styles";

const RealmSelector = (props: RealmSelectorProps): JSX.Element => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = (payload: BarcodeReadPayload) => {
    setScanned(true);
    props.onDataRead(payload);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={realmSelectorStyles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      <Button title={'Go back!'} onPress={() => props.onCancel()} />
    </View>
  );
};

export default RealmSelector;

export interface BarcodeReadPayload {
  type: string;
  data: any;
}

interface RealmSelectorProps {
  onDataRead: Function;
  onCancel: Function;
}