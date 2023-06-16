import {FC, forwardRef, ChangeEvent} from "react";

import {useFormikContext, getIn} from "formik";
import {TextField, TextFieldProps} from "@mui/material";


type Props = TextFieldProps & {
    name: string
    title?: string
    changeText?: (value: string) => void
    maxLength?: number,
    isDisabled?: boolean,
    isReadOnly?: boolean,
    dontShowLabel?: boolean,
    variant?: "outlined" | "filled" | "standard",
    rootClassName?: string
}

const FormTextField: FC<Props> = forwardRef((props, ref) => {
    const {
        rootClassName,
        name,
        title,
        changeText,
        maxLength,
        isDisabled = false,
        isReadOnly = false,
        // dontShowLabel = false,
        variant = "outlined",
        ...otherProps
    } = props

    const {errors, setFieldValue, touched, setFieldTouched, values} = useFormikContext()


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value
        if (maxLength) {
            val = e.target.value.toString().slice(0, maxLength)
        }
        setFieldValue(name, val);
        if (changeText) {
            changeText(val);
        }
    };


    return (
        <div className={`mt-4 w-full ${isDisabled ? "hidden" : ""} ${rootClassName || ""}`}>
            {/*{*/}
            {/*    !dontShowLabel && (*/}
            {/*        <label className="my-2 text-gray-700">*/}
            {/*            {title}*/}
            {/*        </label>*/}
            {/*    )*/}
            {/*}*/}
            <TextField
                label={title}
                inputRef={ref}
                autoFocus
                disabled={isDisabled}
                {...otherProps}
                variant={variant}
                fullWidth
                error={Boolean(getIn(errors, name))}
                value={getIn(values, name)}
                InputProps={{
                    readOnly: isReadOnly,
                }}
                onChange={handleChange}
                onFocus={() => setFieldTouched(name)}
            />
            <p className="h-4 text-red-600 mt-2">
                {getIn(touched, name) && getIn(errors, name)}
            </p>
        </div>
    );
});

FormTextField.displayName = "FormTextField"

export default FormTextField;
