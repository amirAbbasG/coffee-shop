import {FC, useState} from 'react';

import {Button, Drawer, IconButton} from "@mui/material";
import {Form, Formik, FormikHelpers} from "formik";
import GoogleIcon from '@mui/icons-material/Google';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';

import {ModalProps} from "@custom-types/props";
import {errorMessage, showError, successMessage} from "@libs/toast";
import {RenderIf, FormTextField, VerificationCodeInput, SubmitButton} from "@components";
import Countdown, {CountdownRenderProps} from "react-countdown";
import {validateAction} from "@validators/auth-validator";
import {signIn} from "next-auth/react";
import Image from "next/image";

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
    const [resendingCode, setResendingCode] = useState(false);
    const isVerify = action === authActions.verifyCode;
    const isLogin = action === authActions.login;
    const isLoginType = action === authActions.loginType

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

    const handleResend = async () => {
        setResendingCode(true);
        try {
            // const { status } = await resendCodeApi(number);
            successMessage("کد تایید مجددا ارسال شد ");

        } catch (e) {
            // showError(e);
        } finally {
            setResendingCode(false);
        }
    };

    const rendererCountDown = ({minutes, seconds, completed}: CountdownRenderProps) => {
        if (completed) {
            return (
                <div className="flex">
                    <p className="text-gray-600">کد را دریافت نکرده اید ؟</p>
                    <Button color="primary" variant="text" onClick={handleResend}>
                        ارسال مجدد کد
                    </Button>
                </div>
            );
        } else {
            return (
                <p className="text-gray-600">
                    {`ارسال مجدد کد تایید تا ${minutes + ":" + seconds} ثانیه دیگر`}
                </p>
            );
        }
    };

    const handleLoginGoogle = () => {
        signIn("google", {callbackUrl: "http://localhost:3000"})
    }

    const handleBack = () => {
        if (isLoginType) handleClose()
        if (isLogin) setAction(authActions.loginType)
        if (isVerify) setAction(authActions.login)
    }


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
                    <RenderIf isTrue={isLoginType}>
                        <Image src="/images/logo.png" alt="logo" width={100} height={100} className="mx-auto my-5"/>
                        <Button
                            className="py-2"
                            onClick={handleLoginGoogle}
                            startIcon={<GoogleIcon sx={{color: "primary.dark"}}/>}
                            variant="outlined">

                            ورود با گوگل
                        </Button>
                    </RenderIf>

                    <RenderIf isTrue={!isLoginType}>
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
                    </RenderIf>

                    {/*show on verify code*/}
                    <RenderIf isTrue={isVerify}>
                        <div>
                            <p className="my-4 text-xs text-center text-gray-700">
                                {`کد تایید 5 رقمی به شماره ${number} ارسال شد`}
                            </p>
                            <VerificationCodeInput/>
                            <div className="col items-center pt-2">
                                <RenderIf isTrue={!resendingCode}>
                                    <Countdown
                                        date={Date.now() + 2 * 1000 * 60}
                                        renderer={rendererCountDown}
                                    />
                                </RenderIf>
                            </div>
                        </div>

                    </RenderIf>
                    <SubmitButton title={isLoginType ? "ورود با شماره موبایل" : "تایید"}/>
                </Form>
            </Formik>
        </Drawer>
    );
};

export default LoginDrawer;
