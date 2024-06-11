import { Stack, VStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Colors } from '@styles/colors.ts';
import { Header } from '@components/Header';
import { Footer } from "@components/Footer";


export function Main(props: unknown) {

  return <VStack minHeight={'100vh'} bg={Colors.background} gap={0} textStyle='body'>
    <Header />
    <Stack flex={1} width='100%' direction='column' pt={{base: '72px', lg: '92px'}}>
      <Outlet />
    </Stack>
    <Footer />
  </VStack>
}
