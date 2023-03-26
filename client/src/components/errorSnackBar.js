import { useErrorContext } from "../hooks/errorContext";

const ErrorSnackBar = () => {
  const { errorMessage } = useErrorContext();

  return errorMessage?.length > 0 && <div>{errorMessage}</div>;
};

export default ErrorSnackBar;
