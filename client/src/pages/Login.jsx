import { useState } from "react";
import { login as loginUser} from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(form);

      console.log(data);

      // Save JWT
      login(data.user, data.token);

      navigate("/dashboard");

    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button>Login</button>
    </form>
  );
};

export default Login;