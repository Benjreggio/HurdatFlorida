import Card from "./Card.tsx"
import { Storm } from "../types.ts"
import './DataDisplay.css'


function DataDisplay(props: {data: Storm[] | null}) {
    return (
        <div className = "data-display">
            {props.data?.map((item,i) => (
                <Card item={item} key = {item.StormID} divkey={i} />
            ))}
        </div>
    )
}

export default DataDisplay