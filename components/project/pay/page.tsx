import React, { FormEvent } from "react";

function PayProjectSetting() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text"  />
      </form>
    </>
  );
}

export default PayProjectSetting;
