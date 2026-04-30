import { createContext, useContext, useState, useEffect } from "react";
import { API } from "../api/api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);

  // 🔧 Fetch appointments safely
  const fetchAppointments = async () => {
    try {
      const res = await API.get("/Appointments"); // match your API
      setAppointments(res.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  // ➕ Add appointment
  const addAppointment = async (data) => {
    try {
      await API.post("/Appointments", data);
      fetchAppointments();
    } catch (error) {
      console.error("Error adding appointment:", error);
    }
  };

  // ❌ Delete appointment
  const deleteAppointment = async (id) => {
    try {
      await API.delete(`/Appointments/${id}`);
      fetchAppointments();
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  // ✅ Safe useEffect
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

// 🔐 Safe custom hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};