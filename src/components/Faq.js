import React from "react";
import FaqItem from "./FaqItem";

function Faq(props) {
  return (
    <>
      {props.items.map((item, index) => (
        <FaqItem
          question={item.question}
          answer={item.answer}
          key={index}
        ></FaqItem>
      ))}
      <form action="https://lively-aromatic-doll.glitch.me" method="GET">
        <input type="text" name="values" placeholder="$65.90" /> 
        <input type="text" name="urls" placeholder="http://www.robotis.us/brands/DYNAMIXEL.html" /> 
        <input type="submit" /> 
      </form>
    </>
  );
}

export default Faq;
