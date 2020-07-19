import React, { useState, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import deepPurple from "@material-ui/core/colors/deepPurple";
import { Typography } from "@material-ui/core";
import { format } from "date-fns";
import {
  WithStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import { isSameMonth, isSameDay, getDate } from "date-fns";
import useDimensions from "../../utils/useDimensions";
import { IReminderObj } from "../../types/types";

const styles = (theme: Theme) =>
  createStyles({
    dayCell: {
      display: "flex",
      flex: "1 0 13%",
      flexDirection: "column",
      border: "1px solid lightgray",
      cursor: "pointer",
    },
    dayCellOutsideMonth: {
      display: "flex",
      flex: "1 0 13%",
      flexDirection: "column",
      border: "1px solid lightgray",
      backgroundColor: "rgba( 211, 211, 211, 0.4 )",
      cursor: "pointer",
    },
    dateNumber: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#000",
      backgroundColor: "transparent",
    },
    todayAvatar: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#fff",
      backgroundColor: deepPurple[400],
    },
    focusedAvatar: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#000",
      backgroundColor: "#f1f1f1",
    },
    focusedTodayAvatar: {
      margin: 5,
      height: "28px",
      width: "28px",
      fontSize: "0.85rem",
      color: "#fff",
      backgroundColor: deepPurple[800],
    },
    remindersContainer: {
      height: "100%",
      position: "relative",
    },
    reminderChip: {
      display: "inline-flex",
      boxSizing: "border-box",
      borderRadius: "16px",
      position: "absolute",
    },
    reminderLabel: {
      padding: 5,
      margin: 0,
    },
    extraRemindersNoteSmall: {},
    extraRemindersNote: {
      top: "4rem",
      left: "6rem",
      position: "absolute",
    },
  });

interface DateObj {
  date: Date;
  reminders: IReminderObj[];
}

interface Props extends WithStyles<typeof styles> {
  calendarDate: Date;
  dateObj: DateObj;
  onDayClick: (dateObj: DateObj) => void;
}

const CalendarDay = (props: Props) => {
  const { classes, dateObj, calendarDate, onDayClick } = props;
  const { reminders } = dateObj;
  const [focused, setFocused] = useState(false);
  const targetRef = useRef();
  const size = useDimensions(targetRef);

  const isToday = isSameDay(dateObj.date, new Date());
  const avatarClass =
    isToday && focused
      ? classes.focusedTodayAvatar
      : isToday
      ? classes.todayAvatar
      : focused
      ? classes.focusedAvatar
      : classes.dateNumber;

  const onMouseOver = () => setFocused(true);
  const onMouseOut = () => setFocused(false);

  return (
    <div
      ref={targetRef}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={() => onDayClick(dateObj)}
      className={
        isSameMonth(dateObj.date, calendarDate)
          ? classes.dayCell
          : classes.dayCellOutsideMonth
      }
    >
      <Avatar className={avatarClass}>{getDate(dateObj.date)}</Avatar>
      <div className={classes.remindersContainer}>
        {/* reminders go here */}
        {/* if reminder array isnt empty and grid size if large enough, display earliest reminder */}
        {reminders.length > 0 && size.width > 180 && size.height > 105 && (
          <div
            className={classes.reminderChip}
            style={{ backgroundColor: `${reminders[0].reminderColor}` }}
          >
            <Typography
              variant="body2"
              gutterBottom
              className={classes.reminderLabel}
            >
              {format(reminders[0].reminderDateTime, "hh:mm a")} -{" "}
              {reminders[0].reminderValue}
            </Typography>
          </div>
        )}
        {/* if grid is too small, display number of reminders in grid */}
        {((reminders.length > 0 && size.width < 180) ||
          (reminders.length > 0 && size.height < 105)) && (
          <div className={classes.extraRemindersNoteSmall}>
            {reminders.length === 1 && "1 Reminder"}
            {reminders.length > 1 && `${reminders.length} Reminders`}
          </div>
        )}
        {/* if grid is big enough and more than 1 item in reminder array, dispay extra reminders message */}
        {reminders.length > 1 && size.width > 180 && size.height > 105 && (
          <div className={classes.extraRemindersNote}>
            {reminders.length === 2 && ` + ${reminders.length - 1} Reminder`}
            {reminders.length > 2 && ` + ${reminders.length - 1} Reminders`}
          </div>
        )}
      </div>
    </div>
  );
};

export default withStyles(styles)(CalendarDay);
