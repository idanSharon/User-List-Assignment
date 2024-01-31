import { Button, Paper, TextField } from "@mui/material";
import { useContext, useState } from "react";
import {
  ADD_SUCCESS_MESSAGE,
  DATA_URL,
  EMAIL_REGEX,
  ERROR,
  INVALID_EMAIL,
  INVALID_NAME,
  INVALID_PHONE,
  NAME_REGEX,
  PHONE_REGEX,
  REQIRED,
  SPACE,
  SUCCESS,
} from "../constants";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { UsersContext } from "../App";

function AddUser({ active, setActive }) {
  const { users, setUsers, setAlert, setAlertType, setMessage, setDataSize } =
    useContext(UsersContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleChange = (event, setFunction, regex) => {
    const value = event.target.value;
    setFunction(value ? (value.match(regex) ? value : ERROR) : "");
  };
  const handleNameChange = (event) => handleChange(event, setName, NAME_REGEX);
  const handlePhoneChange = (event) =>
    handleChange(event, setPhone, PHONE_REGEX);
  const handleEmailChange = (event) =>
    handleChange(event, setEmail, EMAIL_REGEX);
  const handleAdd = () => {
    const id = uuid();
    axios
      .post(DATA_URL, { id, name, phone, email })
      .then(() => {
        setUsers([...users, ...[{ id, name, phone, email }]]);
        setDataSize((size) => Number(size) + 1);
        setActive(false);
        setMessage(name + ADD_SUCCESS_MESSAGE);
        setAlertType(SUCCESS);
        setAlert(true);
      })
      .catch((error) => {
        setMessage(error.message);
        setAlertType(ERROR);
        setAlert(true);
      });
  };
  return active ? (
    <>
      <Paper>
        <TextField
          error={phone === ERROR}
          helperText={name ? (name === ERROR ? INVALID_NAME : SPACE) : REQIRED}
          label="Name"
          required
          onChange={handleNameChange}
        />
        <TextField
          error={phone === ERROR}
          helperText={
            phone ? (phone === ERROR ? INVALID_PHONE : SPACE) : REQIRED
          }
          label="Phone"
          required
          onChange={handlePhoneChange}
        />
        <TextField
          error={email === ERROR}
          helperText={
            email ? (email === ERROR ? INVALID_EMAIL : SPACE) : REQIRED
          }
          label="Email"
          required
          onChange={handleEmailChange}
        />
        <Button
          onClick={handleAdd}
          disabled={
            phone === "" ||
            email === "" ||
            name === "" ||
            name === ERROR ||
            phone === ERROR ||
            email === ERROR
          }
        >
          Add +
        </Button>
      </Paper>
    </>
  ) : (
    <></>
  );
}
export default AddUser;
