"use client";

import { Box, List, useTheme } from "@mui/material";
import { isEmpty as _isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { urlToNestedObject } from "../../utils/urlToNestedObject";
import type { MenuItem } from "../Drawer";
import { OpenDrawerCollapse } from "./OpenDrawerCollapse";
import { OpenDrawerMenuItem } from "./OpenDrawerMenuItem";

type OpenDrawerMenuItemListProps = {
  menuItems: MenuItem[];
  currentPathname: string;
};

export const OpenDrawerMenuItemList = ({
  menuItems,
  currentPathname,
}: OpenDrawerMenuItemListProps) => {
  //TODO: jaydip, fix this type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [subMenusOpen, setSubMenusOpen] = useState<Record<string, any>>({});

  const [currentPathMenuOpen, setCurrentPathMenuOpen] = useState<
    //TODO: jaydip, fix this type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Record<string, any>
  >({});

  const theme = useTheme();

  const { butterflyBlue, slate } = theme.palette.app.color;

  useEffect(() => {
    const obj = urlToNestedObject(currentPathname);

    if (_isEmpty(obj)) {
      setSubMenusOpen({ home: true });
      setCurrentPathMenuOpen({ home: true });

      return;
    }

    setSubMenusOpen(obj);
    setCurrentPathMenuOpen(obj);
  }, [currentPathname]);

  return menuItems.map((menuItem) => {
    const { menuItems = [], key: key1, icon, title, onClick } = menuItem;

    const isMenuSelected = !!subMenusOpen?.[key1];

    if (menuItems.length > 0) {
      return (
        <Box key={key1}>
          <OpenDrawerMenuItem
            sx={{
              ":focus-visible": {
                border: `1px solid ${butterflyBlue[900]}`,
                backgroundColor: slate[900],
              },
            }}
            onClick={() => {
              setSubMenusOpen((prev) => ({
                ...prev,
                [key1]: !isMenuSelected,
              }));
            }}
            icon={icon}
            title={title}
            isShowEndAdornment
            selected={isMenuSelected}
            key={key1}
          />

          <OpenDrawerCollapse in={isMenuSelected}>
            <List component="div" disablePadding key={key1}>
              {menuItems.map(
                ({ key: key2, onClick, title, menuItems = [] }) => {
                  const isSubMenuSelected = menuItems.length
                    ? !!subMenusOpen?.[key1]?.[key2] ||
                      !!currentPathMenuOpen?.[key1]?.[key2]?.menuItems
                    : !!subMenusOpen?.[key1]?.[key2] ||
                      !!currentPathMenuOpen?.[key1]?.[key2];

                  return (
                    <Box
                      sx={{
                        bgcolor:
                          isSubMenuSelected && menuItems.length === 0
                            ? butterflyBlue[900]
                            : "",
                      }}
                      key={key2}
                    >
                      {menuItems.length > 0 ? (
                        <>
                          <OpenDrawerMenuItem
                            sx={{
                              paddingLeft: 4.5,
                              ":focus-visible": {
                                border: `1px solid ${butterflyBlue[900]}`,
                                backgroundColor: slate[900],
                              },
                            }}
                            onClick={() => {
                              // eslint-disable-next-line sonarjs/no-nested-functions
                              setSubMenusOpen((prev) => ({
                                ...prev,
                                [key1]: {
                                  ...(prev?.[key1] || {}),
                                  [key2]: !isSubMenuSelected,
                                },
                              }));
                            }}
                            key={key2}
                            title={title}
                            isShowEndAdornment
                            selected={isSubMenuSelected}
                          />
                          <OpenDrawerCollapse in={isSubMenuSelected}>
                            <List component="div" disablePadding key={key2}>
                              {menuItems.map(
                                ({ key: key3, title, onClick }) => {
                                  const menuSelectedItem =
                                    !!subMenusOpen[key1]?.[key2]?.[key3] ||
                                    !!currentPathMenuOpen[key1]?.[key2]?.[key3];

                                  return (
                                    <Box
                                      sx={{
                                        bgcolor: menuSelectedItem
                                          ? theme.palette.app.color
                                              .butterflyBlue[900]
                                          : "",
                                      }}
                                      key={key3}
                                    >
                                      <OpenDrawerMenuItem
                                        sx={
                                          menuSelectedItem
                                            ? {
                                                paddingLeft: menuItems.length
                                                  ? 7.5
                                                  : 4.5,
                                              }
                                            : {
                                                paddingLeft: menuItems.length
                                                  ? 7.5
                                                  : 4.5,
                                                ":focus-visible": {
                                                  border: `1px solid ${butterflyBlue[900]}`,
                                                  backgroundColor:
                                                    theme.palette.app.color
                                                      .slate[900],
                                                },
                                              }
                                        }
                                        // eslint-disable-next-line sonarjs/no-nested-functions
                                        onClick={(target) => {
                                          if (onClick && !menuSelectedItem) {
                                            onClick(
                                              `/${key1}/${key2}/${key3}`,
                                              target
                                            );
                                            setSubMenusOpen((prev) => ({
                                              ...prev,
                                              [key2]: {
                                                ...(prev?.[key2] || {}),
                                                [key3]: !menuSelectedItem,
                                              },
                                            }));
                                          }
                                        }}
                                        key={key3}
                                        title={title}
                                        selected={menuSelectedItem}
                                      />
                                    </Box>
                                  );
                                }
                              )}
                            </List>
                          </OpenDrawerCollapse>
                        </>
                      ) : (
                        <OpenDrawerMenuItem
                          sx={
                            isSubMenuSelected
                              ? { paddingLeft: 4.5 }
                              : {
                                  paddingLeft: 4.5,
                                  ":focus-visible": {
                                    border: `1px solid ${butterflyBlue[900]}`,
                                    backgroundColor: slate[900],
                                  },
                                }
                          }
                          onClick={(target) => {
                            if (onClick && !isSubMenuSelected) {
                              onClick(`/${key1}/${key2}`, target);
                            }
                          }}
                          key={key2}
                          title={title}
                          selected={isSubMenuSelected}
                        />
                      )}
                    </Box>
                  );
                }
              )}
            </List>
          </OpenDrawerCollapse>
        </Box>
      );
    }

    return (
      <OpenDrawerMenuItem
        sx={
          isMenuSelected
            ? {}
            : {
                ":focus-within": {
                  border: `1px solid ${butterflyBlue[900]}`,
                  backgroundColor: slate[900],
                },
              }
        }
        onClick={(target) => {
          if (onClick && !isMenuSelected) {
            if (key1 === "home") {
              onClick("/", target);

              return;
            }

            onClick(`/${key1}`, target);
          }
        }}
        key={key1}
        icon={icon}
        selected={isMenuSelected}
        title={title}
      />
    );
  });
};
