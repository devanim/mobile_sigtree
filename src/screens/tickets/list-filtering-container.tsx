import { FilteringOptions } from "src/models/ticket/filtering-options-enum";

const ListFilteringContainer = (props: ListFilteringContainerProps): JSX.Element => {
  return (<></>);
};

type ListFilteringContainerProps = {
  filters: ContainerChip[];
}

type ContainerChip = {
  label: string;
  chipType: FilteringOptions;
  onCancel: (selectedType: FilteringOptions) => void;
}

export default ListFilteringContainer;