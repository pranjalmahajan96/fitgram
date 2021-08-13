import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { followBtnClicked, unfollowBtnClicked, getUserProfileService } from "../userSlice";

export const UserProfile = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.user.userProfile.posts)
  const user = useSelector( state => state.user.userProfile.user);
  const { profileLoading, isError, errorMsg } = useSelector(state => state.user);
  const id = useSelector(state => state.user.user._id);
  const { userId } = useParams();
 
  useEffect(async ()=>{
    dispatch(getUserProfileService(userId));
  },[])


  return (
    <div className="container">
      {
          isError ? <div>Error occured....{errorMsg}</div> : null
      }

      {
        profileLoading 
        ? <div>Profile Loading...</div>
        : <>
          <div className="profile-1 flex-dis">
              <div>
                <img
                  className="user-profile-pic"
                  src={user?.profilePic}
                  alt="profile-pic"
                />
              </div>
              
              <div className="user-details float-right">
                <div>{user?.name}</div>
                <div className="user-bio">
                   posts <strong>{posts?.length} </strong>
                  <span>
                    followers <strong> {user?.followers?.length} </strong>
                  </span>
                  <span>
                    following <strong> {user?.following?.length} </strong>
                  </span>
                </div>
                <div className="user-bio">{user?.bio}</div>
                {
                  user?.followers?.includes(id) 
                  ? <button className="btn btn-no-hover btn-outline btn-profile" onClick={()=>dispatch(unfollowBtnClicked(userId))}  >
                      UNFOLLOW
                    </button>
                  :  <button className="btn btn-no-hover btn-outline btn-profile" onClick={()=>dispatch(followBtnClicked(userId))}  >
                      FOLLOW
                    </button>
                }
              </div>

            </div>
            <div className="profile-2">
              {
                posts?.map(post => <div key={post?._id}> <img className="profile-grid"  src={post?.imageURL} alt={post?.title}/> </div>)
              }
            </div>
          </>
      }
      
    </div>
  );
};
