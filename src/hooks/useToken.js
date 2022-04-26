import axios from "axios";
import { useEffect, useState } from "react";

const useToken = (user) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const getToken = async () => {
        console.log(user)
        const email = user?.user?.email;
      const { data } = await axios.post(
        "https://powerful-hollows-72000.herokuapp.com/login",
        { email }
      );
      localStorage.setItem("accessToken", data.accessToken);
      setToken(data.accessToken);
    };
    getToken();
  }, [user]);
  return [token];
};

export default useToken;
