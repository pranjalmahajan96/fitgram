import { useDispatch, useSelector } from "react-redux";
import { logoutBtnPressed } from "../userSlice";
import { LoginForm } from "./LoginForm";

export const Login = () => {
  const dispatch = useDispatch();

  const login = useSelector((state) => state.user.loginStatus);
  const name = useSelector((state) => state.user.user.name);

  return login ? (
    <>
      <div className="container card card-shadow">
        {name} You are already logged in
        <button
          className="btn btn-filled btn-no-hover"
          onClick={() => dispatch(logoutBtnPressed())}
        >
          LogOut
        </button>
      </div>
    </>
  ) : (
    <div>
      <LoginForm />
    </div>
  );
};
