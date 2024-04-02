import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MyPage.css';

const OnlineGame = () => {
    const { gameId, playerId } = useParams();
    const [myValues, setValues] = useState([0, 1, 1, 1, 1, 2, 2, 2, 2]);
    //const [loading, setLoading] = useState(false);
    const [figureStyleName, setFigureStyleName] = useState(['non-active-round-button', 'red-round-button', 'red-round-button',
        'red-round-button', 'red-round-button', 'black-round-button', 'black-round-button', 'black-round-button', 'black-round-button'])
    const URL = '/api/playgame/' + gameId
    const [userTurn, setUserTurn] = useState(false)
    const navigate = useNavigate();

    function getNonActiveId() {
        return figureStyleName.indexOf('non-active-round-button')
    }

    function changeButtons(fromIndex, toIndex) {
        console.log(myValues)
        let tempValues = myValues.slice()
        console.log(tempValues)
        tempValues[toIndex] = myValues[fromIndex]
        tempValues[fromIndex] = 0
        setValues(tempValues)
        console.log(tempValues)
        postValues(tempValues)
    }

    const postValues = async (tempValues) => {
        console.log("Posting data")
        const headers = new Headers()
        headers.set('Content-Type', 'application/json')

        const options = {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(tempValues)
        }

        const result = await fetch(URL, options) 

        if (!result.ok) {
            throw new Error("error")
        }

        //const newValues = myValues.slice();


    }

    const getValues = async () => {
        const headers = new Headers()
        console.log(URL)
        headers.set('Content-Type', 'application/json')
        const options = {
            method: 'GET',
            headers: headers
        }
        const responce = await fetch(URL, options)
        if (responce.ok) {
            const values = await responce.json();
            console.log(values);
            setValues(myTempValues => {
                if (!(values.length === myTempValues.length && values.every((value, index) => value === myTempValues[index]))) {
                    console.log("user turn changed", userTurn, values, myTempValues)
                    let myUserTurn = !userTurn
                    setUserTurn(myUserTurn)
                    console.log(myUserTurn)
                }
                return values
            })
        } else {
            throw new Error("Error")
        }
    }

    useEffect(() => {
        if (playerId == 1) {
            setUserTurn(true)
        }

        const myFetchData = () => {
            getValues()
        };

        const intervalId = setInterval(myFetchData, 1000); // Вызываем функцию fetchData каждую секунду (1000 миллисекунд)

        return () => {
            clearInterval(intervalId); // Очищаем интервал при размонтировании компонента
        };
    }, []); // Пустой массив зависимостей для запуска эффекта только один раз

    /*
    useEffect(() => {
        getValues()
        while (true) {
            setLoading(true);

            setTimeout(() => {
                getValues();
                setLoading(false);
            }, 5000);
        }
    }, [])
    */

    function isFinished(tempFigureStyleName) {
        let nonActiveId = tempFigureStyleName.indexOf('non-active-round-button')
        if (nonActiveId == 0) {
            return 0
        }
        if (tempFigureStyleName[0] == 'black-round-button' && tempFigureStyleName[(nonActiveId + 6) % 8 + 1] == 'black-round-button'
            && tempFigureStyleName[nonActiveId % 8 + 1] == 'black-round-button') {
            if (playerId == 1) {
                return 2
            } else {
                return 1
            }
        } else if (tempFigureStyleName[0] == 'red-round-button' && tempFigureStyleName[(nonActiveId + 6) % 8 + 1] == 'red-round-button'
            && tempFigureStyleName[nonActiveId % 8 + 1] == 'red-round-button') {
            if (playerId == 1) {
                return 1
            } else {
                return 2
            }
        }
    }

    useEffect(() => {
        let tempFigureStyleName = figureStyleName.splice()
        for (let i = 0; i < 9; ++i) {
            if (myValues[i] == 0) {
                tempFigureStyleName[i] = 'non-active-round-button'
            } else if (myValues[i] == 1) {
                tempFigureStyleName[i] = 'red-round-button'
            } else {
                tempFigureStyleName[i] = 'black-round-button'
            }
        }
        let finishedId = isFinished(tempFigureStyleName)
        if (finishedId == 1) {
            navigate('/feedback/3')
        } else if (finishedId == 2) {
            navigate('/feedback/4')
        }
        setFigureStyleName(tempFigureStyleName)
    }, [myValues])

    function onFigureClick(myId) {
        if (!userTurn) {
            return
        }
        console.log(userTurn)
        setUserTurn(false)
        let nonActiveId = getNonActiveId()
        if (playerId == 1) {
            if (figureStyleName[myId] != 'red-round-button') {
                return
            }
            if (myId != 0) {
                if (nonActiveId == 0) {
                    if (figureStyleName[(myId + 6) % 8 + 1] == 'red-round-button'
                        && figureStyleName[myId % 8 + 1] == 'red-round-button') {
                        return
                    }
                } else {
                    if (nonActiveId != (myId + 6) % 8 + 1 && nonActiveId != myId % 8 + 1) {
                        return;
                    }
                }
            }
        } else {
            if (figureStyleName[myId] != 'black-round-button') {
                return
            }
            if (myId != 0) {
                if (nonActiveId == 0) {
                    if (figureStyleName[(myId + 6) % 8 + 1] == 'black-round-button'
                        && figureStyleName[myId % 8 + 1] == 'black-round-button') {
                        return
                    }
                } else {
                    if (nonActiveId != (myId + 6) % 8 + 1 && nonActiveId != myId % 8 + 1) {
                        return;
                    }
                }
            }
        }
        changeButtons(myId, nonActiveId)
    }

    return (
        <div className="board">
            <button className={figureStyleName[0] + ' id0'} onClick={() => { onFigureClick(0) }}></button>
            <button className={figureStyleName[1] + ' id1'} onClick={() => { onFigureClick(1) }}></button>
            <button className={figureStyleName[2] + ' id2'} onClick={() => { onFigureClick(2) }}></button>
            <button className={figureStyleName[3] + ' id3'} onClick={() => { onFigureClick(3) }}></button>
            <button className={figureStyleName[4] + ' id4'} onClick={() => { onFigureClick(4) }}></button>
            <button className={figureStyleName[5] + ' id5'} onClick={() => { onFigureClick(5) }}></button>
            <button className={figureStyleName[6] + ' id6'} onClick={() => { onFigureClick(6) }}></button>
            <button className={figureStyleName[7] + ' id7'} onClick={() => { onFigureClick(7) }}></button>
            <button className={figureStyleName[8] + ' id8'} onClick={() => { onFigureClick(8) }}></button>
        </div>
    )
}

export default OnlineGame;