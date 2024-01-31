import { Paper, TextField, debounce } from "@mui/material";
import { UsersContext } from "../App";
import { useContext } from "react";
import { DEBOUNCE_TIME } from "../constants";

function Search({ active }) {
  const { setFilter } = useContext(UsersContext);
  const setFilterDebounce = debounce((filter) => {
    setFilter(filter);
  }, DEBOUNCE_TIME);
  return active ? (
    <Paper>
      <TextField
        label="Search.."
        onChange={(event) => setFilterDebounce(event.target.value)}
      />
    </Paper>
  ) : (
    <></>
  );
}
export default Search;
