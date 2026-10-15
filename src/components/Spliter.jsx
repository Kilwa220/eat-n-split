import { useState } from "react"


const Spliter = ({ openFriend, setOpenFriend, friends, setFriends }) => {
    const [formData, setFormData] = useState({
        bill: "",
        expense: "",
        fexpense: "",
    })

    // get the current friend you are spliting the bill with
    const currentFriend = friends.find((friend) => openFriend.id === friend.id)

    const handleBill = (e) => {
        let billNumber = +e.target.value
        !Number.isInteger(billNumber)
        ? setFormData({
            ...formData,
            bill: NaN
        })
        : setFormData({
            ...formData,
            bill: billNumber
        })
    }

    const handleExpense = (e) => {
        e.target.value <= formData.bill 
        ? setFormData({
            ...formData,
            expense: +e.target.value
        })
        : ""
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // the bill and your expense are required
        if (!(formData.bill.length > 0 && formData.expense.length > 0)) return 
        
        const newDiff = (e.target.who.value === 'you') ? formData.bill - formData.expense : -formData.expense

        //update the state of the diff of the opened friend
        setFriends(prev => 
        prev.map((friend) => 
            friend.id === openFriend.id ? { ...friend, diff: friend.diff + newDiff } : friend
        )
        );

        //close the spliter
        setOpenFriend(null)

        //reset the form
        setFormData({
            bill: "",
            expense: "",
            fexpense: ""
        })
        
    }

    const inputStyle = {
        marginLeft: 'auto',
        border: "1px solid oklch(82.8% 0.111 230.318)",
        width: "80px",
        padding: "1px 3px",
        textAlign: 'center',
        borderRadius: '3px',
    }
    return (
        <form onSubmit={handleSubmit} className="md:self-start border w-[350px] max-w-full border-sky-300 self-auto bg-white rounded-md pt-5 pb-5 pl-12 pr-12 shadow-sm">
            <fieldset className="flex flex-col gap-4">
                <legend className="text-[20px] text-[#495057] font-[600] mb-[25px]">Split a bill with {currentFriend.name}</legend>
                <div className="flex ">
                <label className="text-[14px]" htmlFor="bill"> Bill value</label>
                <input style={inputStyle} className="focus:outline-sky-500 focus:caret-sky-500" type="text" name="bill" id="bill" value={formData.bill} onChange={handleBill}/>
                </div>
                <div className="flex">
                <label className="text-[14px]" htmlFor="yexpense"> Your expense </label>
                <input style={inputStyle} className="focus:outline-sky-500 focus:caret-sky-500" type="text" name="yexpense" id="yexpense" value={formData.expense} onChange={handleExpense}/>
                </div>
                <div className="flex">
                    <label className="text-[15px]" htmlFor="cexpense">Clark's expense</label>
                    <input style={inputStyle} className="bg-gray-200 opacity-[.3] focus:outline-none" type="text" name="fexpense" id="fexpense" value={formData.bill === "" ? "" : formData.bill - formData.expense} readOnly />
                </div>
                <div className="flex">
                    <label className="text-[14px]" htmlFor="who">Who is paying the bill</label>
                    <select className="text-[15px] pt-[3px] pb-[3px] text-center border border-sky-300 rounded-sm w-[80px] ml-auto" name="who" id="who">
                        <option value="you">you</option>
                        <option value={currentFriend.name}>{currentFriend.name}</option>
                    </select>
                </div>
            </fieldset>
            <button type="submit" className="flex justify-center text-white cursor-pointer rounded-sm w-[80px] mt-4 ml-auto pt-1 pb-1 bg-sky-300" value="submit">Split bill</button>
        </form>
    )
}

export default Spliter