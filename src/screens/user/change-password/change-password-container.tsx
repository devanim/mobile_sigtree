import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TopNavigation } from "@ui-kitten/components";
import { Button, Layout } from "@ui-kitten/components/ui";
import axios from "axios";
import { useContext, useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

import Input from "../../../components/form/input";
import NavigationAction from "../../../components/navigation-action";
import { useKeycloak } from "../../../keycloak/useKeycloak";
import LocalizationContext from "../../../localization/localization-context";
import { SCREEN_URL, SigtreeConfiguration } from "../../../models/config";
import { ChangePasswordPayload } from "../../../models/user-profile/change-password-payload";
import { AppStackParamList } from "../../../routing/route-screens";

const ChangePasswordContainer = (): JSX.Element => {
  const { t } = useContext(LocalizationContext);
  const { token, realm } = useKeycloak();
  const {
    handleSubmit,
    getValues,
    setValue,
  } = useForm<ChangePasswordFormData>();
  const [errors, setErrors] = useState<ChangePasswordFormErrors | undefined>(
    undefined
  );
  const { goBack } = useNavigation<NavigationProp<AppStackParamList>>();

  const onSubmit = async () => {
    const vals = getValues();

    if (!isPasswordInputCorrect(vals)) {
      setErrors(t("USER_PROFILE_CHANGE_PASSWORD_ERROR"));
      return;
    }

    try {
      const response = await axios.put<ChangePasswordPayload>(
        SigtreeConfiguration.getUrl(realm, SCREEN_URL.USER_PROFILE_URL),
        {
          password: vals.Password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status == 200) {
        goBack();
      } else {
        const friendlyMessage = t("FAILED_REQUEST");
        setErrors(friendlyMessage);
      }
    } catch (error: any) {
      setErrors(error);
    }
  };

  const isPasswordInputCorrect = (values: ChangePasswordFormData): boolean => {
    if (values.ConfirmPassword != values.Password) {
      return false;
    }

    if (values.ConfirmPassword.length == 0) {
      return false;
    }

    if (values.Password.length == 0) {
      return false;
    }

    return true;
  }

  const onInvalid = (err: any) => {
    setErrors(err);
  };

  return (
    <Layout style={styles.container} level='1'>
      <Layout level='1'>
        <Input
          label={t("USER_PROFILE_PASSWORD_LABEL")}
          value={""}
          secureEntry={true}
          setValue={setValue}
        />
        <Input
          label={t("USER_PROFILE_CONFIRM_PASSWORD_LABEL")}
          value={""}
          secureEntry={true}
          setValue={setValue}
        />
      </Layout>
      <Layout level='1'>
        <Button
        style={styles.submit}
          children={t("BTN_SUBMIT")}
          onPress={handleSubmit(onSubmit, onInvalid)}
        />
      </Layout>
      <Text style={styles.passwordRules}>{t("USER_PROFILE_PASSWORD_RULE_1")}</Text>
      <Text style={styles.passwordRules}>{t("USER_PROFILE_PASSWORD_RULE_2")}</Text>
      <Text style={styles.passwordRules}>{t("USER_PROFILE_PASSWORD_RULE_3")}</Text>
      <Text style={styles.passwordRules}>{t("USER_PROFILE_PASSWORD_RULE_4")}</Text>
      {errors ? <Text style={styles.errorMessage}>{t("USER_PROFILE_CHANGE_PASSWORD_ERROR")}</Text> : <></>}
    </Layout>
  );
};

type ChangePasswordFormData = {
  Password: string;
  ConfirmPassword: string
};

type ChangePasswordFormErrors = {
  Password: FieldError;
  ConfirmPassword: FieldError;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: '5%',
  },
  errorMessage: {
    color: "#FF0000",
    fontWeight: "normal",
    fontSize: 15,
    fontFamily: 'Montserrat-Regular'
  },
  passwordRules: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 20
  },
  submit: {
    marginTop: '2%',
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#000',
  },
});

export default ChangePasswordContainer;
