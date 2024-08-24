"use client";

import { useState } from "react";

function Add() {
  const [quantity, setQuantity] = useState(1);

  //temporary
  const stock = 4;

  function updateQuantity(operator: "+" | "-") {
    setQuantity((prev) => {
      if (operator === "+") {
        if (prev === stock) return stock;
        return prev + 1;
      }
      if (operator === "-") {
        if (prev - 1 === 0) return 1;
        return prev - 1;
      } else return 1;
    });
  }

  console.log(quantity + 1 === stock);

  return (
    <div className="flex flex-col gap-6">
      <h4>Choose a Quantity</h4>
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center">
          <button
            onClick={() => updateQuantity("-")}
            disabled={quantity - 1 === 0}
            className={
              "cursor-pointe rounded-l-full border-r border-background bg-muted px-3 py-1 hover:bg-primary hover:text-primary-foreground" +
              `${quantity - 1 === 0 ? "cursor-not-allowed hover:bg-muted" : ""}`
            }
          >
            -
          </button>
          <span className="bg-muted px-3 py-1">{quantity}</span>
          <button
            onClick={() => updateQuantity("+")}
            disabled={quantity === stock}
            className="cursor-pointer rounded-r-full border-l border-background bg-muted px-3 py-1 hover:bg-primary hover:text-primary-foreground"
          >
            +
          </button>
        </div>
        <p className="text-xs">
          Only <span className="font-semibold text-primary">4 items</span> left!
          <br /> Don&apos;t miss it
        </p>
      </div>
      <button className="mt-10 w-36 rounded-3xl px-4 py-2 text-sm text-primary ring-1 ring-primary hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:bg-primary/40 disabled:text-primary-foreground">
        Add to Cart
      </button>
    </div>
  );
}

export default Add;
