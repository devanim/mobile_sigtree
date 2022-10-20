import { useContext, useState } from "react";
import { View, Text } from "react-native";
import { FieldError, useForm } from "react-hook-form";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import axios from "axios";
import { Button } from "@ui-kitten/components/ui";
import Input from "../../../components/form/input";
import { AppStackParamList } from "../../../routing/route-screens";
import LocalizationContext from "../../../localization/localization-context";
import changePasswordStyle from "./change-password-styles";
import Container from "../../../components/container";
import { TopNavigation } from "@ui-kitten/components";
import NavigationAction from "../../../components/navigation-action";
import { ChangePasswordPayload } from "../../../models/user-profile/change-password-payload";
import { SCREEN_URL, SigtreeConfiguration } from "../../../models/config";
import { useKeycloak } from "../../../keycloak/useKeycloak";

const ChangePasswordScreen = (): JSX.Element => {
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
    console.log("values confirm password", values.ConfirmPassword);
    console.log("values confirm password", values.Password);
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
    <Container style={changePasswordStyle.container}>
      <TopNavigation
        accessoryLeft={() => <NavigationAction onPress={goBack} />}
        title={t("USER_PROFILE_CHANGE_PASSWORD")}
      />
      <View>
        <Button
          children={t("BTN_SUBMIT")}
          onPress={handleSubmit(onSubmit, onInvalid)}
        />
        <Input
          label="Password"
          value={""}
          secureEntry={true}
          // {...register("Password", {
          //   required: {
          //     value: true,
          //     message: t("USER_PROFILE_CHANGE_PASSWORD_REQUIRED"),
          //   },
          // })}
          setValue={setValue}
        />
        <Input
          label="ConfirmPassword"
          value={""}
          secureEntry={true}
          // {...register("ConfirmPassword", {
          //   required: {
          //     value: true,
          //     message: t("USER_PROFILE_CONFIRM_PASSWORD_REQUIRED"),
          //   },
          // })}
          setValue={setValue}
        />
      </View>
      <Text style={changePasswordStyle.passwordRules}>{t("USER_PROFILE_PASSWORD_RULE_1")}</Text>
      <Text style={changePasswordStyle.passwordRules}>{t("USER_PROFILE_PASSWORD_RULE_2")}</Text>
      <Text style={changePasswordStyle.passwordRules}>{t("USER_PROFILE_PASSWORD_RULE_3")}</Text>
      <Text style={changePasswordStyle.passwordRules}>{t("USER_PROFILE_PASSWORD_RULE_4")}</Text>
      {errors ? <Text style={changePasswordStyle.errorMessage}>{t("USER_PROFILE_CHANGE_PASSWORD_ERROR")}</Text> : <></>}
    </Container>
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

export default ChangePasswordScreen;
