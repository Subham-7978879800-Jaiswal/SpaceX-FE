import React from "react";
import { useErrorContext } from "../hooks/errorContext";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const capitalize = (input) => {
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
};

const ErrorSnackBar = () => {
  const { errorMessage } = useErrorContext();

  return (
    errorMessage?.length > 0 && (
      <Snackbar open={errorMessage?.length > 0}>
        <Alert severity="error">{capitalize(errorMessage)}</Alert>
      </Snackbar>
    )
  );
};

export default ErrorSnackBar;
