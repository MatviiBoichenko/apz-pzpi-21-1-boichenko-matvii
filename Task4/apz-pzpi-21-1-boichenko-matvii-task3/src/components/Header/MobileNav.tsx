import {Collapse, HStack, Icon, Image, Link, Stack, Text, useDisclosure, VStack, Wrap} from '@chakra-ui/react';
import {ChevronDownIcon} from '@chakra-ui/icons';
import React from 'react';
import {DeviceSpecificNavbarProps, NavbarItem} from './types.ts';

export const MobileNav: React.FC<DeviceSpecificNavbarProps> = ({navbarItems}) => {
    return (
        <Stack bg={'white'}
               w={'100%'}
               display={{lg: 'none'}}
               h='calc(100vh - 72px)'
               position='absolute'
               overflow='auto'>
            <VStack overflowY='auto' gap='20px' align='flex-start' py='20px'>
                {navbarItems.map((navItem) => (
                    <MobileNavItem key={navItem.label} {...navItem} />
                ))}
            </VStack>
        </Stack>
    );
};

const MobileNavItem = ({label, children, href, iconPath}: NavbarItem) => {
    const {isOpen, onToggle, onOpen, onClose} = useDisclosure();

    return (
        <Stack w='100%' spacing={4}
               {...(children && {onClick: onToggle, onMouseEnter: onOpen, onMouseLeave: onClose})} p='0px 16px'>
            <HStack py='8px'
                    as={Link}
                    href={href}
                    justify={'space-between'}
                    align={'center'}
                    _hover={{textDecoration: 'none',}}>
                <Wrap>
                    {iconPath && <Image src={iconPath} />}
                    <Text>{label}</Text>
                </Wrap>
                {children && (
                    <Icon as={ChevronDownIcon}
                          transition={'all .25s ease-in-out'}
                          transform={isOpen ? 'rotate(180deg)' : ''}
                          boxSize='24px' />
                )}
            </HStack>

            <Collapse in={isOpen} animateOpacity style={{marginTop: '0!important'}}>
                <Stack align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Link key={child.label}
                                  py='8px'
                                  href={child.href}
                                  _hover={{textDecoration: 'none'}}>
                                <Wrap>
                                    <Image src={child.iconPath} />
                                    {child.label}
                                </Wrap>
                            </Link>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};
