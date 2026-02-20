import { VegaEditor } from 'gui4vega_react'
import { useNavigate } from 'react-router-dom'
import { Layout, Typography } from 'antd'
import './EditorPage.css'

const { Header, Content } = Layout
const { Text } = Typography

export default function EditorPage() {
    const navigate = useNavigate()

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ display: 'flex', alignItems: 'center', background: '#fff', borderBottom: '1px solid #e8e8e8', padding: '0 2rem' }}>
                <Text strong style={{ fontSize: '0.95rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
                    Vega GUI
                </Text>
            </Header>
            <Content style={{ display: 'flex', flex: 1 }}>
                <VegaEditor />
            </Content>
        </Layout>
    )
}
