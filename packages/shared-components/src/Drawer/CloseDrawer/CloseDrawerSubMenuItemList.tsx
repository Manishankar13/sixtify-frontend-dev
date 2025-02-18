import { Box, List } from "@mui/material";
import {
  type HTMLAttributeAnchorTarget,
  useState,
  type MouseEvent,
} from "react";
import type { MenuItem } from "../Drawer";
import { CloseDrawerMenuItem } from "./CloseDrawerMenuItem";
import { Popper } from "./Popper";

type CloseDrawerSubMenuItemListProps = {
  //TODO: jaydip, fix unknown type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentPathMenuOpen: any;
  currentMenuItem?: MenuItem;
  onCloseMenuPopover: () => void;
};

export const CloseDrawerSubMenuItemList = ({
  currentPathMenuOpen,
  currentMenuItem,
  onCloseMenuPopover,
}: CloseDrawerSubMenuItemListProps) => {
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);

  const [anchorEls, setAnchorEls] = useState<(HTMLDivElement | null)[]>([]);

  const handlePopoverOpen = (
    event: MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const newAnchorEls = [...anchorEls];

    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);

    setOpenPopoverIndex(index);
  };

  const handleClose = () => {
    setAnchorEls([]);
    setOpenPopoverIndex(null);
  };

  if (!currentMenuItem) {
    return <>Loading...</>;
  }

  const { menuItems = [], key: rootKey } = currentMenuItem;

  return (
    <List>
      {menuItems.map(
        ({ title, key: key2, onClick, icon, menuItems = [] }, index) => {
          const handleClick = (target: HTMLAttributeAnchorTarget = "_self") => {
            if (onClick) {
              onClick(`/${rootKey}/${key2}`, target);

              if (target != "_blank") {
                onCloseMenuPopover();
              }
            }
          };

          const onMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
            if (menuItems.length > 0) {
              handlePopoverOpen(event, index);
            } else {
              handleClose();
            }
          };

          const isMenuSelected = !!currentPathMenuOpen?.[rootKey]?.[key2];

          return (
            <Box key={key2}>
              <div onMouseLeave={handleClose}>
                <CloseDrawerMenuItem
                  onClick={handleClick}
                  title={title}
                  icon={icon}
                  isShowEndAdornment={!!menuItems.length}
                  selected={isMenuSelected}
                  onMouseEnter={onMouseEnter}
                />
                {menuItems.length > 0 && openPopoverIndex === index && (
                  <Popper
                    open={true}
                    anchorEl={anchorEls[index]}
                    currentMenuIndex={0}
                  >
                    <List>
                      {menuItems.map(({ key: key3, title, onClick }) => {
                        const isMenuSelected =
                          !!currentPathMenuOpen[rootKey]?.[key2]?.[key3];

                        return (
                          <CloseDrawerMenuItem
                            key={key3}
                            onClick={(target = "_self") => {
                              if (onClick) {
                                onClick(`/${rootKey}/${key2}/${key3}`, target);

                                if (target != "_blank") {
                                  handleClose();
                                  onCloseMenuPopover();
                                }
                              }
                            }}
                            title={title}
                            selected={isMenuSelected}
                          />
                        );
                      })}
                    </List>
                  </Popper>
                )}
              </div>
            </Box>
          );
        }
      )}
    </List>
  );
};
