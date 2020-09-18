import React from "react";
import PropTypes from "prop-types";
import { Button, TextField, Grid, FormControl } from "@material-ui/core";

const Fields = (props) => {
  const { onAddTask } = props;
  const myTextField = React.useRef();
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <FormControl>
          <TextField ref={myTextField} id="standard-basic" label="task name" />

          <TextField
            id="standard-multiline-flexible"
            label="task description"
            multiline
            rowsMax={4}
          />

          <Button
            color="secondary"
            onClick={() => onAddTask(myTextField.current.value)}
          >
            Add task
          </Button>
        </FormControl>
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
