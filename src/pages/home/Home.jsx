import axios from 'axios'
import './home.css'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function Home() {

    const [word, setWord] = useState()
    const [lose, setLose] = useState(0)
    const abc = Array.from("abcdefghijklmnopqrstuvwxyz")
    console.log(abc)

    async function getWord() {
        const response = await axios.get("https://random-word-api.herokuapp.com/word")
        setWord(Array.from(response.data[0]))
        closeModal()
    }
    useEffect(() => {
        console.log(word)
    }, [word])
    function closeModal(){
        const modal = Array.from(document.getElementsByClassName("start-modal"))
        modal[0].classList += " unactive"
    }

    function keyPress(e) {
        const tar = e.target
        const value = e.target.innerHTML
        if (word.some((letter) => letter === value.toLowerCase())) {
            word.some((letter, i) => letter === value.toLowerCase() ? findLetter(letter, i, tar) : null)
        } else {
            printHangedMan(tar)
        }
    }
    function findLetter(letter, index, target) {
        const array = Array.from(document.getElementsByClassName("letters-underscore"))
        array[index].innerHTML = letter.toUpperCase()
        array[index].classList += " correct"
        target.classList += " correct-bc"
        const response = Array.from(document.getElementsByClassName("correct"))
        if (response.length === array.length) {
            Swal.fire({
                icon: "success",
                title: "Congratulations!",
                text: "You have guessed the word",
                showConfirmButton: true,
                background: "#ebebeb",
                color: "#13315c",
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonText: "Try Again",
                customClass:{
                    confirmButton: "swal-confirm-button"
                }
            }).then(res => {
                if(res.isConfirmed){
                    location.replace("/")
                }
            })
        }
    }
    function printHangedMan(target) {
        const hang = Array.from(document.getElementsByClassName("hangman-image"))
        hang[lose].classList += " unactive"
        hang[lose+1].classList = "hangman-image"
        target.classList += " wrong-bc"
        setLose(lose + 1)
        console.log(hang.length)
        console.log(lose)
        if (lose === 5) {
            Swal.fire({
                icon: "error",
                title: "Oh no!",
                text: `You have lost! The word was: ${word.join("").toUpperCase()}`,
                showConfirmButton: true,
                background: "#ebebeb",
                color: "#13315c",
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonText: "Try Again",
                customClass:{
                    confirmButton: "swal-confirm-button"
                }
            }).then(res => {
                if(res.isConfirmed){
                    location.replace("/")
                }
            })
        }
    }
    return (
        <div className="main-container">
            <div className="game-container">
                <div className='start-modal'>
                    <button onClick={() => getWord()}>START</button>
                </div>
                <div className="gallows-container">
                    <img src="/src/assets/gallows/ahorcado_01.png" alt="hangman-image" className="hangman-image"/>
                    <img src="/src/assets/gallows/ahorcado_02.png" alt="hangman-image" className="hangman-image unactive"/>
                    <img src="/src/assets/gallows/ahorcado_03.png" alt="hangman-image" className="hangman-image unactive"/>
                    <img src="/src/assets/gallows/ahorcado_04.png" alt="hangman-image" className="hangman-image unactive"/>
                    <img src="/src/assets/gallows/ahorcado_05.png" alt="hangman-image" className="hangman-image unactive"/>
                    <img src="/src/assets/gallows/ahorcado_07.png" alt="hangman-image" className="hangman-image unactive"/>
                    <img src="/src/assets/gallows/ahorcado_0.png" alt="hangman-image" className="hangman-image unactive" />
                    {/* <div className='body-container'>
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
                    </div> */}
                </div>
                <div className='section-container'>
                    <div className="letters-container">
                        {
                            abc.map((letter, i) =>
                                <div onClick={(e) => keyPress(e)} className="letter-icon" key={i}>{letter}</div>
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