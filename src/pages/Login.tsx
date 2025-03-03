import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "../api/api";

const LoginForm = ({ setIsAuthenticated }: { setIsAuthenticated: (auth: boolean) => void }) => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const data = await login(values.email, values.password);

      if (data.success) {
        localStorage.setItem("token", data.data.token);
        setIsAuthenticated(true);
        navigate("/profile");
      } else {
        message.error("Invalid email or password");
      }
    } catch (error) {
      message.error("Login failed, try again later");
    }
  };

  return (
    <Form name="login" onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Email address"
        name="email"
        rules={[{ required: true, message: "Enter your email!" }, { type: "email", message: "Incorrect email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Enter your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
