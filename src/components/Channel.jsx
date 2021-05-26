import { useState } from "react";
import { useUser } from "../context/user";
import {useCollectionData} from "react-firebase-hooks/firestore"
import { firestore, firebase } from "../services/firebase";


const messageRef = firestore.collection("messages");
const messageQuery = messageRef.orderBy("createdAt", "desc").limit(100);

const Channel = ()=>{
    const [text, setText] = useState("");
    const {logout, user} = useUser();
    const [messages, loading, error] = useCollectionData(messageQuery, {idField: "id"});

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
    console.log(error);
    if(error){
        return(<h1>Ocurrió un error :c</h1>)
    }

    return(
        <>  
            <div className="logout">
            <button onClick={logout} className="button logoutButton">Logout</button>
            <h2 className="titulo">Bienvenido al chat de Firebase</h2>
            </div>
            <section className="mensajes">
                {messages && messages.reverse().map(({text, displayName, id, photoURL}) => (
                    <div key={id} className="mensaje">
                        <img src={photoURL} className="imagen" alt={displayName}/>
                        <b>{displayName}&nbsp;:&nbsp;</b>
                        <p> {text}</p>
                    </div>
                ))}
            </section>

            <form onSubmit={sendMessage} className="send">
                <input type="text" value={text} onChange={e => setText(e.target.value)} className="input"/>
                <button className="button">Enviar</button>
            </form>  
        </>
    )
}

export default Channel;