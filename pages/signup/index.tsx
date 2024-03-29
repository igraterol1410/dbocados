import Layout from '@/components/layout/Layout'
import Seo from '@/components/seo/Seo'
import { Box, Button, FormControl, FormLabel, Grid, GridItem, keyframes, Heading, Input, InputGroup, InputRightAddon, Text, useToast } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import DbocadosLogo from '@/assets/logo.svg'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { createUser } from '@/services/auth'
import { useRouter } from 'next/router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { firebaseApp } from '@/firebase'

const Signup = () => {
    const [password, setPassword] = useState(true)
    const [loading, setLoading] = useState(false)
    const auth = getAuth(firebaseApp)
    const toast = useToast()
    const router = useRouter()
    const animationKeyframesInfo = keyframes`
  0% { transform: translateY(600px); opacity: 0 }
  100% { transform: translateY(0px); opacity: 1 }
`
    const animationInfo = `${animationKeyframesInfo} 1.5s ease-in-out `
    
    const animationKeyframes2 = keyframes`
  0% { transform: translateY(-600px); opacity: 0 }
  100% { transform: translateY(0px); opacity: 1 }
`
    const animation2 = `${animationKeyframes2} 1.5s ease-in-out `
    const handleSubmit = (values: {email:string, password:string}) => {
        setLoading(true)
        createUser(values).then((res:{error:boolean, message:string, user:any}) => {
            if(res.error){
                toast({
                    title: 'Error',
                    description: `${res.message}`,
                    position:'top-right',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }               
        setLoading(false)
        })
    }

    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                router.push('cotizador')
            }
        })
    }, [])

  return (
    <Seo
    title='Registrate'
    description='Resgistrate en nuestra web y obtén mejor atemción y más beneficios'
    >
        <Layout>
        <Grid w='full' templateColumns={['1fr', '1fr 1fr']} alignContent='center'>
            <GridItem 
            alignSelf='center'
            p={8}  
            w='100%' 
            h={['100vh']}
            marginInline='auto'
            // bg='#683c10'
            color='white'
            display='grid'
            alignItems='center'
            >
                <Box
                as={motion.div}
                animation={animation2}
                borderRadius={20}
                px={4}
                py={6}
                bg='rgb(240, 240, 240)'
                color='pinkPrimary'
                >
                    <Heading textAlign='center' mb={6}>
                        Registrate
                    </Heading>
                    <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validate={(values) => {}}
                    onSubmit={handleSubmit}
                    >
                        {({values, errors, touched}) => 
                        (
                            <Form>
                                <FormControl w='full' mt={5}>
                                    <FormLabel color='pinkPrimary'>Correo</FormLabel>
                                    <InputGroup size='md'>
                                        <Field
                                        as={Input}
                                        name='email'
                                        type='email'
                                        placeholder='Correo'
                                        />
                                        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                    </InputGroup>
                                </FormControl>
                                <FormControl w='full' mt={5}>
                                    <FormLabel color='pinkPrimary'>Contraseña</FormLabel>
                                    <InputGroup border='1px solid rgba(0, 0, 0, 0.20)' size='md' borderRadius={30}>
                                        <Field
                                        as={Input}
                                        borderRadius={30}
                                        variant='unstyled'
                                        px={2}
                                        name='password'
                                        type={password ? 'password' : 'text' }
                                        placeholder='Contraseña'
                                        />
                                        <InputRightAddon borderRadius={30} color='pinkPrimary' onClick={() => setPassword(!password)} >
                                            {password ? <AiFillEyeInvisible /> : <AiFillEye />}
                                        </InputRightAddon>
                                    </InputGroup>
                                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                </FormControl>
                                <Button 
                                mt={5} 
                                w='full'
                                bg='pinkPrimary' 
                                color='white'
                                type='submit'
                                isLoading={loading}
                                isDisabled={loading || !values.email || !values.password}
                                loadingText='Registrando usuario'
                                >
                                    Confirmar registro
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    <Text textAlign='center' mt={4}>
                        Ya tienes cuenta <Link href='/login'><u>inicia sesión</u></Link>
                    </Text>
                    <Text textAlign='center' mt={2}>
                        o <Link href='/'><u>Ir al inicio</u></Link>
                    </Text>
                </Box>
            </GridItem>
            <GridItem 
            justifySelf='center'
            display='flex'
            alignItems='center'             
            h={['100%','100vh']}
            as={motion.div}
            animation={animationInfo}
            >
                <Image
                src={DbocadosLogo}
                alt='Logo dbocados'
                />
            </GridItem>
        </Grid>
        </Layout>
    </Seo>
  )
}

export default Signup
