import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../redux/actions/blogPost";
import { NavLink, Redirect } from "react-router-dom";
import blogPost from "../redux/reducers/blogPosts";

export interface BlogPostsProps {}

const BlogPosts: React.FC<BlogPostsProps> = () => {
  const blogPosts = useSelector((state: any) => state.blogPost.posts);
  const loading = useSelector((state: any) => state.blogPost.loading);
  const token = useSelector((state: any) => state.post.token);

  const posts = [...blogPosts];
  const dispatch = useDispatch();

  console.log(posts);
  console.log("1");
  useEffect(() => {
    if (loading === true) dispatch(getAllPost());
    console.log("2");
  }, []);
  // const encodeDataToImage = () => {
  //   newPosts = posts.map((post: any) => {
  //     if (posts.length !== 0) {
  //       const convertToBase64 = (image: any) => {
  //         const buffit = Buffer.from(image);
  //         post.image = `${buffit}`;
  //       };
  //       convertToBase64(post.img.data);
  //       return post;
  //     }
  //   });
  // };
  // encodeDataToImage();
  // console.log(newPosts);
  console.log("3");
  //   if (blogPosts.length === 1) {
  //     const convertToBase64 = (image: any) => {
  //       const buffit = Buffer.from(image.img.data);
  //       updatedImage = `${buffit}`;
  //     };
  //     convertToBase64(blogPosts[0]);
  //   }

  return (
    <>
      <div className="blogPostsContainer">
        <h1>Blog Posts</h1>
        <NavLink to="/home">home</NavLink>
        <div className="blogContentContainer">
          {posts.length !== 0
            ? posts.map((post: any) => {
                return (
                  <div className="blogContentContainer-content">
                    <img
                      className="blogContentContainer-content-image"
                      src={post.image}
                      alt=""
                    />
                    <div className="blogContentContainer-content-details">
                      <h1>{post.title}</h1>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
};

export default BlogPosts;
