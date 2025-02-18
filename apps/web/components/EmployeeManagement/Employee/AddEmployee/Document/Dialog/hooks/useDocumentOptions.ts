import {
  AADHAAR_CARD,
  DEGREE_AND_CERTIFICATE,
  DRIVING_LICENSE,
  PAN_CARD,
  PREVIOUS_EXPERIENCE,
  SIGNATURE,
  VOTER_ID,
} from "./constant";
import { useApplicationContext } from "../../../../../../../app/context/ApplicationContext";

export const DocumentOptions = {
  [AADHAAR_CARD]: "Aadhaar Card",
  [PAN_CARD]: "Pan Card",
  [VOTER_ID]: "Voter Id",
  [DRIVING_LICENSE]: "Driving License",
  [PREVIOUS_EXPERIENCE]: "Previous Experience",
  [DEGREE_AND_CERTIFICATE]: "Degree & Certificate",
  [SIGNATURE]: "Signature",
};

export type DocumentOptionKey = keyof typeof DocumentOptions;

export type DocumentTypeOptions = {
  label: string;
  value: DocumentOptionKey;
  disabled?: boolean;
};

export const useDocumentOptions = () => {
  const { documentFormValues } = useApplicationContext();

  const documentTypeOptions: DocumentTypeOptions[] = [
    {
      label: DocumentOptions[AADHAAR_CARD],
      value: AADHAAR_CARD,
      disabled: !!documentFormValues.find(
        (document) => document.document_type === AADHAAR_CARD
      ),
    },
    {
      label: DocumentOptions[PAN_CARD],
      value: PAN_CARD,
      disabled: !!documentFormValues.find(
        (document) => document.document_type === PAN_CARD
      ),
    },
    {
      label: DocumentOptions[VOTER_ID],
      value: VOTER_ID,
      disabled: !!documentFormValues.find(
        (document) => document.document_type === VOTER_ID
      ),
    },
    {
      label: DocumentOptions[DRIVING_LICENSE],
      value: DRIVING_LICENSE,
      disabled: !!documentFormValues.find(
        (document) => document.document_type === DRIVING_LICENSE
      ),
    },
    {
      label: DocumentOptions[PREVIOUS_EXPERIENCE],
      value: PREVIOUS_EXPERIENCE,
      disabled: !!documentFormValues.find(
        (document) => document.document_type === PREVIOUS_EXPERIENCE
      ),
    },
    {
      label: DocumentOptions[DEGREE_AND_CERTIFICATE],
      value: DEGREE_AND_CERTIFICATE,
      disabled: !!documentFormValues.find(
        (document) => document.document_type === DEGREE_AND_CERTIFICATE
      ),
    },
    {
      label: DocumentOptions[SIGNATURE],
      value: SIGNATURE,
      disabled: !!documentFormValues.find(
        (document) => document.document_type === SIGNATURE
      ),
    },
  ];

  return { documentTypeOptions };
};
