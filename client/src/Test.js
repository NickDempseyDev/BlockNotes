import React from "react";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

export default function Test() {

	const parser = (text) => {
		let arr = [];
		arr = text.split("$$");
		console.log(arr.length);
		return arr
	}

  return (
    <div>
		{parser("This is the test $$\\int_0^\\infty x^2 dx$$ Another test").map((x, i) => {
			return  (i % 2 === 0 ? <span>{x}</span> : <InlineMath>{x}</InlineMath>)
		})}
      {/* <p id="maths"></p>
      <span>This is a normal sentence </span>
      <BlockMath>{"\\int_0^\\infty x^2 dx"}</BlockMath> */}
    </div>
  );
}
