import { NavigationProp, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { Button, ScrollView, Text, View } from "react-native";
import { TextInput } from 'react-native-paper';

import Error, { ErrorProps } from "../../../components/error";
import Dropdown from "../../../components/form/dropdown";
import Input from "../../../components/form/input";
import { useKeycloak } from "../../../keycloak/useKeycloak";
import LocalizationContext from "../../../localization/localization-context";
import { DropdownValue } from "../../../models/common/dropdown-value";
import { priorityList } from "../../../models/common/priority-list";
import { SCREEN_URL, SigtreeConfiguration } from "../../../models/config";
import { Ticket } from "../../../models/ticket/ticket";
import { TicketStatus } from "../../../models/ticket/ticket-status";
import { TicketStatusPayload } from "../../../models/ticket/ticket-status-payload";
import { Building } from "../../../models/user-profile/building";
import { EditUserPayload } from "../../../models/user-profile/edit-user-payload";
import { UserProfile } from "../../../models/user-profile/user-profile";
import { AppStackParamList } from "../../../routing/route-screens";
//import { ticketCardStyles } from "../ticket-card-styles";
import editTicketFormStyles from "./edit-ticket-form-styles";

const EditTicketForm = (props: EditTicketFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
  } = useForm<EditTicketFormData>();
  const { token, realm } = useKeycloak();
  const { t } = useContext(LocalizationContext);
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();
  const [errors, setErrors] = useState<EditTicketFormErrors | undefined>(undefined);
  const [statuses, setStatuses] = useState<TicketStatus[]>([]);

  const [error, setError] = useState<ErrorProps | undefined>(undefined);
  const [categoryList, setCategoryList] = useState<DropdownValue[]>([]);
  const statusList: DropdownValue[] = [
    { label: "In progress", value: 2 },
    { label: "Available", value: 3 },
    { label: "Closed", value: 4 },
  ]

  useEffect(() => {
    setPossibleCategories();
    setValue("tags", props.ticket.tags);
    setValue("idpriority", props.ticket.idpriority);
    setValue("idcategory", props.ticket.idcategory);
    setValue("idstatus", props.ticket.idstatus);
    getPossibleStatuses();
  }, []);

  const getPossibleStatuses = async () => {
    try {
      const reqUrl = `${SigtreeConfiguration.getUrl(realm, SCREEN_URL.TICKET_URL)}/${props.ticket.id}/statuses`;
      const response = await axios.get<TicketStatusPayload>(reqUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status == 200) {
        setStatuses(response.data.data ?? []);
      } else {
        const friendlyMessage = t("FAILED_REQUEST");
        setError({
          friendlyMessage: friendlyMessage,
          errorMessage: response.data.error ?? "",
        });
      }
    } catch (error) {
      const friendlyMessage = t("FAILED_REQUEST");
      setError({
        friendlyMessage: friendlyMessage,
        errorMessage: JSON.stringify(error),
      });
    }
  }

  const onSubmit = async () => {
    const vals = getValues();
    const reqUrl = `${SigtreeConfiguration.getUrl(
      realm,
      SCREEN_URL.USER_PROFILE_URL
    )}`;

    try {
      const response = await axios.put<EditUserPayload>(reqUrl, vals, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status == 200) {
        goBack();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const onInvalid = (err: any) => {
    setErrors(err);
  };

  const setPossibleCategories = () => {
    const building: Building | undefined = props.userProfile?.resources.buildings.find(item => item.id == props.ticket.idbuilding) ?? undefined;
    const categories: DropdownValue[] = [];

    console.log("here building id", props.ticket.idbuilding, props.userProfile?.resources.buildings);
    if (building) {
      building.categories?.forEach(c => {
        categories.push({ label: c.name, value: c.id });
      });
    }

    setCategoryList(categories);
  }

  if (error) {
    return (
      <Error
        friendlyMessage={error.friendlyMessage}
        errorMessage={error.errorMessage}
      />
    );
  }

  return (
    <ScrollView style={editTicketFormStyles.marginTop}>
      <Button
        title={t("BTN_SUBMIT")}
        onPress={handleSubmit(onSubmit, onInvalid)}
      />
      <Button title={t("BTN_CANCEL")} onPress={goBack} />
      <View style={editTicketFormStyles.containerCard}>
        <Text>{`${props.ticket?.id} - ${props.ticket?.name}`}</Text>
      </View>
      <View style={editTicketFormStyles.containerCard}>
        <Input
          label="Tags"
          value={props.ticket?.tags ?? ""}
          setValue={setValue}
        />
      </View>
      <View style={editTicketFormStyles.twoOnRow}>
        <Dropdown
          label="Priority"
          value={props.ticket?.idpriority}
          error={errors ? errors["idpriority"] : undefined}
          placeholder="Select Priority"
          list={priorityList}
          {...register("idpriority", {
            required: { value: true, message: "Priority is required" },
          })}
          setValue={setValue}
        />
        <Dropdown
          label="Status"
          value={props.ticket?.idstatus}
          error={errors ? errors["idstatus"] : undefined}
          placeholder="Select Status"
          list={statusList}
          {...register("idstatus", {
            required: { value: true, message: "Status is required" },
          })}
          setValue={setValue}
        />
      </View>
      <View style={editTicketFormStyles.spacedView}>
        {categoryList.length > 0 ? <Dropdown
          label="Category"
          value={props.ticket?.idcategory}
          error={errors ? errors["idcategory"] : undefined}
          placeholder="Select Category"
          dropdownStyle={editTicketFormStyles.spacedView}
          list={categoryList}
          {...register("idcategory", {
            required: { value: true, message: "Category is required" },
          })}
          setValue={setValue}
        /> : <></>}
      </View>
    </ScrollView>
  );
};

export type EditTicketFormData = {
  tags: string;
  idcategory: number;
  idstatus: number;
  idpriority: number;
};

type EditTicketFormErrors = {
  idcategory: FieldError;
  idstatus: FieldError;
  idpriority: FieldError;
};

type EditTicketFormProps = {
  ticket: Ticket;
  userProfile?: UserProfile;
}

export default EditTicketForm;