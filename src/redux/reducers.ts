import { combineReducers } from "redux";
import {
  OPEN_AGENDA,
  CLOSE_AGENDA,
  OPEN_ADD_REMINDER,
  CLOSE_ADD_REMINDER,
  ADD_REMINDER,
} from "./actions";

const initialAgendaState = {
  isOpen: false,
  date: null,
  dayReminders: [],
};

const initialAddReminderState = {
  isOpen: false,
  reminders: [],
};

function agendaStatus(state = initialAgendaState, action: any) {
  switch (action.type) {
    case OPEN_AGENDA:
      return {
        isOpen: true,
        date: action.dateObj.date,
        dayReminders: action.dateObj.reminders,
      };
    case CLOSE_AGENDA:
      return {
        isOpen: false,
        date: null,
        dayReminders: [],
      };
    default:
      return state;
  }
}

function addReminderStatus(state = initialAddReminderState, action: any) {
  switch (action.type) {
    case OPEN_ADD_REMINDER:
      return {
        ...state,
        isOpen: true,
      };
    case CLOSE_ADD_REMINDER:
      return {
        ...state,
        isOpen: false,
      };
    case ADD_REMINDER:
      return {
        ...state,
        reminders: [...state.reminders, action.reminderObj],
      };
    default:
      return state;
  }
}

const calendarApp = combineReducers({
  agendaStatus,
  addReminderStatus,
});

export default calendarApp;
