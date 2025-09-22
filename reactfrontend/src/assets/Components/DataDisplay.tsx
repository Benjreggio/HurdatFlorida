import Card from "./Card.tsx"
import { Storm } from "../types.ts"
import './DataDisplay.css'


function DataDisplay(props: {data: Storm[] | null}) {
    return (
        <div className = "data-display">
            {props.data?.map((item) => (
                <Card item={item} key = {item.stormID} divkey={item.stormID} />
            ))}
        </div>
    )
}

export default DataDisplay