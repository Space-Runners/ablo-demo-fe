import { Flex } from '@chakra-ui/react'

export default function SidebarDocs() {
  const BG_COLOR = 'linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'

  return (
    <Flex
      justify="center"
      direction="column"
      align="center"
      bg={BG_COLOR}
      borderRadius="30px"
      me="20px"
      position="relative"
    />
  )
}
