import ReactCodeInput from "react-code-input";
import { Typography } from "@mui/material";
import {getIn, useFormikContext} from "formik";

const VerificationCodeInput = () => {
  const { touched, errors, setFieldTouched, handleChange } = useFormikContext();

  return (
    <>
      <ReactCodeInput
        style={{
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
          direction: "ltr",
          marginBottom: 8,
        }}
        type="number"
        name="code"
        inputMode="numeric"
        touch={() => setFieldTouched("codes")}
        fields={5}
        onChange={handleChange("code")}
        autoFocus
      />
        <Typography height="1rem" textAlign="center" mt="20" ml="12" color="error">
          {getIn(touched, "code") && getIn(errors, "code")}
        </Typography>
    </>
  );
};

export default VerificationCodeInput;
