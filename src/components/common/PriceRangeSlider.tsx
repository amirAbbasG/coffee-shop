import {useState, useEffect, FC} from "react";

import {Button, Slider} from "@mui/material";

import {separatePrice} from "@utils/helpers";


interface Props {
    onSubmit: (val1: number, val2: number) => void,
    maxPrice?: number
}

const PriceRangeSliderBox: FC<Props> = ({onSubmit, maxPrice = 10000000}) => {
    const [value, setValue] = useState([0, maxPrice]);

    const handleChange = (event: Event, newValue: number | Array<number>) => {
        if (Array.isArray(newValue)) {
            setValue(newValue);
        }
    };

    const handleSubmit = () => {
        onSubmit(value[0], value[1]);
    };

    useEffect(() => {
        setValue([0, maxPrice]);
    }, [maxPrice]);


    return (
        <section>
            <div className="px-2">
                <Slider
                    value={value}
                    min={0}
                    max={maxPrice}
                    onChange={handleChange}
                    sx={styles.slider}
                    disableSwap
                />
            </div>

            <div className="flex my-4 gap-x-4">
                <div className="slider-value">
                    {" "}
                    از {separatePrice(value[0])} ریال
                </div>
                <div className="slider-value">
                    تا {separatePrice(value[1])} ریال
                </div>
            </div>

            <Button variant="outlined" onClick={handleSubmit} fullWidth>
                فیلتر قیمت
            </Button>
        </section>
    );
};

export default PriceRangeSliderBox;

const styles = {
    slider: {
        "& .MuiSlider-thumb": {
            marginRight: -27,
            marginLeft: 0,
            height: 27,
            width: 27,
            backgroundColor: "#fff",
            border: "1px solid currentColor",
            "&:before": {
                boxShadow: 4,
                zIndex: 10,
            },
        },
    },
};
