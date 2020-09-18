import React from "react";

import Fields from "../components/fields";

export default {
  title: "Example/Fields",
  component: Fields,
  argTypes: {
    backgroundColor: { control: "color" },
    onAddTask: {
      action: "clicked"
    }
  },
};

const Template = (args) => <Fields {...args} />;

export const Secondary = Template.bind({});
Secondary.args = {
 
};
