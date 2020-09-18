import React from "react";

import Fields from "../components/fields";

export default {
  title: "Example/Fields",
  component: Fields,
  argTypes: {
    onAddTask: {
      action: () => {
        alert("hfurhgfu");
      },
    },
  },
};

const Template = (args) => (
  <Fields
    onAddTask={(val) => {
      alert("si el Hedi", val);
    }}
    {...args}
  />
);

export const testhh = Template.bind({});
testhh.args = {};
