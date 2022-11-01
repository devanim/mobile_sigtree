import React from "react";
import { Card, Chip, DataTable, Text } from 'react-native-paper';

import { TicketBrief } from "../../models/ticket/ticket-brief";

const TicketBriefCard = (props: TicketBriefCardProps): JSX.Element => {
  const localizedDate = new Date(props.ticketBrief.timestamp).toLocaleDateString();

  const onTicketPress = (ticketId: number, status: string) => {
    props.onTicketSelected(ticketId, status);
  };

  const onSelectedStatus = (status: string) => {
    props.onSelectedStatus(status);
  }

  return (
    <Card onPress={() => onTicketPress(props.ticketBrief.id, props.ticketBrief.statusKey)} style={{ backgroundColor: '#fff', borderRadius: 0, marginBottom: '1%', marginTop: '1%' }}>
      <Card.Title subtitle={props.ticketBrief?.name} titleVariant='titleMedium' title={<Text variant="titleMedium">{props.ticketBrief?.idtracking}</Text>} />
      <Card.Content style={{ paddingHorizontal: 0 }}>
        <DataTable>
          <DataTable.Row >
            <DataTable.Cell>

            </DataTable.Cell>
            <DataTable.Cell numeric style={{ paddingVertical: 7 }}>
              <Chip mode='flat' style={{ borderWidth: 1, borderRadius: 0, backgroundColor: `${(() => { if (props.ticketBrief?.priorityKey == 'LOW') { return '#008000' } else { if (props.ticketBrief?.priorityKey == 'MEDIUM') { return '#FF8800' } else { return '#ff0000' } } })()}` }}><Text style={{ color: '#fff' }}>{props.ticketBrief?.priorityKey}</Text></Chip>
              <Chip mode='flat' style={{ backgroundColor: '#fff', marginLeft: 2, borderWidth: 1, borderRadius: 0 }}>{props.ticketBrief?.category}</Chip>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>{props.ticketBrief?.building}</DataTable.Cell>
            <DataTable.Cell numeric>{localizedDate}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>{props.ticketBrief?.user}</DataTable.Cell>
            <DataTable.Cell numeric>{props.ticketBrief?.supplier}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </Card.Content>
      <Card.Actions>
        <Chip mode='outlined' style={{ backgroundColor: '#fff', borderWidth: 1, borderRadius: 0 }} icon="filter-plus" onPress={() => onSelectedStatus(props.ticketBrief.statusKey)}>{props.ticketBrief?.statusKey}</Chip>
      </Card.Actions>
    </Card >
  );
};

type TicketBriefCardProps = {
  ticketBrief: TicketBrief;
  onTicketSelected: (ticketId: number, status: string) => void;
  onSelectedStatus: (status: string) => void;
}

export default TicketBriefCard;
