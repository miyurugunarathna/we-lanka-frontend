import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUserDetails } from "../utils/helper";
import { setUser, setIsLoggedIn } from "../store/User";

const useFetchUserProfile = async (isProtected = true) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const state = useSelector((states) => states.user);

  if (token && !state.isLoggedIn) {
    const user = await getUserDetails();
    if (user && user?._id) {
      dispatch(setUser(user));
      dispatch(setIsLoggedIn(true));
    } else {
      /* eslint-disable no-lonely-if */
      if (isProtected) navigate("/");
    }
  }
};

export default useFetchUserProfile;
