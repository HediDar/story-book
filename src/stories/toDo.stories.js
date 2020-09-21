import React from "react";

import ToDo from "../components/toDo";

export default {
  title: "Example/ToDo",
  component: ToDo,
  argTypes: {},
};

const Template = (args) => <ToDo {...args} />;

export const Secondary = Template.bind({});
Secondary.args = {};
