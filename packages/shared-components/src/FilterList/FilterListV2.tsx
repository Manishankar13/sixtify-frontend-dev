import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers/icons";
import { isEmpty } from "lodash";
import { DateTime } from "luxon";
import React, { useEffect, useMemo, useRef, useState } from "react";
import type { FieldValues } from "react-hook-form";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "../Button";
import { FilterPill } from "../Chips/FilterPill";
import { dateFormats } from "../FormFields";
import { Switch } from "../FormFields/Switch";
import { PadBox } from "../PadBox";
import { SvgFilterList } from "../Svgs/SvgFilterList";
import { Tooltip } from "../Tooltip";
import {
  FilterPopupWrapper,
  GetFilterPopupComponent,
} from "./FilterPopupWrapper";
import type { FilterListType } from "./FilterTypeWrapper";
import { getFormValue } from "./getFormData";

export type FilterListV2Props = {
  filterListItems: FilterListType[];
  isDisabled?: boolean;
  filterListData?: FieldValues;
  onApply: (data: FieldValues, isPopup?: boolean, key?: string) => void;
  onChange: (data: FieldValues, isPopup: boolean) => void;
  onClear: () => void;
  resetFormBasedOnFields?: string;
  dateKeys?: string[];
};
export const FilterListV2 = ({
  filterListItems,
  isDisabled = false,
  filterListData,
  onApply,
  onClear,
  onChange,
  dateKeys,
}: FilterListV2Props) => {
  const theme = useTheme();

  const { iron, slate } = theme.palette.app.color;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const filterPopupAnchorElm = useRef<HTMLDivElement | null>(null);

  const [openFilterPopup, setOpenFilterPopup] = useState(false);

  const [currentFilter, setCurrentFilter] = useState<null | FilterListType>(
    null
  );

  const handleDateRange = (filter: FilterListType) => {
    setCurrentFilter(filter);
    setOpenFilterPopup(true);
  };

  const defaultValues: FieldValues = useMemo(() => {
    return filterListItems.reduce<FieldValues>((acc, item) => {
      acc[item.key] = item.value ?? null;

      return acc;
    }, {});
  }, [filterListData]);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { dirtyFields },
    watch,
  } = useForm({
    values: defaultValues,
  });

  const company_id = watch("company_id");

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseFilterPopup = () => {
    if (currentFilter?.key) {
      setValue(`${currentFilter?.key}`, filterListData?.[currentFilter.key]);
    }
    setOpenFilterPopup(false);
  };

  const handlerReset = () => {
    reset();
    onClear();
    handleClose();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onSubmit = (data: FieldValues) => {
    setOpenFilterPopup(false);
    setCurrentFilter(null);

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(
        ([, value]) => value && !(Array.isArray(value) && value.length === 0)
      )
    );

    onApply(filteredData, openFilterPopup, currentFilter?.key);
  };

  const handleDelete = (key: string) => {
    setValue(`${key}`, null);

    const newData = { ...filterListData };

    delete newData[key];

    onApply(newData, true, key);
  };

  const formData = useWatch({ control });

  const currentFilterValue = currentFilter?.key
    ? watch(currentFilter.key)
    : null;

  useEffect(() => {
    onChange(formData, openFilterPopup);
  }, [formData, onChange]);

  useMemo(() => {
    if (company_id !== filterListData?.company_id && !openFilterPopup) {
      filterListItems.forEach((item) => {
        setValue(`${item.key}`, null);
      });
      setValue("company_id", company_id);
    }
  }, [company_id]);

  const getFilterItem = (key: string) => {
    return filterListItems.find((item) => item.key === key);
  };

  const open = Boolean(anchorEl);

  const shouldFormSubmit = useMemo(() => {
    return (
      isEmpty(dirtyFields) ||
      Object.keys(formData).every((key) => !formData[key])
    );
  }, [formData, dirtyFields]);

  const renderChips = (data: FieldValues) => {
    return Object.entries(data).map(([key, value]) => {
      if (!value) {
        return;
      }

      const item = getFilterItem(key);

      const keyValue =
        item &&
        getFormValue(
          dateKeys?.includes(item?.key)
            ? DateTime.fromISO(value).toFormat(dateFormats.dateWithEuropean)
            : value,
          item
        );

      if (!keyValue) {
        return;
      }

      return (
        <FilterPill
          ref={filterPopupAnchorElm}
          key={key}
          label={
            <Tooltip
              // eslint-disable-next-line sonarjs/no-base-to-string
              toolTipLabel={`${keyValue}`}
              // eslint-disable-next-line sonarjs/no-base-to-string
            >{`${item?.label}: ${keyValue}`}</Tooltip>
          }
          onDelete={() => handleDelete(key)}
          onClick={(e: { currentTarget: HTMLDivElement | null }) => {
            setOpenFilterPopup(true);
            filterPopupAnchorElm.current = e.currentTarget;

            const item = getFilterItem(key);

            if (item) {
              setCurrentFilter(item);
            }
          }}
        />
      );
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Stack
        direction="row"
        spacing={1}
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Stack
          direction="row"
          alignItems="flex-start"
          sx={{
            maxWidth: {
              xs: "40vw",
              md: "45vw",
              lg: "57vw",
            },
          }}
        >
          {filterListData &&
            Object.values(filterListData).some((value) => value) && (
              <>
                <Typography
                  variant="body1"
                  sx={{
                    minWidth: "60px",
                    marginTop: "8px",
                  }}
                >
                  Filters:
                </Typography>
                <Stack
                  direction="row"
                  gap="5px"
                  marginTop="3px"
                  alignItems="center"
                  sx={{ flexWrap: "wrap", maxWidth: "100%" }}
                >
                  {renderChips(filterListData)}
                </Stack>
              </>
            )}
        </Stack>
        <Stack direction="row">
          {filterListData &&
            Object.values(filterListData).some((value) => value) && (
              <Button onClick={() => handlerReset()} variant="text">
                Clear Filter
              </Button>
            )}
          {!isDisabled && (
            <IconButton onClick={handleClick} sx={{ height: "40px" }}>
              <SvgFilterList />
            </IconButton>
          )}
        </Stack>
      </Stack>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (!shouldFormSubmit) {
            handleSubmit((data) => {
              onSubmit(data);
              handleClose();
            })();
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();

            if (!shouldFormSubmit) {
              handleSubmit((data) => {
                onSubmit(data);
                handleClose();
              })();
            }
          }
        }}
      >
        <Drawer
          open={open}
          onClose={(_event, reason) => {
            if (reason === "backdropClick") {
              return;
            }
            handleClose();
          }}
          anchor="right"
          sx={{
            zIndex: theme.zIndex.drawer + 2,
            "& .MuiPaper-root": {
              width: "350px",
            },
          }}
        >
          <Stack
            alignItems="flex-end"
            sx={{
              background: iron[600],
            }}
          >
            <PadBox padding={{ padding: "10px 30px" }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
                alignItems="center"
              >
                <Typography variant="h6">Filter</Typography>
                <IconButton
                  onClick={() => {
                    reset();
                    handleClose();
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </Stack>
            </PadBox>
            <Divider sx={{ width: "100%" }} />
          </Stack>
          <Stack flexGrow={1} sx={{ overflowX: "hidden" }}>
            {filterListItems.map((filter) =>
              filter.type === "switch" ? (
                <Stack
                  key={filter.key}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  width="80%"
                  sx={{ padding: "10px 5px 10px 20px ", margin: "auto" }}
                >
                  <Typography variant="body2">{filter.label}</Typography>
                  <Switch control={control} name={filter.key} />
                </Stack>
              ) : (
                <Accordion
                  defaultExpanded={!!filterListData?.[filter.key]}
                  disabled={filter.isDisabled}
                  key={filter.key}
                  sx={{
                    "&.MuiAccordion-root.Mui-expanded": {
                      margin: "0 !important",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                      flexDirection: "row-reverse",
                      "& MuiAccordionSummary-root.Mui-expanded": {
                        marginRight: "10px",
                        transform: "rotate(-90deg)",
                      },
                      "&.Mui-expanded": {
                        minHeight: "40px",
                        paddingY: "5px",
                      },
                      "& .MuiAccordionSummary-content.Mui-expanded": {
                        margin: "0px",
                      },
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      width="90%"
                    >
                      <Typography variant="body2">{filter.label}</Typography>
                      <Typography variant="body2">{filter.menuInfo}</Typography>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      background: slate[600],
                      borderRadius: "5px",
                      padding: "0px",
                    }}
                  >
                    <PadBox
                      padding={{
                        paddingLeft: "15px",
                        paddingY: "5px",
                        paddingRight: "15px",
                      }}
                    >
                      {filter.type === "dateRange" ? (
                        <Stack
                          direction="row"
                          alignItems="center"
                          gap="10px"
                          onClick={(e) => {
                            handleDateRange(filter);
                            filterPopupAnchorElm.current = e.currentTarget;
                          }}
                        >
                          <Box
                            sx={{
                              border: "1px solid black",
                              borderRadius: "5px",
                              width: "150px",
                              p: 1,
                            }}
                          >
                            <Typography variant="body2">
                              {(Array.isArray(filterListData?.["dateRange"]) &&
                                filterListData?.["dateRange"][0]) ||
                                "Start Date"}
                            </Typography>
                          </Box>
                          <Typography>~</Typography>
                          <Box
                            sx={{
                              border: "1px solid black",
                              borderRadius: "5px",
                              width: "150px",
                              p: 1,
                            }}
                          >
                            <Typography variant="body2">
                              {(Array.isArray(filterListData?.["dateRange"]) &&
                                filterListData?.["dateRange"][1]) ||
                                "End Date"}
                            </Typography>
                          </Box>
                        </Stack>
                      ) : (
                        <Box>
                          {
                            GetFilterPopupComponent(filter, control)[
                              filter.type
                            ]
                          }
                        </Box>
                      )}
                    </PadBox>
                  </AccordionDetails>
                </Accordion>
              )
            )}
          </Stack>

          <Divider
            sx={{ width: "100%", position: "absolute", bottom: "70px" }}
          />
          <Stack height="70px">
            <PadBox padding={{ padding: "10px" }}>
              <Stack
                direction="row"
                gap="10px"
                sx={{ position: "absolute", bottom: "15px" }}
              >
                <Button
                  type="submit"
                  disabled={shouldFormSubmit}
                  variant="contained"
                  onClick={() => {
                    handleSubmit(onSubmit)();
                    handleClose();
                  }}
                >
                  Apply
                </Button>
                <Button
                  type="button"
                  onClick={() => handlerReset()}
                  disabled={Object.keys(formData).every(
                    (key) => !formData[key]
                  )}
                  variant="outlined"
                >
                  Reset
                </Button>
              </Stack>
            </PadBox>
          </Stack>
        </Drawer>
      </form>
      {currentFilter && currentFilter.type !== "switch" && (
        <FilterPopupWrapper
          open={openFilterPopup}
          onClose={handleCloseFilterPopup}
          onApply={() => {
            handleSubmit(onSubmit)();
          }}
          control={control}
          anchorEl={filterPopupAnchorElm.current}
          filterItem={currentFilter}
          currentFilterValue={currentFilterValue}
        />
      )}
    </Box>
  );
};
