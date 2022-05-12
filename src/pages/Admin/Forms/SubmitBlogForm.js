import React from "react";
import styled from "styled-components";
import { Form } from "../../../ui/styled-components/forms/Form";
import { AppButton } from "../../../ui/styled-components/buttons/AppButton";
import { AppInput } from "../../../ui/styled-components/inputs/AppInput";
import { AppLable } from "../../../ui/styled-components/labels/AppLabel";
import { AppTextarea } from "../../../ui/styled-components/inputs/AppTextarea";
import { useFormik } from "formik";
import { FormErrorText } from "../../../ui/styled-components/forms/FormErrorText";
import { yupBlogSchema } from "../../../models/yup-validation-schemas/yup-blog-schema";
import { compressPhotos } from "../../../services/compression/compressPhotos";
import { Preloader } from "../../../ui/details/Preloader/Preloader";
import { updatePhotos } from "../../../api/photos";
import { AiOutlineDelete } from "react-icons/ai";
import { postBlog } from "../../../api/blog";

export const SubmitBlogForm = () => {
  const [photos, setPhotos] = React.useState([]);
  const [photosLoading, setPhotosLoading] = React.useState(false);
  const [contentLoading, setContentLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      date: "",
      author: "",
      content: "",
    },
    validationSchema: yupBlogSchema,
    onSubmit: async (values) => {
      setContentLoading(true);
      const response = await updatePhotos(photos.slice(0, 4));
      const blog = { ...values, photos: response.data.photos };
      postBlog(blog)
        .then(() => {
          alert("Blog successfully added.");
          formik.resetForm();
          setPhotos([]);
        })
        .catch((e) => {
          console.error(e);
          alert("Sorry, something went wrong.");
        })
        .finally(() => {
          setContentLoading(false);
        });
    },
  });

  const createPhotosBlobs = async (e) => {
    setPhotosLoading(true);
    try {
      const ph = await compressPhotos(e);
      setPhotos((prev) => [...prev, ...ph]);
    } catch (e) {
      console.error(e);
      console.trace(e);
    } finally {
      setPhotosLoading(false);
    }
  };

  const deletePhoto = (id) => {
    setPhotos((prev) => prev.filter((ph) => ph.id !== id));
  };

  if (contentLoading) {
    return (
      <Centering>
        <Preloader />
      </Centering>
    );
  }

  return (
    <Form onSubmit={formik.handleSubmit} id="new-blog">
      <AppLable htmlFor="title">title</AppLable>
      <AppInput id="title" name="title" type="text" onChange={formik.handleChange} value={formik.values.title} />
      {formik.touched.title && formik.errors.title ? <FormErrorText>{formik.errors.title}</FormErrorText> : null}

      <AppLable htmlFor="date">date</AppLable>
      <AppInput id="date" name="date" type="date" onChange={formik.handleChange} value={formik.values.date} />
      {formik.touched.date && formik.errors.date ? <FormErrorText>{formik.errors.date}</FormErrorText> : null}

      <AppLable htmlFor="author">author</AppLable>
      <AppInput id="author" name="author" type="text" onChange={formik.handleChange} value={formik.values.author} />
      {formik.touched.author && formik.errors.author ? <FormErrorText>{formik.errors.author}</FormErrorText> : null}

      <AppLable htmlFor="content">content</AppLable>
      <AppTextarea
        id="content"
        name="content"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.content}
      />
      {formik.touched.content && formik.errors.content ? <FormErrorText>{formik.errors.content}</FormErrorText> : null}

      <AppLable htmlFor="photos">photos</AppLable>
      {photosLoading ? (
        <Preloader />
      ) : (
        <>
          <AddPhotosButton>
            <span>ADD PHOTOS</span>
            <AppInput
              type="file"
              accept="image/*"
              multiple={true}
              name="photos"
              onChange={(e) => createPhotosBlobs(e)}
            />
          </AddPhotosButton>
          {photos.length > 0 && (
            <MarginTopUtility>
              <PhotosBox>
                {photos.map((photo) => {
                  return (
                    <PhotoWrap key={photo.url}>
                      <Delete onClick={() => deletePhoto(photo.id)} />
                      <PhotoIcon src={photo.url} />;
                    </PhotoWrap>
                  );
                })}
              </PhotosBox>
            </MarginTopUtility>
          )}
        </>
      )}
      <MarginTopUtility>
        <AppButton type="submit">submit</AppButton>
      </MarginTopUtility>
    </Form>
  );
};

const AddPhotosButton = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  background-color: ${(p) => p.theme.light};
  color: ${(p) => p.theme.darkest};
  input {
    opacity: 0;
  }
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Delete = styled(AiOutlineDelete)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: ${(p) => p.theme.darkest};
  color: ${(p) => p.theme.lightest};
  padding: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  border: 1px solid ${(p) => p.theme.error};
`;

const PhotoWrap = styled.div`
  display: inline-block;
  position: relative;
  overflow: hidden;
`;

const PhotoIcon = styled.img`
  object-fit: contain;
  height: 15vh;
  width: 25vw;
  margin: 0.5rem;
`;

const PhotosBox = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  flex: 1;
  padding: 1rem;
  width: 100%;
  overflow: auto;
`;

const MarginTopUtility = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;

const Centering = styled(MarginTopUtility)`
  margin: 0;
`;
