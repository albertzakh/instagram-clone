import { useState, useEffect } from "react";
import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon
} from "@heroicons/react/outline"

import Moment from "react-moment";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy, setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

function Post({ id, username, userImg, img, caption }) {
    const {data: session} = useSession();

    const [commentInput, setCommentInput] = useState("");
    const [comments, setComments] = useState([]);

    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => {
        return onSnapshot(query(collection(db, "posts", id, "comments"), orderBy("timestamp", "desc")), snapshot => {
            setComments(snapshot.docs);
        })
    }, [db, id])

    useEffect(() => {
        return onSnapshot(collection(db, "posts", id, "likes"), snapshot => {
            setLikes(snapshot.docs)
        })
    }, [db, id])

    useEffect(() => {
        return setHasLiked(
            likes.findIndex(like => (like.id === session?.user?.uid)) !== -1
        )
    }, [likes])

    const likePost = async () => {
        if(hasLiked) {
            await deleteDoc(doc(db, "posts", id, "likes", session.user.uid))
        }
        else {
            await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
                username: session.user.username,
            })
        }
    }

    const sendComment = async (e) => {
        e.preventDefault();

        const commentToSend = commentInput;
        setCommentInput("");

        await addDoc(collection(db, "posts", id, "comments"), {
            comment:commentToSend,
            username:session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp()    
        })
    }

  return (
    <div className="bg-white my-7 border-rounded-sm">

        {/* Header */}
        <div className="flex items-center p-5">
            <img referrerpolicy="no-referrer" className="rounded-full h-12 w-12 object-contain border p-1 mr-3" src={userImg} alt=""  />
            <p className="font-bold flex-1">{username}</p>
            <DotsHorizontalIcon className="h-5" />
        </div>

        {/* Img */}
        <img className="object-cover w-full" src={img}  alt="" />

        {/* Buttons */}
        {session && (
            <div className="flex justify-between px-4 pt-4"> 
                <div className="flex space-x-4">
                    {hasLiked ? (
                        <HeartIconFilled onClick={likePost} className="btn text-red-500" />
                    ) : (
                        <HeartIcon onClick={likePost} className="btn" />
                    )}
                    
                    <ChatIcon className="btn" />
                    <PaperAirplaneIcon className="btn" />
                </div>
                <BookmarkIcon className="btn" />
            </div>
        )}

        {/* Caption */}
        <div>
            <p className="p-5 truncate">
                {likes.length > 0 && (
                    <p className="font-bold mb-2">{likes.length} likes</p>
                )}

                <span className="font-bold mr-[5px]">{username} </span>
                {caption}
            </p>
        </div>

        {/* Comments */}
        {comments.length > 0 && (
            <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
                {comments.map(comment => (
                    <div className="flex items-center space-x-2 mb-3" key={comment.id}>
                        <img referrerpolicy="no-referrer" className="h-7 rounded-full" src={comment.data().userImage} />
                        <p className="text-sm flex-1"><span className="font-bold mr-2">{comment.data().username}</span>{comment.data().comment}</p>

                        <Moment fromNow>
                            {comment.data().timestamp?.toDate()}
                        </Moment>
                    </div>
                ))}
            </div>
        )}

        {/* Input Box */}
        {session && (
            <form className="flex items-center p-4">
                <EmojiHappyIcon className="h-7 mr-3" />
                <input value={commentInput} onChange={(e) => setCommentInput(e.target.value)} className="flex-1 border-none outline-none" type="text" placeholder="Add a comment..." />
                <button onClick={sendComment} type="submit" disabled={!commentInput.trim()} className="font-semibold text-blue-500">Post</button>
            </form>
        )}
        
    </div>
  )
}

export default Post