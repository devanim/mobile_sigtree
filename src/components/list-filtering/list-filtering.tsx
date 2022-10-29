import React from 'react';
import { Chip, Text } from 'react-native-paper';

const ListFiltering = (props: ArticleFilteringProps): JSX.Element => {
  const onCancel = () => {
    props.onCancel();
  }

  return (
    <Chip icon='filter' onClose={onCancel} closeIcon='close' style={{ maxWidth: '45%', marginLeft: '5%', marginBottom: '5%' }}>
      <Text>{props.tag}</Text>
    </Chip>
  );
};

type ArticleFilteringProps = {
  tag: string;
  onCancel: () => void;
}

export default ListFiltering;