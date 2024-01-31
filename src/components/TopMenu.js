import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PersonAddDisabledOutlinedIcon from "@mui/icons-material/PersonAddDisabledOutlined";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import { IconButton } from "@mui/material";
import AddUser from "./AddUser";
import { useContext, useState } from "react";
import Search from "./Search";
import { UsersContext } from "../App";

function TopMenu() {
  const [addActive, setAddActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const { setFilter } = useContext(UsersContext);

  return (
    <div>
      <IconButton
        onClick={() => {
          setAddActive(!addActive);
          setSearchActive(false);
        }}
      >
        {addActive ? (
          <PersonAddDisabledOutlinedIcon />
        ) : (
          <PersonAddOutlinedIcon />
        )}
      </IconButton>
      <IconButton
        onClick={() => {
          if (searchActive) setFilter("");
          setSearchActive(!searchActive);
          setAddActive(false);
        }}
      >
        {searchActive ? <SearchOffIcon /> : <ManageSearchIcon />}
      </IconButton>
      <Search active={searchActive} setActive={setSearchActive} />
      <AddUser active={addActive} setActive={setAddActive} />
    </div>
  );
}
export default TopMenu;
