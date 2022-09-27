import React from 'react';
import { useForm } from 'react-hook-form';
import { TextInput, Button, View } from 'react-native';

const Form = (): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: any) => alert(`data: ${JSON.stringify(data)}`);
  alert(errors);
  
  return (
    <View>
      <TextInput placeholder="First name" {...register("First name", {required: true, maxLength: 80})} />
      <TextInput placeholder="Last name" {...register("Last name", {required: true, maxLength: 100})} />
      <TextInput placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
      <TextInput placeholder="Mobile number" {...register("Mobile number", {required: true, minLength: 6, maxLength: 12})} />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default Form;