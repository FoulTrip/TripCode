import React from "react";
import styles from "./getstart.module.css";
import { BsArrowRightShort } from "react-icons/bs";
import { useRouter } from "next/navigation";

function BtnGetStart({ text }: { text: string }) {
  const router = useRouter();

  const handler_redirect = () => {
    router.push("account/signin");
  };

  return (
    <>
      <div className={styles.boxBtnPanel} onClick={handler_redirect}>
        <div className={styles.panelBtn}>
          <p className={styles.textProp}>{text}</p>
          <div className={styles.boxIcon}>
            <BsArrowRightShort size={25} />
          </div>
        </div>
      </div>
    </>
  );
}

export default BtnGetStart;
