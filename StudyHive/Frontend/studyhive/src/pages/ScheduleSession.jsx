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
    subject: "",
  });
  const [viewMode, setViewMode] = useState("tutor");
  const [studentName, setStudentName] = useState("");

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
        console.error("❌ Failed to fetch availability:", err);
      }
    };
    fetchAvailability();
  }, []);

  const handleSelectSlot = ({ start }) => {
    if (viewMode === "tutor") {
      setSelectedDate(start);
      setModalOpen(true);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
        subject: formData.subject,
      });
      alert("✅ Availability posted!");
      setModalOpen(false);
      setFormData({ tutorName: "", startTime: "", endTime: "", subject: "" });
      window.location.reload();
    } catch (err) {
      alert("❌ Failed to post availability");
      console.error(err);
    }
  };

  const handleBookSession = async () => {
    if (!studentName) return alert("Please enter your name");
    try {
      await api.patch(`/sessions/book/${selectedEvent._id}`, { studentName });
      alert("✅ Session booked!");
      setSelectedEvent(null);
      window.location.reload();
    } catch (err) {
      alert("❌ Failed to book session");
      console.error(err);
    }
  };

  const handleUnbookSession = async () => {
    try {
      await api.patch(`/sessions/book/${selectedEvent._id}`, { studentName: "" });
      alert("Session unbooked!");
      setSelectedEvent(null);
      window.location.reload();
    } catch (err) {
      alert("Failed to unbook session");
      console.error(err);
    }
  };

  const handleCancelSession = async () => {
    try {
      await api.delete(`/sessions/${selectedEvent._id}`);
      alert("Session deleted");
      setSelectedEvent(null);
      window.location.reload();
    } catch (err) {
      alert("Failed to delete session");
      console.error(err);
    }
  };

  return (
    <div className="flex pt-20 bg-gray-100 min-h-screen">
      <div className="w-64 mt-[-60px] ml-[-2%] bg-[#E3EAE0] shadow-md border-r hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Schedule Sessions</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("tutor")}
              className={`px-4 py-1 rounded ${viewMode === "tutor" ? "bg-blue-700 text-white" : "bg-gray-300"}`}
            >Tutor View</button>
            <button
              onClick={() => setViewMode("student")}
              className={`px-4 py-1 rounded ${viewMode === "student" ? "bg-green-600 text-white" : "bg-gray-300"}`}
            >Student View</button>
          </div>
        </div>

        <Calendar
          selectable={viewMode === "tutor"}
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
          eventPropGetter={(event) => {
            if (event.bookedBy) {
              return {
                style: {
                  backgroundColor: "#fcd9b6",
                  color: "#333",
                  borderRadius: "6px",
                  padding: "2px 4px",
                },
              };
            }
            return {
              style: {
                backgroundColor: "#c3f7ca",
                color: "#333",
                borderRadius: "6px",
                padding: "2px 4px",
              },
            };
          }}
        />

        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-40">
            <div className="bg-white p-6 rounded-md shadow-lg z-50 w-[300px]">
              <h3 className="text-xl font-semibold mb-4">Post Availability</h3>
              <input name="tutorName" placeholder="Your name" className="w-full border p-2 mb-2 rounded" value={formData.tutorName} onChange={handleChange} />
              <input type="time" name="startTime" className="w-full border p-2 mb-2 rounded" value={formData.startTime} onChange={handleChange} />
              <input type="time" name="endTime" className="w-full border p-2 mb-2 rounded" value={formData.endTime} onChange={handleChange} />
              <textarea name="subject" placeholder="Subject" className="w-full border p-2 mb-3 rounded" value={formData.subject} onChange={handleChange} />
              <div className="flex justify-end gap-2">
                <button onClick={() => setModalOpen(false)} className="px-3 py-1 bg-gray-300 rounded">Cancel</button>
                <button onClick={handleSubmit} className="px-3 py-1 bg-green-700 text-white rounded">Save</button>
              </div>
            </div>
          </div>
        )}

        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-40">
            <div className="bg-white p-6 rounded-md shadow-lg z-50 w-[300px]">
              <h3 className="text-xl font-semibold mb-4">Session Details</h3>
              <p><strong>Tutor:</strong> {selectedEvent.tutorName}</p>
              <p><strong>Start:</strong> {new Date(selectedEvent.start).toLocaleString()}</p>
              <p><strong>End:</strong> {new Date(selectedEvent.end).toLocaleString()}</p>
              <p><strong>Subject:</strong> {selectedEvent.subject || "None"}</p>

              {viewMode === "student" && !selectedEvent.bookedBy && (
                <>
                  <input
                    placeholder="Your name"
                    className="w-full border p-2 mb-3 mt-3 rounded"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                  <button onClick={handleBookSession} className="w-full py-2 mb-2 bg-blue-700 text-white rounded">Book Session</button>
                </>
              )}

              {viewMode === "student" && selectedEvent.bookedBy && (
                <button onClick={handleUnbookSession} className="w-full py-2 mb-2 bg-orange-600 text-white rounded">Cancel My Booking</button>
              )}

              {viewMode === "tutor" && (
                <button onClick={handleCancelSession} className="w-full py-2 mb-2 bg-red-600 text-white rounded">Delete Session</button>
              )}

              <button onClick={() => setSelectedEvent(null)} className="w-full mt-2 py-2 bg-gray-300 rounded">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleSession;