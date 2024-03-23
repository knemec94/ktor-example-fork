import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
}

export const Button = ({ size = "md", className, ...rest }: ButtonProps) => (
  <button className={clsx(styles.base, styles[size], className)} {...rest} />
);
