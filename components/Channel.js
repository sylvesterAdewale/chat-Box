import React, { useEffect, useRef, useState } from 'react'
import { formatRelative } from 'date-fns'
import { serverTimestamp } from "firebase/firestore";
import { collection, query, orderBy, limit, addDoc, onSnapshot, doc } from "firebase/firestore";
import { motion } from 'framer-motion'

const Channel = ({user = null, db = null}) => {
    const [messages, setMessages] = useState([])
    const [Loading, setLoading] = useState(false)
    const {uid, displayName, photoURL} = user;

    const messageRef = useRef();
 
    useEffect(() => {
        if (db) {
            const messagesRef = collection(db, "messages");
            const q = query(
                messagesRef,
                orderBy('createdAt'), 
                limit(50)
                );

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const data = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }))
                setMessages(data)
        });
        return unsubscribe;
        }
    }, [db])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!messageRef.current.value == messageRef.current.defaultValue ) {
            if (db && user) {
                const messagesRef = collection(db, "messages");
                setLoading(true)
                await addDoc(messagesRef, {
                text: messageRef.current.value,
                createdAt:  serverTimestamp(),
                uid,
                displayName,
                photoURL
                
            });
        }
        messageRef.current.value = messageRef.current.defaultValue
        setLoading(false)
    }
}
const AlwaysScrollToBottom = () => {
    const widthRef = useRef();
    useEffect(() => widthRef.current.scrollIntoView());
    return <div ref={widthRef} />;
  };

    return (
        <motion.div 
        initial={{
            scale: 0.8,
        }}
        animate ={{
            scale: 1.1,
        }}
        transition={{
            duration: 0.3
        }}
        className="p-3 mb-8 border-blue-500 border-2 rounded-b-lg w-10/12 md:w-7/12 h-4/6 absolute bottom-3 flex flex-col align-bottom overflow-hidden rounded-lg">
            <ul className="flex flex-grow overflow-y-auto w-full flex-col mb-10">
                {messages.map(message => (
                <div className="w-full" key={message.id}>
                    {(user.uid !== message.uid) ? 
                     <div className="flex items-center p-2">
                    {message.photoURL ? (
                    <img src={message.photoURL} className="rounded-full object-cover" alt="avatar" width={40} height={40} />
                    ) : null}
                    <div className="flex flex-col items-start justify-center px-2">
                        {message.displayName ? (<p className="text-gray-400">{message.displayName}</p>): null}
                        <p className="p-1 px-2 rounded-b-lg rounded-r-md m-1 bg-blue-900 text-white">{message.text}</p>
                        {message.createdAt?.seconds ? (
                            <span className="text-gray-400">
                                {formatRelative(new Date(message.createdAt.seconds * 1000), new Date())}
                            </span>
                        ) : null } 
                    </div>
                    </div>
                    : <div key={message.id} className="flex items-center justify-end p-2 w-full">
                            <div className="flex flex-col items-end justify-center px-2">
                                {message.displayName ? (<p className="text-gray-400">{message.displayName}</p>): null}
                                <p className="p-1 px-2 rounded-b-lg rounded-l-md m-1 bg-blue-500 text-white">{message.text}</p>
                                {message.createdAt?.seconds ? (
                                    <span className="text-gray-400">
                                        {formatRelative(new Date(message.createdAt.seconds * 1000), new Date())}
                                    </span>
                                ) : null } 
                            </div>
                            {message.photoURL ? (
                                <img src={message.photoURL} className="rounded-full object-cover" alt="avatar" width={40} height={40} />
                            ) : null}
                        </div>
                
                 }
                </div>
                ))}
                <AlwaysScrollToBottom />
            </ul>
            <form className="flex gap-2 absolute bottom-2 self-center" onSubmit={handleSubmit}>
                <input ref={messageRef} className="p-2 md:w-96 bg-transparent outline-none border-blue-500 border-2 rounded-lg placeholder-blue-400 placeholder-opacity-60" type="text" placeholder="Enter Message" />
                <motion.button
                whileHover={{
                    scale: .85
                }}
                whileTap={{
                    scale: 1.05
                }}
                transition={{
                    type: "spring",
                    duration: .3
                }} disabled={Loading}
                className="bg-blue-500 flex justify-center items-center rounded-lg p-1 pl-3 px-2" type="submit">
                    <span className="text-white"> 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </span>
                </motion.button>
            </form>
        </motion.div>
    )
}

export default Channel
