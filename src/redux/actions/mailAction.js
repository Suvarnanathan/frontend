import { GET_CANDIDATES_ID } from "../types/mailActionType";


export const getRecipientsId = (recipientIds) => ({
    type: GET_CANDIDATES_ID,
    payload:recipientIds
});