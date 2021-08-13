import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExploreFeedService } from "../postSlice";
import { ExploreFeedPost } from "./ExplorePost";

export const ExploreFeed = () => {

  const {feed, loadingStatus, isError, errorMsg} = useSelector(state => state.post);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    (async () => {
      console.log(loadingStatus)
      if (!loadingStatus){
        dispatch(getExploreFeedService());
      }
    })();
  },[])

  return (
    <div className="container">
      {
      isError ? <div>Error occured....{errorMsg}</div> : null
      }

      {
        loadingStatus ? <div>Feed Loading...</div> : feed.map(post => <div key={post?._id}> <ExploreFeedPost post={post} /> </div>) 
                                                      
     }
     
    </div>
  );
};
