// ProfileOrders.tsx
import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Colors } from '@styles//colors';

const ProfileOrders = () => (
  <Box bg={Colors.primaryBeige} p={4}>
    <Text fontSize="2xl" color={Colors.textRegular}>Order History</Text>
  </Box>
);

export default ProfileOrders;
