import { connect } from "react-redux";
import CalendarDay from "./CalendarDay";
import { openAgenda } from "../../redux/actions";
import { IReminderObj } from "../../types/types";

interface Props {}

interface State {}

interface DateObj {
  date: Date;
  reminders: IReminderObj[];
}

const mapStateToProps = (state: State, ownProps: Props) => {
  return { ...state, ...ownProps };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onDayClick: (dateObj: DateObj) => {
      dispatch(openAgenda(dateObj));
    },
  };
};

const CalendarDayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarDay);

export default CalendarDayContainer;
