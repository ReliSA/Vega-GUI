import { useNavigate } from 'react-router-dom'
import { Layout, Typography, Button, Flex, Image } from 'antd'
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'

const { Content } = Layout
const { Title, Paragraph } = Typography

export default function LandingPage() {
    const navigate = useNavigate()

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppHeader />
            <Content style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Flex vertical align="center" gap={12} style={{ maxWidth: 600, textAlign: 'center' }}>
                    <Image src="/icon.png" alt="Vega icon" width={96} height={96} preview={false} style={{objectFit: "contain", marginBottom: 8}}/>
                    <Title level={1} style={{ margin: 0 }}>
                        Ant Design Demo
                    </Title>
                    <Paragraph type="secondary" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                        Demo website showcasing a modular GUI for creating and editing Vega visualizations.
                        This site is built with React and Ant Design UI Library, which is also used by the <code>VegaEditor</code> component.
                    </Paragraph>
                    <Button type="primary" size="large" onClick={() => navigate('/editor')}>
                        Open Editor
                    </Button>
                </Flex>
            </Content>
            <AppFooter />
        </Layout>
    )
}