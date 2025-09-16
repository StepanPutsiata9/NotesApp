import * as React from "react"
import Svg, { Path, Rect, SvgProps } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={34}
    height={34}
    fill="none"
    viewBox="0 0 172 173"
    {...props}
  >
    <Path
      fill="#6A3EA1"
      fillRule="evenodd"
      d="M86 173c47.496 0 86-38.727 86-86.5S133.496 0 86 0 0 38.727 0 86.5c0 15.652 4.133 30.334 11.362 43h.138c6.043 4.376 14.5.059 14.5-7.403V33h118v62.48c0 18.224 0 27.336-3.603 34.271a31.995 31.995 0 0 1-13.646 13.646C119.816 147 110.704 147 92.48 147H24.535C40.147 163.044 61.917 173 86 173Z"
      clipRule="evenodd"
    />
    <Rect width={84} height={15} x={44} y={71} fill="#6A3EA1" rx={6} />
    <Rect width={63} height={15} x={44} y={96} fill="#6A3EA1" rx={6} />
    <Rect width={14} height={15} x={114} y={96} fill="#6A3EA1" rx={7} />
  </Svg>
)
export default SvgComponent
