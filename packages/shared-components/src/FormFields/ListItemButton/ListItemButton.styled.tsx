import {
  styled,
  ListItemButton as MuiListItemButton,
  type ListItemButtonProps as MuiListItemButtonProps,
} from "@mui/material";

export const StyledListItemButton = styled(MuiListItemButton, {
  shouldForwardProp: (prop) => prop !== "selected",
})<MuiListItemButtonProps & { selected?: boolean }>(({ theme, selected }) => ({
  background: theme.palette.app.color.iron[600],
  color: theme.palette.app.color.mirage[900],
  borderRadius: "4px",
  //TODO: Manish, Add a transition
  border: `1px solid ${theme.palette.app.color.butterflyBlue[300]}`,
  ...(selected
    ? {
        background: theme.palette.app.color.deepAqua[500],
        color: theme.palette.app.color.mirage[900],
        borderLeft: `6px solid ${theme.palette.app.color.butterflyBlue[900]}`,
      }
    : {}),
}));
