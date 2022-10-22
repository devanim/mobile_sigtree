import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { ScrollView, Button } from "react-native";
import { AppStackParamList } from "../../../routing/route-screens";
import LocalizationContext from "../../../localization/localization-context";
import { FieldError, useForm } from "react-hook-form";
import { SCREEN_URL, SigtreeConfiguration } from "../../../models/config";
import { useKeycloak } from "../../../keycloak/useKeycloak";
import axios from "axios";
import SectionTitle from "../../../components/section-title";
import CustCheckbox from "../../../components/cust-checkbox";
import { EditUserPayload } from "../../../models/user-profile/edit-user-payload";
import { UserProfile } from "src/models/user-profile/user-profile";
import Input from "../../../components/form/input";

const EditUserForm = (props: EditUserFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
  } = useForm<UserFormData>();
  const { token, realm } = useKeycloak();
  const { t } = useContext(LocalizationContext);
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();
  const [errors, setErrors] = useState<UserFormErrors | undefined>(undefined);
  
  const onSubmit = async () => {
    console.log("here");
    const vals = getValues();
    console.log("values", vals);
    const reqUrl = `${SigtreeConfiguration.getUrl(realm, SCREEN_URL.USER_PROFILE_URL)}`;
    const response = await axios.post<EditUserPayload>(reqUrl, vals, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("response", response);
    goBack();
  };

  const onInvalid = (err: any) => {
    setErrors(err);
  };

  return (
    <ScrollView>
      <Button title={t("BTN_SUBMIT")} onPress={handleSubmit(onSubmit, onInvalid)} />
      <Button title={t("BTN_CANCEL")} onPress={goBack} />

      <SectionTitle title={t("USER_PROFILE_USER_SETTINGS")}/>

      <Input
        label={t("USER_PROFILE_USER_LABEL")}
        value={props.userProfile.username ?? ""}
        error={errors ? errors["username"] : undefined}
        {...register(t("USER_PROFILE_USER_LABEL"), {
          required: { value: true, message: "Username is required" },
        })}
        setValue={setValue}
      />
      <Input
        label={t("USER_PROFILE_FIRST_NAME_LABEL")}
        value={props.userProfile.firstName ?? ""}
        error={errors ? errors["firstName"] : undefined}
        {...register(t("USER_PROFILE_FIRST_NAME_LABEL"), {
          required: { value: true, message: "First Name is required" },
        })}
        setValue={setValue}
      />
      <Input
        label={t("USER_PROFILE_LAST_NAME_LABEL")}
        value={props.userProfile.lastName ?? ""}
        error={errors ? errors["lastName"] : undefined}
        {...register(t("USER_PROFILE_LAST_NAME_LABEL"), {
          required: { value: true, message: "Last Name is required" },
        })}
        setValue={setValue}
      />
      <Input
        label={t("USER_PROFILE_EMAIL_LABEL")}
        value={props.userProfile.email ?? ""}
        error={errors ? errors["email"] : undefined}
        {...register(t("USER_PROFILE_EMAIL_LABEL"), {
          required: { value: true, message: "Email is required" },
        })}
        setValue={setValue}
      />
      <Input
        label={t("USER_PROFILE_LANGUAGE_LABEL")}
        value={props.userProfile.lang ?? ""}
        error={errors ? errors["lang"] : undefined}
        {...register(t("USER_PROFILE_LANGUAGE_LABEL"), {
          required: { value: true, message: "Language is required" },
        })}
        setValue={setValue}
      />
      <SectionTitle title={t("USER_PROFILE_NOTIFICATION_SETTINGS")}/>

      <CustCheckbox isChecked={props.userProfile.notifyOnNewNote} isDisabled={false} label={t("USER_PROFILE_NEWNOTE_NOTIFICATION_LABEL")}/>
      <CustCheckbox isChecked={props.userProfile.notifyOnStatusNew} isDisabled={false} label={t("USER_PROFILE_STATUS_NEW_NOTIFICATION_LABEL")}/>
      <CustCheckbox isChecked={props.userProfile.notifyOnStatusProgress} isDisabled={false} label={t("USER_PROFILE_STATUS_PROGRESS_NOTIFICATION_LABEL")}/>
      <CustCheckbox isChecked={props.userProfile.notifyOnStatusPending} isDisabled={false} label={t("USER_PROFILE_STATUS_PENDING_NOTIFICATION_LABEL")}/>
      <CustCheckbox isChecked={props.userProfile.notifyOnStatusResolved} isDisabled={false} label={t("USER_PROFILE_STATUS_RESOLVED_NOTIFICATION_LABEL")}/>
      <CustCheckbox isChecked={props.userProfile.notifyOnStatusClosed} isDisabled={false} label={t("USER_PROFILE_STATUS_CLOSED_NOTIFICATION_LABEL")}/>
      <CustCheckbox isChecked={props.userProfile.notifyOnMyTicketsOnly} isDisabled={false} label={t("USER_PROFILE_TICKETS_NOTIFICATION_LABEL")}/>
      <CustCheckbox isChecked={props.userProfile.allowNewsletters} isDisabled={false} label={t("USER_PROFILE_NEWSLETTER_NOTIFICATION_LABEL")}/>
      <CustCheckbox isChecked={props.userProfile.notifyOnNewDocument} isDisabled={false} label={t("USER_PROFILE_NEWDOCUMENT_NOTIFICATION_LABEL")}/>
    </ScrollView>
  );
};

type EditUserFormProps = {
  userProfile: UserProfile;
}

type UserFormData = {
  lang: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  notifyOnNewNote: boolean;
  notifyOnStatusNew: boolean;
  notifyOnStatusProgress: boolean;
  notifyOnStatusPending: boolean;
  notifyOnStatusResolved: boolean;
  notifyOnStatusClosed: boolean;
  notifyOnMyTicketsOnly: boolean;
  allowNewsletters: boolean;
  notifyOnNewDocument: boolean;
};

type UserFormErrors = {
  lang: FieldError;
  firstName: FieldError;
  lastName: FieldError;
  username: FieldError;
  email: FieldError;
  phoneNumber: FieldError;
}

export default EditUserForm;