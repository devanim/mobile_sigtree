import * as React from "react";
import { useContext, useState, useCallback } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from "react-native-webview";
import LocalizationContext from "../../localization/localization-context";
import { webviewContent } from "../../utils/content";
import { Card } from "react-native-paper";

import { TicketNote } from "../../models/ticket/ticket-note";

const TicketNoteCard = (props: TicketNoteCardProps): JSX.Element => {
  const [webViewHeight, setWebViewHeight] = React.useState(20);
  const { t } = useContext(LocalizationContext);
  const localizedDate = new Date(props.note.timestamp).toLocaleDateString();
  const localizedTS = new Date(props.note.timestamp).toLocaleTimeString();

  const onGetHeight = (event) => {
    console.log(`noteid: ${props.note.id} h: ${event.nativeEvent.data}`)
    // TODO 
    // remove 0.6 multiplier and figure out why reported height is wrong
    // check height on ios
    setWebViewHeight(Number(event.nativeEvent.data) * 0.6)
  }

  const content = useCallback(() => {
    return webviewContent(props.note.content)
  }, [props])

  return (
    <Card style={{ backgroundColor: '#fff', margin: 10}} mode='elevated'>
      <Card.Title title={props.note.username} />
      <Card.Content>
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
