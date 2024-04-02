import React, { useState } from "react";


const GetPath = () => {
    const [id, setId] = useState('non')

    const URL = '/api/creategame'

    const createGame = async () => {
        const headers = new Headers()
        headers.set('Content-Type', 'application/json')
        const options = {
            method: 'POST',
            headers: headers
        }
        const result = await fetch(URL, options);
        if (result.ok) {
            console.log("Is created")
            const myId = await result.text();
            console.log("Id:", myId)
            setId(myId)
            return myId;
        }
    }

    if (id == 'non') {
        return (
            <div>
                <button onClick={createGame}>Create the game</button>
            </div>
        )
    } else {
        return (
            <div>
                <p>Send this link to your friend: https://localhost:44490/online-game/{id}/2</p>
                <p>Follow the link: https://localhost:44490/online-game/{id}/1</p>
            </div>
        )
    }
}

export default GetPath;