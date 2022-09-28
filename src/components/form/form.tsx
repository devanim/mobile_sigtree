import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, View } from 'react-native';
import Dropdown from './dropdown';
import Input from './input';

const Form = (): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: any) => { const i = 1 };
  alert(errors);
  
  return (
    <View>
      <Input label="Title" {...register("Title", {required: true, maxLength: 80})} />
      <Input label="Priority" {...register("Priority", {required: true, maxLength: 100})} />
      <Input label="Category" {...register("Category", {required: true, pattern: /^\S+@\S+$/i})} />
      <Input label="Floor" {...register("Floor", {required: true, minLength: 6, maxLength: 12})} />
      <Input label="Description" {...register("Description", {required: true, minLength: 6, maxLength: 12})} />
      <Dropdown />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default Form;