import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { AppSongTitle2 } from "../../styled-components/titles/AppSongTitle2";
import { Gallery } from "../Gallery/Gallery";
import { AuthContext } from "../../../configs/contexts/auth";
import { AppButton } from "../../styled-components/buttons/AppButton";
import { deleteBlog } from "../../../api/blog";

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
      <BlogEntryContainer>
        <AppSongTitle2>{blog.title}</AppSongTitle2>
        {Array.isArray(blog.photos) && blog.photos.length > 0 && (
          <PhotoSection>
            {blog.photos.map((phSrc) => {
              return (
                <PhotoSectionCell key={phSrc} onClick={() => showPhoto(phSrc)}>
                  <BlogPhoto src={phSrc} />
                </PhotoSectionCell>
              );
            })}
          </PhotoSection>
        )}
        <BlogContentWrapper>
          <Row>
            <CredsWrapper>{blog.author}</CredsWrapper>
            <InformationTitleWrapper>{t("blog:by")}</InformationTitleWrapper>
          </Row>
          <BlogContent>
            <span>{blog.content}</span>
          </BlogContent>
          <Row>
            <CredsWrapper>{new Date(blog.date).toDateString()}</CredsWrapper>
            <InformationTitleWrapper>{t("blog:date")}</InformationTitleWrapper>
          </Row>
          {isAuth && (
            <Row>
              <AppButton type="button" onClick={() => deleteThisBlog(blog._id)}>
                DELETE
              </AppButton>
            </Row>
          )}
        </BlogContentWrapper>
      </BlogEntryContainer>
    </>
  );
};

const BlogPhoto = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const PhotoSection = styled.div`
  display: grid;
  width: 100%;
  height: 40vh;
  grid-template-rows: repeat(3, auto);
  grid-template-columns: repeat(2, auto);
  justify-content: center;
  background-color: ${(p) => p.theme.dark};
  & > * {
    &:first-child {
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 1;
      grid-row-end: 4;
    }
  }
`;

const PhotoSectionCell = styled.div`
  overflow: hidden;
`;

const BlogContentWrapper = styled.div`
  background-color: ${(p) => p.theme.dark};
  margin-bottom: 0.5rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const InformationTitleWrapper = styled.h5`
  opacity: 0.5;
`;

const CredsWrapper = styled.h3``;

const BlogEntryContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: ${(p) => p.theme.darkest}; */
`;

const BlogContent = styled.div`
  padding: 10px;
  margin-bottom: 0.5rem;
  font-size: 2rem;
  /* border-top: 1px solid ; */
`;
