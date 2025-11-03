import { fn } from "@storybook/test";

import { Button } from "./Button";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    buttonText: "ok",
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    buttonText: "ok",
    onClick: fn(),
  },
  parameters: {
    backgrounds: { default: "gray" },
  },
};

export const SubmitButton: Story = {
  args: {
    buttonText: "Submit",
    type: "submit",
    onClick: fn(),
  },
};
