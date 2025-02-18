import { useEffect, useState, type PropsWithChildren } from "react";
import type { PopoverProps } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Divider,
  IconButton,
  Popover,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Button } from "../Button";
import { PadBox } from "../PadBox";
import { isFunction, sortBy } from "lodash";
import type { FilterListType } from "./FilterTypeWrapper";

type FilterPopupProps = PropsWithChildren<PopoverProps> & {
  onApply?: () => void;
  showFooter?: boolean;
  showDivider?: boolean;
  title?: string;
  background?: boolean;
  filterItem?: FilterListType;
  currentFilterValue?: string | string[] | null;
};

export const FilterPopup = ({
  open,
  anchorEl,
  onClose,
  children,
  onApply,
  showDivider = false,
  showFooter = true,
  title,
  filterItem,
  background = false,
  currentFilterValue,
}: FilterPopupProps) => {
  const theme = useTheme();

  const { slate } = theme.palette.app.color;

  const [initialValue, setInitialValue] = useState<string | string[] | null>(
    null
  );

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (open) {
      if (!initialValue && !!currentFilterValue) {
        const changedValue = filterItem?.multiSelect
          ? sortBy(currentFilterValue)
          : currentFilterValue;

        setInitialValue(changedValue);
      }
    } else {
      setInitialValue(null);
    }

    if (!!currentFilterValue && !!initialValue) {
      const isChanged = filterItem?.multiSelect
        ? JSON.stringify(sortBy(currentFilterValue)) !==
          JSON.stringify(initialValue)
        : currentFilterValue !== initialValue;

      setIsDisabled(!isChanged);
    }
  }, [open, currentFilterValue, initialValue, filterItem?.multiSelect]);

  const handleApply = () => {
    setInitialValue(null);

    if (isFunction(onApply)) {
      onApply();
    }
  };

  const handleClose = () => {
    setInitialValue(null);

    if (isFunction(onClose)) {
      onClose({}, "backdropClick");
    }
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      onClose={(_event, reason) => {
        if (reason === "backdropClick") {
          return;
        }
        handleClose();
      }}
      sx={{ "& .MuiPaper-root": { minWidth: "300px" } }}
    >
      {showDivider && (
        <Stack alignItems="flex-end">
          <PadBox padding={{ padding: "8px" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              width="100%"
              alignItems="center"
            >
              <Typography variant="h6">{title}</Typography>
              <IconButton onClick={handleClose}>
                <ClearIcon />
              </IconButton>
            </Stack>
          </PadBox>
          <Divider sx={{ width: "100%" }} />
        </Stack>
      )}

      <Box
        sx={{
          background: background ? slate[600] : "transparent",
          borderRadius: "5px",
          maxWidth: "300px",
        }}
      >
        {children}
      </Box>

      {showFooter && (
        <PadBox padding={{ padding: "10px" }}>
          <Stack direction="row" justifyContent="flex-end">
            <Button
              onClick={handleApply}
              disabled={isDisabled}
              variant="text"
              sx={{ maxWidth: "40px" }}
            >
              Apply
            </Button>
          </Stack>
        </PadBox>
      )}
    </Popover>
  );
};
