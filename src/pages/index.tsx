import { Flex, Button, Stack, FormLabel, FormControl } from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from "../components/Form/Input";

type SignInFormData = {
  email: string;
  password: string;
}

const SignInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório!').email('E-mail inválido!'),
  password: yup.string().required('Senha obrigatória!')
})

export default function SignIn() {

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(SignInFormSchema)
  })

  const { isSubmitting, errors } = formState

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
  }

  return (
    <Flex
      h='100vh'
      w='100vw'
      align='center'
      justify='center'
    >
      <Flex
        as='form'
        w='100%'
        maxWidth={360}
        bg='gray.800'
        p='8'
        borderRadius={8}
        flexDir='column'
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing='4'>
          <Input
            {...register('email')}
            name="email"
            label="E-mail"
            type='email'
            error={errors.email}
            />

          <Input
            {...register('password')}
            name="password"
            label='Senha'
            type='password'
            error={errors.password}
          />
        </Stack>

        <Button
          type='submit'
          mt='6'
          colorScheme='pink'
          size='lg'
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
