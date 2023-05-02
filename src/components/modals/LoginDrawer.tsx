import {FC, useState} from 'react';

import {Button, Drawer} from "@mui/material";
import {Form, Formik, FormikHelpers} from "formik";

import {ModalProps} from "@custom-types/props";
import {errorMessage, showError, successMessage} from "@libs/toast";
import {RenderIf, FormTextField, VerificationCodeInput, SubmitButton} from "@components";
import Countdown, {CountdownRenderProps} from "react-countdown";
import {validateAction} from "@validators/auth-validator";

const authActions = {
    login: "login",
    verifyCode: "verifyCode"
}
type ActionKeys = keyof typeof authActions

type AuthActions = typeof authActions[ActionKeys]
const LoginDrawer: FC<ModalProps> = ({open, handleClose}) => {
    const [number, setNumber] = useState("");
    const [action, setAction] = useState<AuthActions>(authActions.login);
    const [resendingCode, setResendingCode] = useState(false);
    const isVerify = action === authActions.verifyCode;
    const isLogin = action === authActions.login;

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
    //#endregio

    // const onClose = () => {
    //     if (isVerify) {
    //         localStorage.removeItem("token");
    //     }
    //     handleClose();
    // };

    const handleSubmit = async (user: User, actions: FormikHelpers<User>) => {
        actions?.setSubmitting(true);
        if (isLogin) {
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

    return (
        <Drawer
            open={open}
            onClose={handleClose}
            PaperProps={{
                className: "w-full max-w-xl rounded-b-lg h-80 mx-auto overflow-hidden p-5"
            }}
            anchor="top"

        >
            <h5 className="text-center font-bold">  {
                {
                    login: "وارد شوید",
                    verifyCode: "ارسال کد تایید",
                }[action]
            }</h5>
            <Formik
                onSubmit={handleSubmit}
                validationSchema={validateAction(authActions.login)}
                initialValues={{
                    number: number,
                    code: "",
                }}
            >
                <Form className="col h-full justify-between">
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
                                <Button
                                    color="secondary"
                                    onClick={() => setAction("login")}
                                    variant="text"
                                >
                                    تغییر شماره موبایل
                                </Button>
                            </div>
                        </div>

                    </RenderIf>
                    <SubmitButton/>
                </Form>
            </Formik>
        </Drawer>
    );
};

export default LoginDrawer;
