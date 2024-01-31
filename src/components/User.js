import { IconButton, TableCell, TableRow } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { UsersContext } from "../App";
import { useContext } from "react";
import { DELETE_SUCCES_MESSAGE, SUCCESS, ERROR, DATA_URL } from "../constants";
import axios from "axios";

function User({
  id,
  name,
  email,
  phone,
  index,
  filteredUsers,
  setFilteredUsers,
  setFilterSize,
}) {
  const {
    setUsers,
    users,
    setDataSize,
    setMessage,
    setAlertType,
    setAlert,
    dataSize,
    filter,
  } = useContext(UsersContext);
  const deleteUser = () => {
    axios
      .delete(`${DATA_URL}/${id}`)
      .then(() => {
        let usersIndex = index;
        if (filter !== "") {
          usersIndex = users.findIndex((user) => user.id === id);
          setFilteredUsers([
            ...filteredUsers.slice(0, index),
            ...filteredUsers.slice(index + 1),
          ]);
          setFilterSize((size) => size - 1);
        }
        setUsers([
          ...users.slice(0, usersIndex),
          ...users.slice(usersIndex + 1),
        ]);
        setDataSize(dataSize - 1);
        setMessage(name + DELETE_SUCCES_MESSAGE);
        setAlertType(SUCCESS);
        setAlert(true);
      })
      .catch((error) => {
        setMessage(error.message);
        setAlertType(ERROR);
        setAlert(true);
      });
  };
  const style = {
    //width: "100%",
    width: 10,
    maxWidth: 10,
    overflow: "hidden",
    textOverflow: "ellipsis",
    //align: "center",
  };
  return (
    <TableRow sx={style}>
      <TableCell sx={style}>{name}</TableCell>
      <TableCell sx={style}>{phone}</TableCell>
      <TableCell sx={style}>{email}</TableCell>
      <TableCell sx={{ width: 10, maxWidth: 10 }} align="right">
        <IconButton onClick={deleteUser}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
export default User;
