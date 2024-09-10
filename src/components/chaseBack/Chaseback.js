import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginStatus } from "../../service/auth-service";
import { SET_LOGIN } from "../../redux/authState";
import { toast } from "react-toastify";

const Chaseback = (path) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const chaseBack = async () => {
      console.log("Chaseback api getStatus useEffect run...");
      const LoginStatus = await loginStatus();

      if (LoginStatus) {
        dispatch(SET_LOGIN(LoginStatus));
        return;
      } else {
        toast.error("Session expired, please login to continue.");
        navigate(path);
        return;
      }
    };

    chaseBack();
  }, []);

  return <div>Chaseback</div>;
};

export default Chaseback;
