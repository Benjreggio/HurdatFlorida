import {Storm} from '../types.ts'
import './Card.css'

function Card({item, divkey}: {item: Storm, divkey: number}) {
    return (
    <div key = {divkey} className = "stormcard">
        <h2>{item.stormName}</h2>
        <p>Storm id: {item.stormID}</p>
        <p>Max Wind Speed: {item.maxWindSpeed} mph</p>
        <p>Date: {item.landfallDate.substring(0,10)} </p>
    </div>);
}

export default Card;