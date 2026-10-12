import { useState } from "react"
import Button from "./Button"


const Friend = ({ name, image, diff, id, openFriendId, setOpenFriendId}) => {
    return (
        <li>
            <img src={image} alt={name}/>
            <div className="friend-info">
                <h3>{name}</h3>
                {diff === 0 
                 ? (<p>You and {name} are even</p>)
                 : (diff > 0) 
                 ? (<p>{name} owes you {diff}$</p>) 
                 : (<p>You owe {name} {Math.abs(diff)}$</p>)}
            </div>
            
            {openFriendId === id 
            ? (<Button title="close" onClick={() => setOpenFriendId(0)}/>)
            : (<Button title="select" onClick={() => setOpenFriendId(id)}/>)
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

    const [openFriendId, setOpenFriendId] = useState(0)

    return (
        <ul>
            {
                friends.map((friend) => 
                    (<Friend key={friend.id} id={friend.id} name={friend.name} image={friend.image} diff={friend.diff} openFriendId={openFriendId} setOpenFriendId={setOpenFriendId}/> )
                )
            }
        </ul>
    )
}

export default Friends