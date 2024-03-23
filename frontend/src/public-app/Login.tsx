import { FormEvent } from "react";
import { Button } from "../components";
import { Credentials, useLoginMutation } from "../domain/auth";
import styles from "./login.module.scss";

export const Login = () => {
  const { mutate } = useLoginMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(e.currentTarget));
    mutate(payload as unknown as Credentials);
  };

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit}>
        <h1>Log in to your account</h1>
        <input name="email" placeholder="Email" />
        <input name="password" placeholder="Password" type="password" />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};
