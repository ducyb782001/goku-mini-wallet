import React from "react"

function MyQrCodeIcon(props) {
  return (
    <svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width={40} height={40} rx={20} fill="#022439" fillOpacity={0.4} />
      <rect x={11} y={22} width={7} height={7} rx={2} stroke="#0FF" strokeWidth={2} />
      <rect x={11} y={11} width={7} height={7} rx={2} stroke="#0FF" strokeWidth={2} />
      <rect x={22} y={11} width={7} height={7} rx={2} stroke="#0FF" strokeWidth={2} />
      <rect x={22} y={22} width={1} height={1} rx={0.5} fill="#0FF" stroke="#0FF" strokeWidth={2} />
      <rect x={28} y={22} width={1} height={1} rx={0.5} fill="#0FF" stroke="#0FF" strokeWidth={2} />
      <rect x={25} y={25} width={1} height={1} rx={0.5} fill="#0FF" stroke="#0FF" strokeWidth={2} />
      <rect x={22} y={28} width={1} height={1} rx={0.5} fill="#0FF" stroke="#0FF" strokeWidth={2} />
    </svg>
  )
}

export default MyQrCodeIcon
