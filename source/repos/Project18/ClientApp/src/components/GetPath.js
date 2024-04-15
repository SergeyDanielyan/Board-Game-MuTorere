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
            <div align='center'>
                <button className="my-button" onClick={createGame}>Create the game</button>
            </div>
        )
    } else {
        return (
            <div align='center' className="my-text-container">
                <h3>Send this link to your friend: https://localhost:44490/online-game/{id}/2</h3>
                <h3>Follow the link: https://localhost:44490/online-game/{id}/1</h3>
            </div>
        )
    }
}

export default GetPath;