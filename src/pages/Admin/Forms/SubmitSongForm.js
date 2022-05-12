import styled from "styled-components";
import { Form } from "../../../ui/styled-components/forms/Form";
import { AppButton } from "../../../ui/styled-components/buttons/AppButton";
import { AppInput } from "../../../ui/styled-components/inputs/AppInput";
import { AppLable } from "../../../ui/styled-components/labels/AppLabel";
import { AppTextarea } from "../../../ui/styled-components/inputs/AppTextarea";
import { useFormik } from "formik";
import { yupSongSchema } from "../../../models/yup-validation-schemas/yup-song-schema";
import { FormErrorText } from "../../../ui/styled-components/forms/FormErrorText";
import { usePostSong } from "../../../services/hooks/songs/usePostSong";

export const SubmitSongForm = () => {
  const postSong = usePostSong();
  const formik = useFormik({
    initialValues: {
      band: "",
      name: "",
      year: "",
      lyrics: "",
    },
    validationSchema: yupSongSchema,
    onSubmit: (values) => {
      postSong(values)
        .then((res) => {
          console.log(res);
          alert("success!");
        })
        .catch((e) => {
          console.error(e);
          alert("fail");
        });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} id="new-song">
      <AppLable htmlFor="band">band</AppLable>
      <AppInput id="band" name="band" type="text" onChange={formik.handleChange} value={formik.values.band} />
      {formik.touched.band && formik.errors.band ? <FormErrorText>{formik.errors.band}</FormErrorText> : null}

      <AppLable htmlFor="name">name</AppLable>
      <AppInput id="name" name="name" type="text" onChange={formik.handleChange} value={formik.values.name} />
      {formik.touched.name && formik.errors.name ? <FormErrorText>{formik.errors.name}</FormErrorText> : null}

      <AppLable htmlFor="year">year</AppLable>
      <AppInput id="year" name="year" type="text" onChange={formik.handleChange} value={formik.values.year} />
      {formik.touched.year && formik.errors.year ? <FormErrorText>{formik.errors.year}</FormErrorText> : null}

      <AppLable htmlFor="lyrics">lyrics</AppLable>
      <AppTextarea id="lyrics" name="lyrics" type="text" onChange={formik.handleChange} value={formik.values.lyrics} />
      {formik.touched.lyrics && formik.errors.lyrics ? <FormErrorText>{formik.errors.lyrics}</FormErrorText> : null}
      <MarginTopUtility>
        <AppButton type="submit">submit</AppButton>
      </MarginTopUtility>
    </Form>
  );
};

const MarginTopUtility = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;
