import { Button } from "./Button";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    buttonText: "Click me",
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    buttonText: "Click me",
    onClick: () => alert("Button clicked!"),
  },
};

export const Disabled: Story = {
  args: {
    buttonText: "Can't click me",
    disabled: true,
  },
};

export const SubmitButton: Story = {
  args: {
    buttonText: "Submit",
    type: "submit",
  },
};
