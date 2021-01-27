import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blogPostAction } from "../redux/actions/blogPost";

export interface HomePageProps {}
interface BlogPost {
  title: string;
  blogContent: string;
  img: undefined | null | File;
}
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode
);

const HomePage: React.FC<HomePageProps> = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.post.token);
  const [file, setFiles] = useState([]);
  const [blogPost, setBlogPost] = useState<BlogPost>({
    title: "",
    blogContent: "",
    img: null,
  });
  const { title, blogContent, img } = blogPost;
  const handleUpdateFIle = (file: any) => {
    setFiles(file.map((files: any) => files.file));
  };
  console.log(file);
  useEffect(() => {
    console.log(file);
  }, [file]);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(blogPostAction(title, blogContent, img, token));

    console.log(blogPost);
  };
  const handleInput = (e: any) => {
    e.preventDefault();
    setBlogPost({ ...blogPost, [e.target.name]: e.target.value, img: file[0] });
  };
  return (
    <>
      <div className="homePage">
        <h1 className="primary-heading">BLOG IT</h1>
        <div className="homePage_content">
          <button className="primary-button">
            <h2 className="secondary-heading">Create Blog </h2>
          </button>
          <FilePond
            files={file}
            onupdatefiles={(file) => handleUpdateFIle(file)}
            allowMultiple={true}
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
                name="title"
                type="text"
                value={blogPost.title}
              />
              <textarea
                className="primary-form_primary-input"
                placeholder="Caption"
                onChange={(e) => handleInput(e)}
                name="blogContent"
                value={blogPost.blogContent}
              />
            </form>
          </div>
          <button onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
