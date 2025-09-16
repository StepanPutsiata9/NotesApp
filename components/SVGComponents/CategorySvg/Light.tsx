import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
  <Svg width={22} height={22} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.858 15.583h4.284M11 2.75v.917m5.834 1.5-.649.648M19.25 11h-.917M3.667 11H2.75m3.064-5.185-.648-.649m2.593 9.075a4.583 4.583 0 1 1 6.482 0l-.502.501a3.094 3.094 0 0 0-.906 2.188v.487a1.833 1.833 0 0 1-3.666 0v-.487c0-.82-.326-1.607-.906-2.188l-.502-.501Z"
    />
  </Svg>
);
export default SvgComponent;
