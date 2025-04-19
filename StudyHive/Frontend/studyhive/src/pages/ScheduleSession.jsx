// File: Frontend/studyhive/src/pages/ScheduleSession.jsx

import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

const localizer = momentLocalizer(moment);

const ScheduleSession = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    tutorName: "",
    startTime: "",
    endTime: "",
    notes: "",
  });

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await api.get("/sessions/availability");
        const formatted = res.data.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
          title: event.tutorName || "Available Session",
        }));
        setEvents(formatted);
      } catch (err) {
        console.error("❌ Failed to fetch availability:", err);
      }
    };
    fetchAvailability();
  }, []);

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.tutorName || !formData.startTime || !formData.endTime) {
      alert("Please complete all fields");
      return;
    }

    const startDateTime = new Date(`${selectedDate.toISOString().split("T")[0]}T${formData.startTime}`);
    const endDateTime = new Date(`${selectedDate.toISOString().split("T")[0]}T${formData.endTime}`);

    try {
      await api.post("/sessions/availability", {
        tutorName: formData.tutorName,
        start: startDateTime,
        end: endDateTime,
        notes: formData.notes,
      });
      alert("✅ Availability posted!");
      setModalOpen(false);
      setFormData({ tutorName: "", startTime: "", endTime: "", notes: "" });
      window.location.reload();
    } catch (err) {
      alert("❌ Failed to post availability");
      console.error(err);
    }
  };

  const handleCancelSession = async () => {
    try {
      await api.delete(`/sessions/${selectedEvent._id}`);
      alert("Session canceled !");
      setSelectedEvent(null);
      setEvents(events.filter(e => e._id !== selectedEvent._id));
    } catch (err) {
      alert("Failed to cancel session");
      console.error(err);
    }
  };

  return (
    <div className="flex pt-20 bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Schedule Sessions</h2>

        <div className="relative">
          <Calendar
            selectable
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView={Views.MONTH}
            views={{ month: true, week: true, day: true, agenda: true }}
            style={{ height: 600 }}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={(event) => setSelectedEvent(event)}
            popup
          />
        </div>

        {/* Modal for creating a session */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-40">
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg z-50 w-[300px]">
              <h3 className="text-xl font-semibold mb-4">Post Availability</h3>
              <input
                type="text"
                name="tutorName"
                placeholder="Your name"
                className="w-full border p-2 mb-3 rounded"
                value={formData.tutorName}
                onChange={handleChange}
              />
              <input
                type="time"
                name="startTime"
                className="w-full border p-2 mb-3 rounded"
                value={formData.startTime}
                onChange={handleChange}
              />
              <input
                type="time"
                name="endTime"
                className="w-full border p-2 mb-3 rounded"
                value={formData.endTime}
                onChange={handleChange}
              />
              <textarea
                name="notes"
                placeholder="Additional notes (optional)"
                className="w-full border p-2 mb-4 rounded"
                value={formData.notes}
                onChange={handleChange}
              />
              <div className="flex justify-end gap-2">
                <button onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                <button onClick={handleSubmit} className="px-4 py-2 bg-green-700 text-white rounded">Save</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal for viewing a session */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-40">
            <div className="bg-white p-6 rounded-md shadow-lg z-50 w-[300px]">
              <h3 className="text-xl font-semibold mb-4">Session Details</h3>
              <p><strong>Tutor:</strong> {selectedEvent.tutorName}</p>
              <p><strong>Start:</strong> {new Date(selectedEvent.start).toLocaleString()}</p>
              <p><strong>End:</strong> {new Date(selectedEvent.end).toLocaleString()}</p>
              <p><strong>Notes:</strong> {selectedEvent.notes || "None"}</p>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setSelectedEvent(null)} className="px-4 py-2 bg-gray-300 rounded">Close</button>
                <button onClick={handleCancelSession} className="px-4 py-2 bg-red-600 text-white rounded">Cancel Session</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleSession;
