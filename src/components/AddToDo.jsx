import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  RadioGroup,
  FormControlLabel,
  Button,
  TextField,
  Grid,
  Radio,
} from "@material-ui/core";

const AddToDo = ({ onAddTask }) => {
  const [text, setText] = useState("");
  const [textArea, setTextArea] = useState("");

  return (
    <>
      <Grid container style={{ justifyContent: "center" }}>
        <Grid alignItems="center" container xs={12} md={10} lg={8}>
          <Grid container item style={{ justifyContent: "center" }} xl={12}>
            <TextField
              onChange={(e) => {
                setText(e.target.value);
              }}
              value={text}
              inputProps={{ style: { textAlign: "center" } }}
              fullWidth
              id="standard-basic"
              label="task name"
            />
          </Grid>
          <Grid container item style={{ justifyContent: "center" }} xl={12}>
            <TextField
              onChange={(e) => {
                setTextArea(e.target.value);
              }}
              value={textArea}
              textAlign="center"
              inputProps={{ style: { textAlign: "center" } }}
              fullWidth
              id="standard-multiline-flexible"
              label="task description"
              multiline
              rowsMax={4}
            />
          </Grid>
          <Grid container item style={{ justifyContent: "center" }} xl={12}>
            <Button
              fullWidth
              color="secondary"
              onClick={() => onAddTask(text, textArea)}
            >
              Add task
            </Button>
          </Grid>
          <Grid container item style={{ justifyContent: "center" }} xl={12}>
            <RadioGroup
              defaultValue="notImportant"
              row
              aria-label="gender"
              name="myRadioGroup"
            >
              <FormControlLabel
                value="notImportant"
                control={<Radio />}
                label="Not important"
              />
              <FormControlLabel
                value="Important"
                control={<Radio />}
                label="Important"
              />
            </RadioGroup>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
AddToDo.propTypes = {
  onAddTask: PropTypes.func,
};
AddToDo.defaultProps = {
  onAddTask: () => {},
};
export default AddToDo;
