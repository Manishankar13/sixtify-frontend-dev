import { SearchField } from "@repo/shared-components";
import { Meta, StoryObj } from "@storybook/react";
import { FieldValues, useForm } from "react-hook-form";

const meta: Meta<typeof SearchField> = {
  title: "shared-component/FormFields/SearchField",
  component: SearchField,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
    required: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
  render: (args) => {
    const { control } = useForm<FieldValues>({
      defaultValues: {
        search: "",
      },
    });
    return <SearchField {...args} name="search" control={control} />;
  },
  args: {
    placeholder: "Search...",
  },
};

export default meta;

type Story = StoryObj<typeof SearchField>;

export const DefaultSearchField: Story = {
  args: {
    label: "Default Search",
    required: false,
    disabled: false,
  },
};

export const DisabledSearchField: Story = {
  args: {
    label: "Disabled Search",
    disabled: true,
  },
};

export const LoadingSearchField: Story = {
  args: {
    label: "Loading Search",
    loading: true,
    disabled: false,
  },
};

export const RequiredSearchField: Story = {
  args: {
    label: "Required Search",
    required: true,
    disabled: false,
  },
};
