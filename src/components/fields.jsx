import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, TextField, Grid } from "@material-ui/core";

const Fields = ({ onAddTask }) => {
  const [text, setText] = useState("");
  const [textArea, setTextArea] = useState("");
  let testt = "";
  test = "ggg";

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
        </Grid>
      </Grid>
    </>
  );
};
Fields.propTypes = {
  onAddTask: PropTypes.func,
};
Fields.defaultProps = {
  onAddTask: () => {},
};
export default Fields;
