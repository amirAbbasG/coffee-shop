import React, {useState} from 'react';

import {Button} from "@mui/material";

import {CartLayout, SendTimesDrawer} from "@components";
import styles from "@styles/OutOrder.module.css"
import cn from "classnames";
import {useAppSelector} from "@hooks/redux-hooks";
import {SendTimes} from "@custom-types/cart";


const OutOrder = () => {
    const [openSendTimeDrawer, setOpenSendTimeDrawer] = useState(false);
    const cart = useAppSelector(state => state.cart)

    const address = {
        route: "تهران تهرانپارس بلوار پروین 216 شرقی",
        plaque: "12",
        city: "تهران",
        province: "تهران",
        isDefault: true,
        receiverPhone: "09332431275",

    }
    const renderAction = () => (
        <Button variant="contained" className="button w-full">پرداخت</Button>
    )

    const handleOpenAddress = () => {

    }

    const getTitle = (id: string): string => {
        let title = ""
        sendTimes.map(time => {
            const targetRange = time.timeRanges.find(range => range.id === id)
            if (targetRange) {
                title = time.title + " " + targetRange.title
            }

        })
        return title
    }

    return (
        <CartLayout renderActions={renderAction()}>

            {/*time to receive*/}
            <h5 className="my-4">بازه زمانی ارسال</h5>
            <div className={cn(styles.roundedBox, "items-center justify-between")}>
                <p>
                    {cart.userDeliveryTime ? getTitle(cart.userDeliveryTime) : "بازه زمانی ارسال انتخاب نشده"}
                </p>
                <Button onClick={() => setOpenSendTimeDrawer(true)} variant="contained" className="button">
                    انتخاب بازه زمانی
                </Button>
            </div>

            {/*receiver address*/}
            <h5 className="my-4">آدرس شما</h5>
            <div className={styles.roundedBox}>
                <div className={styles.mapBox}/>

                <div className={styles.detailsWrapper}>
                    <p>
                        {address ? address.route : "آدرسی انتخاب نشده"}
                    </p>

                    <div className={styles.addressBottomBox}>
                        <p className="text-gray-700">
                            شماره تحویل گیرنده :
                            {" "}
                            {address?.receiverPhone}
                        </p>
                        <Button onClick={handleOpenAddress} variant="contained" className="button">
                            تغییر آدرس
                        </Button>
                    </div>
                </div>
            </div>

            <SendTimesDrawer
                open={openSendTimeDrawer}
                handleClose={() => setOpenSendTimeDrawer(false)}
                sendTimes={sendTimes}
            />
        </CartLayout>
    );
};

export default OutOrder;


const sendTimes: SendTimes[] = [
    {
        id: "1",
        title: "سشنبه 3 خرداد",
        date: "",
        timeRanges: [
            {
                id: "11",
                title: "8 الی 11",
                isFull: true
            },
            {
                id: "12",
                title: "11 الی 14",
                isFull: true,
            },
            {
                id: "13",
                title: "14 الی 17",
                isFull: false
            },
            {
                id: "14",
                title: "17 الی 20",
                isFull: false
            }
        ]
    },
    {
        id: "2",
        title: "چهارشنبه 4 خرداد",
        date: "",
        timeRanges: [
            {
                id: "21",
                title: "8 الی 11",
                isFull: false
            },
            {
                id: "22",
                title: "11 الی 14",
                isFull: false
            },
            {
                id: "23",
                title: "14 الی 17",
                isFull: false
            },
            {
                id: "24",
                title: "17 الی 20",
                isFull: false
            }
        ]
    }
]