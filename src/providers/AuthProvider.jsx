import { useEffect } from "react";
import { checkUserToken } from "../api/auth";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const getCurrentUser = async () => {
    try {
      const response = await checkUserToken();

      if (response.isSuccess) {
        //code
      } else {
        navigate("/");
        throw new Error(response.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  return <section>{children}</section>;
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};

export default AuthProvider;
