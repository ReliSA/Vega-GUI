import { useNavigate } from 'react-router-dom'
import { Button, Typography, Flex } from 'antd'

const { Title, Paragraph } = Typography

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <Flex align="center" justify="center" style={{ minHeight: '100vh', padding: '2rem' }}>
      <Flex vertical gap="large" style={{ maxWidth: 560 }}>
        <Title level={1} style={{ margin: 0 }}>Vega GUI</Title>
        <Paragraph style={{ fontSize: '1rem', lineHeight: 1.7, margin: 0 }}>
          A modular, importable graphical interface for building and editing
          Vega grammar specifications. Compose visualizations through a
          structured, component-driven editor without writing JSON by hand.
        </Paragraph>
        <Button type="primary" size="large" style={{ alignSelf: 'flex-start' }} onClick={() => navigate('/editor')}>
          Open Editor
        </Button>
      </Flex>
    </Flex>
  )
}
