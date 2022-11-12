import { NavigationProp, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { Keyboard, StyleSheet, TouchableWithoutFeedback, Pressable, View, Text, Image, ImageBackground, Modal } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Building } from "../../../models/user-profile/building";
import { UserProfile } from "../../../models/user-profile/user-profile";
import Gallery from 'react-native-image-gallery';
import normalize from '../../../utils/normalize';

import Dropdown from "../../../components/form/dropdown";
import Input from "../../../components/form/input";
import { useKeycloak } from "../../../keycloak/useKeycloak";
import LocalizationContext from "../../../localization/localization-context";
import { DropdownValue } from "../../../models/common/dropdown-value";
import { priorityList } from "../../../models/common/priority-list";
import { SCREEN_URL, SigtreeConfiguration } from "../../../models/config";
import { Ticket, TicketAttachment } from "../../../models/ticket/ticket";
import { TicketPayload } from "../../../models/ticket/ticket-payload";
import { AppStackParamList } from "../../../routing/route-screens";
import ChipInput from "../../../components/form/chip-input";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { assetCache } from "../../../components/asset-cache/assetCache";

const TicketForm = (props: TicketFormProps): JSX.Element => {
  const { register, handleSubmit, getValues, setValue } = useForm<FormData>();
  const { token, realm } = useKeycloak();
  const { t } = useContext(LocalizationContext);
  const [errors, setErrors] = useState<FormErrors | undefined>(undefined);
  const [selectedBuilding, setSelectedBuilding] = useState<number>(0);
  const [categoryList, setCategoryList] = useState<DropdownValue[]>([]);
  const [floorList, setFloorList] = useState<DropdownValue[]>([]);
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();
  const [resourcePath, setResourcePath] = useState();
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const handleClear = () => {
    setResourcePath(undefined);
  }
  const makePhoto = async () => {

    const response = await requestPermission()
    
    if (response.granted === true) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        const c = await FileSystem.readAsStringAsync(result.uri ?? "", { encoding: "base64" })
        setResourcePath(`data:image/jpeg;base64,${c}`);
      }
    }
    
  };
  const selectFile = async () => {
    
    const response = await requestPermission()

    if (response.granted === true) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        const c = await FileSystem.readAsStringAsync(result.uri ?? "", { encoding: "base64" })
        setResourcePath(`data:image/jpeg;base64,${c}`);
      }
    }
  };

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
    register("idtenant");
    register("attachments");
    register("tags");
    register("floor");
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
    console.log("values in form", vals);
    const reqUrl = `${SigtreeConfiguration.getUrl(
      realm,
      SCREEN_URL.TICKET_URL
    )}`;
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

  const [modalVisible, setModalVisible] = useState(false);

  const image = assetCache.getItem("hero-image-opaque")

  return (
  <ImageBackground source={{ uri: image }} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
    <KeyboardAwareScrollView style={{ backgroundColor: "transparent"}}>
      <TouchableWithoutFeedback style={{ backgroundColor: "transparent"}} onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={{ paddingBottom: 10 }}>
            <Input
              name="name"
              label={t("TICKETS_ADD_FORM_TITLE")}
              value={props.ticket?.name ?? ""}
              error={errors ? errors["name"] : undefined}
              setValue={setValue}
            />
          </View>
          <View style={{ paddingBottom: 10 }}>
            <Input
              name="content"
              label={t("TICKETS_ADD_FORM_DESCRIPTION")}
              value={props.ticket?.content ?? ""}
              error={errors ? errors["content"] : undefined}
              multiline={true}
              setValue={setValue}
            />
          </View>
          <View style={{ paddingBottom: 10 }}>
            <ChipInput
              name="tags"
              tags={[]}
              inputValue={""}
              label={t("TICKETS_ADD_FORM_TAG")}
              setValue={setValue}
            />
          </View>
          {projectList?.length > 0 ? (
            <View style={{ paddingBottom: 10 }}>
              <Dropdown
                name="idproject"
                label={t("TICKETS_ADD_FORM_PROJECT")}
                value={props.ticket?.building ?? ""}
                error={errors ? errors["idproject"] : undefined}
                placeholder={t("TICKETS_ADD_FORM_PROJECT_PLACEHOLDER")}
                list={projectList}
                setValue={setValue}
              />
            </View>
          ) : (
            <></>
          )}
          {buildingsList.length > 0 ? (
            <View style={{ paddingBottom: 10 }}>
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
            </View>
          ) : (
            <></>
          )}
          {selectedBuilding > 0 && floorList.length > 0 ? (
            <View style={{ paddingBottom: 10 }}>
              <Dropdown
                name="floor"
                label={t("TICKETS_ADD_FORM_FLOOR")}
                value={props.ticket?.floor ?? ""}
                placeholder={t("TICKETS_ADD_FORM_FLOOR_PLACEHOLDER")}
                list={floorList}
                setValue={setValue}
              />
            </View>
          ) : (
            <></>
          )}

          {props.userProfile?.role == 5 ? (
            <View style={{ paddingBottom: 10 }}>
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
            </View>
          ) : (
            <></>
          )}
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>
            <Dropdown
              name="idpriority"
              label={t("TICKETS_ADD_FORM_PRIORITY")}
              value={props.ticket?.priorityKey ?? ""}
              error={errors ? errors["idpriority"] : undefined}
              placeholder={t("TICKETS_ADD_FORM_PRIORITY_PLACEHOLDER")}
              list={priorityList}
              setValue={setValue}
            />
            {selectedBuilding > 0 && categoryList.length > 0 ? (
              <>
                <Text style={{ paddingHorizontal: 5 }}></Text>
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
          </View>
          <View style={{ backgroundColor: 'transparent', paddingBottom: 30, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Pressable onPress={selectFile} style={styles.button2}  >
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text style={{ fontFamily: 'Pages-icon', fontSize: 16, lineHeight: 32, paddingRight: 5 }}>{'\u{e615}'}</Text><Text style={styles.text2}>Choose file</Text>
              </View>
            </Pressable>
            <Text style={{ paddingHorizontal: 5 }}></Text>
            <Pressable onPress={makePhoto} style={styles.button2}  >
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text style={{ fontFamily: 'Pages-icon', fontSize: 16, lineHeight: 32, paddingRight: 5 }}>{'\u{e606}'}</Text><Text style={styles.text2}>Make foto</Text>
              </View>
            </Pressable>
          </View>
          {
            resourcePath ?
            <Image
              source={{ uri: resourcePath }}
              style={{ width: 50, height: 50 }}
            /> : 
            <></>
          }

            {/* <View style={styles.centeredView}> */}
              {/* <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Gallery
                      style={{ flex: 1, backgroundColor: 'black' }}
                      images={[
                        // { source: require('yourApp/image.png'), dimensions: { width: 150, height: 150 } },
                        { source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
                        { source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
                        { source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
                        { source: { uri: 'http://i.imgur.com/kj5VXtG.jpg' } }
                      ]}
                    />
                    <Pressable
                      style={[styles.button, {position: "absolute", top: 50, left: 0, color: "white"}]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={{ color: "white" }}>Hide Modal</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
              >
                <Text style={{ color: "white"}}>Show Modal</Text>
              </Pressable> */}
            {/* </View> */}

            
          
          
          {/* <View style={{ justifyContent: "center", alignItems: 'center', flex: 1, backgroundColor: 'transparent' }}> */}
            <Pressable style={styles.button} onPress={handleSubmit(onSubmit, onInvalid)} >
              <Text style={styles.text}>{t("BTN_SUBMIT")}</Text>
            </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
    
  </ImageBackground>
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
  attachments: TicketAttachment[];
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
    padding: 15,
    backgroundColor: "transparent"
  },
  button: {
    // position: 'absolute',
    // bottom: 90,
    // right: 15,
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(50),
    borderRadius: 3,
    // elevation: 3,
    backgroundColor: 'black',
    height: normalize(36),
    
  },
  button2: {
    // alignItems: 'center',
    // justifyContent: 'center',
    height: normalize(50),
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 50,
    // borderRadius: 3,
    // elevation: ,
    backgroundColor: '#F0F4FD',
    borderWidth: 1,
    borderColor: 'rgba(230, 230, 230, 0.7)',
  },
  text2: {
    // fontFamily: "Arial",
    color: '#000',
    fontSize: normalize(12),
    lineHeight: normalize(24),
    textAlign: 'center',
    // fontWeight: "normal",
    // letterSpacing: 0.01
  },
  text: {
    // fontFamily: "Arial",
    color: '#ffffff',
    fontSize: normalize(12),
    // fontWeight: "normal",
    // letterSpacing: 0.01
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    alignItems: "center",
  },
});

export default TicketForm;
