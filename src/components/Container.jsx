
const Container = ({ children }) => {
    
    return (
        <div className="pl-3 pr-3 mr-auto ml-auto w-full md:w-[750px] lg:w-[800px] bg-gray-100 h-[100vh] ">
            {children}
        </div>
    )
}

export default Container;