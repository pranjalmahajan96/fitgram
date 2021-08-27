import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPostService } from "../postSlice";

export const Post = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [imageURL,setImageURl] = useState("");
  const [ err, setErr] = useState("");
  const dispatch = useDispatch();
  const { postUpload } = useSelector(state => state.post);
  const navigate = useNavigate();

  useEffect(async ()=>{
    if(imageURL !== "" || title !== ""){
      try{
          // console.log({title});
          // console.log({imageURL});
          // console.log("calling dispatch")
         dispatch(createPostService({title,imageURL}));
         navigate("/explorefeed")
      } catch (error){
        console.log("error while creating the post",error);
      }
    }
  },[imageURL])

  const uploadHander = async () => {
    
    if(!title || !image){
      return setErr("Both title and image is required");
    }

    const data = new FormData();
    data.append("file",image);
    data.append("upload_preset","fitgram");
    data.append("cloud_name","cloud-pranjal");
    
    try{
      console.log("uploading....")
      const response = await axios.post("https://api.cloudinary.com/v1_1/cloud-pranjal/image/upload", data );
      console.log("image uploaded")
      console.log(response.data.secure_url);
      setImageURl(response.data.secure_url);
      return response.data;
    } catch (error){
      console.log("error occured while uploading the image: ",error);
    }
  };

  return (
    <div className="container">
      <div className="card wrapper-input">
        <div>
          <h4>New Post</h4>
          <input
            type="text"
            value={title}
            placeholder="add a title"
            onChange={(e) => {
              setErr("");
              setTitle(e.target.value)}}
          />

          <div>
            <input type="file" onChange={(e)=>{
              setImage(e.target.files[0])
              setErr("");
              }} />
            <span> {err ? err : null} </span>
              <button
                className="btn btn-outline btn-no-hover "
              
                onClick={() => uploadHander()}
              >
                Upload
              </button>
           
          </div>
        </div>
        
      </div>
    </div>
  );
};
