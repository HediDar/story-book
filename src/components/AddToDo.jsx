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
  const [radio, setRadio] = useState("notImportant");

  function onClickCalls() {
    if (text === "") alert("you need to name your task");
    else {
      onAddTask(text, textArea, radio);
      setText("");
      setTextArea("");
      setRadio("notImportant");
    }
  }

  return (
    <>
      <Grid container style={{ justifyContent: "center" }}>
        <Grid alignItems="center" container item xs={12} md={10} lg={8}>
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
              inputProps={{ style: { textAlign: "center" } }}
              fullWidth
              id="standard-multiline-flexible"
              label="task description"
              multiline
              rowsMax={4}
            />
          </Grid>

          <Grid container item style={{ justifyContent: "center" }} xl={12}>
            <RadioGroup
              onChange={(e) => {
                setRadio(e.target.value);
              }}
              row
              aria-label="gender"
              name="myRadioGroup"
              value={radio}
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
          <Grid container item style={{ justifyContent: "center" }} xl={12}>
            <Button fullWidth color="secondary" onClick={() => onClickCalls()}>
              Add task
            </Button>
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
