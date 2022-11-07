import { Layout } from "@ui-kitten/components";
import axios from "axios";
import * as React from "react";
import { useCallback, useContext, useState, useEffect } from "react";
import { StyleSheet, FlatList, View, Keyboard, TouchableWithoutFeedback, TextInput } from "react-native";
import { ActivityIndicator } from "react-native-paper"; 
import {  } from "react-native";

import Error, { ErrorProps } from "../../components/error";
import Text from "../../components/text";
import { useKeycloak } from "../../keycloak/useKeycloak";
import LocalizationContext from "../../localization/localization-context";
import { SCREEN_URL, SigtreeConfiguration } from "../../models/config";
import { TicketNotePayload } from "../../models/ticket/ticket-note-payload";
import TicketNoteCard from "./ticket-note-card";
import { TicketNote } from "src/models/ticket/ticket-note";

const TicketNotes = (props: TicketNoteProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { token, realm } = useKeycloak();
  const [notes, setNotes] = useState<TicketNote[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState<ErrorProps | undefined>(undefined);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [maxId, setMaxId] = useState(0);
  const [maxInternalId, setMaxInternalId] = useState(0);

  useEffect(() => {
    resetState();
    getNotes();

  }, []);

  const resetState = () => {
    setIsLoadingData(true);
    setNotes([]);
    setMaxId(0);
    setMaxInternalId(0);
    setHasNextPage(true);
  }

  const getNotes = async () => {
    if (!hasNextPage) return
    try {
      const filter = buildQueryParams(props.count, maxId, maxInternalId);

      const reqUrl = `${SigtreeConfiguration.getUrl(realm, SCREEN_URL.TICKET_URL)}/${props.ticketId}/note${filter}`
      const response = await axios.get<TicketNotePayload>(reqUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status == 200) {
        setNotes(notes => [...(response.data.data.notes?.reverse() ?? []), ...notes]);
        setMaxId(Math.max(...(response.data.data.notes ?? []).map((note) => note.id)));
        setHasNextPage(response.data.data.more ?? false);
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
    } finally {
      setIsLoadingData(false);
    }
  };

  const renderItem = useCallback(({ item }) => {
    return (
      <TicketNoteCard
        note={item}
      />
    );
  }, []);

  if (error) {
    return (
      <Error
        friendlyMessage={error.friendlyMessage}
        errorMessage={error.errorMessage}
      />
    );
  }

  if (props.count === 0 && isLoadingData) {
    return <ActivityIndicator />
  }

  return (
    <View style={styles.container} >
      <View style={{ flex: 1 }} >
      {hasNextPage && props.count === 0 ? <Text>More</Text> : <></> }
      {(props.count === 0) ?
         <FlatList
           data={notes || []}
           renderItem={renderItem}
           keyExtractor={(i, index) => index.toString()}
           showsVerticalScrollIndicator={true}
           scrollEventThrottle={16}
           scrollEnabled={true}
           contentContainerStyle={styles.contentContainer}
           onEndReachedThreshold={1}
           onEndReached={getNotes}
         />
        : notes.map((n, idx) => <TicketNoteCard key={idx} note={n} />)}
      </View>
      <View>
        <TextInput
          style={styles.input}
          value={"Type here"}
        /> 
      </View>
    </View>
  );
};

type TicketNoteProps = {
  count: number;
  ticketId: number;
  roleId: number;
}

const buildQueryParams = (count: number, nmax: number, nimax: number): string => {
  let qp = `?`
  if (count > 0) {
    qp += `count=${count}`
  }
  if (nmax > 0) {
    qp += `&fromNoteId=${nmax}`
  }
  if (nimax > 0) {
    qp += `&fromInternalNoteId=${nimax}`
  }
  return qp
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: '5%',
    paddingTop: '2%',
    paddingBottom: '2%',
  },
  contentContainer: {
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export default TicketNotes;
