import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { pdfReaderStyles } from './pdf-reader-styles';

const PdfReader = (props: PdfReaderProps): JSX.Element => {
  return (<WebView style={pdfReaderStyles.content} originWhitelist={['*']}  source={{ uri: props.sourceUrl }} />);
}

interface PdfReaderProps {
  sourceUrl: string;
}

export default PdfReader;