import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileService  } from "../userSlice";

export const Profile = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.user.user.posts)
  const user = useSelector( state => state.user.user);
  const { profileLoading, isError, errorMsg } = useSelector(state => state.user);
  
  useEffect(async () => {
    dispatch(getProfileService());
  },[])


  return (
    <div className="container">
      {
          isError ? <div>Error occured....{errorMsg}</div> : null
      }

      {
        profileLoading 
        ? <div>Profile Loading...</div> 
        :<>
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
                posts <strong>{posts?.length}  </strong> 
              <span>
                followers <strong> {user?.followers?.length}  </strong>
              </span>
              <span>
               following <strong> {user?.following?.length}  </strong>
             </span>
         </div>

          <div className="user-bio">{user?.bio}</div>
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
