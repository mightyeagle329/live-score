import { useEffect, useState, useRef } from 'react'
import {
  Flex,
  Stack,
  Image,
  Heading,
  Card,
  StackDivider,
  CardBody,
} from '@chakra-ui/react'

interface SearchResultsProps {
  results: SearchResponse[]
}

export function SearchResults({ results }: SearchResultsProps) {
  const [selectedResultIndex, setSelectedResultIndex] = useState<number>(0)

  const handleKeyDown = useRef((e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setSelectedResultIndex((prevIndex) => (prevIndex + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      setSelectedResultIndex(
        (prevIndex) => (prevIndex - 1 + results.length) % results.length
      )
    }
  })

  useEffect(() => {
    const keydownRefCurrent = handleKeyDown.current
    document.addEventListener('keydown', keydownRefCurrent)
    return () => {
      document.removeEventListener('keydown', keydownRefCurrent)
    }
  }, [])

  return (
    <>
      {results.map((result: SearchResponse, index: number) => (
        <Card
          color="white"
          data-test="search-result"
          key={result.team.name}
          background={index === selectedResultIndex ? '#313131' : 'initial'}
          borderRadius={
            index === selectedResultIndex && index === 0
              ? '10px 10px 0 0'
              : index === selectedResultIndex && index === results.length - 1
              ? '0 0 10px 10px'
              : 'none'
          }
        >
          <CardBody padding="1rem">
            <Stack divider={<StackDivider />} spacing="2">
              <Flex alignItems="center">
                <Image
                  src={result.team.logo}
                  alt={result.team.name}
                  width={30}
                  height={30}
                />
                <Heading size="xs" textTransform="uppercase" marginLeft="1rem">
                  {result.team.name}
                </Heading>
              </Flex>
            </Stack>
          </CardBody>
        </Card>
      ))}
    </>
  )
}
