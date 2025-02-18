import { LIST } from "../../../../routes";
import { TRANSACTIONS_BASE_URL } from "../../routes";
import { SHIFT_DAY_BASE_URL } from "../routes";

export const BANK_SHIFT_ALLOCATION_BASE_URL = `${TRANSACTIONS_BASE_URL}/${SHIFT_DAY_BASE_URL}/bank-shift-allocation`;

export const BANK_SHIFT_ALLOCATION_ROUTES = {
  listing: (currentDate: string) =>
    `${BANK_SHIFT_ALLOCATION_BASE_URL}/employee/${LIST}?current_date=${currentDate}`,

  post: `${BANK_SHIFT_ALLOCATION_BASE_URL}/bank-shift`,
};
