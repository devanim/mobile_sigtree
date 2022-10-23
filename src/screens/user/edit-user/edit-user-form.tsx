import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    setValue("lang", props.userProfile.lang, {shouldValidate: true});
    setValue("firstName", props.userProfile.firstName, {shouldValidate: true});
    setValue("lastName", props.userProfile.lastName, {shouldValidate: true});
    setValue("username", props.userProfile.username, {shouldValidate: true});
    setValue("email", props.userProfile.email ?? "");
    setValue("phoneNumber", props.userProfile.phoneNumber ?? "");
    setValue("notifyOnNewNote", props.userProfile.notifyOnNewNote);
    setValue("notifyOnStatusNew", props.userProfile.notifyOnStatusNew);
    setValue("notifyOnStatusProgress", props.userProfile.notifyOnStatusProgress);
    setValue("notifyOnStatusPending", props.userProfile.notifyOnStatusPending);
    setValue("notifyOnStatusResolved", props.userProfile.notifyOnStatusResolved);
    setValue("notifyOnStatusClosed", props.userProfile.notifyOnStatusClosed);
    setValue("notifyOnMyTicketsOnly", props.userProfile.notifyOnMyTicketsOnly);
    setValue("allowNewsletters", props.userProfile.allowNewsletters);
    setValue("notifyOnNewDocument", props.userProfile.notifyOnNewDocument);
  }, []);

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
        console.log("response", response);
        goBack();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const onInvalid = (err: any) => {
    console.log("Invalidate", err);
    setErrors(err);
  };
  console.log("user profile", props.userProfile);

  return (
    <ScrollView>
      <Button
        title={t("BTN_SUBMIT")}
        onPress={handleSubmit(onSubmit, onInvalid)}
      />
      <Button title={t("BTN_CANCEL")} onPress={goBack} />

      <SectionTitle title={t("USER_PROFILE_USER_SETTINGS")} />

      <Input
        label={t("USER_PROFILE_USER_LABEL")}
        value={props.userProfile.username}
        error={errors ? errors["username"] : undefined}
        {...register("username", {
          required: { value: true, message: "Username is required" },
        })}
        setValue={setValue}
      />
      <Input
        label={t("USER_PROFILE_FIRST_NAME_LABEL")}
        value={props.userProfile.firstName}
        error={errors ? errors["firstName"] : undefined}
        {...register("firstName", {
          required: { value: true, message: "First Name is required" },
        })}
        setValue={setValue}
      />
      <Input
        label={t("USER_PROFILE_LAST_NAME_LABEL")}
        value={props.userProfile.lastName}
        error={errors ? errors["lastName"] : undefined}
        {...register("lastName", {
          required: { value: true, message: "Last Name is required" },
        })}
        setValue={setValue}
      />
      <Input
        name={"email"}
        label={t("USER_PROFILE_EMAIL_LABEL")}
        value={props.userProfile.email}
        error={errors ? errors["email"] : undefined}
        setValue={setValue}
      />
      <Input
        label={t("USER_PROFILE_LANGUAGE_LABEL")}
        value={props.userProfile.lang}
        error={errors ? errors["lang"] : undefined}
        {...register("lang", {
          required: { value: true, message: "Language is required" },
        })}
        setValue={setValue}
      />
      <SectionTitle title={t("USER_PROFILE_NOTIFICATION_SETTINGS")} />

      <CustCheckbox
        name={"lang"}
        isChecked={props.userProfile.notifyOnNewNote}
        isDisabled={false}
        label={t("USER_PROFILE_NEWNOTE_NOTIFICATION_LABEL")}
        setValue={setValue}
      />
      <CustCheckbox
        name={"notifyOnStatusNew"}
        isChecked={props.userProfile.notifyOnStatusNew}
        isDisabled={false}
        label={t("USER_PROFILE_STATUS_NEW_NOTIFICATION_LABEL")}
        setValue={setValue}
      />
      <CustCheckbox
        name={"notifyOnStatusProgress"}
        isChecked={props.userProfile.notifyOnStatusProgress}
        isDisabled={false}
        label={t("USER_PROFILE_STATUS_PROGRESS_NOTIFICATION_LABEL")}
        setValue={setValue}
      />
      <CustCheckbox
        name={"notifyOnStatusPending"}
        isChecked={props.userProfile.notifyOnStatusPending}
        isDisabled={false}
        label={t("USER_PROFILE_STATUS_PENDING_NOTIFICATION_LABEL")}
        setValue={setValue}
      />
      <CustCheckbox
        name={"notifyOnStatusResolved"}
        isChecked={props.userProfile.notifyOnStatusResolved}
        isDisabled={false}
        label={t("USER_PROFILE_STATUS_RESOLVED_NOTIFICATION_LABEL")}
        setValue={setValue}
      />
      <CustCheckbox
        name={"notifyOnStatusClosed"}
        isChecked={props.userProfile.notifyOnStatusClosed}
        isDisabled={false}
        label={t("USER_PROFILE_STATUS_CLOSED_NOTIFICATION_LABEL")}
        setValue={setValue}
      />
      <CustCheckbox
        name={"notifyOnMyTicketsOnly"}
        isChecked={props.userProfile.notifyOnMyTicketsOnly}
        isDisabled={false}
        label={t("USER_PROFILE_TICKETS_NOTIFICATION_LABEL")}
        setValue={setValue}
      />
      <CustCheckbox
        name={"allowNewsletters"}
        isChecked={props.userProfile.allowNewsletters}
        isDisabled={false}
        label={t("USER_PROFILE_NEWSLETTER_NOTIFICATION_LABEL")}
        setValue={setValue}
      />
      <CustCheckbox
        name={"notifyOnNewDocument"}
        isChecked={props.userProfile.notifyOnNewDocument}
        isDisabled={false}
        label={t("USER_PROFILE_NEWDOCUMENT_NOTIFICATION_LABEL")}
        setValue={setValue}
      />
    </ScrollView>
  );
};

type EditUserFormProps = {
  userProfile: UserProfile;
};

export type UserFormData = {
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
};

export default EditUserForm;
