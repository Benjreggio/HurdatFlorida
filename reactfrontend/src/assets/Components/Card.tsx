import {Storm} from '../types.ts'
import './Card.css'

function Card({item, divkey}: {item: Storm, divkey: number}) {
    var storm_name = item.stormName.toLowerCase().split(' ').map((word) => " " + word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return (
    <div key = {divkey} className = "stormcard">
        <h2>{(item.isHurricane? "Hurricane" : "Tropical Storm") + storm_name}</h2>
        <div className='block'>
            <p>Storm id: {item.stormID}</p>
            <p>Max wind speed: {item.maxWindSpeed} mph</p>
            <p>Wind speed during first landfall: {item.maxWindSpeed} mph</p>
            <p>First landfall date: {item.landfallDate.substring(0,10)} </p>
        </div>
        {item.hasStrictLandfall? (<div className = "block">
            <p>Wind speed at strict landfall: {item.strictWindSpeedAtLandfall} mph</p>
            <p>Strict landfall date: {item.strictLandfallDate.substring(0,10)}</p>
        </div>) : <></>}
    </div>);
}

export default Card;