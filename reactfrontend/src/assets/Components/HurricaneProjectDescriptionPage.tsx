import './HurricaneProjectDescriptionPage.css';
import Table from 'react-bootstrap/Table';

function HurricaneProjectDescriptionPage() {
    return (
        <div className = "description-page">
            <h3> Hurricane Project Description </h3>
            <p>
                This project was part of a job application. The goal of the project was to identify hurricanes that made landfall in Florida since 1900 using the NOAA HURDAT2 dataset, and build an application to parse the data and output a report listing the name, date of landfall, and max wind speed for each event.
                The results could be used to help predit the risk of future hurricanes making landfall in Florida, and their potential impact.
            </p>
            <br/>
            <a href = 'https://www.nhc.noaa.gov/data/hurdat/hurdat2-1851-2024-040425.txt'> Tropical storm data </a>
            <br/>
            <a href = 'https://eric.clst.org/tech/usgeojson/'> Geographical data </a>
            <br/>
            <a href = '/DataExplorer'> Data Explorer </a>
            <br/>
            <a href = '/EDA'> Data Analysis </a>
            <br/>
            <div className  = 'imgalign'>
                <div className='textblock'>
                    <h4> Project Requirements: </h4>
                    <ul>
                        <li>Use the NOAA Best Track Data (HURDAT2) to identify all <b>hurricanes</b> that have made <b>landfall in Florida</b> since <b>1900</b>.</li>
                        <li>Using a programming language of your choice, <b>build an application</b> to parse the HURDAT2 data, identify the <b>storms</b> that made landfall in Florida, and output a <b>report</b> listing the <b>name, date</b> of landfall, and <b>max wind speed</b> for each <b>event</b>.</li>
                        <li>Note that there is a Landfall indicator in the track data, but see if you can find a way to identify landfalling events<b> without using that indicator.</b></li>
                    </ul>
                    <ul>
                        <li>Landfall in Florida - without using the indicator</li>
                        <li>Hurricane/Storm</li>
                        <li>Name/date/wind speed information for each event</li>
                    </ul>
                </div>
                <img src='/imgs/StormFrequencyPlot.png' alt='Storm Frequency Plot'/>
            </div>
            <br/>
            <div className='imgalign'>
                <img src='/imgs/HurdatAnnotated.png' alt='HURDAT2 Description'/>
                <div className='textblock right'>
                    <h4> What does HURDAT2 tell us? </h4>
                    <p>Storm info: Name, ID</p>
                    <p>Location info with datetime</p>
                    <p>Wind Speed</p>
                    <p>Extra info: pressure, size</p>
                </div>
            </div>
            <br/>
            <h3 className='center'> 3 sets of requirements: </h3>
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
            <br/>
            <div className='imgalign'>
                <div className='textblock'>
                    <ul>
                        <li> Data: HURDAT2 + geographical data: </li>
                        <ul>
                            <li>Geographical:<a href = "https://eric.clst.org/tech/usgeojson/"> https://eric.clst.org/tech/usgeojson/ </a></li>
                            <li>HURDAT2:<a href = 'https://www.nhc.noaa.gov/data/hurdat/hurdat2-1851-2024-040425.txt'> Link to tropical storm data </a></li>
                        </ul>
                        <li>
                            Python
                            <ul>
                                <li>Quick to test</li>
                                <li>Most Experience</li>
                                <li>Fastest way to MVP</li>
                            </ul>
                        </li>

                        <li>React/C#/MSSQL Stack</li>

                        <li>AWS - Free Tier</li>

                        <li>Nginx - Fast & available on linux</li>
                    </ul>
                </div>
                <img src='/imgs/ProjectArchitecture.png' alt='Project Architecture'/>
            </div>
        </div>
    );
}

export default HurricaneProjectDescriptionPage;