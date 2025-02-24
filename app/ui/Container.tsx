import { ReactNode } from "react";
import Header from "./Header";
// import Footer from "./Footer"; // TODO:
import styles from "@/app/css/Container.module.css";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <Header />
      {children}
      {/* <Footer/> */}
    </div>
  );
}
