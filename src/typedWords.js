import React from 'react'
import TypedWord from './typedWord.js'

const TypedWords = ({enteredWords,removeId}) =>{
    return (
        <div>
            {enteredWords.map((enteredWord,index) => {
                return (
                    <TypedWord
                        key={index}
                        enteredWord={enteredWord}
                        index={index}
                        removeId={removeId}
                    />
                )
            })}
        </div>
    )
}
export default TypedWords