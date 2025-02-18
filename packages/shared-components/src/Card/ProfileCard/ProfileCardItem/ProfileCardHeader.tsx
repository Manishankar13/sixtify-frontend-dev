import type { SxProps, Theme } from "@mui/material";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import type { PropsWithChildren, ReactNode } from "react";
import { DeleteAction } from "../../../Actions";
import { Chip } from "../../../Chips";
import { PadBox } from "../../../PadBox";
import { CardItemValue } from "../../CardItem";

type ProfileCardHeaderProps = PropsWithChildren<{
  avatar: ReactNode;
  employeeName: string;
  designation: string;
  employeeCode: string;
  loading: boolean;
  isDraft?: boolean;
  sx?: SxProps<Theme>;
  onDeleteClick?: (e: React.MouseEvent) => void;
}>;

export function ProfileCardHeader({
  avatar,
  employeeName,
  designation,
  employeeCode,
  loading,
  isDraft = false,
  onDeleteClick,
}: ProfileCardHeaderProps) {
  return (
    <Box>
      <PadBox padding={{ padding: "10px 5px 0px 10px" }}>
        <Stack
          gap="10px"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {loading ? (
            <Skeleton
              variant="rounded"
              height={20}
              animation="wave"
              width="100px"
            />
          ) : // eslint-disable-next-line sonarjs/no-nested-conditional
          isDraft ? (
            <Chip label="Draft" size="small" color="error" variant="outlined" />
          ) : (
            <CardItemValue title={employeeCode} loading={loading} />
          )}

          {isDraft &&
            (loading ? (
              <Skeleton
                variant="rounded"
                height={20}
                animation="wave"
                width="50px"
              />
            ) : (
              <DeleteAction onClick={onDeleteClick} />
            ))}
        </Stack>
      </PadBox>
      <Stack alignItems="center" gap="8px">
        {avatar}
        {loading ? (
          <Skeleton
            variant="rounded"
            height={30}
            animation="wave"
            width="300px"
          />
        ) : (
          <Typography
            variant="h6"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
            }}
            width="330px"
            fontWeight="600"
            textAlign="center"
          >
            {employeeName ?? "-"}
          </Typography>
        )}

        <CardItemValue title={designation} loading={loading} />
      </Stack>
    </Box>
  );
}
