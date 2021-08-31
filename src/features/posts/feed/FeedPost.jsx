import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addCommentService, likePostService, unlikePostService, deletePostService } from "../postSlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

export const FeedPost = ({post}) => {
  const [placeholder, setPlaceholder] = useState("add a comment");
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.user._id);
  //console.log("userid in line 9",userId);

  const likePost = ( e, postId, userId) => {
    e.preventDefault();
    dispatch(likePostService({postId, userId}))
  }

  const unlikePost = (e, postId, userId) => {
    e.preventDefault();
    dispatch(unlikePostService({postId, userId}))
  }

  const addComment = (e, postId, comment ) => {
    e.preventDefault();
    setPlaceholder("add a comment")
    dispatch(addCommentService({comment, postId}));
  }

  const deletePost = (e, postId, userId) => {
    e.preventDefault();
    dispatch(deletePostService({postId, userId}));
  }

   return (
    <>
      <div className="card centered">
        <h5 className="post-left"> 
          <NavLink className="username-feed" to={ post?.postedBy?._id !== userId ? `/profile/${post?.postedBy?._id}` : `/profile`}> {post?.postedBy?.name} </NavLink>
          { 
            post?.postedBy?._id === userId 
            ? <button className="btn btn-outline btn-no-hover btn-right" onClick={(e) => deletePost(e, post._id, userId)}><MdDelete /></button> 
            : null 
          } 
         </h5>
        <div>
          <img
            className="card-img"
            src={post?.imageURL}
            alt="pic in the post"
          />
        </div>
        <div className="post-left"> 
          {
            post?.likes?.includes(userId) 
            ? <div> <button onClick={(e)=>unlikePost(e, post._id, userId)}>  <AiFillHeart /> </button> <span> {post?.likes?.length} likes</span> </div>
            : <div> <button onClick={(e)=>likePost(e, post._id, userId)}> <AiOutlineHeart /> </button> <span> {post?.likes?.length} likes</span> </div>
          }
         </div>
        <div className="post-left">
      
          <h5>{post?.postedBy?.username} <span>{post?.title}</span></h5>

          {
            post?.comments.map(comment => <div><h5>{comment?.commentedBy?.username} <span>{comment?.text}</span></h5> </div> )
          }

          <form onSubmit={ (e) => addComment(e, post._id, e.target[0].value) }>
          <input
            type="text"
            placeholder={placeholder}
          />
          </form>
         
        </div>
      </div>
    </>
  );
};
