import { useEffect } from 'react'
import { Box, Flex } from '@chakra-ui/layout'
import { WrapItem, useDisclosure, useMediaQuery } from '@chakra-ui/react'
import { AuthenticationButtons } from './header-auth'
import { Logo } from '../logo'
import { HeaderIcons } from './header-icons'
import { Navigation } from '../navigation'
import { AuthDropdown } from '../auth-dropdown'
import { Search } from '../search'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import { useAuthContext } from '../../context/auth-context'

export function Header(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isTablet] = useMediaQuery('(min-width: 780px)')
  const [isMobile] = useMediaQuery('(max-width: 768px)')
  const { user, setUser } = useAuthContext()
  const { data: fetchedUser } = useCurrentUser()

  useEffect(() => {
    if (fetchedUser) {
      setUser(fetchedUser)
    }
  }, [fetchedUser, setUser])

  const handleSearchOpen = () => {
    onOpen()
  }

  return (
    <header>
      <Search isOpen={isOpen} onClose={onClose} />
      <Box
        height="4rem"
        position="sticky"
        padding={isMobile ? 4 : undefined}
        background="#121212"
      >
        <Flex
          justifyContent="space-between"
          width={{
            md: '720px',
            lg: '960px',
            xl: '1200px',
          }}
          margin="0 auto"
          height="100%"
          alignItems="center"
        >
          <Box>
            <Logo />
          </Box>

          <Navigation />

          {!user && isTablet && <AuthenticationButtons />}

          {user && isTablet && (
            <Box>
              <Flex alignItems="center">
                <HeaderIcons handleSearchOpen={handleSearchOpen} />
                <WrapItem>
                  <AuthDropdown user={user} />
                </WrapItem>
              </Flex>
            </Box>
          )}
        </Flex>
      </Box>
    </header>
  )
}
