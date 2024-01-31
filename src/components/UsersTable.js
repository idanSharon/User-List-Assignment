import React, { useContext, useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { UsersContext } from "../App";
import User from "./User";
import axios from "axios";
import { DATA_COUNT, DATA_URL, DOWNLOAD_THRESHOLD, ERROR } from "../constants";

function UsersTable() {
  const {
    users,
    setUsers,
    setAlert,
    setAlertType,
    setMessage,
    dataSize,
    setDataSize,
    filter,
  } = useContext(UsersContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredSize, setFilterSize] = useState(0);

  /**
   * The function gets more data, if needed. (handlePageChange, handleRowsPerPageChange)
   */
  const loadMorePages = (page, rowsPerPage) => {
    if (
      (users.length < dataSize &&
        page >= DOWNLOAD_THRESHOLD / rowsPerPage / 2) ||
      (!users.length && dataSize)
    ) {
      getData();
    }
  };

  const handlePageChange = (event, newpage) => {
    loadMorePages(newpage, rowsPerPage);
    setPage(newpage);
  };
  function handleRowsPerPageChange(event) {
    setRowsPerPage(event.target.value);
    loadMorePages(0, event.target.value);
    setPage(0);
  }

  /**
   * set filteredUsers with filterd users
   */
  const apllyFilter = (users) => {
    const filtered = users.filter((user) => {
      return (
        (user.name && user.name.includes(filter)) ||
        (user.phone && user.phone.includes(filter)) ||
        (user.email && user.email.includes(filter))
      );
    });
    setFilteredUsers(filtered);
    return filtered.length;
  };

  const cleanDuplications = (users) => {
    const ids = {};
    return users.filter((user) => {
      if (ids[user.id]) {
        return false;
      } else {
        return (ids[user.id] = true);
      }
    });
  };
  const getData = () => {
    axios
      .get(
        `${DATA_URL}?q=${filter}&_start=${
          filter === "" ? users.length : filteredUsers.length
        }&_limit=${DOWNLOAD_THRESHOLD}`
      )
      .then((res) => {
        filter === ""
          ? setDataSize(res.headers[DATA_COUNT])
          : setFilterSize(res.headers[DATA_COUNT]);
        const uniquValuesArray = cleanDuplications([...users, ...res.data]);
        setUsers(uniquValuesArray);
        if (filter) apllyFilter(uniquValuesArray);
      })
      .catch((error) => {
        setMessage(error.message);
        setAlertType(ERROR);
        setAlert(true);
      });
  };

  useEffect(() => {
    if (users.length < dataSize) {
      getData();
    } else {
      const size = apllyFilter(users);
      setFilterSize(size);
    }
    setPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rows = (filter !== "" ? filteredUsers : users)
    .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    .map((user, i) => (
      <User
        key={user.id}
        id={user.id}
        name={user.name}
        phone={user.phone}
        email={user.email}
        index={page * rowsPerPage + i}
        filteredUsers={filteredUsers}
        setFilteredUsers={setFilteredUsers}
        setFilterSize={setFilterSize}
      />
    ));
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>eMail</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        page={page}
        count={Number(filter === "" ? dataSize : filteredSize)}
        rowsPerPage={rowsPerPage}
        component="div"
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Paper>
  );
}
export default UsersTable;
