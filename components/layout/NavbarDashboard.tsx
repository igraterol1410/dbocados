import React, { useEffect } from 'react'
import { Box, Flex, Button } from '@chakra-ui/react'
import DbocadosLogo from '@/assets/logo.svg'
import Image from 'next/image'
import { logOut } from '@/services/auth'
import { useRouter } from 'next/router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { firebaseApp } from '@/firebase'
import { AiOutlineLogout } from 'react-icons/ai'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import { motion } from 'framer-motion'

interface NavbarProps {
  asideOpen: boolean,
  setAsideOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const NavbarDashboard:React.FC<NavbarProps> = ({asideOpen, setAsideOpen}) => {  
    const auth = getAuth(firebaseApp);
    const router = useRouter()
    const handleLogOut = () => {
        logOut()
    }
    
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
          if(!user){
              router.push('/')
          }
        })
    }, [])

  return (
    <Flex
    px={['1rem', '2rem']}
    py={4}
    direction='row-reverse'
    gap={4}
    position='fixed'
    w='full'
    top={0}
    zIndex={1000}
    bg='#fcfcfc'
    >
      {/* <Box>
        <Image 
        src={DbocadosLogo} 
        height={40}
        alt='logo'
        />
      </Box> */}
      <Flex
      gap={4}
      fontSize='lg'
      color='#000'
      >
        <Box
        as={motion.div}
        transition='all ease .5s'
        _hover={{
          color: 'pinkPrimary'
        }}
        onClick={() => setAsideOpen(!asideOpen)}
        >
          <HiOutlineMenuAlt1 />
        </Box>
        <Box
        as={motion.div}
        transition='all ease .5s'
        _hover={{
          color: 'pinkPrimary'
        }}
        onClick={handleLogOut}
        >
          <AiOutlineLogout />
        </Box>
        {/* <Button variant='outline' color='white' onClick={handleLogOut}></Button> */}
      </Flex>
    </Flex>
  )
}

export default NavbarDashboard
