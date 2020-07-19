import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { withStyles, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { CirclePicker } from "react-color";
import { format } from "date-fns";
import { addReminder, closeAddReminder } from "../../redux/actions";

const styles = () =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
    },
    dateField: {
      width: "220px",
    },
    error: {
      color: "#FF0000",
      marginBottom: "15px",
    },
    submitButton: {
      marginTop: "15px",
    },
  });

const ReminderForm = (props: { classes: any }) => {
  const [dateTime, setDateTime] = useState(
    format(new Date(), "yyyy-MM-dd'T'HH:mm")
  );
  const [formValues, setFormValues] = useState({
    reminderDateTime: new Date(),
    reminderValue: "",
    reminderColor: "#607d8b",
  });
  const dispatch = useDispatch();
  const { classes } = props;
  const { reminderValue, reminderColor } = formValues;

  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(addReminder(formValues));
    dispatch(closeAddReminder());
  };

  return (
    <form className={classes.container} noValidate onSubmit={handleClick}>
      <TextField
        id="datetime-local"
        label="Date & Time"
        type="datetime-local"
        value={dateTime}
        className={classes.dateField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => {
          setDateTime(e.target.value);
          const dt = new Date(e.target.value);
          const dateFormatted = new Date(
            dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000
          );
          setFormValues({ ...formValues, reminderDateTime: dateFormatted });
        }}
      />
      <TextField
        id="outlined-basic"
        name="reminderText"
        autoFocus
        required
        label="Required (30 characters max)"
        inputProps={{ maxLength: 30 }}
        className={classes.textField}
        margin="normal"
        variant="outlined"
        value={reminderValue}
        onChange={(e) =>
          setFormValues({ ...formValues, reminderValue: e.target.value })
        }
      />
      <CirclePicker
        colors={["#f44336", "#2196f3", "#4caf50", "#ffc107", "#607d8b"]}
        color={reminderColor}
        onChangeComplete={(color) =>
          setFormValues({ ...formValues, reminderColor: color.hex })
        }
      />
      <Button
        className={classes.submitButton}
        variant="contained"
        color="primary"
        type="submit"
        disabled={!(formValues.reminderValue.length > 0)}
      >
        Add Reminder
      </Button>
    </form>
  );
};

export default withStyles(styles)(ReminderForm);
