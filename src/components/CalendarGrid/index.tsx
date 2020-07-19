import React from "react";
import { useSelector } from "react-redux";
import {
  WithStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import { isWithinInterval } from "date-fns";
import DaysRow from "./DaysRow";
import MonthContainer from "./MonthContainer";
import { getMonthCells } from "../../utils/dateUtils";
import { IReminderObj } from "../../types/types";

const styles = (theme: Theme) =>
  createStyles({
    calendarGrid: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
  });

interface Props extends WithStyles<typeof styles> {
  date: Date;
}

const CalendarGrid = (props: Props) => {
  const reminderArr = useSelector(
    (state: any) => state.addReminderStatus.reminders
  );
  const { classes, date } = props;
  const calendarCells = getMonthCells(date);

  // filter list of all reminders to viewable month grid
  const filteredReminderArr = reminderArr.filter((dateObj: IReminderObj) => {
    return isWithinInterval(dateObj.reminderDateTime, {
      start: calendarCells[0].date,
      end: calendarCells[41].date,
    });
  });

  return (
    <div className={classes.calendarGrid}>
      <DaysRow />
      <MonthContainer
        date={date}
        calendarCells={calendarCells}
        filteredReminderArr={filteredReminderArr}
      />
    </div>
  );
};

export default withStyles(styles)(CalendarGrid);
