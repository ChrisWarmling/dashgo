import { FormLabel, FormControl, Input as ChakraInput, InputProps as ChakraInputProps, FormErrorMessage, useColorModeValue } from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: Partial<FieldError>;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, error, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <ChakraInput
        name={name}
        focusBorderColor="pink.500"
        bgColor={useColorModeValue("gray.400", 'gray.800')}
        variant="filled"
        _hover={{ bgColor: useColorModeValue('gray.400', 'gray.800') }}
        size="lg"
        ref={ref}
        {...rest}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
