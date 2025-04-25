import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

const localizer = momentLocalizer(moment);

const ScheduleSession = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState(Views.MONTH);

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
        console.error(" Failed to fetch availability:", err);
      }
    };
    fetchAvailability();
  }, []);

  const handleBookSession = async () => {
    if (!studentName) return alert("Please enter your name");
    try {
      await api.patch(`/sessions/book/${selectedEvent._id}`, { studentName });
      alert(" Session booked!");
      setSelectedEvent(null);
      window.location.reload();
    } catch (err) {
      alert(" Failed to book session");
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

  return (
    <div className="flex pt-20 bg-gray-100 min-h-screen">
      <div className="w-80 min-h-screen mt-[-8%] ml-[-10%] bg-[#E3EAE0] shadow-md border-r hidden md:flex">
        <Sidebar />
      </div>

      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Available Sessions</h2>

        <Calendar
          selectable={false}
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          date={currentDate}
          view={currentView}
          onNavigate={(date) => setCurrentDate(date)}
          onView={(view) => setCurrentView(view)}
          views={{ month: true, week: true, day: true, agenda: true }}
          style={{ height: 600 }}
          onSelectEvent={(event) => setSelectedEvent(event)}
          popup
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

        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-40 transition-all">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-[300px] animate-fade-in">
              <h3 className="text-xl font-semibold mb-4">Session Details</h3>
              <p><strong>Tutor:</strong> {selectedEvent.tutorName}</p>
              <p><strong>Start:</strong> {new Date(selectedEvent.start).toLocaleString()}</p>
              <p><strong>End:</strong> {new Date(selectedEvent.end).toLocaleString()}</p>
              <p><strong>Subject:</strong> {selectedEvent.subject || "None"}</p>

              {!selectedEvent.bookedBy && (
                <>
                  <input
                    placeholder="Your name"
                    className="w-full border p-2 mb-3 mt-3 rounded focus:ring focus:ring-blue-300"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                  <button
                    onClick={handleBookSession}
                    className="w-full py-2 mb-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition-transform transform hover:scale-105"
                  >
                    Book Session
                  </button>
                </>
              )}

              {selectedEvent.bookedBy && (
                <button
                  onClick={handleUnbookSession}
                  className="w-full py-2 mb-2 bg-orange-600 hover:bg-orange-700 text-white rounded transition-transform transform hover:scale-105"
                >
                  Cancel My Booking
                </button>
              )}

              <button
                onClick={() => setSelectedEvent(null)}
                className="w-full mt-2 py-2 bg-gray-300 hover:bg-gray-400 rounded transition-transform transform hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleSession;
