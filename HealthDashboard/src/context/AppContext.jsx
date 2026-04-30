import { createContext, useContext, useState, useEffect } from "react";
import { API } from "../api/api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const res = await API.get("/appointments");
    setAppointments(res.data);
  };

  const addAppointment = async (data) => {
    await API.post("/appointments", data);
    fetchAppointments();
  };

  const deleteAppointment = async (id) => {
    await API.delete(`/appointments/${id}`);
    fetchAppointments();
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        appointments,
        addAppointment,
        deleteAppointment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);