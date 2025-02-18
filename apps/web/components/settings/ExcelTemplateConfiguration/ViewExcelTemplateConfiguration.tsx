import { Box, Stack } from "@mui/material";
import {
  Breadcrumbs,
  Button,
  Card,
  FormContainer,
  FormSection,
  SvgsHome,
} from "@repo/shared-components";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { ExcelTemplateConfigurationForm } from "./ExcelTemplateConfigurationForm";
import type { ExcelConfigurationPayload } from "./hooks/useAddExcelTemplateConfiguration";
import { useGetExcelTemplate } from "./hooks/useGetExcelTemplate";

type ViewExcelTemplateConfigurationArgs = Readonly<{
  excelTemplateId: string;
}>;

export function ViewExcelTemplateConfiguration({
  excelTemplateId,
}: ViewExcelTemplateConfigurationArgs) {
  const router = useRouter();

  const { data: excelTemplateDetail, isPending: isPendingLatestExcelTemplate } =
    useGetExcelTemplate({
      excelTemplateId,
    });

  const defaultValues = useMemo(() => {
    if (excelTemplateDetail) {
      const {
        company_id,
        excel_master_id,
        template_name,
        excel_template_fields,
      } = excelTemplateDetail;

      const latestExcelTemplateDetail: ExcelConfigurationPayload = {
        company_id: company_id ?? null,
        excel_master_id: excel_master_id ?? null,
        template_name: template_name ?? null,
        excel_template_fields,
      };

      return latestExcelTemplateDetail;
    }
  }, [excelTemplateDetail]);

  return (
    <Stack gap="10px">
      <Breadcrumbs
        items={[
          {
            icon: <SvgsHome />,
            onClick: () => router.push("/"),
          },
          {
            text: "Settings",
          },
          {
            text: "Excel Template Configuration",
            onClick: () =>
              router.push("/settings/excel-template-configuration"),
          },
          {
            text: "View Excel Template Configuration",
          },
        ]}
      />

      <Card heading="View Excel Template Configuration">
        <FormContainer>
          <FormSection>
            <ExcelTemplateConfigurationForm
              defaultValues={defaultValues}
              loading={isPendingLatestExcelTemplate}
              disabled
            />

            <Box gap="5px" display="flex" justifyContent="end">
              <Button
                variant="outlined"
                disabled={isPendingLatestExcelTemplate}
                onClick={() =>
                  router.push("/settings/excel-template-configuration")
                }
              >
                Cancel
              </Button>
            </Box>
          </FormSection>
        </FormContainer>
      </Card>
    </Stack>
  );
}
