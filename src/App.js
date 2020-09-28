import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import PropTypes from "prop-types";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";
import AddToDo from "./components/AddToDo";
import ToDosAndDones from "./components/ToDosAndDones";
import * as actionCreators from "./actions/tasksActions";

import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.colorActif = "secondary";
    this.colorAll = "primary";
    this.colorCompleted = "secondary";
  }

  allButtonClick = () => {
    const { changeDisplayModeAction } = this.props;

    this.colorActif = "secondary";
    this.colorAll = "primary";
    this.colorCompleted = "secondary";

    changeDisplayModeAction("all");
  };

  handleActiveButtonClick = () => {
    const { changeDisplayModeAction } = this.props;

    this.colorActif = "primary";
    this.colorAll = "secondary";
    this.colorCompleted = "secondary";

    changeDisplayModeAction("actif");
  };

  handleAllcompletedButtonClick = () => {
    const { changeDisplayModeAction } = this.props;

    this.colorActif = "secondary";
    this.colorAll = "secondary";
    this.colorCompleted = "primary";

    changeDisplayModeAction("done");
  };

  render() {
    const { length } = this.props;

    return (
      <>
        <AddToDo />
        <br />
        <br />

        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                {length}
                {" items displayed"}{" "}
              </TableCell>
              <TableCell align="right"> </TableCell>
              <TableCell align="right"> </TableCell>
              <TableCell align="right">
                <ButtonGroup aria-label="outlined secondary button group">
                  <Button
                    color={this.colorAll}
                    onClick={() => this.allButtonClick()}
                  >
                    Show all
                  </Button>
                  <Button
                    color={this.colorActif}
                    onClick={() => this.handleActiveButtonClick()}
                  >
                    Show active
                  </Button>
                  <Button
                    color={this.colorCompleted}
                    onClick={() => this.handleAllcompletedButtonClick()}
                  >
                    Show completed
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan="4" component="th" scope="row">
                <ToDosAndDones />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </>
    );
  }
}

App.propTypes = {
  length: PropTypes.number,
  changeDisplayModeAction: PropTypes.func,
};

App.defaultProps = {
  length: 0,
  changeDisplayModeAction: () => {},
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  changeDisplayModeAction: (payload) =>
    dispatch(actionCreators.changeDisplayModeAction(payload)),
  
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
