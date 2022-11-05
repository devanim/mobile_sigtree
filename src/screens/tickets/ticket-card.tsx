import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import axios from "axios";
import React, { useCallback } from "react";
import { useContext, useState } from "react";
import { ActivityIndicator, TextProps } from "react-native-paper";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { IconButton, MD3Colors } from 'react-native-paper';
import { WebView } from "react-native-webview";

import Error, { ErrorProps } from "../../components/error";
import { useKeycloak } from "../../keycloak/useKeycloak";
import LocalizationContext from "../../localization/localization-context";
import { SCREEN_URL, SigtreeConfiguration } from "../../models/config";
import { Ticket } from "../../models/ticket/ticket";
import { TicketPayload } from "../../models/ticket/ticket-payload";
import { AppStackParamList } from "../../routing/route-screens";

const TicketCard = (props: TicketCardProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { token, realm } = useKeycloak();
  const [error, setError] = useState<ErrorProps | undefined>(undefined);
  const [ticket, setTicket] = useState<Ticket | undefined>(undefined);
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

  const contentHtml = () => {
    return `<head>
    <style rel="stylesheet" type="text/css">
      body {
        margin: 0 !important;
        padding: 0 !important;
      }
    </style>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        </head>
        <body>${ticket?.content}</body>
    </html>`
  }

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

  if (!ticket) {
    return <ActivityIndicator />;
  }

  return (
    <Layout style={style.container} level='1' >
      <View style={[style.row, style.h10]} >
        <Text style={[style.title, { flex: 0.9 }]} >{ticket?.name}</Text>
        <IconButton
            style={{ flex: 0.1, alignSelf: 'flex-end' }}
            icon="square-edit-outline"
            iconColor={MD3Colors.primary0}
            size={24}
            onPress={() => navigate("EditTicketScreen", { screen: "EditTicketScreen", ...ticket })}
          />
      </View>
      <View style={[style.row, style.h5]} >
        <View style={style.col_12} >
          <Text style={style.ticketId}>{`ID: ${ticket?.idtracking}`}</Text>
        </View>
      </View>
      <View style={[style.row, style.h10]} >
      <Text style={{ fontWeight: "normal", width: "100%" }}>
        {t("TICKET_PART_OF")}{' '}
        <Bold>{ticket?.project} {ticket?.building}</Bold>{'. '}
        {ticket?.tenant ? `${t("TICKET_TENANT_IS")} ` : ''}
        {ticket?.tenant ? <Bold>{`${ticket?.tenant}.`}</Bold> : <></>}
      </Text>
      </View>
      <FlatList
        numColumns={1}
        scrollEnabled={false}
        data={ticketPropList}
        keyExtractor={(i) => i.id}
        renderItem={renderTicketProperty}
      />
      <View style={[style.row, style.h20]}>
        <View style={style.col_12} >
          <WebView source={{ html: ticket ? contentHtml() : t("NO_DATA_HTML") }} />
        </View>
      </View>
      <View style={[style.row, style.h30]}>
        <View style={style.col_12} >
        </View>
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
const renderTicketProperty = ( { item } : { item : TicketProperty} ) => (
  <View style={[style.row, style.ticketPropertyItem]}>
    <Text style={{ flex: 1 }} >{item.label}</Text>
      <View style={[style.row, style.propertyChip, { backgroundColor: item.color}]} >
        <Text >{item?.valueKey}</Text>
      </View>
  </View>
);

const Bold = (props: TextProps) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%'
  },
  row: {
    flexDirection: "row",
    padding: 2,
    justifyContent: "center",
    alignItems: "center", 
  },
  h5: {
    height: '5%'
  },
  h10: {
    height: '10%'
  },
  h20: {
    height: '20%'
  },
  h30: {
    height: '30%'
  },
  col_12: {
    flex: 1
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
    marginTop: "5%"
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
  }
})
export default TicketCard;
