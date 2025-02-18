import type {
  StepperProps as MuiStepperProps,
  StepLabelProps,
} from "@mui/material";
import {
  Stepper as MuiStepper,
  Step,
  StepLabel,
  Box,
  Typography,
  useTheme,
} from "@mui/material";

type StepperProps = MuiStepperProps & {
  steps: string[];
  showActiveStepIcon?: boolean;
  stepLabelProps?: StepLabelProps;
};

export const Stepper = ({
  orientation = "horizontal",
  activeStep = 0,
  stepLabelProps = {},
  steps,
  ...rest
}: StepperProps) => {
  const theme = useTheme();

  const { butterflyBlue } = theme.palette.app.color;

  return (
    <Box>
      <MuiStepper activeStep={activeStep} orientation={orientation} {...rest}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              {...stepLabelProps}
              sx={{
                ".Mui-active .css-18pqgpd-MuiSvgIcon-root-MuiStepIcon-root": {
                  color: `${butterflyBlue[900]} !important`,
                },
                ".Mui-completed": {
                  color: `${butterflyBlue[900]} !important`,
                },
              }}
            >
              <Typography variant="caption">{label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </MuiStepper>
    </Box>
  );
};
