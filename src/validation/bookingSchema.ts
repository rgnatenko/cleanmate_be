import * as yup from "yup";

const errorMessages = {
  service_id_required: "Service id is is required",
  customer_name_required: "Customer name is required",
  phone_number_required: "Phone number is required",
  date_required: "Date is required",
  time_required: "Time is required",
};

export const bookingSchema = yup.object().shape({
  service_id: yup.string().required(errorMessages.service_id_required),
  customer_name: yup.string().required(errorMessages.customer_name_required),
  phone_number: yup.string().required(errorMessages.phone_number_required),
  date: yup.string().required(errorMessages.date_required),
  time: yup.string().required(errorMessages.time_required),
});
