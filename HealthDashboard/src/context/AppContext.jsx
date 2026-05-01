import { createContext, useContext, useState, useEffect } from "react";
import { API } from "../api/api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async () => {
    const res = await API.get("/Appointments");
    console.log("API DATA:", res.data);
    setAppointments(res.data);
    try {
      setLoading(true);
      const res = await API.get("/Appointments");
      setAppointments(res.data);
    } catch (e) {
      console.error("Fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  const addAppointment = async (data) => {
    try {
      await API.post("/Appointments", data);
      fetchAppointments();
    } catch (e) {
      console.error("Add error:", e);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await API.delete(`/Appointments/${id}`);
      fetchAppointments();
    } catch (e) {
      console.error("Delete error:", e);
    }
  };

  const updateAppointment = async (id, updatedData) => {
    try {
      await API.put(`/Appointments/${id}`, updatedData);
      fetchAppointments();
    } catch (error) {
      console.error("Update error:", error);
    }
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
        loading,
        fetchAppointments,
        addAppointment,
        deleteAppointment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
