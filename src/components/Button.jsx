
const Button = ({ title, onClick, type }) => {
    return (
        <button type={type} className="pl-[18px] pr-[18px] pt-[3px] pb-[3px] text-[15px] bg-sky-400 rounded-sm text-white font-medium cursor-pointer" onClick={onClick}>{title}</button>
    )
}

export default Button