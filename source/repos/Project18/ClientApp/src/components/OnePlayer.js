import React, { useState, useEffect } from 'react';
import './MyPage.css';
import { useParams, useNavigate } from 'react-router-dom';

const OnePlayer = () => {
    let { id } = useParams();
    const navigate = useNavigate();

    //const [isDisabled, setIsDisabled] = useState([true, true, true, true, true, true, true, true, true])
    //const [turnNumber, setTurnNumber] = useState(1)
    const [figureStyleName, setFigureStyleName] = useState(['non-active-round-button', 'red-round-button', 'red-round-button',
        'red-round-button', 'red-round-button', 'black-round-button', 'black-round-button', 'black-round-button', 'black-round-button'])

    function getNonActiveId() {
        return figureStyleName.indexOf('non-active-round-button')
    }

    function getRandomNumber(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min) + min)
    }

    function botAction() {
        let nonActiveId = getNonActiveId()
        let indexes = Array()
        if (id == 1) {
            if (nonActiveId == 0) {
                for (let i = 1; i < 9; ++i) {
                    if (figureStyleName[i] == 'black-round-button' && (figureStyleName[(i + 6) % 8 + 1] != 'black-round-button'
                        || figureStyleName[i % 8 + 1] != 'black-round-button')) {
                        indexes.push(i)
                    }
                }
            } else {
                if (figureStyleName[0] == 'black-round-button') {
                    indexes.push(0)
                }
                if (figureStyleName[(nonActiveId + 6) % 8 + 1] == 'black-round-button') {
                    indexes.push((nonActiveId + 6) % 8 + 1)
                }
                if (figureStyleName[nonActiveId % 8 + 1] == 'black-round-button') {
                    indexes.push(nonActiveId % 8 + 1)
                }
            }
        } else {
            if (nonActiveId == 0) {
                for (let i = 1; i < 9; ++i) {
                    if (figureStyleName[i] == 'red-round-button' && (figureStyleName[(i + 6) % 8 + 1] != 'red-round-button'
                        || figureStyleName[i % 8 + 1] != 'red-round-button')) {
                        indexes.push(i)
                    }
                }
            } else {
                if (figureStyleName[0] == 'red-round-button') {
                    indexes.push(0)
                }
                if (figureStyleName[(nonActiveId + 6) % 8 + 1] == 'red-round-button') {
                    indexes.push((nonActiveId + 6) % 8 + 1)
                }
                if (figureStyleName[nonActiveId % 8 + 1] == 'red-round-button') {
                    indexes.push(nonActiveId % 8 + 1)
                }
            }
        }
        console.log("indexes", indexes)
        let randIndex = indexes[getRandomNumber(0, indexes.length)]
        console.log("before calling change buttons")
        //changeButtons(randIndex, nonActiveId)

        let tempFigureStyleName = figureStyleName.slice()
        tempFigureStyleName[nonActiveId] = figureStyleName[randIndex]
        tempFigureStyleName[randIndex] = 'non-active-round-button'
        //setIsDisabled(tempDisabled)
        setFigureStyleName(tempFigureStyleName)
        console.log("Figure style is changed");
    }

    function isFinished(tempFigureStyleName) {
        let nonActiveId = tempFigureStyleName.indexOf('non-active-round-button')
        if (nonActiveId == 0) {
            return 0
        }
        if (tempFigureStyleName[0] == 'black-round-button' && tempFigureStyleName[(nonActiveId + 6) % 8 + 1] == 'black-round-button'
            && tempFigureStyleName[nonActiveId % 8 + 1] == 'black-round-button') {
            if (id == 1) {
                return 2
            } else {
                return 1
            }
        } else if (tempFigureStyleName[0] == 'red-round-button' && tempFigureStyleName[(nonActiveId + 6) % 8 + 1] == 'red-round-button'
            && tempFigureStyleName[nonActiveId % 8 + 1] == 'red-round-button') {
            if (id == 1) {
                return 1
            } else {
                return 2
            }
        }
    }

    useEffect(() => {
        if (id == 2) {
            botAction()
        }
    }, [])

    function onFigureClick(myId) {
        let nonActiveId = getNonActiveId()
        if (id == 1) {
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

        let tempFigureStyleNames = figureStyleName.slice()
        tempFigureStyleNames[nonActiveId] = figureStyleName[myId]
        tempFigureStyleNames[myId] = 'non-active-round-button'

        let finishInd = isFinished(tempFigureStyleNames)

        if (finishInd == 1) {
            navigate('/feedback/3')
        } else if (finishInd == 2) {
            navigate('/feedback/4')
        }

        let indexes = Array()
        if (id == 1) {
            if (myId == 0) {
                for (let i = 1; i < 9; ++i) {
                    if (tempFigureStyleNames[i] == 'black-round-button'
                        && (tempFigureStyleNames[(i + 6) % 8 + 1] != 'black-round-button'
                            || tempFigureStyleNames[i % 8 + 1] != 'black-round-button')) {
                        indexes.push(i)
                    }
                }
            } else {
                if (tempFigureStyleNames[0] == 'black-round-button') {
                    indexes.push(0)
                }
                if (tempFigureStyleNames[(myId + 6) % 8 + 1] == 'black-round-button') {
                    indexes.push((myId + 6) % 8 + 1)
                }
                if (tempFigureStyleNames[myId % 8 + 1] == 'black-round-button') {
                    indexes.push(myId % 8 + 1)
                }
            }
        } else {
            if (myId == 0) {
                for (let i = 1; i < 9; ++i) {
                    if (tempFigureStyleNames[i] == 'red-round-button' && (tempFigureStyleNames[(i + 6) % 8 + 1] != 'red-round-button'
                        || tempFigureStyleNames[i % 8 + 1] != 'red-round-button')) {
                        indexes.push(i)
                    }
                }
            } else {
                if (tempFigureStyleNames[0] == 'red-round-button') {
                    indexes.push(0)
                }
                if (tempFigureStyleNames[(myId + 6) % 8 + 1] == 'red-round-button') {
                    indexes.push((myId + 6) % 8 + 1)
                }
                if (tempFigureStyleNames[myId % 8 + 1] == 'red-round-button') {
                    indexes.push(myId % 8 + 1)
                }
            }
        }
        console.log("indexes", indexes)
        let randIndex = indexes[getRandomNumber(0, indexes.length)]
        console.log("before calling change buttons")

        tempFigureStyleNames[myId] = tempFigureStyleNames[randIndex]
        tempFigureStyleNames[randIndex] = 'non-active-round-button'
        console.log(myId, nonActiveId, randIndex, tempFigureStyleNames)
        setFigureStyleName(tempFigureStyleNames)
        finishInd = isFinished(tempFigureStyleNames)

        if (finishInd == 1) {
            navigate('/feedback/3')
        } else if (finishInd == 2) {
            navigate('/feedback/4')
        }
        console.log("Figure style is changed");
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

export default OnePlayer;