import {useState } from "react"
import Button from "./Button"
import Spliter from "./Spliter"

const idGenerator = () => {
    let id = 3
    return () => {
        id++
        return id
    }
}

const getId = idGenerator()


const AddFriend = ({ addFriend }) => {

    const [formData, setFormData] = useState({
        fname:"",
        iURL:"https://i.pravatar.cc/"
    })


    const handleSubmit = (e) => {
        e.preventDefault()
        
        const fname = formData.fname.trim()

        if(fname.length >= 5) {
            addFriend(fname)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-end w-[100%] pl-3 pr-3">
            <fieldset className="w-full">
                <div className="flex">
                    <label className="" htmlFor="fname">Friend name</label>
                    <input className="pt-[2px] pb-[2px] pl-[7px] pr-[7px] text-center bg-white border border-sky-300 focus:outline-sky-300 w-[180px] ml-auto" type="text" value={formData.fname} name="fname" id="fname" onChange={(e) => setFormData((prev) => ({...prev, fname: e.target.value}))}/>
                </div>
                <div className="flex mt-[15px] mb-[15px]">
                    <label htmlFor="iURL">Image URL</label>
                    <input className="pt-[2px] pb-[2px] pl-[7px] pr-[7px] text-[14px] text-center bg-white border border-sky-300 focus:outline-sky-300 w-[180px] ml-auto" type="text" value={formData.iURL} value={formData.iURL} name="iURL" id="iURL" readOnly/>
                </div>
            </fieldset>
            <Button type="submit" title="Add"/>
        </form>
    )
}

const Friend = ({ name, image, diff, id, openFriend, setOpenFriend}) => {
    
    const activeStyle = openFriend !== null && id === openFriend.id
    ? 'rounded-2xl shadow bg-white'
    : ''
    
    
    return (
        <li  className={'flex items-center gap-[10px] w-[350px] max-w-full p-3 hover:shadow hover:rounded-2xl hover:bg-white transition cursor-pointer ' + activeStyle} >
            <img className="rounded-full h-[50px] max-w-full" src={image} alt={name}/>
            <div className="friend-info mr-auto text-[13px]">
                <h3 className="text-blue-500 font-medium text-[18px]">{name}</h3>
                {diff === 0 
                 ? (<p className="">You and {name} are even</p>)
                 : (diff > 0) 
                 ? (<p className="text-green-500">{name} owes you {diff}$</p>) 
                 : (<p className="text-red-500">You owe {name} {Math.abs(diff)}$</p>)}
            </div>
            {openFriend !== null && openFriend.id === id 
            ? (<Button type="button"  title="close" onClick={() => setOpenFriend(0)}/>)
            : (<Button type="button"  title="select" onClick={() => setOpenFriend({name: name, id: id})}/>)
            }
        </li>
    )
}

const Friends = () => {
    
    const [friends, setFriends] = useState([
        {
            id: 1,
            name: "Clark",
            image: "https://i.pravatar.cc/48?u=118836",
            diff: -7
        },
        {
            id: 2,
            name: "Sarah",
            image: "https://i.pravatar.cc/48?u=933372",
            diff: 20
        },
        {
            id: 3,
            name: "Anthony",
            image: "https://i.pravatar.cc/48?u=499476",
            diff: 0
        }
    ])

    const [openFriend, setOpenFriend] = useState(null)
    const [isAddFriendActive, setIsFriendActive] = useState(false)

    const addFriend = (name) => {
        setFriends(prev => [
            ...prev,
            {
                id: getId(),
                name: name,
                diff: 0,
                get image() {
                        return `https://i.pravatar.cc/${this.id + 50}`;
                }
            }
        ])
    }

    return (
        <div className="flex flex-col items-center md:items-stretch  gap-[30px] mt-5 md:flex-row">
        <div className="flex flex-col gap-[30px] items-end">
            <ul className="flex flex-col gap-[10px]">
                {
                    friends.map((friend) => 
                        (<Friend key={friend.id} id={friend.id} name={friend.name} image={friend.image} diff={friend.diff} openFriend={openFriend} setOpenFriend={setOpenFriend}/> )
                    )
                }
            </ul>
            {isAddFriendActive && (<AddFriend addFriend={addFriend}/>)}
            {!isAddFriendActive     
            ? (<Button type="button" title="Add Friend" onClick={() => {setIsFriendActive(!isAddFriendActive)}} />)
            : (<Button type="button" title="close" onClick={() => setIsFriendActive(!isAddFriendActive)} />)
            }
        </div>
        {Boolean(openFriend) && (<Spliter openFriend={openFriend} setOpenFriend={setOpenFriend} friends={friends} setFriends={setFriends}/>)}
        </div>
    )
}

export default Friends