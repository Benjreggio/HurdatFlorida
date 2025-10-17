import {Storm} from '../types.ts'
import './Card.css'

function Card({item, divkey}: {item: Storm, divkey: number}) {
    var unnamed = item.StormName == "UNNAMED"
    var title = item.IsHurricane? "Hurricane" : "Tropical Storm"
    var storm_name = item.StormName.toLowerCase().split(' ').map((word) => " " + word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const imgurl = `/figs/storm${item.StormID}.png`
    return (
    <div key = {divkey} className = "stormcard">
        <div className = 'block'>
            <h2>{unnamed? "Unnamed " + title : title + storm_name}</h2>
            <img src = {imgurl} alt = "No image available" className='stormimage'/>
        </div>
        <div className='block'>
            <p>Storm id: {item.StormID}</p>
            <p>Max wind speed: {item.MaxWindSpeed} mph</p>
            <p>Wind speed during first landfall: {item.WindSpeedAtLandfall} mph</p>
            <p>First landfall date: {item.LandfallDate.substring(0,10)} </p>
        </div>
        {item.HasStrictLandfall? (<div className = "block">
            <p>Wind speed at strict landfall: {item.StrictWindSpeedAtLandfall} mph</p>
            <p>Strict landfall date: {item.StrictLandfallDate.substring(0,10)}</p>
        </div>) : <></>}
    </div>);
}

export default Card;