import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { FeedPost } from "./FeedPost";
import { getFeedService } from "../postSlice";

export const Feed = () => {

  const {feed, loadingStatus, isError, errorMsg} = useSelector(state => state.post);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    (async () => {
      console.log(loadingStatus)
      if (!loadingStatus){
        dispatch(getFeedService());
      }
    })();
  },[])

  return (
    <div className="container">
      {
      isError ? <div>Error occured....{errorMsg}</div> : null
      }

      {
        loadingStatus ? <div>Feed Loading...</div> :  feed.length 
                                                      ? feed.map(post => <div key={post?._id}> <FeedPost post={post} /> </div>) 
                                                      : <div>Follow People to see Posts</div> 
     }
     
    </div>
  );
};
