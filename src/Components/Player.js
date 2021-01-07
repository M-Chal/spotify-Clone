import React from 'react';
import "../player.css";
import Sidebar from './Sidebar';

function Player({ spotify }){
    return (
        <div className="player">
            <div className="playerBody">
                <Sidebar />
            </div>
        </div>
    )
}

export default Player;