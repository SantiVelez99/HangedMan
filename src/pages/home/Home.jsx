import axios from 'axios'
import './home.css'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Home() {

    const [word, setWord] = useState()
    const [hangIndex, setHangIndex] = useState(0)
    const abc = Array.from("abcdefghijklmnopqrstuvwxyz")
    console.log(abc)

    async function getWord() {
        const response = await axios.get("https://random-word-api.herokuapp.com/word")
        setWord(Array.from(response.data[0]))
    }
    useEffect(() => {
        console.log(word)
    }, [word])

    function keyPress(value) {
        if(word.some((letter) => letter === value.toLowerCase())){
            word.some((letter, i) => letter === value.toLowerCase() ? findLetter(letter, i) : null) 
        } else {
            printHangedMan()
        }
    }
    function findLetter(letter, index) {
        console.log(letter, index)
        const array = Array.from(document.getElementsByClassName("letters-underscore"))
        array[index].innerHTML = letter.toUpperCase()
    }
    function printHangedMan(){
        const hang = Array.from(document.getElementsByClassName("curtain"))
        hang[hangIndex].classList += " transparent"
        setHangIndex(hangIndex+1)
        console.log(hang.length)
        if(hangIndex === hang.length-1) console.log("perdiste 😂")
        console.log(hangIndex)
    }
    return (
        <div className="main-container">
            <button onClick={() => getWord()}>Comenzar</button>
            <div className="game-container">
                <div className="gallows-container">
                    <img src="/src/assets/gallows/ahorcado_0.png" alt="hangman-image" className="hangman-image" />
                    <div className='body-container'>
                        <div className='upper'>
                            <div className='curtain head'></div>
                        </div>
                        <div className='middle'>
                            <div className='curtain left-arm'></div>
                            <div className='curtain torso'></div>
                            <div className='curtain right-arm'></div>
                        </div>
                        <div className="bottom">
                            <div className='curtain left-leg'></div>
                            <div className='curtain right-leg'></div>
                        </div>
                    </div>
                </div>
                <div className='section-container'>
                    <div className="letters-container">
                        {
                            abc.map((letter, i) =>
                                <div onClick={(e) => keyPress(e.target.innerText)} className="letter-icon" key={i}>{letter}</div>
                            )
                        }
                    </div>
                    <div className="answer-container">
                        {
                            word?.map((letter, i) =>
                                <div key={i} className='letters-underscore'>_</div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}