import { Flex, Text, Box, Avatar } from "@chakra-ui/react"

interface ProfileProps {
  showProfileData: boolean;
}

export default function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData &&
        <Box mr="4" textAlign="right">
          <Text>Christian Warmling</Text>
          <Text color="gray.400" fontSize="small">christian@warmling.dev</Text>
        </Box>
      }

      <Avatar size="md" name="Christian Warmling" src='https://github.com/chriswarmling.png' />
    </Flex>
  )
}
