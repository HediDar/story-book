import React from "react";

import ToDos from "../components/toDos";

export default {
  title: "Example/ToDos",
  component: ToDos,
  argTypes: {},
};

const Template = (args) => <ToDos {...args} />;

export const Secondary = Template.bind({});
Secondary.args = {};
