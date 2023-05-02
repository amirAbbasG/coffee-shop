import {ChangeEvent, FC, SyntheticEvent, useEffect, useState} from 'react';

import {Drawer, FormControlLabel, Radio, RadioGroup, Tab, Typography} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";

import {ModalProps} from "@custom-types/props";
import {LoadingLayout} from "@components";
import {isEmpty} from "@utils/helpers";
import {useAppDispatch, useAppSelector} from "@hooks/redux-hooks";
import {setDeliveryTime} from "@store/reducers/cartReducer";
import {successMessage} from "@libs/toast";
import {SendTimes, TimeRange} from "@custom-types/cart";

type Props = ModalProps & {
   sendTimes: SendTimes[]
}

interface TimeItemProps {
    timeRange: TimeRange,
}

const TimeItem: FC<TimeItemProps> = ({timeRange}) => (
    <div className="flex justify-between border-b border-primary-light p-2">
        <FormControlLabel
            sx={{marginRight: "0 !important"}}
            value={timeRange.id}
            disabled={timeRange.isFull}
            control={<Radio sx={{color: "grey.600"}}/>}
            label={timeRange.title}
        />
        <Typography fontSize={{xs: "11px", sm: "14px"}} color="grey.700">
            {timeRange.isFull
                ? // `${separatePrice(time.cost)} ریال`
                "ظرفیت تکمیل"
                : ""}
        </Typography>
    </div>
);


const SendTimesDrawer: FC<Props> = ({open, handleClose, sendTimes}) => {
    const cart = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch()
    const [tabValue, setTabValue] = useState("0");

    useEffect(() => {
        if (!isEmpty(sendTimes)) {
            setTabValue(sendTimes[0].id)
        }
    }, [sendTimes]);


    const handleChangeTabs = (event: SyntheticEvent<Element, Event>, newValue: string) => {
        setTabValue(newValue);
    };

    const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
        try {
            const values = event.target.value.split(",");
            dispatch(setDeliveryTime(event.target.value));
            successMessage("بازه زمانی ارسال موردنظر انتخاب شد");
        } catch (e) {
            console.log(e)
            // showError(e);
        }
    };

    return (
        <Drawer
            open={open}
            onClose={handleClose}
            PaperProps={{
                className: "w-full max-w-7xl rounded-t-lg mx-auto overflow-hidden p-5 pb-14"
            }}
            anchor="bottom"
        >
            <LoadingLayout loaded={!isEmpty(sendTimes)}>
                <RadioGroup
                    value={cart.userDeliveryTime}
                    onChange={handleChange}
                >
                    <TabContext value={tabValue}>
                        <TabList
                            sx={{
                                bgcolor: "secondary.light",
                                borderRadius: "10px",
                                maxWidth: "100%",
                                width: "100%",
                            }}
                            variant="scrollable"
                            scrollButtons="auto"
                            visibleScrollbar
                            onChange={handleChangeTabs}
                        >
                            {sendTimes.map((item) => (
                                <Tab
                                    sx={{
                                        color: "secondary.dark",
                                        "&.Mui-selected": {color: "primary.main"},
                                        fontSize: {xs: "11px", sm: "14px"},
                                        minHeight: 0,
                                        minWidth: "70px",
                                    }}
                                    key={item.id}
                                    label={item.title}
                                    value={item.id}
                                />
                            ))}
                        </TabList>
                        {sendTimes.map((item) => (
                            <TabPanel
                                sx={{p: {xs: "4px", sm: "8px"}}}
                                key={item.id}
                                value={item.id}
                            >
                                {isEmpty(item.timeRanges) ? (
                                    <Typography textAlign="center" mt="1rem" color="grey.700">
                                        بازه ارسالی برای این تاریخ وجود ندارد
                                    </Typography>
                                ) : (
                                    <>
                                        {item.timeRanges.map((range) => (
                                            <TimeItem key={item.id} timeRange={range}/>
                                        ))}
                                    </>
                                )}
                            </TabPanel>
                        ))}
                    </TabContext>
                </RadioGroup>
            </LoadingLayout>
        </Drawer>
    );
};

export default SendTimesDrawer;

