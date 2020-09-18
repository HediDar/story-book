import React from "react";
import PropTypes from "prop-types";

const ToDo = (props) => {
  const { task } = props;
  const { onDone } = props;
  const { onDeleteTask } = props;
  return (
    <>
      <li>
        <label htmlFor="task-name">
          {task.name}
          {"    "}
        </label>

        <button type="button" onClick={() => onDone(task.id)}>
          add to done
        </button>
        <label htmlFor="just a space">{"   "}</label>
        <button type="button" onClick={() => onDeleteTask(task.id)}>
          Delete
        </button>
      </li>
    </>
  );
};

ToDo.propTypes = {
  task: PropTypes.arrayOf(PropTypes.object),
  onDone: PropTypes.func,
  onDeleteTask: PropTypes.func,
};

ToDo.defaultProps = {
  task: [{}],
  onDone: () => {},
  onDeleteTask: () => {},
};

export default ToDo;
