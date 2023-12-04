import { useStockActionsContext, useStockStateContext } from '@/context/StockContext'
import getBase64 from '@/functions/getBase64'
import { Button, Text, Center, Divider, Flex, FormLabel, Grid, GridItem, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Box } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { BiUpload } from 'react-icons/bi'
import NoPicture from '@/assets/product.svg'

const StockProductForm = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { showProductModal } = useStockStateContext()
    const { setShowProductModal } = useStockActionsContext()
    const [productImage, setProductImage] = useState<string>('')
    const [productImageName, setProductImageName] = useState<string>('')
    const finalRef = useRef(null)
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e?.target?.files?.[0]){
            getBase64(e?.target?.files[0]).then((img:any) => {
                setProductImageName(e?.target?.files?.[0].name || '')
                setProductImage(img)
                console.log(img)
            })
        }
    }

    useEffect(() => {
        if(showProductModal){
            onOpen()
        }
    },[showProductModal])

    const handleClose = () => {
        setShowProductModal(false)
        onClose()
    }
  return (
    <Modal 
    isCentered 
    size='5xl' 
    finalFocusRef={finalRef} 
    isOpen={isOpen} 
    onClose={handleClose}
    >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight={700} fontSize={36}>
            Producto
            <Divider />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Formik
            initialValues={{}}
            validate={(values)=>{}}
            onSubmit={(values, actions) => {}}
            enableReinitialize
            >
                {({})=>(
                    <Form>
                        <Center>
                            <FormLabel
                            position='relative'
                            marginInline='auto'
                            p={3}
                            border='1px solid #D5D5D5'
                            rounded='xl'
                            mb={4}
                            >
                            <Flex
                            justifyContent='space-between'
                            alignItems='center'
                            w='calc((9/10)*250px)'
                            h='250px'
                            >
                                <Box 
                                borderRadius={40} 
                                position='relative' 
                                w={['100px', '500px']}
                                >
                                    <Image
                                    width={500}
                                    height={(9/16)*500}
                                    src={productImage ? productImage : NoPicture}
                                    alt='Logo dbocados'
                                    />
                                    <Text textAlign='center'>
                                        {productImage ? 'Cambia la imagen' : 'Añade una foto'}
                                    </Text>
                                </Box>
                            </Flex>
                            <Input
                                type='file'
                                accept='image/*'
                                onChange={(e) => handleImage(e)}
                                hidden
                                placeholder='Comprobante de domicilio'
                            />
                            </FormLabel>
                        </Center>
                        <Grid w='100%' templateColumns={['1fr', '1fr 1fr']} gap={4} alignItems='center' justifyContent='center' mb={6}>
                            <GridItem position='relative'>
                                <Field 
                                as={Input}
                                focusBorderColor='#e80297'
                                type='text'
                                name='name'
                                placeholder='Nombre del producto'
                                /> 
                            </GridItem>
                            <GridItem position='relative'>
                                <Field 
                                as={Input}
                                focusBorderColor='#e80297'
                                type='text'
                                name='brand'
                                placeholder='Marca'
                                /> 
                            </GridItem>
                            <GridItem position='relative'>
                                <Field 
                                as={Input}
                                focusBorderColor='#e80297'
                                type='number'
                                name='amount'
                                placeholder='Cantidad'
                                /> 
                            </GridItem>
                        </Grid>
                        <Grid my={10} templateColumns={['auto 1fr']} w={['100%', '50%']}>
                            <FormLabel>Asigna un rol:</FormLabel>
                            <Field 
                            as={Input}
                            focusBorderColor='#e80297'
                            type='text'
                            name='position'
                            placeholder='Rol de trabajo'
                            /> 
                        </Grid>
                        <Grid 
                        mt={4} 
                        alignItems='end' 
                        gap={4} 
                        templateColumns={['1fr 1fr 1fr']}
                        bg='rgba(0, 0, 0, 0.05)'
                        p={4}
                        borderRadius={20}
                        >
                            <GridItem position='relative'>
                                <FormLabel>Cantidad disponible:</FormLabel>
                                <Field 
                                as={Input}
                                focusBorderColor='#e80297'
                                type='number'
                                name='new_area'
                                placeholder='0'
                                /> 
                            </GridItem> 
                            {/* <GridItem position='relative'>
                                <FormLabel>Periodicidad</FormLabel>
                                <Field 
                                as={Input}
                                focusBorderColor='#e80297'
                                type='text'
                                name='new_area'
                                placeholder='Nueva area de trabajo'
                                /> 
                            </GridItem>  */}
                            {/* <GridItem position='relative'>
                                <Flex gap={4} justifyContent='center'>
                                    <Button>Editar</Button>
                                    <Button>Añadir</Button>
                                </Flex>
                            </GridItem>  */}
                        </Grid>
                    </Form>
                )}
            </Formik>
          </ModalBody>

          <ModalFooter>
            <Button  mr={3} variant='outline'>Cancelar</Button>
            <Button onClick={handleClose}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default StockProductForm