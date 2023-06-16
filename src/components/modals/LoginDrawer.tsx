import {FC, useState} from 'react';

import {Drawer, IconButton} from "@mui/material";
import {Form, Formik, FormikHelpers} from "formik";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import {motion} from "framer-motion";

import {ModalProps} from "@custom-types/props";
import {RenderIf, FormTextField, SubmitButton, VerifyCodeSection, LoginTypeSection} from "@components";
import {validateAction} from "@validators/auth-validator";

const authActions = {
    loginType: "loginType",
    login: "login",
    verifyCode: "verifyCode",
}
type ActionKeys = keyof typeof authActions

type AuthActions = typeof authActions[ActionKeys]
const LoginDrawer: FC<ModalProps> = ({open, handleClose}) => {
    const [number, setNumber] = useState("");
    const [action, setAction] = useState<AuthActions>(authActions.loginType);
    const isVerify = action === authActions.verifyCode;
    const isLogin = action === authActions.login;
    const isLoginType = action === authActions.loginType
    const main = isLoginType ? "loginType" : (isVerify ? "verifyCode" : "login")

    //#region send number to get code and login
    const loginUser = async (number: string) => {
        try {
            setAction(authActions.verifyCode);
        } catch (error) {
            // showError(error);
        }
    };
    //#endregion

    //#region send code for verify number
    const verifyCode = async (code: string) => {
        try {
            handleClose()
        } catch (error) {
            // showError(error);
        }
    };
    //#endregion


    const handleSubmit = async (user: User, actions: FormikHelpers<User>) => {
        actions?.setSubmitting(true);
        if (isLoginType) {
            setAction(authActions.login)
        } else if (isLogin) {
            await loginUser(user.number);
        } else if (isVerify) {
            await verifyCode(user.code);
        }
        actions?.setSubmitting(false);
    };


    const handleBack = () => {
        if (isLoginType) handleClose()
        if (isLogin) setAction(authActions.loginType)
        if (isVerify) setAction(authActions.login)
    }

    const mainComponents = {
        loginType: LoginTypeSection,
        verifyCode: () => <VerifyCodeSection number={number}/> ,
        login: () => <></>
    }

    const Main = mainComponents[main]

    return (
        <Drawer
            open={open}
            PaperProps={{
                className: "w-full max-w-xl rounded-b-lg h-80 mx-auto overflow-hidden p-5 relative"
            }}
            anchor="top"

        >
            <IconButton onClick={handleBack} className="absolute right-3 top-2">
                {
                    isLoginType ? (
                        <CloseIcon/>
                    ) : (
                        <ArrowForwardIcon/>
                    )
                }
            </IconButton>
            <h5 className="text-center font-bold">  {
                {
                    loginType: "وارد شوید",
                    login: "َشماره موبایل را وارد کنید",
                    verifyCode: "ارسال کد تایید",
                }[action]
            }</h5>

            <Formik
                onSubmit={handleSubmit}
                validationSchema={!isLoginType && validateAction(authActions.login)}
                initialValues={{
                    number: number,
                    code: "",
                }}
            >
                <Form className="col h-full justify-between">
                    <RenderIf isTrue={!isLoginType}>
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: .8}}
                        >
                        <FormTextField
                            dir="ltr"
                            title="شماره موبایل"
                            placeholder="09*********"
                            maxLength={11}
                            autoFocus
                            value={number}
                            isDisabled={action !== "login"}
                            name="number"
                            changeText={setNumber}
                            type="tel"
                            inputMode="numeric"
                        />
                        </motion.div>
                    </RenderIf>
                    <Main/>

                    <SubmitButton title={isLoginType ? "ورود با شماره موبایل" : "تایید"}/>
                </Form>
            </Formik>
        </Drawer>
    );
};

export default LoginDrawer;
