import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Button } from "@ui-kitten/components/ui";
import React, { useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { View } from "react-native";
import { DropdownValue } from "../../../models/common/dropdown-value";
import { Priority } from "../../../models/ticket/priority-enum";
import { AppStackParamList } from "../../../routing/route-screens";
import Dropdown from "../../../components/form/dropdown";
import { formStyles } from "./form-styles";
import Input from "../../../components/form/input";

const Form = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
  } = useForm<FormData>();
  //TODO - try to use form state instead of new state
  const [errors, setErrors] = useState<FormData | undefined>(undefined);
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();
  //TODO - get this data from back-end
  const priorityList: DropdownValue[] = [
    { label: Priority.LOW, value: Priority.LOW },
    { label: Priority.MEDIUM, value: Priority.MEDIUM },
    { label: Priority.HIGH, value: Priority.HIGH },
  ];
  //TODO - see how to obtain category list
  const categoryList: DropdownValue[] = [
    { label: "Cleaning", value: "Cleaning" },
    { label: "Electric", value: "Electric" },
    { label: "Maintenance", value: "Maintenance" },
  ];
  //TODO - see how to obtain floor details based on building
  const floorList: DropdownValue[] = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
  ];

  const onSubmit = (data: any) => {
    const vals = getValues();
    alert(`Data ${JSON.stringify(vals)}`);
    //TODO - send data to server when integrated with back-end
    goBack();
  };

  const onInvalid = (err: any) => {
    setErrors(err);
  };

  return (
    <View>
      <Button children={"Submit"} onPress={handleSubmit(onSubmit, onInvalid)} />
      <Button children={"Cancel"} onPress={goBack} />
      <View style={formStyles.spacedView}>
        <Dropdown
          label="Category"
          error={errors["Category"]}
          placeholder="Select Category"
          dropdownStyle={formStyles.spacedView}
          list={categoryList}
          {...register("Category", {
            required: { value: true, message: "Category is required" },
          })}
          setValue={setValue}
        />
      </View>
      <Input
        label="Title"
        error={errors["Title"]}
        {...register("Title", {
          required: { value: true, message: "Title is required" },
        })}
        setValue={setValue}
      />
      <Input
        label="Description"
        error={errors["Description"]}
        multiline={true}
        inputStyle={formStyles.multilineHeight}
        {...register("Description", {
          required: { value: true, message: "Description is required" },
        })}
        setValue={setValue}
      />
      <View style={formStyles.twoOnRow}>
        <Dropdown
          label="Priority"
          error={errors["Priority"]}
          placeholder="Select Priority"
          list={priorityList}
          {...register("Priority", {
            required: { value: true, message: "Priority is required" },
          })}
          setValue={setValue}
        />
        <Dropdown
          label="Floor"
          error={errors["Floor"]}
          placeholder="Select Floor"
          list={floorList}
          {...register("Floor", {
            required: { value: true, message: "Floor is required" },
          })}
          setValue={setValue}
        />
      </View>
    </View>
  );
};

type FormData = {
  Category: string,
  Title: string,
  Description: string,
  Priority: Priority,
  Floor: string
}

export default Form;
