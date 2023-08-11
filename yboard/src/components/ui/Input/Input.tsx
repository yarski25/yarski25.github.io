import {
  InputLabelProps,
  SxProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React from "react";
import { Style } from "util";

type InputProps = TextFieldProps & {
  label?: string;
  // 2- User custom styles
  //   customRootStyles?: SxProps;
  //   customInputLabelStyles?: Partial<InputLabelProps>;
  //   customRootInputStyles?: SxProps;
  //   customInputStyles?: SxProps;
  //   customHelperTextStyles?: SxProps;
};

// 1- Default styles
const rootStyles = {
  backgroundColor: "#ffd60a",
  border: "3px solid #001d3d",
};

const inputLabelStyles = {
  color: "#003566",
  textTransform: "capitalize",
};

const rootInputStyles = {
  "&:hover fieldset": {
    border: "2px solid blue!important",
    borderRadius: 0,
  },
  "&:focus-within fieldset, &:focus-visible fieldset": {
    border: "4px solid red!important",
  },
};

const inputStyles = {
  color: "red",
  paddingLeft: "15px",
  fontSize: "20px",
};

const helperTextStyles = {
  color: "red",
};

const Input = ({ label = "label" }: InputProps) => {
  return (
    <TextField
      label={label}
      helperText="Please enter a valid input"
      sx={{ ...rootStyles }}
      InputLabelProps={{
        sx: {
          ...inputLabelStyles,
        },
      }}
      InputProps={{
        sx: {
          ...rootInputStyles,
        },
      }}
      inputProps={{
        sx: {
          ...inputStyles,
        },
      }}
      FormHelperTextProps={{
        sx: {
          ...helperTextStyles,
        },
      }}
    />
  );
};

export default Input;
