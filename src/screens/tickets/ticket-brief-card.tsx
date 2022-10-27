import { useContext } from "react";
import { Card, Chip, DataTable } from 'react-native-paper';

import LocalizationContext from "../../localization/localization-context";
import { TicketBrief } from "../../models/ticket/ticket-brief";

const TicketBriefCard = (props: TicketBriefCardProps): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const localizedDate = new Date(props.ticketBrief.timestamp).toLocaleDateString();

  const onTicketPress = (ticketId: number) => {
    props.onTicketSelected(ticketId);
  };

  const onSelectedStatus = (status: string) => {
    props.onSelectedStatus(status);
  }

  return (
    <Card onPress={() => onTicketPress(props.ticketBrief.id)} style={{ backgroundColor: '#fff', marginBottom: '1%', marginTop: '1%' }}>
      <Card.Title title={props.ticketBrief?.name} titleVariant='titleLarge' />
      <Card.Content style={{ paddingHorizontal: 0 }}>
        <DataTable>
          <DataTable.Row >
            <DataTable.Cell>
              <Chip style={{ backgroundColor: '#fff', borderWidth: 1 }}>#{props.ticketBrief?.id}</Chip>
            </DataTable.Cell>
            <DataTable.Cell numeric>{props.ticketBrief?.priorityKey}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>{props.ticketBrief?.building}</DataTable.Cell>
            <DataTable.Cell numeric>{localizedDate}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>{props.ticketBrief?.user}</DataTable.Cell>
            <DataTable.Cell numeric>{props.ticketBrief?.supplier}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell numeric>{props.ticketBrief?.category}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </Card.Content>
      <Card.Actions>
        <Chip icon="filter-plus" onPress={() => onSelectedStatus(props.ticketBrief.statusKey)}>{props.ticketBrief?.statusKey}</Chip>
      </Card.Actions>
    </Card>
  );
};

type TicketBriefCardProps = {
  ticketBrief: TicketBrief;
  onTicketSelected: (ticketId: number) => void;
  onSelectedStatus: (status: string) => void;
}

export default TicketBriefCard;
