import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';

import './Messages.css';

export default ( { messages, user } ) => (
    <ScrollToBottom className='messages'>
        {messages.map((message, i) => <div key={i}><Message message={message} user={user} /></div>)}
    </ScrollToBottom>
)