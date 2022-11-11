import axios from "axios";
import * as React from "react";
import { useCallback, useContext, useState, useEffect } from "react";
import { StyleSheet, FlatList, View, TextInput, Pressable } from "react-native";
import { ActivityIndicator } from "react-native-paper"; 

import Error, { ErrorProps } from "../../components/error";
import Text from "../../components/text";
import { useKeycloak } from "../../keycloak/useKeycloak";
import LocalizationContext from "../../localization/localization-context";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppStackParamList, TicketParamList } from "../../routing/route-screens";
import { SCREEN_URL, SigtreeConfiguration } from "../../models/config";
import { TicketNotePayload } from "../../models/ticket/ticket-note-payload";
import { Payload } from "../../models/payload";
import TicketNoteCard from "./ticket-note-card";
import { TicketNote } from "src/models/ticket/ticket-note";

const TicketNotes = (props: TicketNoteProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();
  const { token, realm } = useKeycloak();
  const [notes, setNotes] = useState<TicketNote[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState<ErrorProps | undefined>(undefined);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [messageSending, setMessageSending] = useState(false);
  const [minId, setMinId] = useState(0);
  const [minInternalId, setMinInternalId] = useState(0);
  const [note, setNote] = useState("");
  const [attachments, setAttachments] = useState([]);

  useEffect(() => {
    // TODO Handle message refreshes better
    if (!messageSending) {
      resetState();
      getNotes();
    }
  }, [messageSending]);

  const resetState = () => {
    setIsLoadingData(true);
    setNotes([]);
    setMinId(0);
    setMinInternalId(0);
    setHasNextPage(true);
  }

  const getNotes = async () => {
    if (!hasNextPage) {
      setIsLoadingData(false);
      return
    }
    try {
      const filter = buildQueryParams(props.count, minId, minInternalId);
      const reqUrl = `${SigtreeConfiguration.getUrl(realm, SCREEN_URL.TICKET_URL)}/${props.ticketId}/note${filter}`
      const response = await axios.get<TicketNotePayload>(reqUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status == 200) {
        if (props.count === 0) {
          setNotes(notes => [...notes, ...(response.data.data.notes ?? []) ]);
        } else {
          setNotes(notes => [...(response.data.data.notes ?? []), ...notes]);
        }
        let minn = minId;
        let minni = minInternalId;
        (response.data.data.notes ?? []).forEach((note) => {
          if (note.type === "n" && (minn === 0 || note.id < minn)) minn = note.id
          if (note.type === "ni" && (minni === 0 || note.id < minni)) minni = note.id
        })
        setMinId(minn);
        setMinInternalId(minni);
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

  const addNote = async () => {
    try {
      if (note.length === 0) return
      const reqUrl = `${SigtreeConfiguration.getUrl(realm, SCREEN_URL.TICKET_URL)}/${props.ticketId}/note`
      const processedNote = note.split('\n').map(n => `<p>${n}</p>`).join('')
      const response = await axios.post<Payload>(reqUrl, {content: processedNote}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status == 200) {
        resetNote();
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
      setMessageSending(false);
    }
  };

  const renderItem = useCallback(({ item }) => {
    return (
        <View style={{ flex: 1 }}>
          <TicketNoteCard note={item} />
        </View>
    );
  }, []);

  const onNoteInput = (text:string):void => {
    setNote(text)
  }

  const sendNote = () => {
    setMessageSending(true);
    addNote();
  }

  const resetNote = () => {
    setNote("")
    setAttachments([])
    setMessageSending(false)
  }

  if (error) {
    return (
      <Error
        friendlyMessage={error.friendlyMessage}
        errorMessage={error.errorMessage}
      />
    );
  }

  if (isLoadingData) {
    return <ActivityIndicator />
  }

  // Render fixed number of notes
  if (props.count > 0) {
    return (
      <View style={styles.container} >
        <View style={{ flex: 1 }} >
          <View style={{ flex: 1, margin: 10 }}>
            <Text style={{textDecorationLine: 'underline'}} onPress={ () => { 
              navigate("TicketNotesScreen", {
                screen: "TicketScreen",
                params: {
                  ticketId: props.ticketId,
                  roleId: props.roleId
                }
              })
            }} >
              {`${t("ALL")} ${t("NOTES")}`}
            </Text>
          </View>
          {notes.map((n) => 
            <View key={`${n.id}_${n.type}`} style={{flex: 1}} >
              <TicketNoteCard note={n} />
            </View>
          )}
        </View>
      </View>
    );
  }

  // Render paged version
  return (
    <View style={[styles.container, {backgroundColor: '#F0F4FD'}]} >
      <FlatList
        data={notes || []}
        renderItem={renderItem}
        inverted={true}
        keyboardShouldPersistTaps={'handled'}
        keyExtractor={(i, index) => index.toString()}
        showsVerticalScrollIndicator={true}
        scrollEventThrottle={16}
        scrollEnabled={true}
        onEndReachedThreshold={1}
        onEndReached={getNotes}
        ListHeaderComponent={
          <View style={styles.noteContainer}>
            <View style={styles.noteInputCard}>
              <TextInput
                multiline={true}
                textAlignVertical={"top"}
                style={styles.noteInput}
                value={note}
                onChangeText={onNoteInput}
              />
              <View style={styles.noteSend} >
                {!messageSending 
                ? <Pressable onPress={sendNote}>
                    <Text style={{ fontFamily: 'Pages-icon2', fontSize: 24, padding: 10 }}>{'\u{e99b}'}</Text>
                  </Pressable>
                : <ActivityIndicator />}
              </View>
            </View>
            <View style={styles.filler} >
            </View>
          </View>
        }
      />
    </View>
  );
};

type TicketNoteProps = {
  count: number;
  ticketId: number;
  roleId: number;
}

const NOTES_PER_FETCH = 6;
const buildQueryParams = (count: number, nmax: number, nimax: number): string => {
  let qp = `?`
  if (count > 0) {
    qp += `count=${count}`
  } else {
    qp += `count=${NOTES_PER_FETCH}`
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
    paddingBottom: '2%',
  },
  contentContainer: {
    flex: 1,
  },
  noteContainer: {
    flex: 1,
    marginTop: 5,
    marginHorizontal: 5,
  },
  // Compensate bottom nav
  // 48 height + 3 padding
  filler: {
    height: 50
  },
  noteInputCard: {
    flexDirection: "row",
    height: 100,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5
  },
  noteInput: {
    flex: 8,
    fontSize: 15,
    padding: 5,
  },
  noteSend: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  }
});
export default TicketNotes;
