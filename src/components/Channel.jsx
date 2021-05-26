import { useState } from "react";
import { useUser } from "../context/user";
import {useCollectionData} from "react-firebase-hooks/firestore"
import { firestore, firebase } from "../services/firebase";


const messageRef = firestore.collection("messages");
const messageQuery = messageRef.orderBy("createdAt", "desc").limit(2);

const Channel = ()=>{
    const [text, setText] = useState("");
    const {logout, user} = useUser();
    const [messages, loading, error] = useCollectionData(messageQuery, {idField: "id"});

    console.log(messages);

    const sendMessage = (event)=>{
        event.preventDefault();
        
        if(text.trim().length < 3){
            return;
        }

        if(user){
            const {displayName, photoURL, uid} = user;
            messageRef.add({
                text, 
                uid,
                photoURL,
                displayName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
        }

        setText("");
    }

    if(loading){
        return(<h1>Loading...</h1>)
    }

    if(error){
        return(<h1>Ocurrió un error :c</h1>)
    }

    return(
        <section>
            <button onClick={logout}>Logout</button>
            <section>
                {messages && messages.reverse().map(({text, displayName, id, photoURL}) => (
                    <div id={id} className="mensaje">
                        <img src={photoURL} />
                        <p>{displayName}: </p>
                        <p>{text}</p>
                    </div>
                ))}
            </section>

            <form onSubmit={sendMessage}>
                <input type="text" value={text} onChange={e => setText(e.target.value)}/>
                <button>Enviar</button>
            </form>  
        </section>
    )
}

export default Channel;