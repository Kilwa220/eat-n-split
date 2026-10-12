
const Button = ({ title, onClick }) => {
    return (
        <button className="pl-[20px] pr-[20px] pt-[10px] pb-[10px]" onClick={onClick}>{title}</button>
    )
}

export default Button