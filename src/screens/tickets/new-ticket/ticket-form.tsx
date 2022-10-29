import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Button } from "@ui-kitten/components/ui";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FieldError, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { DropdownValue } from "../../../models/common/dropdown-value";
import { Priority } from "../../../models/ticket/priority-enum";
import { AppStackParamList } from "../../../routing/route-screens";
import Dropdown from "../../../components/form/dropdown";
import { ticketFormStyles } from "./ticket-form-styles";
import Input from "../../../components/form/input";
import { Ticket } from "../../../models/ticket/ticket";
import { SCREEN_URL, SigtreeConfiguration } from "../../../models/config";
import { useKeycloak } from "../../../keycloak/useKeycloak";
import { TicketPayload } from "../../../models/ticket/ticket-payload";
import LocalizationContext from "../../../localization/localization-context";
import { priorityList } from "../../../models/common/priority-list";
import { UserProfile } from "src/models/user-profile/user-profile";
import { Building } from "src/models/user-profile/building";

const TicketForm = (props: TicketFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue
  } = useForm<FormData>();
  const { token, realm } = useKeycloak();
  const { t } = useContext(LocalizationContext);
  const [errors, setErrors] = useState<FormErrors | undefined>(undefined);
  const [selectedBuilding, setSelectedBuilding] = useState<number>(0);
  const [categoryList, setCategoryList] = useState<DropdownValue[]>([]);
  const [floorList, setFloorList] = useState<DropdownValue[]>([]);
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();

  //TODO - see how to obtain floor details based on building
  // const floorList: DropdownValue[] = [
  //   { label: "1", value: 1 },
  //   { label: "2", value: 2 },
  //   { label: "3", value: 3 },
  //   { label: "4", value: 4 },
  // ];
  
  const getProjectList = (): DropdownValue[] => {
    if (!props.userProfile) {
      return [];
    }

    return props.userProfile.resources.projects.map(prj => {
      return {label: prj.name, value: prj.id}
    });
  };
  const projectList: DropdownValue[] = getProjectList();

  const setBuildings = () => {
    if (!props.userProfile) {
      return [];
    }

    const buildings: DropdownValue[] = [];

    props.userProfile?.resources.buildings.forEach(b => {
      if (b.categories && b.categories.length > 0) {
        buildings.push({label: b.name, value: b.id});
      }
    });
    return buildings;
  };
  const buildingsList: DropdownValue[] = setBuildings();
  
  const onSubmit = async () => {
    const vals = getValues();
    const reqUrl = `${SigtreeConfiguration.getUrl(realm, SCREEN_URL.TICKET_URL)}`;
    const response = await axios.post<TicketPayload>(reqUrl, vals, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    goBack();
  };

  const onInvalid = (err: any) => {
    setErrors(err);
  };

  const onBuildingChange = (data: string) => {
    const dataNbr = Number(data);
    setSelectedBuilding(dataNbr);
    
    const building: Building | undefined = props.userProfile?.resources.buildings.find(item => item.id.toString() === data) ?? undefined;
    const categories: DropdownValue[] = [];
    const floors: DropdownValue[] = [];

    if (building) {
      building.categories?.forEach(c => {
        categories.push({label: c.name, value: c.id});
      });

      building.floors.forEach((f: string) => {
        floors.push({label: f, value: f})
      })
    }

    setCategoryList(categories);
    setFloorList(floors);
  }

  return (
    <ScrollView>
      <Button children={t("BTN_SUBMIT")} onPress={handleSubmit(onSubmit, onInvalid)} />
      <Button children={t("BTN_CANCEL")} onPress={goBack} />
      <Input
        label="Title"
        value={props.ticket?.name ?? ""}
        error={errors ? errors["name"] : undefined}
        {...register("name", {
          required: { value: true, message: "Title is required" },
        })}
        setValue={setValue}
      />
      <Input
        label="Tags"
        value={props.ticket?.tags ?? ""}
        setValue={setValue}
      />
      <Input
        label="Description"
        value={props.ticket?.content ?? ""}
        error={errors ? errors["content"] : undefined}
        multiline={true}
        inputStyle={ticketFormStyles.multilineHeight}
        {...register("content", {
          required: { value: true, message: "Description is required" },
        })}
        setValue={setValue}
      />
      <View style={ticketFormStyles.twoOnRow}>
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
        {(selectedBuilding > 0 && floorList.length > 0) ? <Dropdown
          label="Floor"
          value={props.ticket?.floor ?? ""}
          placeholder="Select Floor"
          list={floorList}
          setValue={setValue}
        /> : <></>}
      </View>
      <View style={ticketFormStyles.twoOnRow}>
        {buildingsList.length > 0 ? <Dropdown
          label="Building"
          value={props.ticket?.building ?? ""}
          error={errors ? errors["idbuilding"] : undefined}
          placeholder="Select Building"
          list={buildingsList}
          {...register("idbuilding", {
            required: { value: true, message: "Building is required" },
          })}
          onChange={onBuildingChange}
          setValue={setValue}
        /> : <></>}
        {projectList?.length > 0 ? <Dropdown
          label="Project"
          value={props.ticket?.building ?? ""}
          error={errors ? errors["idproject"] : undefined}
          placeholder="Select Project"
          list={projectList}
          {...register("idproject", {
            required: { value: true, message: "Project is required" },
          })}
          setValue={setValue}
        /> : <></>}
      </View>
      <View style={ticketFormStyles.spacedView}>
        {(selectedBuilding > 0 && categoryList.length > 0) ? <Dropdown
          label="Category"
          value={props.ticket?.category ?? ""}
          error={errors ? errors["idcategory"] : undefined}
          placeholder="Select Category"
          dropdownStyle={ticketFormStyles.spacedView}
          list={categoryList}
          {...register("idcategory", {
            required: { value: true, message: "Category is required" },
          })}
          setValue={setValue}
        /> : <></>}
      </View>
      {props.userProfile?.role == 5 ? <Dropdown
          label="Tennant"
          value={props.ticket?.building ?? ""}
          error={errors ? errors["idtenant"] : undefined}
          placeholder="Select Tennant"
          //TODO - use here tennants list
          list={priorityList}
          {...register("idtenant", {
            required: { value: true, message: "Project is required" },
          })}
          setValue={setValue}
        /> : <></>}
    </ScrollView>
  );
};

type FormData = {
  name:string;
  tags:string;
  idcategory:number;
  idpriority:number;
  floor:string;
  idproject:number;
  idbuilding:number;
  content:string;
  idtenant?: number;
}

type FormErrors = {
  name: FieldError;
  idcategory: FieldError;
  idpriority: FieldError;
  content: FieldError;
  idproject: FieldError;
  idbuilding: FieldError;
  idtenant?: FieldError;
}

type TicketFormProps = {
  mode: "insert"|"edit",
  ticket?: Ticket,
  userProfile?: UserProfile;
}

export default TicketForm;
