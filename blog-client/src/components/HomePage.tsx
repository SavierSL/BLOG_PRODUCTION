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

export interface HomePageProps {}
interface BlogPost {
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

const HomePage: React.FC<HomePageProps> = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.post.token);
  const [file, setFiles] = useState([]);
  const [blogPost, setBlogPost] = useState<BlogPost>({
    title: "",
    blogContent: "",
    img: null,
    imgType: "",
  });
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
  console.log(blogPost.imgType);

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
  return (
    <>
      <div className="homePage">
        <h1 className="primary-heading">BLOG IT</h1>
        <div className="homePage_content">
          <button className="primary-button">
            <h2 className="secondary-heading">Create Blog </h2>
          </button>
          <div className="homePage_createBlogContainer">
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
            <button onClick={(e) => handleSubmit(e)}>Submit</button>
            <NavLink to="/blog-posts">blogpostsss</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
