import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Button } from "@ui-kitten/components/ui";
import React from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { DropdownValue } from "../../models/common/dropdown-value";
import { Priority } from "../../models/ticket/priority-enum";
import { AppStackParamList } from "../../routing/route-screens";
import Dropdown from "./dropdown";
import { formStyles } from "./form-styles";
import Input from "./input";

const Form = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();
  //TODO - get this data from back-end
  const priorityList: DropdownValue[] = [
    { label: Priority.LOW, value: Priority.LOW },
    { label: Priority.MEDIUM, value: Priority.MEDIUM },
    { label: Priority.HIGH, value: Priority.HIGH },
  ];
  const categoryList: DropdownValue[] = [
    { label: "Cleaning", value: "Cleaning" },
    { label: "Electric", value: "Electric" },
    { label: "Maintenance", value: "Maintenance" },
  ];
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

  const onInvalid = (errors: any) => {
    alert(`Errors ${JSON.stringify(errors)}`);
  };

  return (
    <View>
      <Button children={"Submit"} onPress={handleSubmit(onSubmit, onInvalid)} />
      <Button children={"Cancel"} onPress={goBack} />
      <View style={formStyles.spacedView}>
        <Dropdown
          label="Category"
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
        {...register("Title", {
          required: { value: true, message: "Title is required" },
        })}
        setValue={setValue}
      />
      <Input
        label="Description"
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
          placeholder="Select Priority"
          list={priorityList}
          {...register("Priority", {
            required: { value: true, message: "Priority is required" },
          })}
          setValue={setValue}
        />
        <Dropdown
          label="Floor"
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

export default Form;
