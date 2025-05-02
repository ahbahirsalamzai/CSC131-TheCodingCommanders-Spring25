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

const ScheduleSession = () => {
  const { user } = useAuth();
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState(Views.MONTH);
  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    subject: "",
  });

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await api.get("/sessions/availability");
        const formatted = res.data.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
          title: event.bookedBy ? "Booked" : `${event.tutorName || "Available"}`,
        }));
        setEvents(formatted);
      } catch (err) {
        console.error("Failed to fetch availability:", err);
      }
    };
    fetchAvailability();
  }, []);

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const { startTime, endTime, subject } = formData;
    if (!startTime || !endTime || !subject) {
      toast.error("Please complete all fields", { position: "top-center" });
      return;
    }

    const startDateTime = new Date(`${selectedDate.toISOString().split("T")[0]}T${startTime}`);
    const endDateTime = new Date(`${selectedDate.toISOString().split("T")[0]}T${endTime}`);

    try {
      await api.post("/sessions/availability", {
        tutorName: fullName,
        start: startDateTime,
        end: endDateTime,
        subject,
      });
      toast.success("Availability posted!", { position: "top-center", autoClose: 1500 });
      setModalOpen(false);
      setFormData({ startTime: "", endTime: "", subject: "" });

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      toast.error("Failed to post availability!", { position: "top-center" });
      console.error(err);
    }
  };

  const handleCancelSession = async () => {
    try {
      await api.delete(`/sessions/${selectedEvent._id}`);
      toast.success("Session deleted!", { position: "top-center", autoClose: 1500 });
      setSelectedEvent(null);

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      toast.error("Failed to delete session!", { position: "top-center" });
      console.error(err);
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
          date={currentDate}
          view={currentView}
          onNavigate={(date) => setCurrentDate(date)}
          onView={(view) => setCurrentView(view)}
          defaultView={Views.MONTH}
          views={{ month: true, week: true, day: true, agenda: true }}
          style={{ height: 600 }}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={(event) => setSelectedEvent(event)}
          popup
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.bookedBy ? "#fcd9b6" : "#c3f7ca",
              color: "#333",
              borderRadius: "6px",
              padding: "2px 4px",
            },
          })}
        />

        {/* Post Availability Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-40">
            <div className="bg-white p-6 rounded-md shadow-lg z-50 w-[300px]">
              <h3 className="text-xl font-semibold mb-4">Post Availability</h3>
              <div className="text-sm mb-2 text-gray-600">
                Availability as: <span className="font-semibold text-black">{fullName}</span>
              </div>
              <input
                type="time"
                name="startTime"
                className="w-full border p-2 mb-2 rounded"
                value={formData.startTime}
                onChange={handleChange}
              />
              <input
                type="time"
                name="endTime"
                className="w-full border p-2 mb-2 rounded"
                value={formData.endTime}
                onChange={handleChange}
              />
              <textarea
                name="subject"
                placeholder="Subject"
                className="w-full border p-2 mb-3 rounded"
                value={formData.subject}
                onChange={handleChange}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-1 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-3 py-1 bg-green-700 text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cancel/Delete Modal */}
        {selectedEvent && selectedEvent.tutorName === fullName && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-40">
            <div className="bg-white p-6 rounded-md shadow-lg z-50 w-[300px]">
              <h3 className="text-xl font-semibold mb-4">Session Details</h3>
              <p><strong>Tutor:</strong> {selectedEvent.tutorName}</p>
              <p><strong>Start:</strong> {new Date(selectedEvent.start).toLocaleString()}</p>
              <p><strong>End:</strong> {new Date(selectedEvent.end).toLocaleString()}</p>
              <p className="mb-3"><strong>Subject:</strong> {selectedEvent.subject || "None"}</p>
              <button
                onClick={handleCancelSession}
                className="w-full py-2 mb-2 bg-red-600 text-white rounded"
              >
                Delete Session
              </button>
              <button
                onClick={() => setSelectedEvent(null)}
                className="w-full mt-2 py-2 bg-gray-300 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ScheduleSession;
