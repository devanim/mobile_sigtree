import React from "react";
import { Chip, Text } from "react-native-paper";
import { FilterElement } from "../../models/ticket/filter-element";

const ListFilteringChip = (props: ListFilteringProps): JSX.Element => {
  const onCancel = () => {
    props.onCancel(props.elem);
  };

  return (
    <Chip
      icon="filter"
      onClose={onCancel}
      closeIcon="close"
      style={{ maxWidth: "45%", marginLeft: "5%", marginBottom: "5%" }}
    >
      <Text>{props.elem.value}</Text>
    </Chip>
  );
};

type ListFilteringProps = {
  elem: FilterElement;
  onCancel: (elem: FilterElement) => void;
};

export default ListFilteringChip;
