import * as React from "react";
import { useContext, useState, useCallback } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { WebView, WebViewMessageEvent } from "react-native-webview";
import LocalizationContext from "../../localization/localization-context";
import { webviewContent } from "../../utils/content";
import { Card } from "react-native-paper";

import { TicketNote } from "../../models/ticket/ticket-note";

const TicketNoteCard = (props: TicketNoteCardProps): JSX.Element => {
  const [webViewHeight, setWebViewHeight] = React.useState(20);
  const { t } = useContext(LocalizationContext);
  const localizedDate = new Date(props.note.timestamp).toLocaleDateString();
  const localizedTS = new Date(props.note.timestamp).toLocaleTimeString();

  const onGetHeight = (event: WebViewMessageEvent) => {
    setWebViewHeight(Number(event.nativeEvent.data))
  }

  const content = useCallback(() => {
    return webviewContent(props.note.content)
  }, [props])

  // TODO Webview for messages has bad performance, investigate alternatives
  return (
    <Card style={{ backgroundColor: '#fff', margin: 5 }} mode='elevated'>
        
      <Card.Content>
        <View style={{ flex: 1, flexDirection: "row", marginBottom: 5, alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ padding: 0, margin: 0, textAlignVertical: 'center', textAlign: 'center' }}>{props.note.username}</Text>
          <Text style={{ padding: 0, margin: 0, color: '#B2B2B2', textAlignVertical: 'center', textAlign: 'center' }}>{props.note.role}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <WebView
            scrollEnabled={false}
            javaScriptEnabled={true}
            scalesPageToFit={true}
            style={[{ flexGrow: 1, height: webViewHeight }]}
            source={{ html: content() }}
            onMessage={onGetHeight}
          />
        </View>
        {props.note.attachments && props.note.attachments.length > 0
        ? <Text>{` ${props.note.attachments.length} attachments`}</Text>
        : <></>}
        <Text style={{ textAlign: 'right', color: '#B2B2B2' }}>{`${localizedDate} ${localizedTS}`}</Text>
      </Card.Content>
    </Card>
  );
};

type TicketNoteCardProps = {
  note: TicketNote;
}

export default TicketNoteCard;
