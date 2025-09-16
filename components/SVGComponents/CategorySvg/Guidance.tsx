import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
  <Svg width={22} height={22} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      d="M8.25 4.583H6.417c-1.013 0-1.834.821-1.834 1.834v11c0 1.012.821 1.833 1.834 1.833h9.166c1.013 0 1.834-.82 1.834-1.833v-11c0-1.013-.821-1.834-1.834-1.834H13.75m-5.5 0c0 1.013.82 1.834 1.833 1.834h1.834c1.012 0 1.833-.821 1.833-1.834m-5.5 0c0-1.012.82-1.833 1.833-1.833h1.834c1.012 0 1.833.82 1.833 1.833M11 11h2.75M11 14.667h2.75M8.25 11h.01m-.01 3.667h.01"
    />
  </Svg>
);
export default SvgComponent;
