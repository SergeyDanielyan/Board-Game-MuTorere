import React, { useState, useEffect } from 'react';
import './MyPage.css';
import { useNavigate } from 'react-router-dom';


const TwoPlayers = () => {
    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState([true, false, false, false, false, true, true, true, true])
    const [figureStyleName, setFigureStyleName] = useState(['non-active-round-button', 'red-round-button', 'red-round-button',
        'red-round-button', 'red-round-button', 'black-round-button', 'black-round-button', 'black-round-button', 'black-round-button'])
    const [isFirst, setIsFirst] = useState(true)
    //const [isFinishedState, setIsFinished] = useState(false)

    function getNonActiveId() {
        return figureStyleName.indexOf('non-active-round-button')
    }

    function changeButtons(fromIndex, toIndex) {
        let tempDisabled = isDisabled
        tempDisabled[fromIndex] = true
        tempDisabled[toIndex] = false

        let tempFigureStyleName = figureStyleName
        tempFigureStyleName[toIndex] = figureStyleName[fromIndex]
        tempFigureStyleName[fromIndex] = 'non-active-round-button'
        setIsDisabled(tempDisabled)
        setFigureStyleName(tempFigureStyleName)
    }

    function isFinished() {
        let nonActiveId = getNonActiveId()
        if (nonActiveId == 0) {
            return false;
        }
        if (!isDisabled[0]) {
            return false;
        }
        if (!isDisabled[(nonActiveId + 6) % 8 + 1]) {
            return false;
        }
        if (!isDisabled[nonActiveId % 8 + 1]) {
            return false;
        }
        return true;
    }

    /*function updateDisabled() {
        let tempDisabled = [true, true, true, true, true, true, true, true, true]
        for (let i = 0; i < 9; i++) {
            if (isFirst) {
                if (figureStyleName[i] == 'red-round-button') {
                    tempDisabled[i] = false
                }
            } else {
                if (figureStyleName[i] == 'black-round-button') {
                    tempDisabled[i] = false
                }
            }
        }
        setIsDisabled(tempDisabled)
    }*/

    useEffect(() => {
        let tempDisabled = [true, true, true, true, true, true, true, true, true]
        for (let i = 0; i < 9; i++) {
            if (isFirst) {
                if (figureStyleName[i] == 'red-round-button') {
                    if (i == 0 || figureStyleName[(i + 6) % 8 + 1] != 'red-round-button'
                        || figureStyleName[i % 8 + 1] != 'red-round-button') {
                        tempDisabled[i] = false
                    }
                }
            } else {
                if (figureStyleName[i] == 'black-round-button') {
                    if (i == 0 || figureStyleName[(i + 6) % 8 + 1] != 'black-round-button'
                        || figureStyleName[i % 8 + 1] != 'black-round-button') {
                        tempDisabled[i] = false
                    }
                }
            }
        }
        setIsDisabled(tempDisabled)
        console.log("isDisabled setted")
        //redirect()
    }, [isFirst]);

    useEffect(() => {
        if (isFinished()) {
            console.log("Finished")
            if (isFirst) {
                console.log(2)
                navigate('/feedback/2')
            } else {
                console.log(1)
                navigate('/feedback/1')
            }
        }
    }, [isDisabled])

    function onFigureClick(id) {
        let nonActiveId = getNonActiveId()
        console.log(id, nonActiveId, isFirst)
        if (id == 0 && nonActiveId == 0 || id != 0 && nonActiveId != 0 && nonActiveId != (id + 6) % 8 + 1 && nonActiveId != id % 8 + 1) {
            return
        }
        changeButtons(id, nonActiveId)
        let isNotFirst = !isFirst
        console.log(isNotFirst)
        setIsFirst(isNotFirst)
        console.log(isFirst)
        console.log(isDisabled)
        /*
        if (isFinishedState) {
            console.log("Finished")
            if (isFirst) {
                console.log(2)
                navigate('/feedback/2')
            } else {
                console.log(1)
                navigate('/feedback/1')
            }
        }
        */
        //updateDisabled()
    }

    return (
        <div className="board">
            <button className={figureStyleName[0] + ' id0'} disabled={isDisabled[0]} onClick={() => { onFigureClick(0) }}></button>
            <button className={figureStyleName[1] + ' id1'} disabled={isDisabled[1]} onClick={() => { onFigureClick(1) }}></button>
            <button className={figureStyleName[2] + ' id2'} disabled={isDisabled[2]} onClick={() => { onFigureClick(2) }}></button>
            <button className={figureStyleName[3] + ' id3'} disabled={isDisabled[3]} onClick={() => { onFigureClick(3) }}></button>
            <button className={figureStyleName[4] + ' id4'} disabled={isDisabled[4]} onClick={() => { onFigureClick(4) }}></button>
            <button className={figureStyleName[5] + ' id5'} disabled={isDisabled[5]} onClick={() => { onFigureClick(5) }}></button>
            <button className={figureStyleName[6] + ' id6'} disabled={isDisabled[6]} onClick={() => { onFigureClick(6) }}></button>
            <button className={figureStyleName[7] + ' id7'} disabled={isDisabled[7]} onClick={() => { onFigureClick(7) }}></button>
            <button className={figureStyleName[8] + ' id8'} disabled={isDisabled[8]} onClick={() => { onFigureClick(8) }}></button>
        </div>
    )
    /*
    return (
        <div className="board">
            <RoundButton id={0} />
            <RoundButton id={1} />
            <RoundButton id={2} />
            <RoundButton id={3} />
            <RoundButton id={4} />
            <RoundButton id={5} />
            <RoundButton id={6} />
            <RoundButton id={7} />
            <RoundButton id={8} />
        </div>
    )
    /*
    return (
        <div className="board">
            <RoundButton />
            <RoundButton />
        </div>
    )
    */
}

export default TwoPlayers;
