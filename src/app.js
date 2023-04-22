import React, { useState} from 'react';
import TypedWords from './typedWords';
import { findInPdfPage } from '../pdfSearch/findWordByDensity';
import { whichPage } from './pdfContact';





const dict = {
  'low': 1000,
  'mid': 2000,
  'high': 3000
}
const RemoveDuplicates = (arr) => {
  let unique_array = []
  for(let i = 0;i < arr.length; i++){
      if(unique_array.indexOf(arr[i]) === -1){
          unique_array.push(arr[i])
      }
  }
  return unique_array
}
function App() {
  const [words, setWords] = useState("Synonyms Disabled");
  const [enteredWords, setEnteredWords] = useState([]);
  const [synScore, setSynScore] = useState('mid');
  const [wordsDensityOnPage, setWordsDensityOnPage] = useState([]);
  const [pagePointer, setPagePointer] = useState(0);
  const [nextButton , setNextButton] = useState(true);
  const [prevButton , setPrevButton] = useState(false);
  const removeId = (id) =>{
    const newWords = enteredWords.filter((word,index) => index !== id);
    setEnteredWords(newWords);
  }
  const handleSwitchChange= () =>
  {
      if(words === "Synonyms Enabled")
      {
        setWords("Synonyms Disabled")
      }
      else{
        setWords("Synonyms Enabled")
      }
  }
  const handleSyncScore = (event) =>{
    setSynScore(event.target.value);
  }
  const disabledORnot = () =>{
    if(words === "Synonyms Enabled")
    {
      return false;
    }
    else
    {
      return true;
    }
  }
  const handleWordsDensityOnPage = async () => {
    const result =  await findInPdfPage(enteredWords);
    setWordsDensityOnPage(result);
    const key = result[pagePointer][0];
    whichPage(key);
  };
  const handleNextPrev = (z) =>
  {
      if(z==-1)
      {
            if(pagePointer-1 <= 0)
            {
                setPrevButton(false);
            }
            setNextButton(true);
            var key = wordsDensityOnPage[pagePointer-1][0];
            whichPage(key)
            setPagePointer(pagePointer-1)

      }
      else
      {
          if(pagePointer+1 >= wordsDensityOnPage.length-1)
          {
              setNextButton(false);
          }
          setPrevButton(true);
          let key = wordsDensityOnPage[pagePointer+1][0];
          whichPage(key)
          setPagePointer(pagePointer+1)
      }
  }
  const handleInputChange = (event) => {
    if (event.target.value.endsWith(',')) {
      const listOfSynonyms = [];
      const trimmedWord = event.target.value.slice(0, -1).trim();
      if(words === "Synonyms Enabled")
      {
        fetch(`https://api.datamuse.com/words?rel_syn=${trimmedWord}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(data => {
               for(let i=0;i<data.length;i++)
               {
                  if(data[i].score > dict[synScore])
                    {
                      listOfSynonyms.push(data[i].word);
                    }
               }
               setEnteredWords(RemoveDuplicates([...enteredWords, trimmedWord,...listOfSynonyms]));
              })
          .catch(error => {
            // handle any errors
            console.error(error);
          });
      }
      else
      {
        setEnteredWords(RemoveDuplicates([...enteredWords, trimmedWord,...listOfSynonyms]));
      }
      event.target.value = '';
    }
  };
  return (
    <div>
      <p className="sameLine"><span className='underSmall'>Choose Synonyms Score:</span>
      <input type="radio" id="low" name="radioGroup" value="low"  checked={synScore === 'low'} onChange={handleSyncScore} disabled={disabledORnot()}/>
      <label htmlFor="low">Low</label>

      <input type="radio" id="mid" name="radioGroup" value="mid" checked={synScore === 'mid'} onChange={handleSyncScore} disabled={disabledORnot()} />
      <label htmlFor="mid">Mid</label>

      <input type="radio" id="high" name="radioGroup" value="high"  checked={synScore === 'high'} onChange={handleSyncScore} disabled={disabledORnot()}/>
      <label htmlFor="high">High</label>
      </p>
      <div className='sameLineEqualPartion'>
      <button className="button-28" role="button" onClick={()=>handleNextPrev(-1)} disabled={!prevButton}>&laquo;prev</button>
      <input type="checkbox" id="switch" className='bodyForSyn' onChange={handleSwitchChange}/><label className='label' htmlFor="switch"></label>
      <button className="button-28" role="button" onClick={()=>handleNextPrev(1)} disabled={!nextButton}>next&raquo;</button>
      </div>

      <p className='under'>{words}</p>
      <div className='inputBox'><input className='input' placeholder='Enter The Words Seprated By Comma'
        onChange={handleInputChange}/>
      <TypedWords enteredWords={enteredWords} removeId={removeId}/></div>
      <div>
        <button className='button-7 clearAll' onClick={()=>setEnteredWords([])}>Clear All</button>
        <button className='button-7 searchPadding' onClick={handleWordsDensityOnPage}>Search</button>
      </div>
    </div>
  );
}
export default App;