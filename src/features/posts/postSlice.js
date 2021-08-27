import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getExploreFeedService = createAsyncThunk("post/getexplorefeed", async () => {
    console.log("getting explore feed...");
    const { token } = JSON.parse(localStorage?.getItem("login")); 
    console.log({token});
    const response = await axios.get("https://fitgramapi.pranjalmahajan.repl.co/posts/getallposts",{
        headers: { authorization: token }
    });
    console.log("got feed...")
    return response.data;
 });

export const getFeedService = createAsyncThunk("post/getfeed", async () => {
    console.log("getting feed...");
    const { token } = JSON.parse(localStorage?.getItem("login")); 
    console.log({token});
    const response = await axios.get("https://fitgramapi.pranjalmahajan.repl.co/posts/getfollowingposts",{
        headers: { authorization: token }
    });
    console.log("got feed...")
    return response.data;
 });

export const createPostService = createAsyncThunk("post/createpost", async ( {title, imageURL}) => {
    const { token } = JSON.parse(localStorage?.getItem("login"));
    try{
        console.log("sending create post request");
        const response = await axios.post("https://FitGramAPI.pranjalmahajan.repl.co/posts/createpost",{
            title,
            imageURL
        }, {
            headers : { authorization: token } 
        });
        if(response.data.success){
            console.log("post created successfuly")
            return response.data
        } else{
            console.log("could not create post")
            return response.data
        }
    } catch (error){
        console.log("Error occured: ", error.message);
        return Promise.reject(error.message);
    }
});

export const likePostService = createAsyncThunk("post/likepost", async ( {postId, userId} ) => {
   // console.log("liking post...");
    const { token } = JSON.parse(localStorage?.getItem("login")); 
    // console.log({token})
    // console.log({postId})
        if(token){
            // console.log("sending req to like fn...")
            const response = await axios.put(`https://fitgramapi.pranjalmahajan.repl.co/posts/${postId}/likepost`, {
                userId
            });
              
            //   console.log("liked post");
            //   console.log(response)
              return response.data;
        } else {
            console.log("not working..")
        }
} )

export const unlikePostService = createAsyncThunk("post/unlikepost", async ( {postId, userId} ) => {
  //  console.log("unliking post...");
    const token = JSON.parse(localStorage?.getItem("login")); 
    try{
       // console.log("sending req to unlike fn...")
        const response = await axios.put(`https://fitgramapi.pranjalmahajan.repl.co/posts/unlikepost`, {
            postId,
            userId
        });
        //  console.log("unliked post");
        //  console.log(response)
         return response.data;
    } catch (error) {
        console.log("Error occured: ", error.message);
        return Promise.reject(error.message);
    }
} )

export const addCommentService = createAsyncThunk("post/addcomment", async ( {comment, postId} ) => {
    // console.log("adding comment....");
    const token = JSON.parse(localStorage?.getItem("login")); 
    try{
        // console.log("sending add comment req...")
        const response = await axios.put(`https://fitgramapi.pranjalmahajan.repl.co/posts/addcomment`, {
            postId,
            text: comment
        } ,{
            headers: {authorization: token.token}
        });
        if(response.data.success){
            // console.log("comment added successfuly")
            return response.data
        } else{
            // console.log("could not add comment")
            return response.data
        }   
    } catch (error) {
        console.log("Error occured: ", error.message);
        return Promise.reject(error.message);
    }
})

export const deletePostService = createAsyncThunk("post/deletePost", async ({ postId, userId }) => {
    try{
    //   console.log("sending del req")
      const response = await axios.delete(`https://fitgramapi.pranjalmahajan.repl.co/posts/${postId}/${userId}/deletepost`);
        if(response.data.success){
        //   console.log(" post deleted ");
            return response.data
        } else{
            console.log("could not delete post");
            return response.data
        }
    }catch (error){
        console.log("Error occured: ", error.message);
        return Promise.reject(error.message);
    }
  })



const initialState = {
    feed: [],
    loadingStatus:false,
    isError: false,
    errorMsg: "",
    postList: [],
    actionInProgress: false
}

export const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{
        resetState(state) {
            state.feed = [];
            state.loadingStatus = false;
            state.isError = false;
            state.errorMsg = "";
            state.postList = [];
            state.actionInProgress = false;
            state.postUpload = "initial";
        },
    },
    extraReducers: {

        [getExploreFeedService.pending]: (state) => {
            state.loadingStatus = true;
        },
        [getExploreFeedService.fulfilled]: (state, action) => {
            state.loadingStatus = false;
            state.feed = action.payload.posts;
            state.isError = false;
            state.errorMsg = "";
        },
        [getExploreFeedService.rejected]: (state, action) => {
            state.loadingStatus = false;
            state.isError = true;
            state.errorMsg = action.error.message;
        },
        
        [getFeedService.pending]: (state) => {
            state.loadingStatus = true;
        },
        [getFeedService.fulfilled]: (state, action) => {
            state.loadingStatus = false;
            state.feed = action.payload.posts;
            state.isError = false;
            state.errorMsg = "";
        },
        [getFeedService.rejected]: (state, action) => {
            state.loadingStatus = false;
            state.isError = true;
            state.errorMsg = action.error.message;
        },

        [createPostService.pending]: (state) => {
            state.postUpload = "uploading";
            state.actionInProgress = true;
        },
        [createPostService.fulfilled]: (state, action) => {
            state.postUpload = "uploaded";
            state.actionInProgress = false;
            state.feed = [...state.feed, action.payload.post];
        },
        [createPostService.rejected]: (state, action) => {
            state.postUpload = "error";
            state.actionInProgress = false;
            state.isError = true;
            state.errorMsg = action.error.message;
        },

        [likePostService.pending]: (state) => {
            state.actionInProgress = true;
        },
        [likePostService.fulfilled]: (state, action) => {
            state.actionInProgress = false;
            if(action.payload.success){
                const post = state.feed.find( 
                    post => post._id === action.payload.post._id
                    );
                    post.likes = action.payload.post.likes;
            }
        },
        [likePostService.rejected]: (state, action) => {
            state.actionInProgress = false;
            state.isError = true
            state.errorMsg = action.error.message;
        },

        [unlikePostService.pending]: (state) => {
            state.actionInProgress = true;
        },
        [unlikePostService.fulfilled]: (state, action) => {
            state.actionInProgress = false;
            if(action.payload.success){
                const post = state.feed.find(
                    post => post._id === action.payload.post._id
                );
                post.likes = action.payload.post.likes;
            }
        },
        [unlikePostService.rejected]: (state, action) => {
            state.actionInProgress = false;
            state.isError = true;
            state.errorMsg = action.error.message;
        },

        [addCommentService.pending]: (state) => {
            state.actionInProgress = true;
        },
        [addCommentService.fulfilled]: (state, action) => {
            state.actionInProgress = false;
            if(action.payload.success){
                const post = state.feed.find(
                    post => post._id === action.payload.post._id
                );
                post.comments = action.payload.post.comments;
            }
        },
        [addCommentService.rejected]: (state, action) => {
            state.actionInProgress = false;
            state.isError = true;
            state.errorMsg = action.error.message;
        },

        [deletePostService.pending]: (state) => {
            state.actionInProgress = true;
          },
          [deletePostService.fulfilled]: (state, action) => {
            state.actionInProgress = false;
            if(action.payload.success){
               state.feed = state.feed.filter(
                   (post) => post._id !== action.payload.post._id 
                )
            }
          },
          [deletePostService.rejected]: (state, action) => {
            state.actionInProgress = false;
            state.isError = true;
            state.errorMsg = action.error.message;
          }
        
    }
});

export const { resetState } = postSlice.actions;

export default postSlice.reducer;