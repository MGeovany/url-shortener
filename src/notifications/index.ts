import { toast } from "react-hot-toast";

export const INVALID_URL_TOAST = () => toast.error("Please enter a valid URL!");

export const GENERAL_ERROR_TOAST = (err: unknown) =>
  toast.error(`Something went wrong, please try again. ${err}`);

export const FAILED_TO_DELETE_TOAST = (err: string) =>
  toast.error(`Failed to delete short link: ${err}`);

export const LINK_DELETED_TOAST = () => {
  toast.success("Link deleted successfully!");
};
