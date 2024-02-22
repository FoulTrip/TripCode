import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCopy } from "react-icons/fa";
import { IoCopy, IoCheckmark } from "react-icons/io5";
import styles from "./copy.module.css";

const CopyableText = ({
  text,
  copy,
  label,
}: {
  text: string;
  copy: boolean;
  label: string;
}) => {
  const [isCopied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // Reset copied state after 1.5 seconds
  };

  return (
    <div className={styles.boxCopy}>
      <p className={styles.label}>{label}</p>
      <p className={styles.text}>{text}</p>
      {copy ? (
        <CopyToClipboard text={text} onCopy={handleCopy}>
          <div className={styles.btnCopy}>
            {!isCopied ? (
              <IoCopy className={styles.iconCopy} size={18} />
            ) : (
              <IoCheckmark className={styles.iconCopy} size={20} />
            )}
          </div>
        </CopyToClipboard>
      ) : null}
      {/* {isCopied && <span className={styles.labelCopy}>Copied!</span>} */}
    </div>
  );
};

export default CopyableText;
