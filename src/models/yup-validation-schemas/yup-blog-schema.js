import * as yup from "yup";

export const yupBlogSchema = yup.object().shape({
  title: yup.string().required("Title is required!"),
  date: yup.date().required("Date is required!"),
  author: yup.string().required("Author is required!"),
  content: yup.string().required("Content is required!"),
});
