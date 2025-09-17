import './App.css'
import Header from './assets/Components/Header.tsx'
import MainContent from './assets/Components/MainContent.tsx'
import EDAHolder from './assets/Components/EDAHolder.tsx'
import { Routes, Route } from 'react-router-dom';

function App() {

    return (
        <div>
            <Header />

            <Routes>
                <Route path="/" element={<MainContent/>} />
                <Route path="/EDA" element={<EDAHolder />} />
            </Routes>
            
        </div>
    )
}

export default App