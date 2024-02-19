import axios from "axios";
import { getUserInfo } from "../helpers/getUserInfo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [login, setLogin] = useState({ username: "", password: "" });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/auth/login`, login);
      const token = res.data.data.token;
      localStorage.setItem("token", token);

      const user = getUserInfo(token);

      switch (user.role) {
        case "MARKETING":
          navigate("/marketing");
          break;
      }
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <>
      {error ? (
        <div role="alert" className="absolute alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 stroke-current shrink-0"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Username atau Password Salah</span>
        </div>
      ) : null}
      <div className="flex items-center justify-center w-screen h-screen bg-blue-200">
        <div className="flex flex-col gap-8 p-8 shadow-xl card w-96 bg-base-100">
          <h1 className="text-2xl font-bold text-center text-slate-900">
            Login
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex items-center gap-2 input input-bordered">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                onChange={handleChange}
                name="username"
                value={login.username}
                type="text"
                className="grow"
                placeholder="Username"
                required
              />
            </label>
            <label className="flex items-center gap-2 input input-bordered">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                onChange={handleChange}
                name="password"
                value={login.password}
                type="password"
                className="grow"
                placeholder="Password"
                required
              />
            </label>
            <button className="btn btn-primary " type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
