import React from "react";
import { useFormik } from "formik";
import { yupSongSchema } from "../../../models/yup-validation-schemas/yup-song-schema";
import { usePostSong } from "../../../services/hooks/songs/usePostSong";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spinner,
  Textarea,
  VStack,
} from "@chakra-ui/react";

export const SubmitSongForm = () => {
  const postSong = usePostSong();
  const [contentLoading, setContentLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      band: "",
      name: "",
      year: "",
      lyrics: "",
    },
    validationSchema: yupSongSchema,
    onSubmit: (values) => {
      setContentLoading(true);
      postSong(values)
        .then((res) => {
          alert("New song successfully added!");
        })
        .catch((e) => {
          console.error(e);
          alert("Sorry, something went wrong!");
        })
        .finally(() => {
          setContentLoading(false);
        });
    },
  });

  if (contentLoading) {
    return (
      <Flex justify={"center"}>
        <Spinner />
      </Flex>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit} id="new-song">
      <VStack p={4}>
        <FormControl isInvalid={formik.touched.band && formik.errors.band}>
          <FormLabel htmlFor="band">band</FormLabel>
          <Input id="band" name="band" type="text" onChange={formik.handleChange} value={formik.values.band} />
          <FormErrorMessage>{formik.errors.band}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.touched.name && formik.errors.name}>
          <FormLabel htmlFor="name">name</FormLabel>
          <Input id="name" name="name" type="text" onChange={formik.handleChange} value={formik.values.name} />
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.touched.year && formik.errors.year}>
          <FormLabel htmlFor="year">year</FormLabel>
          <Input id="year" name="year" type="text" onChange={formik.handleChange} value={formik.values.year} />
          <FormErrorMessage>{formik.errors.year}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.touched.lyrics && formik.errors.lyrics}>
          <FormLabel htmlFor="lyrics">lyrics</FormLabel>
          <Textarea id="lyrics" name="lyrics" type="text" onChange={formik.handleChange} value={formik.values.lyrics} />
          <FormErrorMessage>{formik.errors.lyrics}</FormErrorMessage>
        </FormControl>
        <Button type="submit" width={"full"}>
          submit
        </Button>
      </VStack>
    </form>
  );
};
