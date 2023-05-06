import { Heading, Box, Grid } from '@chakra-ui/react'
import { MatchCard } from './match-card'
import { hyphenateMatchString } from '../../lib/string'
import Link from 'next/link'

interface MatchListProps {
  matches: CustomMatchesByWeek
}

export function MatchList({ matches }: MatchListProps) {
  return (
    <>
      {Object.entries(matches).map(([weekNumber, weekMatches]) => (
        <Box key={weekNumber} marginBottom="4rem">
          <Heading
            as="h3"
            size="md"
            fontWeight={700}
            marginBottom="1rem"
            color="#FFF"
          >
            Week {weekNumber}
          </Heading>
          <Grid
            templateColumns={{
              base: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            }}
            gap="1rem"
          >
            {weekMatches.map((match: CustomFixture) => (
              <Link
                href={{
                  pathname: '/matches/[match]',
                  query: {
                    id: match.id,
                  },
                }}
                passHref
                as={`/matches/${hyphenateMatchString(
                  match.homeTeam.name,
                  match.awayTeam.name
                )}`}
                key={match.id}
              >
                <MatchCard match={match} />
              </Link>
            ))}
          </Grid>
        </Box>
      ))}
    </>
  )
}
