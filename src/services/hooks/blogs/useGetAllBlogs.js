import React from "react";
import { getAllBlogs } from "../../../api/blog";

export const useGetAllBlogs = () => {
  const [blogs, setBlogs] = React.useState(0);

  React.useEffect(() => {
    getAllBlogs()
      .then((response) => {
        setBlogs(response.data.blogs.reverse());
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return blogs;
};
