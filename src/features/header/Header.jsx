import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutBtnPressed } from "../user/userSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const login = useSelector(state=>state.user.loginStatus)
  return (
    <div>
      <nav className="navigation">
        <div className="nav-brand">
          <NavLink to="/feed" className="link">
            FitGram
          </NavLink>
        </div>

        <ul className="list-non-bullet nav-pills">
          <li className="list-item-inline">
            <NavLink to="/post" className="link link-active">
              Post
            </NavLink>
          </li>
          <li className="list-item-inline">
            <NavLink to="/feed" className="link link-active">
              Feed
            </NavLink>
          </li>
          <li className="list-item-inline">
            <NavLink to="/explorefeed" className="link link-active">
              Explore
            </NavLink>
          </li>
          <li className="list-item-inline">
            <NavLink to="/profile" className="link link-active">
              Profile
            </NavLink>
          </li>
          <li className="list-item-inline">
            <NavLink to="/login" className="link link-active">
             { login ?  
             <button
              className="btn btn-outline btn-no-hover btn-header"
              onClick={() => dispatch(logoutBtnPressed())}
            > Logout  </button> 
            : "Login" }
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
