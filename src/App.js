import "./App.css";
import UsersTable from "./components/UsersTable";
import { createContext, useState } from "react";
import TopMenu from "./components/TopMenu";
import Alerts from "./components/Alerts";
import { WELCOME_MESSAGE } from "./constants";
export const UsersContext = createContext();

function App() {
  const [users, setUsers] = useState([]);
  const [dataSize, setDataSize] = useState(0);
  const [alert, setAlert] = useState(true);
  const [alertType, setAlertType] = useState("");
  const [message, setMessage] = useState(WELCOME_MESSAGE);
  const [filter, setFilter] = useState("");
  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        setAlert,
        setAlertType,
        setMessage,
        dataSize,
        setDataSize,
        filter,
        setFilter,
      }}
    >
      <TopMenu></TopMenu>
      <UsersTable></UsersTable>
      <Alerts alert={alert} alertType={alertType} message={message} />
    </UsersContext.Provider>
  );
}

export default App;
