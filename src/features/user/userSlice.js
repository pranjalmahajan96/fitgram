import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { customToast } from "../../features";

export const signupService = createAsyncThunk(
  "user/signup",
  async ({ name, username, email, password }) => {
    console.log("btn clicked");

    try {
      const response = await axios.post(
        "https://FitGramAPI.pranjalmahajan.repl.co/user/signup",
        {
          name: name,
          username: username,
          email: email,
          password: password
        }
      );
      if (response.data.success) {
        localStorage.setItem(
          "login",
          JSON.stringify({
            token: response.data.user.token,
            isUserLoggedIn: true
          })
        );
        console.log("user signed up");
        customToast("User SignUp Successful!");
      }
      return response.data;
    } catch (error) {
      console.log("Error occured: ", error.message);
      return Promise.reject(error.message);
    }
  }
);

export const loginService = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    console.log("btn clicked");
    try {
      localStorage?.clear();
      console.log("making the login network call");
      const response = await axios.post(
        "https://FitGramAPI.pranjalmahajan.repl.co/user/login",
        {
          email: email,
          password: password
        }
      );
      if (response.data.success) {
        localStorage.setItem(
          "login",
          JSON.stringify({
            token: response.data.user.token,
            isUserLoggedIn: true
          })
        );
        // axios.defaults.headers.common["Authorization"] =
        //   response.data.user.token;
        customToast("User Logged In!");
        console.log("user logged in");
      }
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log("Error occured: ", error.message);
      return Promise.reject(error.message);
    }
  }
);

export const getProfileService = createAsyncThunk("user/myProfile", async () => {
  const { token } = JSON.parse(localStorage?.getItem("login"));
  try{
    const response = await axios.get("https://fitgramapi.pranjalmahajan.repl.co/posts/getuserposts",{
      headers: { authorization: token }
    });
    if(response.data.success){
      console.log("got profile");
      return response.data;
    }else {
      console.log("error fetching profile");
      return response.data;
    }
  }catch (error){
    console.log("Error occures while fetching the profile ", error.message);
    return Promise.reject(error.message);
  }
})

export const getUserProfileService = createAsyncThunk("user/userProfile", async ( id ) => {
  const { token } = JSON.parse(localStorage?.getItem("login"));
  try{
    const response = await axios.get(`https://fitgramapi.pranjalmahajan.repl.co/user/${id}`,{
      headers: { authorization: token }
    });
    // console.log("got user's profile");
    // console.log(response.data)
    return response.data;
  }catch (error){
    console.log("Error occures while fetching the profile ", error.message);
    return Promise.reject(error.message);
  }
})

export const followBtnClicked = createAsyncThunk("user/followUser", async (followUserId) => {
  const { token } = JSON.parse(localStorage?.getItem("login"));
  try{
    console.log("sending follow req....")
    const response = await axios.put("https://fitgramapi.pranjalmahajan.repl.co/user/followUser", {
      followUserId
    }, {
      headers: { authorization: token }
    })
    console.log("successful")
    return response.data;
  }catch (error){
    console.log("Unable to follow user ", error.message);
    return Promise.reject(error.message);
  }
})

export const unfollowBtnClicked = createAsyncThunk("user/unfollowUser", async (unfollowUserId) => {
  const { token } = JSON.parse(localStorage?.getItem("login"));
  try{
    const response = await axios.put("https://fitgramapi.pranjalmahajan.repl.co/user/unfollowUser", {
      unfollowUserId
    }, {
      headers: { authorization: token }
    })
    return response.data;
  }catch (error){
    console.log("Unable to unfollow user ", error.message);
    return Promise.reject(error.message);
  }
})



const initialState = {
  loginStatus: false,
  user: {
    _id:null,
    name: null,
    username: null,
    email: null,
    bio: "",
    followers: [],
    following: [],
    posts: [],
    profilePic: ""
  },
  userLoading: true,
  isError: false,
  errorMsg: "",
  profileLoading: false,
  actionInProgress: false,
  userProfile: {
    user:{},
    posts:[]
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutBtnPressed: (state, action) => {
      localStorage.removeItem("login");
      state.user = {
        _id:null,
        name: null,
        username: null,
        email: null,
        bio: "",
        followers: [],
        following: [],
        posts: [],
        profilePic: ""
      };
      state.loginStatus = false;
      state.isError = false;
      state.errorMessage = "";
      state.userLoading = false;
      state.profileLoading = false;
      state.actionInProgress = false;
      state.userProfile = {
        user:{},
        posts:[]
      }
    }
  },
  extraReducers: {
    [signupService.pending]: (state, action) => {
      state.userLoading = true;
    },
    [signupService.fulfilled]: (state, action) => {
      state.userLoading = false;
      if (action.payload.success) {
        state.loginStatus = true;
        state.user = action.payload.user;
        state.isError = false;
        state.errorMessage = "";
      }
    },
    [signupService.rejected]: (state, action) => {
      state.userLoading = false;
      state.isError = true;
      state.errorMsg = action.error.message;
    },


    [loginService.pending]: (state, action) => {
      state.userLoading = true;
    },
    [loginService.fulfilled]: (state, action) => {
      state.userLoading = false;
      if (action.payload.success) {
        state.loginStatus = true;
        state.user = action.payload.user;
        state.isError = false;
        state.errorMessage = "";
       
      }
    },
    [loginService.rejected]: (state, action) => {
      state.userLoading = false;
      state.isError = true;
      state.errorMsg = action.error.message;
    },


    [getProfileService.pending]: (state) => {
      state.profileLoading = true;
    },
    [getProfileService.fulfilled]: (state, action) => {
      state.profileLoading = false; 
      state.user.posts = action.payload.posts;
    },
    [getProfileService.rejected]: (state, action) => {
      state.profileLoading = false; 
      state.isError = true;
      state.errorMsg = action.error.message;
    },

    [getUserProfileService.pending]: (state) => {
      state.profileLoading = true;
    },
    [getUserProfileService.fulfilled]: (state, action) => {
      state.profileLoading = false; 
      state.userProfile.user = action.payload.user;
      state.userProfile.posts = action.payload.posts;
    },
    [getUserProfileService.rejected]: (state, action) => {
      state.profileLoading = false; 
      state.isError = true;
      state.errorMsg = action.error.message;
    },

    [followBtnClicked.pending]: (state) => {
      state.actionInProgress = true;
    },
    [followBtnClicked.fulfilled]: (state, action) => {
      state.actionInProgress = false;
      state.user = action.payload.user;
      state.userProfile.user = action.payload.followUser;
    },
    [followBtnClicked.rejected]: (state, action) => {
      state.actionInProgress = false; 
      state.isError = true;
      state.errorMsg = action.error.message;
    },

    [unfollowBtnClicked.pending]: (state) => {
      state.actionInProgress = true;
    },
    [unfollowBtnClicked.fulfilled]: (state, action) => {
      state.actionInProgress = false;
      state.user = action.payload.user;
      state.userProfile.user = action.payload.unfollowUser;
    },
    [unfollowBtnClicked.rejected]: (state, action) => {
      state.actionInProgress = false; 
      state.isError = true;
      state.errorMsg = action.error.message;
    },

   
  }
});

export const { logoutBtnPressed } = userSlice.actions;

export default userSlice.reducer;
