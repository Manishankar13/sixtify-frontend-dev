import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { Tabs as MuiTabs, Stack } from "@mui/material";
import type { TabOwnProps } from "@mui/material/Tab";
import Tab from "@mui/material/Tab";
import type { ReactElement } from "react";
import { v4 as uuidv4 } from "uuid";
import { Tooltip } from "../Tooltip";
import { Skeleton } from "./Skeleton";

export type TabsItems = {
  value: string;
  label: string;
  icon?: ReactElement;
  toolTipLabel?: string;
  iconPosition?: TabOwnProps["iconPosition"];
  onClick: () => void;
};

type TabsProps = {
  tabs: TabsItems[];
  value: string;
  loading?: boolean;
};

export const Tabs = ({ tabs, value, loading }: TabsProps) => {
  if (loading) {
    return (
      <Stack gap="10px" direction="row">
        {tabs.map(() => {
          return <Skeleton key={uuidv4()} />;
        })}
      </Stack>
    );
  }

  return (
    <MuiTabs value={value}>
      {tabs.map(
        ({
          iconPosition = "end",
          toolTipLabel = "",
          icon = <HelpOutlineOutlinedIcon color="secondary" />,
          ...rest
        }) => (
          <Tab
            key={uuidv4()}
            icon={
              toolTipLabel ? (
                <Tooltip toolTipLabel={toolTipLabel} placement="bottom">
                  {icon}
                </Tooltip>
              ) : (
                icon
              )
            }
            disabled={loading}
            iconPosition={iconPosition}
            {...rest}
          />
        )
      )}
    </MuiTabs>
  );
};
