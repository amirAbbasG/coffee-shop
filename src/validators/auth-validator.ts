import * as Yup from "yup";
import {ObjectSchema} from "yup";

//#region user Auth
const loginValidationSchema = Yup.object().shape({
    number: Yup.string()
        .matches(/^[\u0600-\u06FF\s0-9]+$/, "شماره فقط میتواند اعداد باشد")
        .required("شماره موبایل الزامی میباشد")
        .min(11, "شماره موبایل باید 11 رقم باشد")
        .max(11, "شماره موبایل باید 11 رقم باشد"),
});

const VerifyCodeValidationSchema = Yup.object().shape({
    code: Yup.string()
        .matches(/^[\u0600-\u06FF\s0-9]+$/, "کد فقط میتواند اعداد باشد")
        .required("کد الزامی میباشد")
        .min(5, "کد موبایل باید پنج رقم باشد"),
});

type AuthValidateReturn =  typeof VerifyCodeValidationSchema | typeof loginValidationSchema | undefined
export const validateAction = (action: string): AuthValidateReturn => {
    switch (action) {
        case "login":
            return loginValidationSchema;
        case "verifyCode":
            return VerifyCodeValidationSchema;
        default:
            break;
    }
};
//#endregion