import './App.css'
import Header from './assets/Components/Header.tsx'
import DataExplorer from './assets/Components/DataExplorer.tsx'
import EDAHolder from './assets/Components/EDAHolder.tsx'
import HurricaneProjectDescriptionPage from './assets/Components/HurricaneProjectDescriptionPage.tsx'
import { Routes, Route } from 'react-router-dom';

function App() {

    return (
        <div>
            <Header />

            <Routes>
                <Route path="/" element={<HurricaneProjectDescriptionPage/>} />
                <Route path="/DataExplorer" element={<DataExplorer/>} />
                <Route path="/EDA" element={<EDAHolder />} />
            </Routes>
            
        </div>
    )
}

export default App