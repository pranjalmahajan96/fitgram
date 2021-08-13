import "./styles.css";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./private-route";
import { Header, Login, Profile, Signup, Feed, Post, UserProfile, ExploreFeed } from "./features";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <PrivateRoute path="/post" element={<Post />} />
        <PrivateRoute path="/feed" element={<Feed />} />
        <PrivateRoute path="/explorefeed" element={<ExploreFeed />} />
        <PrivateRoute exact path="/profile" element={<Profile />} />
        <PrivateRoute path="/profile/:userId" element={<UserProfile />} />
      </Routes>
    </div>
  );
}
