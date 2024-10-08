import { AuthContext } from "../App.jsx";
import { useState, useContext, useEffect } from "react";

const CommentSection = ( { comments, rideId, reloadData, name } ) => {
    const { auth, setAuth } = useContext(AuthContext);
    const [ newComment, setNewComment ] = useState("");
    
    const onNewPost = async () => {
        await fetch('http://localhost:3000/auth/addcomment', {
            method: 'POST',
            credentials: 'include',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({ token: auth.token, rideId: rideId, comment: name + ": " + newComment })
        });
        setNewComment("");
        if (reloadData) reloadData();
    };

    return (
        <div>
            {comments.length === 0 ? (
                <div className="text-gray-500">No comments at this time.</div>
            ) : (
                comments.map((comment, index) => (
                    <div key={index}>{comment}</div>
                ))
            )}
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                id="message"
                rows="4"
                className="mt-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your comment here..."
            ></textarea>
            <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={onNewPost}
            >
                Post
            </button>
        </div>
    );
};

export default CommentSection;