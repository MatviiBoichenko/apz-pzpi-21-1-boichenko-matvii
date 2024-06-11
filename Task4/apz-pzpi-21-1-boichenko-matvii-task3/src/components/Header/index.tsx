import { Box, Collapse, Flex, HStack, IconButton, Image, Link, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Colors } from '@styles/colors.ts';
import { MobileNav } from './MobileNav.tsx';
import { DesktopNav } from './DesktopNav.tsx';
import { NavbarItem } from './types.ts';

export const NavbarItems: Array<NavbarItem> = [
  {label: 'Home', href: `/home`},
  {label: 'Profile', href: '/profile'},
  {label: 'My Orders', href: '/profile/orders'},
  {label: 'Card', href: '/card'},
  {
    label: 'Deliverer',
    // href: `/deliverer/machines`,
    children: [
      {
        // iconPath: '/img/solarCellsLogo.svg',
        label: 'Manage machines',
        href: '/deliverer/machines'
      },
      {
        label: 'Statistics',
        href: '/deliverer/statistics'
      },
    ]
  },
];

export const Header: React.FC = props => {
  const {isOpen, onToggle} = useDisclosure();

  return (
    <Box w='full' position='sticky' top={0} zIndex={1000} pos='absolute' color={Colors.gray700} textStyle='header'>
      <HStack minH={'72px'}
              w='full'
              px={{base: '16px', lg: '32px'}}
              bg={{base: (isOpen ? 'white' : 'transparent'), lg: 'white'}}
              borderBottom={isOpen ? 1 : 0}
              borderStyle={'solid'}
              borderColor='gray.200'
              align={'center'}
              justify='space-between'>
        <Flex flex={1} align='center' justify={{base: 'start', lg: 'center'}} gap='40px'>
          <Link>
            <Image src={'/img/medmobile-logo.png'} objectFit='contain' h='50px' />
          </Link>
          <Flex display={{base: 'none', lg: 'flex'}}>
            <DesktopNav navbarItems={NavbarItems} />
          </Flex>
        </Flex>

        <IconButton id='navbar_menu_button_mobile'
                    _hover={{}}
                    display={{base: 'flex', lg: 'none'}}
                    onClick={onToggle}
                    icon={isOpen ? <CloseIcon boxSize='20px' /> : <HamburgerIcon boxSize='24px' />}
                    variant={'ghost'}
                    aria-label={'Toggle Navigation'} />
      </HStack>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav navbarItems={NavbarItems} />
      </Collapse>
    </Box>
  );
};
