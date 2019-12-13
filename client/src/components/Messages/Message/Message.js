import React from 'react';
import ReactEmoji from "react-emoji";

import './Message.css'

export default ({ message, user}) => {
    let isSentByCurrentUser = false;

    var {user:name, message:textMsg} = message; 

    var trimmedName = name.trim().toLowerCase();
    var trimmedUser = user.trim().toLowerCase();


    if( trimmedUser === trimmedName){
        isSentByCurrentUser = true;
    }

    if( name === 'admin') {
        return (
                <p className='messageText colorDark alignCenter'>{textMsg}</p>
        )
    }

    return (
        isSentByCurrentUser
        ? (
            <div className='messageContainer justifyEnd'>
                <p className='sentText pr-10'>{name}</p>
                <div className='messageBox backgroundBlue'>
                    <p className='messageText colorWhite'>{ReactEmoji.emojify(textMsg)}</p>
                </div>
            </div>
        )
        : (
            <div className='messageContainer justifyStart'>
                <div className='messageBox backgroundLight'>
                    <p className='messageText colorDark'>{textMsg}</p>
                </div>
                <p className='sentText pl-10'>{name}</p>
            </div>
        )
    )
}