import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Layout } from "@ui-kitten/components";
import axios from "axios";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";
import { Chip, DataTable, IconButton, MD3Colors } from 'react-native-paper';
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

  useEffect(() => {
    getTicket();
  }, []);

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

  if (error) {
    return (
      <Error
        friendlyMessage={error.friendlyMessage}
        errorMessage={error.errorMessage}
      />
    );
  }

  if (!ticket) {
    return <ActivityIndicator />;
  }

  return (
    <Layout style={styles.container} level='1'>
      <DataTable>
        <DataTable.Row>
          <DataTable.Cell style={{ paddingTop: '3%' }}>
            <Chip icon="" style={{ backgroundColor: '#fff', borderWidth: 1 }}>{'#'}{ticket?.id}{' '}{ticket?.priorityKey}</Chip>
          </DataTable.Cell>

        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={{ marginLeft: 0 }} >{ticket?.name}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={{ paddingTop: '3%' }}>
            <Chip icon="" style={{ backgroundColor: '#fff', borderWidth: 1 }}>{ticket?.category}</Chip>
            {' '}
            <Chip icon="list-status" style={{ backgroundColor: '#fff', borderWidth: 1 }}>{ticket?.statusKey}</Chip>
            {' '}
            <Chip icon="office-building-marker" style={{ backgroundColor: '#fff', borderWidth: 1 }}>{ticket?.building}</Chip>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>
            <WebView style={styles.content} source={{ html: ticket ? ticket.content : t("NO_DATA_HTML") }} />
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell numeric style={{ paddingRight: 0 }}>
            <IconButton
              icon="square-edit-outline"
              iconColor={MD3Colors.primary0}
              size={24}
              onPress={() => navigate("EditTicketScreen", { screen: "EditTicketScreen", ...ticket })}
            />
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </Layout>
  );
};
type TicketCardProps = {
  ticketId: string;
}

const styles = StyleSheet.create({
  container: {

  },
  category: {

  },
  containerCard: {
    marginTop: 10,
    height: '15%'
  },
  button: {
    marginTop: 8,
  },
  content: {
    marginTop: 1,
    height: 350,
    width: '100%',
    overflow: 'hidden'
  },
  text: {
    margin: 5,
    color: "#000",
  },
  title: {
    margin: 5,
    color: "#000",
    fontWeight: "bold"
  },
  textView: {
    flex: 2,
    padding: 1,
    flexDirection: "row"
  },
  titleView: {
    textAlign: "center",
    width: '100%',
    fontSize: 25
  },
  twoOnRow: {
    flex: 2,
    flexDirection: "row"
  },
  titleStyle: {
    textAlign: "center",
    width: "100%",
    fontSize: 25,
    fontWeight: "bold"
  }
});
export default TicketCard;