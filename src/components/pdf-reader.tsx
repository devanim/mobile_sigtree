import { WebView } from 'react-native';

const PdfReader = (props: PdfReaderProps) => <WebView style={{ flex: 1 }} source={{ props.sourceUrl }} />;

interface PdfReaderProps {
  sourceUrl: string;
}

export default PdfReader;