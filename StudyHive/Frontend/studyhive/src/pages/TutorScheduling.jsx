import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

const localizer = momentLocalizer(moment);

const TutorScheduling = () => {
  const { user } = useAuth();
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [subject, setSubject] = useState("");

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await api.get("/sessions/availability");
        const formatted = res.data.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
          title: event.bookedBy ? "Booked" : event.tutorName || "Available Session",
        }));
        setEvents(formatted);
      } catch (err) {
        console.error("Failed to fetch availability:", err);
      }
    };

    if (user) fetchAvailability();
  }, [user]);

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setStartTime("");
    setEndTime("");
    setSubject("");
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!startTime || !endTime || !subject) {
      toast.error("Please fill out all fields.", { position: "top-center" });
      return;
    }

    const startDateTime = new Date(selectedDate);
    const endDateTime = new Date(selectedDate);
    const [startHour, startMin] = startTime.split(":");
    const [endHour, endMin] = endTime.split(":");
    startDateTime.setHours(+startHour, +startMin);
    endDateTime.setHours(+endHour, +endMin);

    try {
      await api.post("/sessions/availability", {
        tutorName: fullName,
        start: startDateTime,
        end: endDateTime,
        subject,
      });
      toast.success("Availability posted!", { position: "top-center" });
      setModalOpen(false);
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to post availability.", { position: "top-center" });
    }
  };

  return (
    <div className="flex pt-20 bg-gray-100 min-h-screen">
      <div className="w-80 min-h-screen mt-[-8%] ml-[-10%] bg-[#E3EAE0] shadow-md border-r hidden md:flex">
        <Sidebar />
      </div>

      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Schedule Sessions</h2>

        <Calendar
          selectable
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView={Views.MONTH}
          views={{ month: true, week: true, day: true, agenda: true }}
          onSelectSlot={handleSelectSlot}
          style={{ height: 600 }}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.bookedBy ? "#fcd9b6" : "#c3f7ca",
              color: "#333",
              borderRadius: "6px",
              padding: "4px 6px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease",
            },
            className: "hover:scale-[1.02] cursor-pointer",
          })}
        />

        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-40 transition-all">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-[300px] animate-fade-in">
              <h3 className="text-xl font-semibold mb-4">Post Availability</h3>

              <div className="text-sm mb-2 text-gray-600">
                Availability as: <span className="font-semibold text-black">{fullName}</span>
              </div>

              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full border p-2 mb-2 rounded focus:ring focus:ring-green-600"
              />
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full border p-2 mb-2 rounded focus:ring focus:ring-green-600"
              />
              <textarea
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border p-2 mb-3 rounded resize-none focus:ring focus:ring-green-600"
              />

              <button
                onClick={handleSave}
                className="w-full py-2 mb-2 bg-[#1F4D39] hover:bg-[#17382a] text-white rounded transition-transform transform hover:scale-105"
              >
                Save
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="w-full py-2 bg-gray-300 hover:bg-gray-400 rounded transition-transform transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default TutorScheduling;
