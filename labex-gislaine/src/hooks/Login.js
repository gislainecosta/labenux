import React, { useEffect } from "react";
import { useHistory } from "react-router";

const FuncaoLogin = () => {
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token === null) {
      history.push("/");
    }
  }, [history]);

};

export default FuncaoLogin;
