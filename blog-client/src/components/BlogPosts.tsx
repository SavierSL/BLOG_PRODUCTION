import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../redux/actions/blogPost";
import { NavLink, Redirect } from "react-router-dom";
import blogPost from "../redux/reducers/blogPosts";

export interface BlogPostsProps {}

const BlogPosts: React.FC<BlogPostsProps> = () => {
  const blogPosts = useSelector((state: any) => state.blogPost.posts);
  const posts = [...blogPosts];
  const dispatch = useDispatch();

  console.log(posts);
  console.log("1");
  useEffect(() => {
    dispatch(getAllPost());
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
        {posts.length !== 0
          ? posts.map((post: any) => {
              return <img style={{ height: "50rem" }} src={post.img} alt="" />;
            })
          : ""}
      </div>
    </>
  );
};

export default BlogPosts;
