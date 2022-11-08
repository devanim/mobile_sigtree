import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import axios from "axios";
import React from "react";
import { useContext, useState, useCallback } from "react";
import { ActivityIndicator, TextProps } from "react-native-paper";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { IconButton, MD3Colors } from 'react-native-paper';
import { WebView, WebViewMessageEvent } from "react-native-webview";

import Error, { ErrorProps } from "../../components/error";
import { useKeycloak } from "../../keycloak/useKeycloak";
import LocalizationContext from "../../localization/localization-context";
import { SCREEN_URL, SigtreeConfiguration } from "../../models/config";
import { Ticket } from "../../models/ticket/ticket";
import { TicketPayload } from "../../models/ticket/ticket-payload";
import { AppStackParamList } from "../../routing/route-screens";
import { webviewContent } from "../../utils/content"

const TicketCard = (props: TicketCardProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { token, realm } = useKeycloak();
  const [error, setError] = useState<ErrorProps | undefined>(undefined);
  const [ticket, setTicket] = useState<Ticket | undefined>(undefined);
  const [webViewHeight, setWebViewHeight] = React.useState(20);
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();

  useFocusEffect(useCallback(() => {
    getTicket();
  }, []));

  const getTicket = async () => {
    try {
      const reqUrl = `${SigtreeConfiguration.getUrl(realm, SCREEN_URL.TICKET_URL)}/${props.ticketId}`;
      const response = await axios.get<TicketPayload>(reqUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status == 200) {
        setTicket(response.data.data);
      } else {
        const friendlyMessage = t("FAILED_REQUEST");
        setError({
          friendlyMessage: friendlyMessage,
          errorMessage: response.data.error ?? "",
        });
      }
    } catch (error) {
      const friendlyMessage = t("FAILED_REQUEST");
      setError({
        friendlyMessage: friendlyMessage,
        errorMessage: JSON.stringify(error),
      });
    }
  };

  const onGetHeight = (event: WebViewMessageEvent) => {
    setWebViewHeight(Number(event.nativeEvent.data))
  }

  const content = useCallback(() => {
    if (ticket?.content && ticket.content.length) {
      return webviewContent(ticket?.content)
    }
    return ""
  }, [ticket?.content])

  if (error) {
    return (
      <Error
        friendlyMessage={error.friendlyMessage}
        errorMessage={error.errorMessage}
      />
    );
  }

  const ticketPropList : TicketProperty[] = [
    {
        id: '1',
        label: t('TICKET_CARD_CATEGORY'),
        valueKey: ticket?.category,
        color: '#ffffff'
    },
    {
        id: '2',
        label: t('TICKET_CARD_PRIORITY'),
        valueKey: ticket?.priorityKey,
        color: '#ffffff'
    },
    {
        id: '3',
        label: t('TICKET_CARD_STATUS'),
        valueKey: ticket?.statusKey,
        color: SigtreeConfiguration.getTicketStatusColor(ticket?.statusKey ?? "")
    },
  ]

  return (
    <Layout style={style.container} level='2' >
      <View style={[style.row, { flex: 1 }]} >
        <View style={[style.col, { alignSelf: 'stretch', alignItems: "flex-start", justifyContent: 'space-evenly' }]} >
          <Text style={[style.title, { flex: 0.8 }]} >{ticket?.name}</Text>
          <Text style={style.ticketId}>{`ID: ${ticket?.idtracking}`}</Text>
        </View>
        <View style={[style.col, { flex: 0.2, alignSelf: 'stretch', alignItems: 'flex-end', justifyContent: 'flex-start' }]} >
          <IconButton
              style={{ flex: 1 }}
              icon="square-edit-outline"
              iconColor={MD3Colors.primary0}
              size={24}
              onPress={() => navigate("EditTicketScreen", { screen: "EditTicketScreen", ...ticket })}
            />
        </View>
      </View>
      <View style={[style.row, { flex: 1 }]} >
        <Text style={{ fontWeight: "normal", width: "100%" }}>
          {t("TICKET_PART_OF")}{' '}
          <Bold>{ticket?.project} {ticket?.building}</Bold>{'. '}
          {ticket?.tenant ? `${t("TICKET_TENANT_IS")} ` : ''}
          {ticket?.tenant ? <Bold>{`${ticket?.tenant}.`}</Bold> : <></>}
        </Text>
      </View>
      <View style={[style.row, { flex: 1, alignItems: 'flex-start', justifyContent: 'space-evenly' }]}>
        <View style={style.col} >
        { ticketPropList.map((p, key) => renderTicketProperty(p, key))}
        </View>
      </View>
      <View style={[style.row, { flex: 1, flexShrink: 1, flexGrow: 1 }]} >
        <View style={style.col} >
          <WebView
            scrollEnabled={false}
            javaScriptEnabled={true}
            style={[{flexGrow: 1, height: webViewHeight }]}
            source={{ html: content() }}
            onMessage={onGetHeight}
          />
        </View>  
      </View>
      <View>
        {ticket?.attachmentsArray?.map((att, idx) => {
          return (<View  key={idx}>
            <Text>{att.name}</Text>
            <Text>{att.url}</Text>
            {/* <Button onPress={() => removeUpload(val.name)}>X</Button> */}
          </View>)
        })}
      </View>
    </Layout>
  );
};

type TicketCardProps = {
  ticketId: string;
}

type TicketProperty = {
  id: string,
  label: string,
  valueKey: string | undefined,
  color: string
}
const renderTicketProperty = ( item : TicketProperty, key: number ) => (
  <View key={key} style={[style.rowNoVPad, style.ticketPropertyItem]}>
    <Text style={{ flex: 1, alignSelf: "stretch", textAlignVertical: "center" }} >{item.label}</Text>
    <View style={[style.rowNoVPad, style.propertyChip, { backgroundColor: item.color}]} >
      <Text >{item?.valueKey}</Text>
    </View>
  </View>
);

const Bold = (props: TextProps) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: '5%',
    paddingTop: '2%',
    paddingBottom: '2%',
  },
  row: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
    alignItems: "flex-start", 
  },
  rowNoVPad: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start", 
    paddingRight: 5,
  },
  webview: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
  },
  col: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20
  },
  ticketId: {
    fontWeight: 'bold',
    fontSize: 15
  },
  ticketPropertyItem: {
    marginVertical: 5,
  },
  propertyChip: {
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    justifyContent: "center",
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#626262',
    alignItems: "center",
    padding: 2
  }
})
export default TicketCard;
