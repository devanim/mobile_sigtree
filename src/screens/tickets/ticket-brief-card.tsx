import * as React from "react";
import { Card, Chip, DataTable } from "react-native-paper";
import {View, Text } from "react-native";
import normalize from '../../utils/normalize';

import { TicketBrief } from "../../models/ticket/ticket-brief";

const TicketBriefCard = (props: TicketBriefCardProps): JSX.Element => {
  const localizedDate = new Date(
    props.ticketBrief.timestamp
  ).toLocaleDateString();

  const onTicketPress = (ticketId: number, status: string) => {
    props.onTicketSelected(ticketId, status);
  };

  const onSelectedStatus = (status: string) => {
    props.onSelectedStatus(status);
  };

  const onSelectedBuilding = (building: string) => {
    props.onSelectedBuilding(building);
  }

  const onSelectedProject = (project: string) => {
    props.onSelectedProject(project);
  }

  const onSelectedTenant = (tenant: string) => {
    props.onSelectedTenant(tenant);
  }

  return (
    <Card
      onPress={() =>
        onTicketPress(props.ticketBrief.id, props.ticketBrief.statusKey)
      }
      mode="elevated"
      elevation={1}
      style={{
        backgroundColor: "#fff",
        borderRadius: 3,
        // marginBottom: 10,
        marginTop: 15,
        // borderWidth: 1,
        // borderColor: 'rgba(230, 230, 230, 0.7)',
        // shadowColor: 'pink',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0,
        // shadowRadius: 2,
        // elevation: 5
      }}
    >
      <Card.Content style={{ paddingHorizontal: 15 }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontFamily: "Montserrat-Bold", fontWeight: '800', paddingBottom: 10 }}>{props.ticketBrief?.idtracking}</Text>
          <Text style={{ fontFamily: "Montserrat-Bold", fontWeight: '800', paddingBottom: 10 }}><Text style={{ fontFamily: 'Pages-icon2', fontSize: normalize(18), lineHeight: normalize(18), height: normalize(18) }} >{'\u{e983}'}</Text> {props.ticketBrief?.priorityKey}</Text>
        </View>

        <Text style={{ fontFamily: "OpenSans-Bold", fontWeight: '800', paddingBottom: 10, paddingTop: 10, fontSize: 22 }}>{props.ticketBrief?.name}</Text>
        

        <Text style={{ paddingBottom: 10 }}>{"Acest tichet aparține North Gate, Sun Offices. ETAJ: 9. Utilizator: SIGTREE ADMIN.Furnizor: IT GURUS."}</Text>
        

        <Chip
          mode="flat"
          style={{
            backgroundColor: "#fff",
            marginLeft: 2,
            borderWidth: 1,
            borderRadius: 0,
          }}
        >
          {props.ticketBrief?.category}
        </Chip>
        
        <DataTable>
          
          <DataTable.Row style={{ borderBottomWidth: 0 }}>
            <DataTable.Cell>{props.ticketBrief?.building}</DataTable.Cell>
            <DataTable.Cell numeric>{localizedDate}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={{ borderBottomWidth: 0 }}>
            <DataTable.Cell>{props.ticketBrief?.user}</DataTable.Cell>
            <DataTable.Cell numeric>
              {props.ticketBrief?.supplier}
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </Card.Content>
      <Card.Actions>
        <DataTable>
          <DataTable.Row style={{ borderBottomWidth: 0 }}>
            <DataTable.Cell>
              <Chip
                mode="outlined"
                style={{ backgroundColor: "#fff", borderWidth: 1, borderRadius: 0 }}
                icon="filter-plus"
                onPress={() => onSelectedStatus(props.ticketBrief.statusKey)}
              >
                {props.ticketBrief?.statusKey}
              </Chip>
            </DataTable.Cell>
            <DataTable.Cell>
              <Chip
                mode="outlined"
                style={{ backgroundColor: "#fff", borderWidth: 1, borderRadius: 0 }}
                icon="filter-plus"
                onPress={() => onSelectedBuilding(props.ticketBrief.building)}
              >
                {props.ticketBrief?.building}
              </Chip>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={{ borderBottomWidth: 0 }}>
            <DataTable.Cell>
              <Chip
                mode="outlined"
                style={{ backgroundColor: "#fff", borderWidth: 1, borderRadius: 0 }}
                icon="filter-plus"
                onPress={() => onSelectedProject(props.ticketBrief.project)}
              >
                {props.ticketBrief?.project}
              </Chip>
            </DataTable.Cell>
            {props.ticketBrief?.tenant?.length > 0 ? (<DataTable.Cell>
              <Chip
                mode="outlined"
                style={{ backgroundColor: "#fff", borderWidth: 1, borderRadius: 0 }}
                icon="filter-plus"
                onPress={() => onSelectedTenant(props.ticketBrief.tenant)}
              >
                {props.ticketBrief?.tenant}
              </Chip>
            </DataTable.Cell>) : <></>}
          </DataTable.Row>
        </DataTable>
      </Card.Actions>
    </Card>
  );
};

type TicketBriefCardProps = {
  ticketBrief: TicketBrief;
  onTicketSelected: (ticketId: number, status: string) => void;
  onSelectedStatus: (status: string) => void;
  onSelectedBuilding: (building: string) => void;
  onSelectedProject: (project: string) => void;
  onSelectedTenant: (tenant: string) => void;
};

export default TicketBriefCard;
