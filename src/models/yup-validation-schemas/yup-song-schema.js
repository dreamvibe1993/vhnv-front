import * as yup from "yup";

export const yupSongSchema = yup.object().shape({
  band: yup.string().required("Band name is required!"),
  name: yup.string().required("Name is required!"),
  year: yup.string(),
  lyrics: yup.string().required("Lyrics are required!"),
});

export const apassSchema = yup.object().shape({
  password: yup.string().required("Password is required!"),
});
