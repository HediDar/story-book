import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import uuid from "react-uuid";
import {
  RadioGroup,
  FormControlLabel,
  Button,
  TextField,
  Grid,
  Radio,
} from "@material-ui/core";
import * as actionCreators from "../actions/tasksActions";

const AddToDo = (props) => {
  const [text, setText] = useState("");
  const [textArea, setTextArea] = useState("");
  const [radio, setRadio] = useState("notImportant");

  const didMountRef = useRef(false);
  useEffect(() => {
    const { onActive, testActive, testCompleted, onCompleted } = props;

    if (didMountRef.current) {
      if (testActive === 1) onActive();
      else if (testCompleted === 1) onCompleted();
    } else didMountRef.current = true;
  });

  function onClickCalls() {
    if (text === "") alert("you need to name your task");
    else {
      const { addTaskAction } = props;

      if (radio.localeCompare("notImportant") === 0)
        addTaskAction(uuid(), text, textArea, 0);
      else addTaskAction(uuid(), text, textArea, 1);

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
  addTaskAction: PropTypes.func,
};
AddToDo.defaultProps = {
  addTaskAction: () => {},
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  addTaskAction: (id, name, description, important) =>
    dispatch(actionCreators.addTaskAction(id, name, description, important)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToDo);
