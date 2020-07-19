import React from "react";
import {
  WithStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import { isSameDay, compareAsc } from "date-fns";
import CalendarDayContainer from "../CalendarDay/CalendarDayContainer";
import { IReminderObj } from "../../types/types";

const styles = (theme: Theme) =>
  createStyles({
    monthContainer: {
      display: "flex",
      width: "100%",
      flexGrow: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      border: "1px solid lightgray",
    },
  });

interface Props extends WithStyles<typeof styles> {
  calendarCells: {
    date: Date;
    reminders: IReminderObj[];
  }[];
  date: Date;
  filteredReminderArr: IReminderObj[];
}

const MonthContainer = (props: Props) => (
  <div className={props.classes.monthContainer}>
    {/* filter and sort array of reminders to be displayed per day of viewable month grid */}
    {props.calendarCells.map((dateObj, i) => {
      const dayReminders = props.filteredReminderArr
        .filter((data: IReminderObj) =>
          isSameDay(data.reminderDateTime, dateObj.date)
        )
        .sort((a: { reminderDateTime: Date }, b: { reminderDateTime: Date }) =>
          compareAsc(new Date(a.reminderDateTime), new Date(b.reminderDateTime))
        );
      dateObj.reminders = dayReminders;
      return (
        <CalendarDayContainer
          key={i}
          calendarDate={props.date}
          dateObj={dateObj}
        />
      );
    })}
  </div>
);

export default withStyles(styles)(MonthContainer);
