import { useContext } from "react";
import { UsersContext } from "../App";
import { Alert, Snackbar } from "@mui/material";

function Alerts({ alert, alertType, message }) {
  const { setAlert } = useContext(UsersContext);
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={3000}
      open={alert}
      onClose={() => {
        setAlert(false);
      }}
    >
      <Alert severity={alertType}>{message}</Alert>
    </Snackbar>
  );
}
export default Alerts;
