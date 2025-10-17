import "./DataExplorer.css"
import DataRetriever from "./DataRetriever.tsx"
import Table from 'react-bootstrap/Table';

function DataExplorer() {


    return (
        <div className="content">
            <h2>
                Data Explorer
            </h2>
            <p className="details">
                This includes all tropical storms and hurricanes that made landfall in Florida since 1900. 
                The max wind speed includes the max wind speed of the storm, not necessarily the wind speed at landfall.
                There are three categories of landfall, strict, liberal or any. They can be seen in this table:
            </p>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Strict requirement:</th>
                        <th>Liberal requirement</th>
                        <th>Any landfall</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>The storm makes landfall in Florida</td>
                        <td>The storm makes landfall in Florida</td>
                        <td>The storm makes landfall in Florida</td>
                    </tr>
                    <tr>
                        <td>The storm is at hurricane status while it is making landfall in Florida</td>
                        <td>The storm reaches hurricane status at some point</td>
                        <td>The storm may or may not reach hurricane status</td>
                    </tr>
                    <tr>
                        <td>The date on the data is the date of the first landfall in Florida while the storm is a hurricane</td>
                        <td>The date on the data is the date of the first landfall in Florida</td>
                        <td>The date on the data is the date of the first landfall in Florida</td>
                    </tr>
                    <tr>
                        <td>The wind speed on the data is the max wind speed while making the first landfall in Florida while the storm is a hurricane</td>
                        <td>The wind speed on the data is the max wind speed while making the first landfall in Florida</td>
                        <td>The wind speed on the data is the max wind speed of the storm</td>
                    </tr>   
                </tbody>
            </Table>
            <p className="details">
                This data is loaded from a sql database. The data processing can be found <a href="EDA">here</a>.
            </p>
            <DataRetriever/>
        </div>
    )
}

export default DataExplorer;