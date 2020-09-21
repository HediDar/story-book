import React from "react";

import Fields from "../components/AddToDo";

export default {
  title: "Example/Fields",
  component: Fields,
  argTypes: {
    onAddTask: {
      action: "clicked"
    }
  },
};

const Template = (args) => <Fields {...args} />;

export const Secondary = Template.bind({});
Secondary.args = {
  onAddTask: (text)=>{alert(text)}
};