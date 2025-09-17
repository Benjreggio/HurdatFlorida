import * as React from "react"
import "./MainContent.css"
import { Storm } from "../types.ts"
import Card from "./Card.tsx"

function MainContent() {
    const [data, setData] = React.useState<Storm[] | null>(null)
    const [loading, setLoading] = React.useState<boolean>(true)
    const [error, setError] = React.useState<string | null>(null)

    React.useEffect(() => {
        fetch(import.meta.env.VITE_SERVER_URL + "/all+storm+info")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok")
                }
                return response.json()
            })
            .then((data: Storm[]) => {
                setData(data)
                setLoading(false)
            })
            .catch((error) => {
                setError(error.message)
                setLoading(false)
            })
    }, [])

    if (loading) return <p className="content">Loading...</p>
    if (error) return <p className="content">Error: {error}</p>

    return (
        <div className="datacontainer">
            <p>
                This includes all tropical storms and hurricanes that made landfall in florida since 1900. The max wind speed includes the max wind speed of the storm, not necessarily the wind speed at landfall.
            </p>

            {data?.map((item) => (
                <Card item={item} key = {item.stormID} divkey={item.stormID} />
            ))}
        </div>
    )
}

export default MainContent