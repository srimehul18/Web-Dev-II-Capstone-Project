import { useApp } from "../context/AppContext";
import AppointmentCard from "../components/AppointmentCard";

export default function Appointments() {
    const { appointments, deleteAppointment, updateAppointment } = useApp();

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="bg-white w-full max-w-xl p-6 rounded-xl shadow-lg">

                <h1 className="text-xl font-bold text-center">
                    My Appointments
                </h1>

                {appointments.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">
                        No appointments yet
                    </p>
                )}

                <div className="mt-4 space-y-3">
                    {appointments.map((appt) => (
                        <AppointmentCard
                            key={appt.id + appt.patientName}
                            appt={appt}
                            onDelete={deleteAppointment}
                            onUpdate={updateAppointment}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
}