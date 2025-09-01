import { useState } from "react";

function CreatePost({ onPost }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!caption && !image) return alert("Please add something!");
    const newPost = {
      id: Date.now(),
      caption,
      image,
      user: "Current User",
      time: new Date().toLocaleString(),
    };
    onPost(newPost); // send post to parent
    setCaption("");
    setImage(null);
  };

  return (
    <div className="create-post">
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {image && <img src={image} alt="Preview" width="100" />}
        <textarea
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
