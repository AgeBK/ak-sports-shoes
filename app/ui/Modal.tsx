import { ReactNode } from "react";
import Button from "./Button";
import styles from "@/app/css/Modal.module.css";

type ModalProps = {
  children: ReactNode;
  show: boolean;
  setShow: (show: boolean) => void;
};

export default function Modal({ children, show, setShow }: ModalProps) {
  const modal = (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Button css="close" onClick={() => setShow(false)}>
          X
        </Button>
        {children}
      </div>
    </div>
  );
  return <>{show ? modal : null}</>;
}
