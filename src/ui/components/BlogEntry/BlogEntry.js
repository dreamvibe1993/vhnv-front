import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Gallery } from "../Gallery/Gallery";
import { AuthContext } from "../../../configs/contexts/auth";
import { deleteBlog } from "../../../api/blog";
import { Box, Button, Flex, Grid, GridItem, Heading, Image, StackDivider, Text, VStack } from "@chakra-ui/react";

export const BlogEntry = ({ blog }) => {
  const { isAuth } = React.useContext(AuthContext);

  const { t } = useTranslation();
  const [photoSrc, setPhotoSrc] = React.useState(null);

  const showPhoto = (src) => {
    setPhotoSrc(src);
  };

  const hidePhoto = () => {
    setPhotoSrc(null);
  };

  const deleteThisBlog = (id) => {
    deleteBlog(id)
      .then(() => {
        alert("Blog successfully deleted!");
      })
      .catch((e) => {
        console.error(e);
        alert("Sorry something went wrong!");
      });
  };

  return (
    <>
      {photoSrc && <Gallery src={photoSrc} onClose={hidePhoto} />}
      <Box p="1rem" mr="1rem" ml="1rem" boxShadow='md' w="100%">
        <Heading>{blog.title}</Heading>
        {Array.isArray(blog.photos) && blog.photos.length > 0 && (
          <PhotoSection templateRows="repeat(3, auto)" templateColumns="repeat(2, auto)" justifyContent="center" h="40vh">
            {blog.photos.map((phSrc) => {
              return (
                <PhotoSectionCell key={phSrc} onClick={() => showPhoto(phSrc)}>
                  <Image src={phSrc} w="100%" h="100%" objectFit="cover"/>
                </PhotoSectionCell>
              );
            })}
          </PhotoSection>
        )}
        <VStack divider={<StackDivider borderColor="gray.200" />}>
          <Flex w="100%" justify="space-between">
            <Text>{blog.author}</Text>
            <Heading size='xs' color="gray.300">{t("blog:by")}</Heading>
          </Flex>
          <Text>
            <span>{blog.content}</span>
          </Text>
          <Flex w="100%" justify="space-between">
            <Text>{new Date(blog.date).toDateString()}</Text>
            <Heading size='xs' color="gray.300">{t("blog:date")}</Heading>
          </Flex>
          {isAuth && (
            <Flex w="100%">
              <Button type="button" onClick={() => deleteThisBlog(blog._id)} variant="outline">
                Delete
              </Button>
            </Flex>
          )}
        </VStack>
      </Box>
    </>
  );
};


const PhotoSection = styled(Grid)`
  margin: 1rem 0px;
  & > * {
    &:first-child {
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 1;
      grid-row-end: 4;
    }
  }
`;

const PhotoSectionCell = styled(GridItem)`
  overflow: hidden;
  cursor: pointer;
`;