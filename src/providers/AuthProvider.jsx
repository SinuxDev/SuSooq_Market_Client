import { useEffect, useCallback } from "react";
import { checkUserToken } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setUser } from "../store/slices/userSlice";

import PropTypes from "prop-types";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = useCallback(() => {
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await checkUserToken();

        if (response.isSuccess) {
          dispatch(setUser(response.userDoc));
        } else {
          localStorage.removeItem("token");
          dispatch(setUser(null));
          handleNavigate();
          throw new Error(response.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getCurrentUser();
  }, [handleNavigate, dispatch]);
  return <section>{children}</section>;
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};

export default AuthProvider;
