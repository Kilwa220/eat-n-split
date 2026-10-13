import { useState } from "react"
import Button from "./Button"
import Spliter from "./Spliter"


// const AddFriend = () => {
//     return (
//         <h1>hello from add friend</h1>
//     )
// }

const Friend = ({ name, image, diff, id, openFriend, setOpenFriend}) => {
    const activeStyle = (id === openFriend.id) 
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
            {openFriend.id === id 
            ? (<Button  title="close" onClick={() => setOpenFriend(0)}/>)
            : (<Button  title="select" onClick={() => setOpenFriend({name: name, id: id})}/>)
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

    const [openFriend, setOpenFriend] = useState(0)

    return (
        <div className="flex flex-col items-center md:items-stretch  gap-[30px] mt-5 md:flex-row">
        <ul className="flex flex-col gap-[10px]">
            {
                friends.map((friend) => 
                    (<Friend key={friend.id} id={friend.id} name={friend.name} image={friend.image} diff={friend.diff} openFriend={openFriend} setOpenFriend={setOpenFriend}/> )
                )
            }
        </ul>
        {openFriend.id > 0 && (<Spliter openFriend={openFriend} setOpenFriend={setOpenFriend} friends={friends} setFriends={setFriends}/>)}
        </div>
    )
}

export default Friends