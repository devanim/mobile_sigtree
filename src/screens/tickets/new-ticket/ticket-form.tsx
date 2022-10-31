import { NavigationProp, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { View } from "react-native";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "react-native-paper";
import { Building } from "src/models/user-profile/building";
import { UserProfile } from "src/models/user-profile/user-profile";

import Dropdown from "../../../components/form/dropdown";
import Input from "../../../components/form/input";
import { useKeycloak } from "../../../keycloak/useKeycloak";
import LocalizationContext from "../../../localization/localization-context";
import { DropdownValue } from "../../../models/common/dropdown-value";
import { priorityList } from "../../../models/common/priority-list";
import { SCREEN_URL, SigtreeConfiguration } from "../../../models/config";
import { Ticket } from "../../../models/ticket/ticket";
import { TicketPayload } from "../../../models/ticket/ticket-payload";
import { AppStackParamList } from "../../../routing/route-screens";

const TicketForm = (props: TicketFormProps): JSX.Element => {
  const { register, handleSubmit, getValues, setValue } = useForm<FormData>();
  const { token, realm } = useKeycloak();
  const { t } = useContext(LocalizationContext);
  const [errors, setErrors] = useState<FormErrors | undefined>(undefined);
  const [selectedBuilding, setSelectedBuilding] = useState<number>(0);
  const [categoryList, setCategoryList] = useState<DropdownValue[]>([]);
  const [floorList, setFloorList] = useState<DropdownValue[]>([]);
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();

  useEffect(() => {
    register("name", {
      required: { value: true, message: t("TICKETS_ADD_FORM_TITLE_ERROR") },
    });
    register("content", {
      required: {
        value: true,
        message: t("TICKETS_ADD_FORM_DESCRIPTION_ERROR"),
      },
    });
    register("idpriority", {
      required: {
        value: true,
        message: t("TICKETS_ADD_FORM_PRIORITY_ERROR"),
      },
    });
    register("idbuilding", {
      required: {
        value: true,
        message: t("TICKETS_ADD_FORM_BUILDING_ERROR"),
      },
    });
    register("idproject", {
      required: {
        value: true,
        message: t("TICKETS_ADD_FORM_PROJECT_ERROR"),
      },
    });
    register("idcategory", {
      required: {
        value: true,
        message: t("TICKETS_ADD_FORM_CATEGORY_ERROR"),
      },
    });
    register("idtenant", {
      required: {
        value: true,
        message: t("TICKETS_ADD_FORM_TENANT_ERROR"),
      },
    });
  }, []);

  const getProjectList = (): DropdownValue[] => {
    if (!props.userProfile) {
      return [];
    }

    return props.userProfile.resources.projects.map((prj) => {
      return { label: prj.name, value: prj.id };
    });
  };
  const projectList: DropdownValue[] = getProjectList();

  const setBuildings = () => {
    if (!props.userProfile) {
      return [];
    }

    const buildings: DropdownValue[] = [];

    props.userProfile?.resources.buildings.forEach((b) => {
      if (b.categories && b.categories.length > 0) {
        buildings.push({ label: b.name, value: b.id });
      }
    });
    return buildings;
  };
  const buildingsList: DropdownValue[] = setBuildings();

  const onSubmit = async () => {
    const vals = getValues();
    const reqUrl = `${SigtreeConfiguration.getUrl(
      realm,
      SCREEN_URL.TICKET_URL
    )}`;
    const response = await axios.post<TicketPayload>(reqUrl, vals, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("response add ticket", response.data);
    goBack();
  };

  const onInvalid = (err: any) => {
    setErrors(err);
  };

  const onBuildingChange = (data: string) => {
    const dataNbr = Number(data);
    setSelectedBuilding(dataNbr);

    const building: Building | undefined =
      props.userProfile?.resources.buildings.find(
        (item) => item.id.toString() === data
      ) ?? undefined;
    const categories: DropdownValue[] = [];
    const floors: DropdownValue[] = [];

    if (building) {
      building.categories?.forEach((c) => {
        categories.push({ label: c.name, value: c.id });
      });

      building.floors.forEach((f: string) => {
        floors.push({ label: f, value: f });
      });
    }

    setCategoryList(categories);
    setFloorList(floors);
  };

  return (
    <KeyboardAwareScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View>
            <Input
              name="name"
              label={t("TICKETS_ADD_FORM_TITLE")}
              value={props.ticket?.name ?? ""}
              error={errors ? errors["name"] : undefined}
              setValue={setValue}
            />
            <Input
              label={t("TICKETS_ADD_FORM_TAG")}
              value={props.ticket?.tags ?? ""}
              setValue={setValue}
            />
            <Input
              name="content"
              label={t("TICKETS_ADD_FORM_DESCRIPTION")}
              value={props.ticket?.content ?? ""}
              error={errors ? errors["content"] : undefined}
              multiline={true}
              numberOfLines={4}
              setValue={setValue}
            />
          </View>
          <Dropdown
            name="idpriority"
            label={t("TICKETS_ADD_FORM_PRIORITY")}
            value={props.ticket?.priorityKey ?? ""}
            error={errors ? errors["idpriority"] : undefined}
            placeholder={t("TICKETS_ADD_FORM_PRIORITY_PLACEHOLDER")}
            list={priorityList}
            setValue={setValue}
          />
          {buildingsList.length > 0 ? (
            <>
              <Dropdown
                name="idbuilding"
                label={t("TICKETS_ADD_FORM_BUILDING")}
                value={props.ticket?.building ?? ""}
                error={errors ? errors["idbuilding"] : undefined}
                placeholder={t("TICKETS_ADD_FORM_BUILDING_PLACEHOLDER")}
                list={buildingsList}
                onChange={onBuildingChange}
                setValue={setValue}
              />
            </>
          ) : (
            <></>
          )}
          {selectedBuilding > 0 && floorList.length > 0 ? (
            <Dropdown
              label={t("TICKETS_ADD_FORM_FLOOR")}
              value={props.ticket?.floor ?? ""}
              placeholder={t("TICKETS_ADD_FORM_FLOOR_PLACEHOLDER")}
              list={floorList}
              setValue={setValue}
            />
          ) : (
            <></>
          )}
          {projectList?.length > 0 ? (
            <>
              <Dropdown
                name="idproject"
                label={t("TICKETS_ADD_FORM_PROJECT")}
                value={props.ticket?.building ?? ""}
                error={errors ? errors["idproject"] : undefined}
                placeholder={t("TICKETS_ADD_FORM_PROJECT_PLACEHOLDER")}
                list={projectList}
                setValue={setValue}
              />
            </>
          ) : (
            <></>
          )}
          {selectedBuilding > 0 && categoryList.length > 0 ? (
            <>
              <Dropdown
                name="idcategory"
                label={t("TICKETS_ADD_FORM_CATEGORY")}
                value={props.ticket?.category ?? ""}
                error={errors ? errors["idcategory"] : undefined}
                placeholder={t("TICKETS_ADD_FORM_CATEGORY_PLACEHOLDER")}
                list={categoryList}
                setValue={setValue}
              />
            </>
          ) : (
            <></>
          )}
          {props.userProfile?.role == 5 ? (
            <>
              <Dropdown
                name="idtenant"
                label={t("TICKETS_ADD_FORM_TENANT")}
                value={props.ticket?.building ?? ""}
                error={errors ? errors["idtenant"] : undefined}
                placeholder={t("TICKETS_ADD_FORM_TENANT_PLACEHOLDER")}
                //TODO - use here tenants list
                list={priorityList}
                setValue={setValue}
              />
            </>
          ) : (
            <></>
          )}
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

type FormData = {
  name: string;
  tags: string;
  idcategory: number;
  idpriority: number;
  floor: string;
  idproject: number;
  idbuilding: number;
  content: string;
  idtenant?: number;
};

type FormErrors = {
  name: FieldError;
  idcategory: FieldError;
  idpriority: FieldError;
  content: FieldError;
  idproject: FieldError;
  idbuilding: FieldError;
  idtenant?: FieldError;
};

type TicketFormProps = {
  mode: "insert" | "edit";
  ticket?: Ticket;
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

export default TicketForm;
