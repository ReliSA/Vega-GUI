import { useNavigate } from 'react-router-dom'
import { Layout, Typography, Space, Flex, theme } from 'antd'
import { AreaChartOutlined } from '@ant-design/icons'

const { Header } = Layout
const { Text, Link } = Typography

export default function AppHeader() {
    const navigate = useNavigate()
    const { token } = theme.useToken()

    return (
        <Header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 52,
            background: token.colorBgContainer,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
        }}>
            <Flex align="center" gap="small" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                <AreaChartOutlined style={{ fontSize: 18, color: token.colorText }} />
                <Text strong style={{ fontSize: '1rem' }}>GUI 4 Vega</Text>
            </Flex>
            <Space size="middle">
                <Link style={{ color: token.colorText }} onClick={() => navigate('/')}>Home</Link>
                <Link style={{ color: token.colorText }} onClick={() => navigate('/editor')}>Editor</Link>
                <Link href="https://vega.github.io/vega/" target="_blank">Vega</Link>
                <Link href="https://ant.design/" target="_blank">Ant Design</Link>
            </Space>
        </Header>
    )
}
