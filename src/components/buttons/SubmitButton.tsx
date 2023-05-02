import {FC, memo, KeyboardEvent} from "react";

import {useFormikContext} from "formik";
import {Button} from "@mui/material";
import {Loading} from "@components/index";

interface Props {
    title?: string
}

const SubmitButton: FC<Props> = ({title = "تایید", ...otherProps}) => {
    const {handleSubmit, isValid, isSubmitting} = useFormikContext();

    const handleKeyDown = (e:  KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === "Enter") {
            handleSubmit()
        }
    }

    const handleClick = () => {
        handleSubmit()
    }

    return (
        <Button
            className="button"
            fullWidth
            onKeyDown={handleKeyDown}
            style={{height: "45px"}}
            variant="contained"
            onClick={handleClick}
            disabled={!isValid}
            sx={{mx: "auto"}}
            {...otherProps}
            // type="submit"
        >
            {isSubmitting ? <Loading/> : title}
        </Button>
    );
};

export default memo(SubmitButton);
