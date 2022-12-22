import { Icon, HStack, useColorModeValue } from "@chakra-ui/react"
import { RiAddLine, RiNotificationLine } from 'react-icons/ri'

export default function NotificationsNav() {
  return (
    <HStack
      spacing={['6', '8']}
      mx={['6', '8']}
      pr={['6', '8']}
      py="1"
      color="gray.400"
      borderRightWidth={1}
      borderColor='gray.400'
    >
      <Icon as={RiNotificationLine} fontSize="20" />
      <Icon as={RiAddLine} fontSize="20" />
    </HStack>
  )
}
