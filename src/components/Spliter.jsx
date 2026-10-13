import { useState } from "react"


const Spliter = ({ openFriend, setOpenFriend, friends, setFriends }) => {
    const [formData, setFormData] = useState({
        bill: "",
        expense: "",
        fexpense: "",
    })

    // get the current friend you are spliting the bill with
    const currentFriend = friends.filter((friend) => openFriend.id === friend.id)[0]

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
        if (!(e.target.bill.value.length > 0 && e.target.yexpense.value.length > 0)) return 
        
        const newDiff = (e.target.who.value === 'you') ? formData.bill - formData.expense : -formData.expense

        //update the state of the diff of the opened friend
        setFriends(prev => 
        prev.map((friend) => 
            friend.id === openFriend.id ? { ...friend, diff: friend.diff + newDiff } : friend
        )
        );

        //close the spliter
        setOpenFriend(0)

        //reset the form
        setFormData({
            bill: "",
            expense: "",
            fexpense: ""
        })
        
    }
    return (
        <form onSubmit={handleSubmit} className="border border-amber-200 self-auto">
            <fieldset>
                <legend>Split a bill with {currentFriend.name}</legend>
                <div>
                <label htmlFor="bill"> Bill value</label>
                <input type="text" id="bill" value={formData.bill} onChange={handleBill}/>
                </div>
                <div>
                <label htmlFor="yexpense"> Your expense </label>
                <input type="text" id="yexpense" value={formData.expense} onChange={handleExpense}/>
                </div>
                <div>
                    <label htmlFor="cexpense">Clark's expense</label>
                    <input type="text" name="fexpense" id="fexpense" value={formData.bill === "" ? "" : formData.bill - formData.expense} readOnly />
                </div>
                <div>
                    <label htmlFor="who">Who is paying the bill</label>
                    <select name="who" id="who">
                        <option value="you">you</option>
                        <option value={currentFriend.name}>{currentFriend.name}</option>
                    </select>
                </div>
            </fieldset>
            <button value="submit">split bill</button>
        </form>
    )
}

export default Spliter