import React, { useState } from "react";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { connect } from "react-redux";
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
      const {
        updateTestCompletedAction,
        updateTestActiveAction,
        updateTasksToShowWithoutTasksAction,
        tasks,
        inAll,
        inCompleted,
        inActive,
        increment,
        updateIncrementAction,
        updateTasksFromDataAction,
      } = props;

      const data = [...tasks];
      if (radio.localeCompare("notImportant") === 0)
        data.push({
          id: increment,
          important: 0,
          name: text,
          description: textArea,
          done: 0,
        });
      else
        data.push({
          id: increment,
          important: 1,
          name: text,
          description: textArea,
          done: 0,
        });

      updateIncrementAction();
      updateTasksFromDataAction(data);

      localStorage.setItem("tasksInLocalStorage", JSON.stringify(data));
      localStorage.setItem("incrementInLocalStorage", increment);

      if (inAll === 1) updateTasksToShowWithoutTasksAction(data);
      else if (inActive === 1) {
        updateTestActiveAction(1);
      } //onActive();
      else if (inCompleted === 1) {
        updateTestCompletedAction(1);
      }

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
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  updateTestActiveAction: (payload) =>
    dispatch(actionCreators.updateTestActiveAction(payload)),
  updateTestCompletedAction: (payload) =>
    dispatch(actionCreators.updateTestCompletedAction(payload)),
  updateIncrementAction: () => dispatch(actionCreators.updateIncrementAction()),
  updateTasksFromDataAction: (payload) =>
    dispatch(actionCreators.updateTasksFromDataAction(payload)),
  updateTasksToShowWithoutTasksAction: (payload) =>
    dispatch(actionCreators.updateTasksToShowWithoutTasksAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToDo);
