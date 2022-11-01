import { NavigationProp, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Text } from "react-native-paper";

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
  const [errors, setErrors] = useState<EditTicketFormErrors | undefined>(
    undefined
  );
  const [statuses, setStatuses] = useState<DropdownValue[]>([]);

  const [error, setError] = useState<ErrorProps | undefined>(undefined);
  const [categoryList, setCategoryList] = useState<DropdownValue[]>([]);

  useEffect(() => {
    setPossibleCategories();
    setValue("tags", props.ticket.tags);
    setValue("idpriority", props.ticket.idpriority);
    setValue("idcategory", props.ticket.idcategory);
    setValue("idstatus", props.ticket.idstatus);
    getPossibleStatuses();
  }, []);

  useEffect(() => {
    register("idpriority", {
      required: { value: true, message: "Priority is required" },
    });
    register("idstatus", {
      required: { value: true, message: "Status is required" },
    });
    register("idcategory", {
      required: { value: true, message: "Category is required" },
    });
  }, []);

  const getPossibleStatuses = async () => {
    try {
      const reqUrl = `${SigtreeConfiguration.getUrl(
        realm,
        SCREEN_URL.TICKET_URL
      )}/${props.ticket.id}/statuses`;
      const response = await axios.get<TicketStatusPayload>(reqUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status == 200) {
        const responseStatuses: TicketStatus[] = response.data.data ?? [];
        const parsedStatusList = responseStatuses.map((s) => {
          return { label: t(s.nameKey), value: s.id };
        });
        setStatuses(parsedStatusList);
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
  };

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
    const building: Building | undefined =
      props.userProfile?.resources.buildings.find(
        (item) => item.id == props.ticket.idbuilding
      ) ?? undefined;
    const categories: DropdownValue[] = [];

    console.log(
      props.ticket.idbuilding,
      props.userProfile?.resources.buildings
    );
    if (building) {
      building.categories?.forEach((c) => {
        categories.push({ label: c.name, value: c.id });
      });
    }

    setCategoryList(categories);
  };

  if (error) {
    return (
      <Error
        friendlyMessage={error.friendlyMessage}
        errorMessage={error.errorMessage}
      />
    );
  }

  return (
    <KeyboardAwareScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={{ paddingBottom: '3%' }}>
            <Text variant="titleLarge">{props.ticket?.name}</Text>
            <Text variant="titleMedium">{props.ticket?.idtracking}</Text>
          </View>
          <View>
            <Input
              label="Tags"
              value={props.ticket?.tags ?? ""}
              setValue={setValue}
            />
          </View>
          <View>
            <Dropdown
              label="Priority"
              name="idpriority"
              value={props.ticket?.idpriority}
              error={errors ? errors["idpriority"] : undefined}
              placeholder="Select Priority"
              list={priorityList}
              setValue={setValue}
            />
            {statuses.length > 0 ? (
              <Dropdown
                label="Status"
                name="idstatus"
                value={props.ticket?.idstatus}
                error={errors ? errors["idstatus"] : undefined}
                placeholder="Select Status"
                list={statuses}
                setValue={setValue}
              />
            ) : (
              <></>
            )}
          </View>
          <View>
            {categoryList.length > 0 ? (
              <Dropdown
                label="Category"
                name="idcategory"
                value={props.ticket?.idcategory}
                error={errors ? errors["idcategory"] : undefined}
                placeholder="Select Category"
                dropdownStyle={editTicketFormStyles.spacedView}
                list={categoryList}
                setValue={setValue}
              />
            ) : (
              <></>
            )}
          </View>
          <Button
            mode="outlined"
            onPress={handleSubmit(onSubmit, onInvalid)}
            style={styles.submit}
          >
            {t("BTN_SUBMIT")}
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
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
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
  dropdown: {
    marginVertical: "5%",
    paddingVertical: 10,
  },
  submit: {
    marginVertical: "10%",
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 0,
  },
});

export default EditTicketForm;
