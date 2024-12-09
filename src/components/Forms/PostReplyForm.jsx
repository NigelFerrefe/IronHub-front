import { useState, useContext } from "react";
import axios from "axios";
import "./GeneralFormStyles.css";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/file-upload.service";
const API_URL = import.meta.env.VITE_API_URL;

function PostReplyForm({ postId, setDetailPost, setShowReplyForm }) {
  const { user } = useContext(AuthContext);
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [picture, setPicture] = useState("");

  const storedToken = localStorage.getItem("authToken");

  const handleFileUpload = (e) => {
    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("picture", e.target.files[0]);


    service
      .uploadImage(uploadData)
      .then((response) => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setPicture(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReply = {
      name: user._id,
      description,
      link,
      picture,
    };

    try {
      const response = await axios.post(
        `${API_URL}/posts/${postId}/reply/`,
        newReply,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      console.log("The response: ",response.data.reply);

      // Add the newly created reply to the post's replies in state
       setDetailPost((prevPost) => ({
        ...prevPost,
         replies: [...prevPost.replies, response.data.reply],
      }));

      setShowReplyForm(false)
    } catch (error) {
      console.error("Error creating reply:", error.response.data);
    }
  };

  const handleCancel = () => setShowReplyForm(false);
  return (
    <section className="post-form-section">
      <form className="post-form" onSubmit={handleSubmit}>
        <div className="form-div description">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-div link">
          <label htmlFor="link">Link (optional):</label>
          <input
            type="url"
            name="link"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className="form-div picture">
          <label htmlFor="picture">Image (optional):</label>
          <input
            type="file"
            name="picture"
            id="picture"
            className="file-upload"
            onChange={(e) => handleFileUpload(e)}
          />
        </div>
        <button type="submit" className="submit-btn">
          Update
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </section>
  );
}

export default PostReplyForm;
