import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor : props.isHeld ? "#59E391" : "#fff"
    }

    return (
        <div 
            className="die-face" 
            style={styles} 
            key={props.id} 
            onClick={props.holdDice}
        >
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}