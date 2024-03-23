import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components";
import { CreateUserPayload, useRegisterMutation } from "../domain/auth";
import { paths } from "../util";
import styles from "./register.module.scss";

export const Register = () => {
  const { mutateAsync } = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(e.currentTarget));
    mutateAsync(payload as unknown as CreateUserPayload).then(() => {
      navigate(paths.login, { replace: true });
    });
  };

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit}>
        <h1>Register your account</h1>
        <input name="username" placeholder="Username" />
        <input name="email" placeholder="Email" />
        <input name="password" placeholder="Password" type="password" />
        <Button type="submit" size="md">
          Register
        </Button>
      </form>
    </div>
  );
};
