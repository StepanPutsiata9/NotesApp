import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
  <Svg width={22} height={22} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.75 2.75h1.833l.367 1.833m1.467 7.334h9.166l3.667-7.334H4.95m1.467 7.334L4.95 4.583m1.467 7.334-2.102 2.101c-.578.578-.169 1.565.648 1.565h10.62m0 0a1.833 1.833 0 1 0 0 3.667 1.833 1.833 0 0 0 0-3.667ZM8.25 17.417a1.833 1.833 0 1 1-3.667 0 1.833 1.833 0 0 1 3.667 0Z"
    />
  </Svg>
);
export default SvgComponent;
