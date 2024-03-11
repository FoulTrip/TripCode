"use client"

import React from "react";
import styles from "./payComponent.module.css";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";

function PayComponent({ userId }: { userId: string | undefined }) {
  return (
    <>
      <div className={styles.cardPay}>
        <div>
          <p>Total</p>
          <h1>10'000.000.00 COP</h1>
        </div>
        <div>
          <PayPalScriptProvider
            options={{
              clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
            }}
          >
            <PayPalButtons
              style={{
                color: "blue",
                layout: "horizontal",
              }}
              createOrder={async () => {
                const order = await axios.post("api/checkout");
                console.log(order);
                return order.data.id;
              }}
              onApprove={(data, actions) => {
                return new Promise((resolve, reject) => {
                  console.log(data);
                  if (actions.order) {
                    actions.order
                      .capture()
                      .then(() => {
                        resolve();
                      })
                      .catch((error) => {
                        console.error(error);
                        reject(error);
                      });
                  }
                });
              }}
              onCancel={(data) => {
                console.log("canceled", data);
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </>
  );
}

export default PayComponent;
