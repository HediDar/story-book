import React from "react";
import PropTypes from "prop-types";

const Fields = (props) => {
  const { onAddTask } = props;
  const myTextField = React.useRef();
  return (
    <>
      <table>
        <tr>
          <td>
            <input ref={myTextField} type="text" placeholder="task name" />
          </td>

          <td>
            <button
              type="button"
              onClick={() => onAddTask(myTextField.current.value)}
            >
              add a task
            </button>
          </td>
        </tr>
      </table>
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
