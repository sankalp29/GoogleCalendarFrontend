import React, {
    useState,
    useEffect,
    useReducer,
    useMemo,
} from "react";

import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import { fetchEvents, createEvent as apiCreate, updateEvent as apiUpdate, deleteEvent as apiDelete } from "../api/events";
  
function savedEventsReducer(state, { type, payload }) {
    switch (type) {
      case "set":
        return Array.isArray(payload) ? payload : state;
      case "push":
        return [...state, payload];
      case "update":
        return state.map((evt) =>
          evt.id === payload.id ? payload : evt
        );
      case "delete":
        return state.filter((evt) => evt.id !== payload.id);
      default:
        throw new Error();
    }
}

function initEvents() {
    const storageEvents = localStorage.getItem("savedEvents");
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
    return parsedEvents;
}
  
export default function ContextWrapper(props) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [labels, setLabels] = useState([]);
    const [savedEvents, dispatch] = useReducer(
      savedEventsReducer,
      [],
      initEvents
    );
  
    const filteredEvents = useMemo(() => {
      return savedEvents.filter((evt) =>
        labels
          .filter((lbl) => lbl.checked)
          .map((lbl) => lbl.label)
          .includes(evt.label)
      );
    }, [savedEvents, labels]);
  
    useEffect(() => {
      localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    }, [savedEvents]);
  
    useEffect(() => {
      setLabels((prevLabels) => {
        return [...new Set(savedEvents.map((evt) => evt.label))].map(
          (label) => {
            const currentLabel = prevLabels.find(
              (lbl) => lbl.label === label
            );
            return {
              label,
              checked: currentLabel ? currentLabel.checked : true,
            };
          }
        );
      });
    }, [savedEvents]);
  
    useEffect(() => {
      if (smallCalendarMonth !== null) {
        setMonthIndex(smallCalendarMonth);
      }
    }, [smallCalendarMonth]);
  
    useEffect(() => {
      if (!showEventModal) {
        setSelectedEvent(null);
      }
    }, [showEventModal]);
  
    function updateLabel(label) {
      setLabels(
        labels.map((lbl) => (lbl.label === label.label ? label : lbl))
      );
    }

    // Initial load from backend (hydrates state, still keeps localStorage as cache)
    useEffect(() => {
      (async () => {
        try {
          const serverEvents = await fetchEvents();
          if (Array.isArray(serverEvents)) {
            dispatch({ type: "set", payload: serverEvents });
          }
        } catch (e) {
          // Ignore network errors; continue with local data
        }
      })();
    }, []);

    // Dispatch wrapper that syncs with backend
    async function dispatchCalEvent(action) {
      const { type, payload } = action;
      try {
        if (type === "push") {
          await apiCreate(payload);
        } else if (type === "update") {
          await apiUpdate(payload.id, payload);
        } else if (type === "delete") {
          await apiDelete(payload.id);
        }
        dispatch(action);
      } catch (e) {
        console.error("Event sync failed:", e);
        // Optionally show a toast; for now we do not mutate state on failure
      }
    }
  
    return (
      <GlobalContext.Provider
        value={{
          monthIndex,
          setMonthIndex,
          smallCalendarMonth,
          setSmallCalendarMonth,
          daySelected,
          setDaySelected,
          showEventModal,
          setShowEventModal,
          dispatchCalEvent,
          selectedEvent,
          setSelectedEvent,
          savedEvents,
          setLabels,
          labels,
          updateLabel,
          filteredEvents,
        }}
      >
        {props.children}
      </GlobalContext.Provider>
    );
}