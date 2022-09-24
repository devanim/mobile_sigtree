import { View } from 'react-native';
import { WebView } from 'react-native-webview';

const PdfReader = (props: PdfReaderProps): JSX.Element => {
  return (
    <View>
      <WebView style={{ flex: 1 }} originWhitelist={['*']}  source={{ uri: props.sourceUrl }} />
    </View>
  );
}

interface PdfReaderProps {
  sourceUrl: string;
}

export default PdfReader;