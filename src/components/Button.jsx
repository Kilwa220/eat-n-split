
const Button = ({ title, onClick }) => {
    return (
        <button className="pl-[18px] pr-[18px] pt-[5px] pb-[5px] bg-sky-400 rounded-sm text-white font-medium cursor-pointer" onClick={onClick}>{title}</button>
    )
}

export default Button