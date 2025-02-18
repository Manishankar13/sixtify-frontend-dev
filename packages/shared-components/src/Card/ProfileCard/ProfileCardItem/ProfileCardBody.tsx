import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Box, Stack } from "@mui/material";
import type { PropsWithChildren } from "react";
import { PadBox } from "../../../PadBox";
import { CardItem, CardItemValue } from "../../CardItem";

type ProfileCardBodyProps = PropsWithChildren<{
  joiningDate: string;
  department: string;
  subDepartment: string;
  email: string;
  phone: string;
  loading?: boolean;
}>;

export function ProfileCardBody({
  joiningDate,
  department,
  subDepartment,
  email,
  phone,
  loading,
}: ProfileCardBodyProps) {
  return (
    <Box bgcolor="#F3F5F7" sx={{ borderRadius: "10px" }}>
      <PadBox padding={{ padding: "12px" }}>
        <Stack gap="10px">
          <CardItem
            label="Date of Joining"
            value={<CardItemValue title={joiningDate} loading={loading} />}
          />
          <CardItem
            label="Department"
            value={<CardItemValue title={department} loading={loading} />}
          />
          <CardItem
            label="Sub Department"
            value={<CardItemValue title={subDepartment} loading={loading} />}
          />
          <CardItem
            label={<EmailOutlinedIcon />}
            value={<CardItemValue title={email} loading={loading} />}
          />
          <CardItem
            label={<CallOutlinedIcon />}
            value={<CardItemValue title={phone} loading={loading} />}
          />
        </Stack>
      </PadBox>
    </Box>
  );
}
