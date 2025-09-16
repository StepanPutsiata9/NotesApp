import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
  <Svg width={22} height={22} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.583 2.75v3.667M2.75 4.583h3.667m-.917 11v3.667m-1.833-1.833h3.666M11.917 2.75l2.095 6.286L19.25 11l-5.238 1.964-2.095 6.286-2.096-6.286L4.583 11l5.238-1.964 2.096-6.286Z"
    />
  </Svg>
);
export default SvgComponent;
