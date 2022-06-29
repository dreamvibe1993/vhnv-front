import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { Gallery } from "../Gallery/Gallery";
import { AuthContext } from "../../../configs/contexts/auth";
import { deleteBlog } from "../../../api/blog";
import {
  Box,
  Button,
  Fade,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  StackDivider,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

export const BlogEntry = ({ blog }) => {
  const { isAuth } = React.useContext(AuthContext);
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    delay: 600,
    threshold: 0,
  });

  const [photoSrc, setPhotoSrc] = React.useState(null);
  const [beenInView, setBeenInView] = React.useState(false);

  React.useEffect(() => {
    if (beenInView) return;
    setBeenInView(inView);
  }, [inView, beenInView]);

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

  const phSectionBGColor = useColorModeValue("gray.200", "gray.900");
  const boxBorderColor = useColorModeValue(
    "1px solid rgba(0,0,0,.2)",
    "1px solid rgba(255,255,255,.2)"
  );
  const boxShadowColor = useColorModeValue(
    "0px 3px 3px 1px rgba(0,0,0,.1)",
    "0px 3px 3px 1px rgba(255,255,255,.1)"
  );
  const OHMYGOD = useColorModeValue("whiteAlpha.900", "gray.900");

  return (
    <>
      {photoSrc && <Gallery src={photoSrc} onClose={hidePhoto} />}
      <Box
        p="1rem"
        boxShadow={boxShadowColor}
        w="100%"
        border={boxBorderColor}
        ref={ref}
        position="relative"
        bgColor={OHMYGOD}
      >
        <Fade in={beenInView}>
          <Heading mb={["1rem", null]}>{blog.title}</Heading>
          <Flex direction={["column", "row"]}>
            {Array.isArray(blog.photos) && blog.photos.length > 0 && (
              <PhotoSection
                templateRows="repeat(3, auto)"
                templateColumns="repeat(2, auto)"
                justifyContent="center"
                h="40vh"
                w={[null, "40%"]}
                bg={phSectionBGColor}
              >
                {blog.photos.map((phSrc) => {
                  return (
                    <PhotoSectionCell
                      key={phSrc}
                      onClick={() => showPhoto(phSrc)}
                      gridArea="auto"
                    >
                      <Image
                        src={phSrc}
                        w="100%"
                        h="100%"
                        minH="40vh"
                        objectFit="cover"
                      />
                    </PhotoSectionCell>
                  );
                })}
              </PhotoSection>
            )}
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              ml={[null, "4rem"]}
              w="100%"
              mt={["1rem", null]}
            >
              <Flex w="100%" justify="space-between">
                <Text>{blog.author}</Text>
                <Heading size="xs" color="gray.300">
                  {t("blog:by")}
                </Heading>
              </Flex>
              <Text h="100%">
                <span>{blog.content}</span>
              </Text>
              <Flex w="100%" justify="space-between">
                <Text>{new Date(blog.date).toDateString()}</Text>
                <Heading size="xs" color="gray.300">
                  {t("blog:date")}
                </Heading>
              </Flex>
              {isAuth && (
                <Flex w="100%">
                  <Button
                    type="button"
                    onClick={() => deleteThisBlog(blog._id)}
                    variant="outline"
                  >
                    Delete
                  </Button>
                </Flex>
              )}
            </VStack>
          </Flex>
        </Fade>
      </Box>
    </>
  );
};

const PhotoSection = styled(Grid)`
  border-radius: 5px;
  overflow: hidden;
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
