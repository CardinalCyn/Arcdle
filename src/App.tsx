import './App.css'
import InputForm from './Components/InputForm'
import Attempts from './Components/Attempts'
import { SpellType } from './types/SpellType'
import {useState,useEffect} from 'react'
import { default as Spells } from './spells/spells.json'

const App=()=> {
  //spell to be guessed
  const [correctSpell,setCorrectSpell]=useState<SpellType>(Spells[0]);
  //generates spell based on the date.
  const generateRandomSpell=(date:Date)=>{
    const seed= date.getTime();
    const randomIndex= Math.floor(Math.sin(seed) * Spells.length);
    return Spells[randomIndex];
  }
  //on app start, generates random spell based on day
  useEffect(() => {
    const today= new Date();
    const randomSpell=generateRandomSpell(today);
    setCorrectSpell(randomSpell);
  }, []);
  //array of spells that have been submitted.
  const [submissions,setSubmissions]=useState<SpellType[]>([]);
  //state of whether or not the user has guessed the spell correctly
  const [guessedCorrectly,setGuessedCorrectly]=useState(false);

  //compares guessed spell to correct spell, goes through each property of both
  const submitGuess=(guessValue:SpellType)=>{
    setSubmissions([guessValue,...submissions]);
    let guessedCorrect=true;
    for(const key in guessValue){
      if(guessValue[key as keyof SpellType]!==correctSpell[key as keyof SpellType]){
        guessedCorrect=false;
      }
    }
    setGuessedCorrectly(guessedCorrect);
  }

  return (
    <div className='arcdleContainer'>
      <h1 className='text-center text-9xl my-20'>Arcdle</h1>
      <h2 className='text-center text-6xl'>Guess a spell!</h2>
      {!guessedCorrectly&&<InputForm submitGuess={submitGuess} spells={Spells}/>}
      {guessedCorrectly&&<div className='text-center'>You solved it in {submissions.length} tries!</div>}
      {submissions.length>0&&<Attempts submissions={submissions} correctSpell={correctSpell}/>}
    </div>
  )
}

export default App
