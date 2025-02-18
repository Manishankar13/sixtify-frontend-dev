import { Meta, StoryObj } from "@storybook/react";
import { FileUpload } from "@repo/shared-components";
import { useForm, FieldValues } from "react-hook-form";

const meta: Meta<typeof FileUpload> = {
  title: "shared-component/FormFields/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    multiple: { control: "boolean" },
    loading: { control: "boolean" },
    isDisabled: { control: "boolean" },
    error: { control: "boolean" },
    helperText: { control: "text" },
    size: { control: "number" },
    accept: { control: "text" },
  },
  render: (args) => {
    const { control, setError } = useForm<FieldValues>();
    return (
      <FileUpload
        {...args}
        control={control}
        name="fileUpload"
        setError={setError}
        uploadedFiles={[]}
      />
    );
  },
  args: {
    label: "Upload Your Files",
    multiple: false,
    size: 10,
    accept: ".png,.jpg,.jpeg,.pdf",
    uploadedFiles: [],
  },
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

export const DefaultFileUpload: Story = {
  args: {
    label: "Upload Files",
    isDisabled: false,
    error: false,
    helperText: "",
    multiple: false,
  },
};

export const MultipleFileUpload: Story = {
  args: {
    label: "Upload Multiple Files",
    isDisabled: false,
    multiple: true,
  },
};

export const DisabledFileUpload: Story = {
  args: {
    label: "File Upload (Disabled)",
    isDisabled: true,
    multiple: false,
  },
};

export const LoadingFileUpload: Story = {
  args: {
    label: "File Upload (Loading)",
    loading: true,
  },
};

export const FileUploadWithError: Story = {
  args: {
    label: "File Upload with Error",
    error: true,
    helperText: "File size exceeded or invalid file type",
  },
};
