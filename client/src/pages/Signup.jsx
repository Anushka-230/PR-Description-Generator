import { useState } from "react";
import { signup } from "../services/authService";
import { useAuth } from "../context/AuthContext";
const Signup = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({
    name: "",
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
      const data = await signup(form);


      console.log(data);
      login(data.user, data.token);

      navigate("/dashboard");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />

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

      <button>Signup</button>
    </form>
  );
};

export default Signup;