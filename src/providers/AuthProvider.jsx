import { useEffect, useCallback } from "react";
import { checkUserToken } from "../api/auth";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await checkUserToken();

        if (response.isSuccess) {
          //code
        } else {
          handleNavigate();
          throw new Error(response.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getCurrentUser();
  }, [handleNavigate]);
  return <section>{children}</section>;
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};

export default AuthProvider;
