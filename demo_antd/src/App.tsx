import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { App as AntdApp, ConfigProvider, theme } from 'antd';
import LandingPage from './pages/LandingPage'
import EditorPage from './pages/EditorPage'

function App() {
    return (
        <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
            <AntdApp>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/editor" element={<EditorPage />} />
                    </Routes>
                </BrowserRouter>
            </AntdApp>
        </ConfigProvider>
    )
}

export default App
