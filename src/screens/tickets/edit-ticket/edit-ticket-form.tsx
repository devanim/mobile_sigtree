import { ScrollView, Button, View, Text } from "react-native";
import { Ticket } from "../../../models/ticket/ticket";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { AppStackParamList } from "../../../routing/route-screens";
import LocalizationContext from "../../../localization/localization-context";
import { FieldError, useForm } from "react-hook-form";
import { SCREEN_URL, SigtreeConfiguration } from "../../../models/config";
import { useKeycloak } from "../../../keycloak/useKeycloak";
import axios from "axios";
import Dropdown from "../../../components/form/dropdown";
import { EditUserPayload } from "../../../models/user-profile/edit-user-payload";
import editTicketFormStyles from "./edit-ticket-form-styles";
import { priorityList } from "../../../models/common/priority-list";
import { TicketStatusPayload } from "../../../models/ticket/ticket-status-payload";
import { TicketStatus } from "../../../models/ticket/ticket-status";
import Error, { ErrorProps } from "../../../components/error";
import { DropdownValue } from "../../../models/common/dropdown-value";

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
  //TODO - see how to obtain category list
  const categoryList: DropdownValue[] = [
    { label: "Cleaning", value: 1 },
    { label: "Electric", value: 2 },
    { label: "Maintenance", value: 3 },
  ];
  const statusList: DropdownValue[] = [
    { label: "In progress", value: 2 },
    { label: "Inchis", value: 4 },
  ]

  useEffect(() => {
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

  const transformToDropdownValues = (): DropdownValue[] => {
    return statuses.map(status => {
      return {label: t(status.nameKey), value: status.id}
    });
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
    <ScrollView>
      <Button
        title={t("BTN_SUBMIT")}
        onPress={handleSubmit(onSubmit, onInvalid)}
      />
      <Button title={t("BTN_CANCEL")} onPress={goBack} />
      <View style={editTicketFormStyles.containerCard}>
        <Text>{`${props.ticket?.id} - ${props.ticket?.name}`}</Text>
      </View>
      <View style={editTicketFormStyles.twoOnRow}>
        <Dropdown
          label="Priority"
          value={props.ticket?.priorityKey ?? ""}
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
          value={props.ticket?.statusKey ?? ""}
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
        <Dropdown
          label="Category"
          value={props.ticket?.category}
          error={errors ? errors["idcategory"] : undefined}
          placeholder="Select Category"
          dropdownStyle={editTicketFormStyles.spacedView}
          list={categoryList}
          {...register("idcategory", {
            required: { value: true, message: "Category is required" },
          })}
          setValue={setValue}
        />
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
}

export default EditTicketForm;