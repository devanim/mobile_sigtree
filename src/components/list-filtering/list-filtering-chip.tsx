import React from "react";
import { Chip, Text } from "react-native-paper";
import { FilteringOptions } from "src/models/ticket/filtering-options-enum";

const ListFilteringChip = (props: ListFilteringProps): JSX.Element => {
  const onCancel = () => {
    props.onCancel(props.filteringType);
  };

  return (
    <Chip
      icon="filter"
      onClose={onCancel}
      closeIcon="close"
      style={{ maxWidth: "45%", marginLeft: "5%", marginBottom: "5%" }}
    >
      <Text>{props.tag}</Text>
    </Chip>
  );
};

type ListFilteringProps = {
  tag: string;
  filteringType: FilteringOptions;
  onCancel: (selectedType: FilteringOptions) => void;
};

export default ListFilteringChip;
