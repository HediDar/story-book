import React from "react";
import PropTypes from "prop-types";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const SingleTask = (props) => {
  const { task } = props;
  const { onDone } = props;
  const { onDeleteTask } = props;
  const classes = useStyles();


  if (task.done === 0 && task.important === 1)
    return (
      <>
        <Accordion defaultExpanded style={{ backgroundColor: "yellow" }}>
          <AccordionSummary aria-controls="panel1c-content" id="panel1c-header">
            <div>
              <Typography>{task.name}</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <Typography className={classes.secondaryHeading}>
                {task.description}
              </Typography>
            </div>
          </AccordionDetails>
          <Divider />
          <AccordionActions>
            <Button color="secondary" onClick={() => onDone(task.id)}>
              {" "}
              Add to done
            </Button>
            <Button color="secondary" onClick={() => onDeleteTask(task.id)}>
              Delete
            </Button>
          </AccordionActions>
        </Accordion>
      </>
    );

  if (task.done === 0 && task.important === 0)
    return (
      <>
        <Accordion defaultExpanded style={{ backgroundColor: "white" }}>
          <AccordionSummary aria-controls="panel1c-content" id="panel1c-header">
            <div>
              <Typography>{task.name}</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <Typography className={classes.secondaryHeading}>
                {task.description}
              </Typography>
            </div>
          </AccordionDetails>
          <Divider />
          <AccordionActions>
            <Button color="secondary" onClick={() => onDone(task.id)}>
              {" "}
              Add to done
            </Button>
            <Button color="secondary" onClick={() => onDeleteTask(task.id)}>
              Delete
            </Button>
          </AccordionActions>
        </Accordion>
      </>
    );

  return (
    <>
      <Accordion defaultExpanded style={{ backgroundColor: "lightgrey" }}>
        <AccordionSummary aria-controls="panel1c-content" id="panel1c-header">
          <div>
            <Typography>{task.name}</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <Typography className={classes.secondaryHeading}>
              {task.description}
            </Typography>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button color="secondary" onClick={() => onDeleteTask(task.id)}>
            Delete
          </Button>
        </AccordionActions>
      </Accordion>
    </>
  );
};

SingleTask.propTypes = {
  task: PropTypes.shape(),
  onDone: PropTypes.func,
  onDeleteTask: PropTypes.func,
};

SingleTask.defaultProps = {
  task: {},
  onDone: () => {},
  onDeleteTask: () => {},
};

export default SingleTask;
