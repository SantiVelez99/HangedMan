import axios from 'axios'
import './home.css'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function Home() {

    const [word, setWord] = useState([])
    const [lose, setLose] = useState(0)
    const [letters, setLetters] = useState([])
    const [wordLength, setWordLength] = useState(0)
    const [sprite, setSprite] = useState("")
    const abc = Array.from("abcdefghijklmnopqrstuvwxyz")

    async function getPokemon() {
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1')
            const randomID = Math.floor(Math.random() * response.data.count)
            const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomID}`)
            setSprite(pokemon.data.sprites.front_default)
            setWord(Array.from(pokemon.data.name))
            setWordLength((Array.from(pokemon.data.name)).length)
            closeModal()
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: "error",
                titleText: "Failed to start the game",
                showConfirmButton: true, background: "#ebebeb",
                color: "#13315c",
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonText: "Try Again",
                customClass: {
                    confirmButton: "swal-confirm-button"
                }
            }).then(res => {
                if (res.isConfirmed) {
                    location.replace("/")
                }
            })
        }
    }
    useEffect(() => {
        const handleKeyUp = (e) => {
            if (e.keyCode >= 65 && e.keyCode <= 90 && !letters.some(letter => letter === e.key)) {
                setLetters([...letters, e.key])
                keyPress(e)
            }

        }
        document.addEventListener("keyup", handleKeyUp)
        return () => {
            document.removeEventListener("keyup", handleKeyUp)
        }
    }, [word, lose])

    function closeModal() {
        const modal = Array.from(document.getElementsByClassName("start-modal"))
        modal[0].classList += " unactive"
    }
    function keyPress(e) {
        let tar
        if (e.key) {
            const array = Array.from(document.getElementsByClassName("letter-icon"))
            array.forEach(letter => {
                if (letter.innerHTML === e.key) tar = letter
            })
        } else {
            tar = e.target
        }
        const value = e.key ? e.key : e.target.innerHTML
        if (word.some((letter) => letter === value)) {
            findLetter(value, tar)
        } else {
            printHangedMan(tar)
        }
    }
    function findLetter(letter, target) {
        const array = Array.from(document.getElementsByClassName("letters-underscore"))
        console.log(wordLength)
        let indexes = []
        word.forEach((ele, i) => {
            if (ele === letter) indexes.push(i)
        })
        indexes.forEach(i => {
            array[i].innerHTML = letter.toUpperCase()
            array[i].classList += " correct"
        })
        target.classList += " correct-bc"
        const response = Array.from(document.getElementsByClassName("correct"))
        if (response.length === array.length) {
            Swal.fire({
                imageUrl: sprite,
                imageWidth: 150,
                imageHeight: 150,
                imageAlt: "Pokemon sprite",
                title: "Congratulations!",
                text: "You have guessed the pokemon!",
                showConfirmButton: true,
                background: "#ebebeb",
                color: "#13315c",
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonText: "Try Again",
                customClass: {
                    confirmButton: "swal-confirm-button"
                }
            }).then(res => {
                if (res.isConfirmed) {
                    location.replace("/")
                }
            })
        }
    }
    function printHangedMan(target) {
        const hang = Array.from(document.getElementsByClassName("hangman-image"))
        hang[lose].classList += " unactive"
        hang[lose + 1].classList = "hangman-image"
        target.classList += " wrong-bc"
        setLose(prev => prev + 1)
        console.log(lose)
        if (lose === 5) {
            Swal.fire({
                imageUrl: sprite,
                imageWidth: 150,
                imageHeight: 150,
                imageAlt: "Pokemon sprite",
                title: "Oh no!",
                text: `You have lost! The pokemon was: ${word.join("").toUpperCase()}`,
                showConfirmButton: true,
                background: "#ebebeb",
                color: "#13315c",
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonText: "Try Again",
                customClass: {
                    confirmButton: "swal-confirm-button"
                }
            }).then(res => {
                if (res.isConfirmed) {
                    location.replace("/")
                }
            })
        }
    }
    return (
        <div className="main-container">
            <div className="game-container">
                <div className='start-modal'>
                    <h1 className='modal-title'>Guess the pokemon&apos;s name to win!</h1>
                    <button onClick={() => getPokemon()}>START</button>
                </div>
                <div className="gallows-container">
                    <img src="/src/assets/gallows/ahorcado_01.png" alt="hangman-image" className="hangman-image" />
                    <img src="/src/assets/gallows/ahorcado_02.png" alt="hangman-image" className="hangman-image unactive" />
                    <img src="/src/assets/gallows/ahorcado_03.png" alt="hangman-image" className="hangman-image unactive" />
                    <img src="/src/assets/gallows/ahorcado_04.png" alt="hangman-image" className="hangman-image unactive" />
                    <img src="/src/assets/gallows/ahorcado_05.png" alt="hangman-image" className="hangman-image unactive" />
                    <img src="/src/assets/gallows/ahorcado_07.png" alt="hangman-image" className="hangman-image unactive" />
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
                            word?.map((letter, i) => {
                                if (letter === "-") {
                                    return (
                                        <div key={i} className='letters-underscore correct'>-</div>
                                    )
                                } else {
                                    return (
                                        <div key={i} className='letters-underscore'>_</div>
                                    )
                                }
                            }
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}