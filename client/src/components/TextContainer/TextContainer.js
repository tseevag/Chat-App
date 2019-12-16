import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png'
import './TextContainer.css'

export default ({users, room}) => (
    
    <div className='textContainer'>
        <h1>You are in the room '{room}'</h1>
        {
            users
            ? (
                <div>
                    <h2>Active peoples:</h2>
                    <div className='activeContainer'>
                    {users.map((usr) => 
                     <div className='activeItem'>
                        {usr.name}
                        <img src={onlineIcon} alt=''></img>
                    </div>
                    )}
                        
                    </div>
                </div>
            ) 
            : null
        }
    </div>
    
)