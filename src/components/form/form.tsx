import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Button } from '@ui-kitten/components/ui';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { AppStackParamList } from '../../routing/route-screens';
import Dropdown from './dropdown';
import Input from './input';

const Form = (): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();

  const onSubmit = (data: any) => { const i = 1 };
  alert(errors);
  
  return (
    <View>
      <Button children={"Submit"} onPress={handleSubmit(onSubmit)} />
      <Button children={"Cancel"} onPress={goBack} />
      <Input label="Title" {...register("Title", {required: true, maxLength: 80})} />
      <Input label="Priority" {...register("Priority", {required: true, maxLength: 100})} />
      <Input label="Category" {...register("Category", {required: true, pattern: /^\S+@\S+$/i})} />
      <Input label="Floor" {...register("Floor", {required: true, minLength: 6, maxLength: 12})} />
      <Input label="Description" {...register("Description", {required: true, minLength: 6, maxLength: 12})} />
      <Dropdown />
    </View>
  );
};

export default Form;