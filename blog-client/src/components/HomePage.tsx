import { FilePond, registerPlugin } from "react-filepond";

import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImageResize from "filepond-plugin-image-resize";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blogPostAction, getAllPost } from "../redux/actions/blogPost";
import { NavLink, Redirect } from "react-router-dom";
import {
  getUserAction,
  getUserPostsAction,
  logOutUser,
  newPostUserAction,
} from "../redux/actions/users";

export interface HomePageProps {
  theme: string;
}
export interface BlogPost {
  title: string;
  blogContent: string;
  img: unknown | null | string;
  imgType: string;
}
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginImageResize
);

const HomePage: React.FC<HomePageProps> = ({ theme }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const user = useSelector((state: any) => state.user.user);

  const [file, setFiles] = useState([]);
  const posts = useSelector((state: any) => state.user.posts);
  const loading = useSelector((state: any) => state.user.loadingPosts);
  const [logoutClick, setLogoutClick] = useState(false);
  const [blogPost, setBlogPost] = useState<BlogPost>({
    title: "",
    blogContent: "",
    img: null,
    imgType: "",
  });
  useEffect((): any => {
    dispatch(getUserAction(token));
    dispatch(getUserPostsAction(token));
    if (token === null) {
      return <Redirect to="/" />;
    }
    console.log(token);
  }, [token, dispatch, logoutClick]);
  const { title, blogContent, img, imgType } = blogPost;
  const handleUpdateFIle = (file: any) => {
    setFiles(
      file.map((files: any) => {
        const file = files.file;
        setBlogPost({ ...blogPost, imgType: file.type });
        return file;
      })
    );
  };
  if (token === null) {
    return <Redirect to="/" />;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(blogPostAction(title, blogContent, img, token, imgType));

    console.log(blogPost);
  };
  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      if (file.length === 1) {
        reader.readAsDataURL(file[0]);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      }
      return reader;
    });
  let updatedImage: string | unknown;
  const newImage = toBase64(file);
  const dataImage = async () => {
    const newData = await newImage;
    updatedImage = newData;
    return newData;
  };
  dataImage();
  const handleInput = (e: any) => {
    e.preventDefault();
    setBlogPost({
      ...blogPost,
      [e.target.name]: e.target.value,
      img: updatedImage,
    });
  };
  const styleThemeT = {
    color: theme === "LIGHT" ? "#000" : "#fff",
  };
  const styleThemeB = {
    background: theme === "LIGHT" ? "#fff" : "#000",
  };
  const styleThemeBMain = {
    background: theme === "LIGHT" ? "#f1f2f2" : "#005068",
  };
  const userPosts = posts.map((post: any) => {
    // return <img style={{ height: "20rem" }} src={post.image} alt="" />;

    return (
      <div style={styleThemeB} className="homeBlogContainer_blogs">
        <img
          className="homeBlogContainer_blogs-image"
          src={user.avatar}
          alt=""
        />
        <div className="homeBlogContainer_blogs-details">
          <p className="primary-p" style={styleThemeT}>
            {post.title} <span> - {user.name}</span>
          </p>
          <p className="primary-p" style={styleThemeT}>
            {post.date}
          </p>
          <p style={{ color: "#00aeef" }} className="primary-p">
            {user.email}
          </p>
        </div>
      </div>
    );
  });
  const ifLoading = loading ? <h1>Getting Blog Datas</h1> : userPosts;
  const handleLogout = (e: any) => {
    e.preventDefault();
    console.log("logout");
    console.log(token);
    dispatch(logOutUser());
    setLogoutClick(!logoutClick);
  };

  return (
    <>
      <div className="homePage">
        <button onClick={(e) => handleLogout(e)} className="logOutBtn">
          LOG OUT
        </button>

        <h1 className="tertiary-heading">{user.name}</h1>
        <div>
          <span className="primary-span">{user.email}</span>
        </div>
        <div style={styleThemeBMain} className="homeBlogContainer">
          {ifLoading}
        </div>

        <div className="homePage_content">
          <div
            className="homePage_createBlogContainer"
            // style={{ display: "none" }}
          >
            <FilePond
              files={file}
              onupdatefiles={(file) => handleUpdateFIle(file)}
              maxFiles={3}
              name="files"
              labelIdle='Drag  Drop your files or <span class="filepond--label-action">Browse</span>'
            />
            <div className="frontPage_form">
              <form
                className="primary-form"
                action=""
                onSubmit={(e) => handleSubmit(e)}
              >
                <input
                  className="primary-form_primary-input"
                  placeholder="title"
                  onChange={(e) => handleInput(e)}
                  style={{ width: "80%" }}
                  name="title"
                  type="text"
                  value={blogPost.title}
                />
                <textarea
                  className="primary-form_primary-input"
                  placeholder="Caption"
                  style={{ width: "100%", height: "20rem" }}
                  onChange={(e) => handleInput(e)}
                  name="blogContent"
                  value={blogPost.blogContent}
                />
              </form>
            </div>
            <button className="primary-button" onClick={(e) => handleSubmit(e)}>
              Submit
            </button>
            <NavLink to="/blog-posts">blogpostsss</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
