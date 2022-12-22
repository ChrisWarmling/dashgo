import { Button } from '@chakra-ui/react'

interface PaginationItemProps {
  isCurrent?: boolean;
  pageNumber: number;
  onPageChange: (page: number) => void;
}

export default function PaginationItem({ isCurrent = false, pageNumber, onPageChange }: PaginationItemProps) {
  if (isCurrent)
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        bg="pink"
        disabled
        _disabled={{ bg: 'pink.500', cursor: 'default' }}
      >
        {pageNumber}
      </Button>
    )
  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bg="gray.400"
      _hover={{ bg: 'gray.300' }}
      onClick={() => onPageChange(pageNumber)}
    >
      {pageNumber}
    </Button>
  )
}
