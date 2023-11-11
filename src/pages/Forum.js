import React, { useContext, useState } from "react";
import NavbarHeader from "../components/NavbarHeader";
import { Food } from "../context";
import PopupChat from "../components/PopupChat";

function Forum() {

  const initialPosts = [
    {
      userId: 1,
      userPhotoURL:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fkiemtientuweb.com%2Favatar-fb.html&psig=AOvVaw2wdA5cJXltIHSGeEVwFfSa&ust=1679363780205000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCMCSpN6z6f0CFQAAAAAdAAAAABAE",
      username: "Lam",
      content: "Hello",
      createdAt: "2023-03-20T12:34:56.789Z",
      comments: [],
    },
  ];
  const [posts, setPosts] = useState(initialPosts);
  const [searchPost, setSearchPost] = useState("");

  const handleCommentSubmit = (postId, comment) => {
    const updatedPosts = posts.map((post) => {
      if (post.userId === postId) {
        return {
          ...post,
          comments: [...post.comments, comment],
        };
      } else {
        return post;
      }
    });
    setPosts(updatedPosts);
  };

  return (
    <div>
      <Food.Provider
        value={{
          searchPost,
          setSearchPost,
        }}
      >
        <NavbarHeader />
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">My Posts</div>
                <div className="card-body">
                  {posts.map((post) => (
                    <div className="post" key={post.userId}>
                      <div className="post-header">
                        <img
                          src={post.userPhotoURL}
                          alt="Avatar"
                          className="user-photo"
                        />
                        <div className="post-header-info">
                          <h5>{post.username}</h5>
                          <p className="text-muted">
                            {new Date(post.createdAt).toDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="post-body">
                        <p>{post.content}</p>
                      </div>
                      <div className="post-footer">
                        <button className="btn btn-link">
                          <i className="fas fa-heart"></i> Like
                        </button>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            const comment = e.target.comment.value;
                            handleCommentSubmit(post.userId, comment);
                            e.target.comment.value = "";
                          }}
                        >
                          <input
                            type="text"
                            name="comment"
                            placeholder="Add a comment"
                          />
                          <button type="submit">Submit</button>
                        </form>
                        <h3>Tất cả bình luận</h3>
                        <div className="comments">
                          {post.comments.map((comment, index) => (
                            <p key={index}>{comment}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  {posts.length === 0 && (
                    <p className="text-muted">No posts yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Food.Provider>
    </div>
  );
}

export default Forum;
