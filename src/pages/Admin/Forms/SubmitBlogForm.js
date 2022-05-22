import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { yupBlogSchema } from "../../../models/yup-validation-schemas/yup-blog-schema";
import { compressPhotos } from "../../../services/compression/compressPhotos";
import { updatePhotos } from "../../../api/photos";
import { postBlog } from "../../../api/blog";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spinner,
  Textarea,
  useColorModeValue,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

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

  const cvPhotoBox = useColorModeValue("gray.200", "gray.700");
  const cvPhoto = useColorModeValue("gray.300", "gray.800");

  if (contentLoading) {
    return (
      <Flex justify={"center"}>
        <Spinner />
      </Flex>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit} id="new-blog">
      <VStack p={4}>
        <FormControl isInvalid={formik.touched.title && formik.errors.title}>
          <FormLabel htmlFor="title">title</FormLabel>
          <Input id="title" name="title" type="text" onChange={formik.handleChange} value={formik.values.title} />
          <FormErrorMessage>{formik.errors.title}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.touched.date && formik.errors.date}>
          <FormLabel htmlFor="date">date</FormLabel>
          <Input id="date" name="date" type="date" onChange={formik.handleChange} value={formik.values.date} />
          <FormErrorMessage>{formik.errors.date}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.touched.author && formik.errors.author}>
          <FormLabel htmlFor="author">author</FormLabel>
          <Input id="author" name="author" type="text" onChange={formik.handleChange} value={formik.values.author} />
          {<FormErrorMessage>{formik.errors.author}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={formik.touched.content && formik.errors.content}>
          <FormLabel htmlFor="content">content</FormLabel>
          <Textarea
            id="content"
            name="content"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.content}
          />
          <FormErrorMessage>{formik.errors.content}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="photos">photos</FormLabel>
          {photosLoading ? (
            <Spinner />
          ) : (
            <>
              <AddPhotosButton>
                <span>ADD PHOTOS</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple={true}
                  name="photos"
                  onChange={(e) => createPhotosBlobs(e)}
                />
              </AddPhotosButton>
              {photos.length > 0 && (
                <Wrap bg={cvPhotoBox} p={4} borderRadius="5px" justify={"center"}>
                  {photos.map((photo) => {
                    return (
                      <Box key={photo.url} position="relative" bg={cvPhoto}>
                        <Button onClick={() => deletePhoto(photo.id)} top={1} right={1} position="absolute" w={2} h={4}>
                          <FaTrash />
                        </Button>
                        <PhotoIcon src={photo.url} />
                      </Box>
                    );
                  })}
                </Wrap>
              )}
            </>
          )}
        </FormControl>
        <Button type="submit" width={"full"}>
          submit
        </Button>
      </VStack>
    </form>
  );
};

const AddPhotosButton = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  input {
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const PhotoIcon = styled.img`
  object-fit: contain;
  height: 15vh;
  width: 25vw;
  margin: 0.5rem;
`;
