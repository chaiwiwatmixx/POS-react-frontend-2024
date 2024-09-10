import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN, selectUsername } from "../../redux/authState";
import { logoutUser } from '../../service/auth-service';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector(selectUsername);

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login");
  };

  return (
    <div className="top-bar">
      <div className="-intro-x breadcrumb mr-auto hidden sm:flex text-2xl">
        {username}
      </div>
      <button onClick={logout} className="btn btn-primary shadow-md mr-2">
        Logout
      </button>
    </div>
  );
};

export default Header;
