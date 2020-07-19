import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { format } from "date-fns";
import { List, ListItem, Typography } from "@material-ui/core";
import {
  WithStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import { IReminderObj } from "../../types/types";

const styles = (theme: Theme) =>
  createStyles({
    remindersContainer: {
      minHeight: "250px",
      marginTop: "10px",
    },
    closeButton: {
      position: "absolute",
      right: "10px",
      top: "10px",
    },
    toolbarButtonHidden: {
      visibility: "hidden",
    },
    toolbarButtonVisible: {
      visibility: "visible",
    },
    reminderChip: {
      display: "inline-flex",
      boxSizing: "border-box",
      borderRadius: "16px",
    },
    reminderLabel: {
      padding: 5,
      margin: 0,
    },
  });

interface Props extends WithStyles<typeof styles> {
  agendaStatus: {
    isOpen: boolean;
    date: Date;
    dayReminders: IReminderObj[];
  };
  onClose: () => void;
}

const AgendaDay = (props: Props) => {
  const { classes, agendaStatus, onClose } = props;
  const dateTitle = agendaStatus.date
    ? format(agendaStatus.date, "LLLL do, yyyy")
    : "Closing";

  // map array of reminder objects to ListItems displaying time and value with background color
  const reminders = agendaStatus.dayReminders.map(
    (reminder: IReminderObj, i: string | number) => {
      return (
        <ListItem key={i}>
          <div
            className={classes.reminderChip}
            style={{ backgroundColor: `${reminder.reminderColor}` }}
          >
            <Typography
              variant="body2"
              gutterBottom
              className={classes.reminderLabel}
            >
              {format(reminder.reminderDateTime, "hh:mm a")} -{" "}
              {reminder.reminderValue}
            </Typography>
          </div>
        </ListItem>
      );
    }
  );

  return (
    <Dialog
      open={agendaStatus.isOpen}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">
        {dateTitle}
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider light />
      <DialogContent className={classes.remindersContainer}>
        <List>{reminders}</List>
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(AgendaDay);
