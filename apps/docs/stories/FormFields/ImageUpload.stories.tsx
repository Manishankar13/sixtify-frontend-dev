import { Meta, StoryObj } from "@storybook/react";
import { ImageUpload } from "@repo/shared-components";

const meta: Meta<typeof ImageUpload> = {
  title: "shared-component/FormFields/ImageUpload",
  component: ImageUpload,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    isUploading: { control: "boolean" },
    variant: {
      control: { type: "select" },
      options: ["square", "circle"],
    },
    isCapture: { control: "boolean" },
    loading: { control: "boolean" },
    subTitle: { control: "text" },
  },
  args: {
    label: "Profile Picture",
    subTitle: "PNG, JPEG under 5 MB",
    isUploading: false,
    variant: "square",
    isCapture: false,
  },
};

export default meta;

type Story = StoryObj<typeof ImageUpload>;

export const DefaultImageUpload: Story = {
  args: {
    label: "Upload Profile Picture",
    isUploading: false,
    variant: "square",
  },
};

export const LoadingImageUpload: Story = {
  args: {
    label: "Uploading Profile Picture",
    isUploading: true,
    loading: true,
  },
};

export const CircularImageUpload: Story = {
  args: {
    label: "Upload Circular Profile Picture",
    variant: "circle",
  },
};

export const ImageUploadWithCapture: Story = {
  args: {
    label: "Upload Profile Picture with Capture",
    isCapture: true,
  },
};

export const ImageUploadWithDefaultImage: Story = {
  args: {
    label: "Edit Profile Picture",
    defaultValue:
      "https://fps.cdnpk.net/images/home/subhome-ai.webp?w=649&h=649",
    isCapture: true,
  },
};
