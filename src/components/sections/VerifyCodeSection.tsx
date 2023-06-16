import {FC, useState} from 'react';

import Countdown, {CountdownRenderProps} from "react-countdown";
import {Button} from "@mui/material";
import {motion} from "framer-motion";

import {RenderIf, VerificationCodeInput} from "@components";
import {successMessage} from "@libs/toast";

interface Props {
    number: string
}

const VerifyCodeSection: FC<Props> = ({number}) => {
    const [resendingCode, setResendingCode] = useState(false);

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
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: .8}}
        >
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
        </motion.div>
    );
};

export default VerifyCodeSection;