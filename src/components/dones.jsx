import React from "react";
import PropTypes from "prop-types";
import Done from "./done";

const Dones = (props) => {
  const { tasks } = props;
  const { onDeleteDoneTask } = props;

  const myTasks = tasks;
  const tasksFiltred = [];

  myTasks.forEach((el) => {
    if (el.done === 1) {
      tasksFiltred.push(el);
    }
  });

  return (
    <>
      {tasksFiltred.map((task) => (
        <Done key={task.id} task={task} onDeleteDone={onDeleteDoneTask} />
      ))}
    </>
  );
};

Dones.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  onDeleteDoneTask: PropTypes.func,
};

Dones.defaultProps = {
  tasks: [{}],
  onDeleteDoneTask: () => {},
};

export default Dones;
