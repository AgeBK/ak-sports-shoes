import React from "react";
import Button from "./Button";
import { DataProps } from "../lib/definitions";
import styles from "@/app/css/Paging.module.css";

type PagingButtonsProps = {
  pagesReq: number;
  currentPage: number;
  handlePaging: (page: number) => void;
};

type PagingProps = {
  products: DataProps[];
  pageLimit: number;
  currentPage: number;
  handlePaging: (page: number) => void;
};

const PagingButtons = ({
  pagesReq,
  currentPage,
  handlePaging,
}: PagingButtonsProps) => {
  const html = [];
  for (let i = 0; i < pagesReq; i++) {
    const current = currentPage === i;
    html.push(
      <li key={i} className={`${current && styles.highlight}`}>
        <Button onClick={() => handlePaging(i)} css="paging">
          {i + 1}
        </Button>
      </li>
    );
  }
  return <ul className={styles.buttonCont}>{html}</ul>;
};

export default function Paging({
  products,
  pageLimit,
  currentPage,
  handlePaging,
}: PagingProps) {
  const prodLength = products.length;
  const pagesReq = Math.ceil(prodLength / pageLimit);

  console.log("Paging");
  console.log(currentPage);
  console.log(pagesReq);

  if (prodLength > pageLimit) {
    return (
      <div className={styles.container}>
        <div className={styles.back}>
          <Button
            onClick={() => handlePaging(currentPage - 1)}
            css="paging"
            disabled={currentPage < 1}
          >
            &lt; Prev
          </Button>
        </div>
        <PagingButtons
          pagesReq={pagesReq}
          currentPage={currentPage}
          handlePaging={handlePaging}
        />
        <div className={styles.fwd}>
          <Button
            onClick={() => handlePaging(currentPage + 1)}
            css="paging"
            disabled={pagesReq <= currentPage + 1}
          >
            Next &gt;
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
