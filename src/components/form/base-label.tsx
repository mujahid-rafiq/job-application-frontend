
export default function BaseLabel(props:any) {
  return (
    <div className={`flex justify-center ${props.className}`}>
        <p className={`p-2 ${props.textSize ? props.textSize : 'text-[12px]'}`}>{props?.title}</p>
    </div>
  )
}
