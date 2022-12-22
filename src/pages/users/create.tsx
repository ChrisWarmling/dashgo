import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, useColorModeValue, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/SideBar";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const CreateUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório!'),
  email: yup.string().required('E-mail obrigatório!').email('E-mail inválido!'),
  password: yup.string().required('Senha obrigatória!').min(6, 'No mínimo 6 caracteres!'),
  password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais!')
})

export default function CreateUser() {
  const router = useRouter()

  const createUser = useMutation(async (user: CreateUserFormData) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date()
      }
    })

    return response.data.user
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(CreateUserFormSchema)
  })

  const { errors, isSubmitting } = formState

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await createUser.mutateAsync(values)
    router.push('/users')
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as='form'
          onSubmit={handleSubmit(handleCreateUser)}
          flex="1"
          borderRadius={8}
          bg='gray.800'
          p={['6', '8']}
        >
          <Heading size="lg" fontWeight="normal">Criar Usuário</Heading>

          <Divider my="6" borderColor="400" />

          <VStack>
            <SimpleGrid minChildWidth="140px" spacing={['6', '8']} w="100%">
              <Input
                {...register('name')}
                name="name"
                error={errors.name}
                type="name"
                label="Nome"
              />
              <Input
                {...register('email')}
                name="email"
                error={errors.email}
                type="email"
                label="Email"
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="140px" spacing={['6', '8']} w="100%">
              <Input
                {...register('password')}
                name="password"
                error={errors.password}
                type="password"
                label="Senha"
              />
              <Input
                {...register('password_confirmation')}
                name="password_confirmation"
                error={errors.password_confirmation}
                type="password"
                label="Confirmar Senha"
              />
            </SimpleGrid>
          </VStack>

          <Flex mt={['6', '8']} justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button >Cancelar</Button>
              </Link>

              <Button
                type="submit"
                colorScheme="pink"
                isLoading={isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}