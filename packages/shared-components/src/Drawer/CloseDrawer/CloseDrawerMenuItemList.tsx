import { isEmpty as _isEmpty } from "lodash";
import {
  type MouseEvent,
  type HTMLAttributeAnchorTarget,
  useMemo,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { urlToNestedObject } from "../../utils/urlToNestedObject";
import type { MenuItem } from "../Drawer";
import { CloseDrawerMenuItem } from "./CloseDrawerMenuItem";
import { CloseDrawerSubMenuItemList } from "./CloseDrawerSubMenuItemList";
import { Popper } from "./Popper";

type CloseDrawerMenuItemListProps = {
  menuItems: MenuItem[];
  currentPathname: string;
};

export const CloseDrawerMenuItemList = ({
  menuItems,
  currentPathname,
}: CloseDrawerMenuItemListProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const [currentMenuItem, setCurrentMenuItem] = useState<MenuItem>();

  const [currentMenuIndex, setCurrentMenuIndex] = useState<number>(0);

  const [currentPathMenuOpen, setCurrentPathMenuOpen] = useState<
    Record<string, unknown>
  >({});

  useMemo(() => {
    const obj = urlToNestedObject(currentPathname);

    if (_isEmpty(obj)) {
      return setCurrentPathMenuOpen({ home: true });
    }

    setCurrentPathMenuOpen(obj);
  }, [currentPathname]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {menuItems.map((menuItem, i) => {
        const { onClick, key: key1, icon, menuItems = [] } = menuItem;

        const handleClick = (target?: HTMLAttributeAnchorTarget) => {
          if (onClick) {
            if (key1 === "home") {
              onClick("/", target);

              return;
            }

            onClick(`/${key1}`, target);
          }
        };

        const onMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
          if (menuItems.length > 0) {
            setAnchorEl(event.currentTarget);
            setCurrentMenuItem(menuItem);
            setCurrentMenuIndex(i);
          } else {
            handleClose();
          }
        };

        const isMenuSelected = !!currentPathMenuOpen?.[key1];

        return (
          <CloseDrawerMenuItem
            key={uuidv4()}
            onClick={handleClick}
            onMouseEnter={onMouseEnter}
            icon={icon}
            selected={isMenuSelected}
          />
        );
      })}

      {!!anchorEl && (
        <div onMouseLeave={handleClose}>
          <Popper
            open={true}
            anchorEl={anchorEl}
            currentMenuIndex={currentMenuIndex}
          >
            <CloseDrawerSubMenuItemList
              currentMenuItem={currentMenuItem}
              currentPathMenuOpen={currentPathMenuOpen}
              onCloseMenuPopover={handleClose}
            />
          </Popper>
        </div>
      )}
    </>
  );
};
