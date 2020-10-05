import React, { useState } from "react";
import PropTypes from "prop-types";
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
  const [nameText, setTextName] = useState("");
  const [DescriptionArea, setDescriptionArea] = useState("");
  const [importantRadio, setImportantRadio] = useState("notImportant");
  const { addTaskByApiAction } = props;

  function onClickCalls() {
    if (nameText === "") alert("you need to name your task");
    else {
      let myTask = {};
      if (importantRadio === "notImportant") {
        myTask = {
          name: nameText,
          description: DescriptionArea,
          important: false,
          done: false,
        };
      } else {
        myTask = {
          name: nameText,
          description: DescriptionArea,
          important: true,
          done: false,
        };
      }

      addTaskByApiAction(myTask);
    }
    setTextName("");
    setDescriptionArea("");
    setImportantRadio("notImportant");
  }

  return (
    <>
      <Grid container style={{ justifyContent: "center" }}>
        <Grid alignItems="center" container item xs={12} md={10} lg={8}>
          <Grid container item style={{ justifyContent: "center" }} xl={12}>
            <TextField
              onChange={(e) => {
                setTextName(e.target.value);
              }}
              value={nameText}
              inputProps={{ style: { textAlign: "center" } }}
              fullWidth
              id="standard-basic"
              label="task name"
            />
          </Grid>
          <Grid container item style={{ justifyContent: "center" }} xl={12}>
            <TextField
              onChange={(e) => {
                setDescriptionArea(e.target.value);
              }}
              value={DescriptionArea}
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
                setImportantRadio(e.target.value);
              }}
              row
              aria-label="gender"
              name="myRadioGroup"
              value={importantRadio}
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
  addTaskByApiAction: PropTypes.func,
};
AddToDo.defaultProps = {
  addTaskByApiAction: () => {},
};

const mapDispatchToProps = (dispatch) => ({
  addTaskByApiAction: (payload) =>
    dispatch(actionCreators.addTaskByApiAction(payload)),
});

export default connect(null, mapDispatchToProps)(AddToDo);
