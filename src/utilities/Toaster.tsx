import { toast } from "react-toastify";

export const notify = (text: string, type = "success") =>
    type === "success" ? toast.success(text, { draggable: true }) : toast.error(text, { draggable: true });