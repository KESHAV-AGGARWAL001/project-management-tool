import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const projectId = localStorage.getItem("roomId");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/task/getAllTasks/`,
        {
          params: {
            projectId,
          },
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      const tasks = response.data.map((task) => ({
        title: task.title,
        start: new Date(task.dueDate),
        end: new Date(task.dueDate),
        allDay: true,
        status: task.status,
        dueDate: task.dueDate,
      }));
      setEvents(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const eventPropGetter = (event) => {
    let backgroundColor;
    if (new Date(event.dueDate) < new Date()) {
      backgroundColor = "#ff0000"; // Red for expired tasks
    } else {
      switch (event.status) {
        case "assigned":
          backgroundColor = "#007bff"; // Blue for assigned tasks
          break;
        case "inProgress":
          backgroundColor = "#ffc107"; // Yellow for in-progress tasks
          break;
        case "complete":
          backgroundColor = "#28a745"; // Green for completed tasks
          break;
        default:
          backgroundColor = "#6c757d"; // Grey for any other status
          break;
      }
    }
    return { style: { backgroundColor } };
  };

  return (
    <div className="p-4 flex flex-col justify-center">
      <h1 className="my-4 text-3xl self-center font-bold">
        All Tasks Scheduler for you
      </h1>
      <hr className="h-1 bg-red-600 rounded-full" />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        className="mx-10 mt-4"
        eventPropGetter={eventPropGetter}
      />
    </div>
  );
};

export default MyCalendar;
