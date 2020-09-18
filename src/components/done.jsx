import React from "react";
import PropTypes from "prop-types";

const Done = (props) => {
  const { task } = props;
  const { onDeleteDone } = props;

  return (
    <>
      <li>
        <label htmlFor="taske name">
          {task.name}
          {"    "}
        </label>

        <button type="button" onClick={() => onDeleteDone(task.id)}>
          Delete
        </button>
      </li>
    </>
  );
};

Done.propTypes = {
  task: PropTypes.arrayOf(PropTypes.object),
  onDeleteDone: PropTypes.func,
};

Done.defaultProps = {
  task: [{}],
  onDeleteDone: () => {},
};

export default Done;
