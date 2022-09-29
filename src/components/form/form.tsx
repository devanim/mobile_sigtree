import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Button } from '@ui-kitten/components/ui';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { DropdownValue } from '../../models/common/dropdown-value';
import { Priority } from '../../models/ticket/priority-enum';
import { AppStackParamList } from '../../routing/route-screens';
import Dropdown from './dropdown';
import Input from './input';

const Form = (): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();
  //TODO - get this data from back-end
  const priorityList: DropdownValue[] = [
    {label: Priority.LOW, value: Priority.LOW},
    {label: Priority.MEDIUM, value: Priority.MEDIUM},
    {label: Priority.HIGH, value: Priority.HIGH}
  ];
  const categoryList: DropdownValue[] = [
    {label: "Cleaning", value: "Cleaning"},
    {label: "Electric", value: "Electric"},
    {label: "Maintenance", value: "Maintenance"}
  ];
  const floorList: DropdownValue[] = [
    {label: "1", value: "1"},
    {label: "2", value: "2"},
    {label: "3", value: "3"},
    {label: "4", value: "4"}
  ];

  const onSubmit = (data: any) => { alert(`Data`) };
  
  return (
    <View>
      <Button children={"Submit"} onPress={handleSubmit(onSubmit)} />
      <Button children={"Cancel"} onPress={goBack} />
      <Input label="Title" {...register("Title", {required: true, maxLength: 80})} />
      <Input label="Description" multiline={true} {...register("Description", {required: true, minLength: 6, maxLength: 12})} />
      <Dropdown label="Priority" placeholder="Select Priority" list={priorityList} {...register("Priority", {required: true})}/>
      <Dropdown label="Category" placeholder="Select Category" list={categoryList} {...register("Category", {required: true})}/>
      <Dropdown label="Floor" placeholder="Select Floor" list={floorList} {...register("Floor", {required: true})}/>
    </View>
  );
};

export default Form;