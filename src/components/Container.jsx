
const Container = ({ children }) => {
    
    return (
        <div className="p-3 mr-auto ml-auto w-full md:w-[750px] lg:w-[800px] bg-gray-100 h-fit">
            {children}
        </div>
    )
}

export default Container;