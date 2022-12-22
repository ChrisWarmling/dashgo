import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Th, Thead, Tr, Text, useColorModeValue, useBreakpointValue, Link } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import { useState } from "react";
import { RiAddLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/SideBar";
import { api } from "../../services/api";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";

const TEN_MINUTES = 1000 * 60 * 10

export default function UserList() {
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading, isFetching, error } = useUsers(currentPage)

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const {data} = await api.get(`users/${userId}`)

      return data
    }, {
      staleTime: TEN_MINUTES
    })
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          flex="1"
          borderRadius={8}
          bg='gray.800'
          p={['6', '8']}
        >
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários

              {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
            </Heading>

            <NextLink href="/users/create" passHref>
              <Button as="a" size="sm" fontSize="sm" colorScheme="pink" leftIcon={<Icon as={RiAddLine} fontSize="20" />} >
                Criar novo
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários.</Text>
            </Flex>
          ) : (
            <>
              <Table>
                <Thead>
                  <Tr>
                    <Th
                      px={['4', '4', '6']}
                      // color={useColorModeValue('gray.100', 'gray.900')}
                      color='gray.800'
                      width="8"
                    >
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                  </Tr>
                </Thead>

                <Tbody>
                  {data.users.map(user => (
                    <Tr key={user.id}>
                      <Td px={['4', '4', '6']}><Checkbox colorScheme="pink" /></Td>
                      <Td>
                        <Box>
                          <Link color='purple.400' onMouseEnter={() => handlePrefetchUser(user.id)}>
                          <Text fontWeight="bold">{user.name}</Text>
                          </Link>
                          <Text
                            fontSize="sm"
                            // color={useColorModeValue('gray.500', 'gray.300')}
                            color='gray.300'
                          >
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{user.createdAt}</Td>}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Pagination 
                currentPage={currentPage}
                totalCountOfRegisters={data.totalCount}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const { users, totalCount } = await getUsers(1)

//   return {
//     props: {
//       users
//     }
//   }
// }