import React, { useState } from "react";
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
  const [nameText, setTextName] = useState("");
  const [DescriptionArea, setDescriptionArea] = useState("");
  const [importantRadio, setImportantRadio] = useState("notImportant");

  function onClickCalls() {
    if (nameText === "") alert("you need to name your task");
    else {
      const { addTaskAction } = props;

      if (importantRadio==="notImportant")
        addTaskAction({
          _id: uuid(),
          name: nameText,
          description: DescriptionArea,
          important: false,
        });
      else
        addTaskAction({
          _id: uuid(),
          name: nameText,
          description: DescriptionArea,
          important: true,
        });

      setTextName("");
      setDescriptionArea("");
      setImportantRadio("notImportant");
    }
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
  addTaskAction: PropTypes.func,
};
AddToDo.defaultProps = {
  addTaskAction: () => {},
};

const mapDispatchToProps = (dispatch) => ({
  addTaskAction: (obj) => dispatch(actionCreators.addTaskAction(obj)),
});

export default connect(null, mapDispatchToProps)(AddToDo);
