import React, { Children } from "react";
import styles from "../../styles/button.module.scss";
import Link from "next/link";
interface ButtonProps {
  color?: string;
  children: React.ReactNode;
  href?: string;
}
const Button = ({ children, href }: ButtonProps) => {
  return (
    <Link href={href ? href : "#"}>
      <a className={styles.btn}>{children}</a>
    </Link>
  );
};

export default Button;
