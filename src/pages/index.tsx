import { Box , Image, HStack,ChakraProvider, Divider,Heading,VStack,Flex,Text,SimpleGrid,useMediaQuery} from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

import {Header} from '../components/Header'
import {CustomIcons} from '../components/CustomIcons'
import {Swiper,SwiperSlide} from 'swiper/react'
import styles from './swiper.module.css'
import { extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"


import SwiperCore, {
  Navigation,Pagination,Mousewheel,Keyboard
} from 'swiper/core';
import { GetStaticProps,GetServerSideProps } from 'next'
import { getPrismicClient } from '../services/prismic'
import Primic from '@prismicio/client'
// install Swiper modules
SwiperCore.use([Navigation,Pagination,Mousewheel,Keyboard]);

 interface Continent{
  data:{
    id:string
    title:string,
    subtitle:string,
    banner:string
  }
 }

interface ContinentPagination {
 results:Continent[]
}


interface HomeProps{
 continentPagination:ContinentPagination
}

const breakpoints = createBreakpoints({
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
})
// 3. Extend the theme
const theme = extendTheme({ breakpoints })


export default function Home({continentPagination}:HomeProps) {


  const [isSmaller] = useMediaQuery("(min-width: 768px)")
    
  return (
    <Box width="100%" px="0">
      
        <Header/>
        <ChakraProvider>
        <Box position="relative">
              <Box h="100%" maxH={300}>
               <Image   h="100%" src="images/Background.png" />
              </Box>

              <Flex px="8" w="100%" alignItems="center" direction="row" justifyContent="space-between" position="absolute" top="0" >
                <VStack  mt={{base:'100',md:'0'}} alignItems={{md:'start'}} maxW={600}  >
                 <Heading  fontSize={{sm:20,md:36}} color="white" fontWeight="medium" >
                   5 continentes,<br/>
                   infinitas possibilidades.
                 </Heading>
                 <Text 
                 fontSize={{sm:14,md:20}} 
                 fontWeight="400" color="white" > Chegou a hora de tirar do papel a viagem que você <br/> sempre sonhou</Text>
                 </VStack>
                  <Image display={{base:'none',md:'initial'}} src="images/Airplane.png" />
                </Flex> 
        </Box>
   
        <SimpleGrid   minChildWidth="120px"columns={6} mt="105" alignItems="center" maxWidth={1000} justifyContent="space-between" mx="auto"  >
            <CustomIcons name="Vida noturna"  url="images/cocktail.png"/>
            <CustomIcons name="praia"  url="images/surf.png"/>
            <CustomIcons name="moderno"  url="images/Group.png"/>
            <CustomIcons name="clássico"  url="images/museum.png"/>
            <CustomIcons name="e mais..."  url="images/earth.png"/>
        </SimpleGrid>

   <Box mt="10"  p="10" >
       <Divider  mx="auto" maxWidth={100} orientation="horizontal"  bg="#47585B"  h="1"/>
   </Box>
   <Box>
      <VStack>
        <Heading fontSize={{base:20,md:36}} fontWeight="500" color="#47585B">Vamos nessa ?</Heading>
        <Heading fontSize={{base:20,md:36}} fontWeight="500" color="#47585B"  >Então escolha seu continente</Heading>
      </VStack>
   </Box>


   <Box py="22" >
   <Swiper  className={styles.swiperContainer}  cssMode={true} 
   navigation={true} 
   pagination={true}
    mousewheel={true} keyboard={true} >
      {continentPagination.results.map((cont,i)=>{
        return(
          <SwiperSlide   className={styles.swiperSlide}>
     
        <VStack w="100%" h={{base:250,md:450}}  px="18" position="relative" >
             

        
                  <Image  fit="fill" maxH="500"  w="100%"  h="100%" objectFit="fill" src={cont.data.banner}/>
       
              <Link href={`/continent/${cont.data.id}`}>
        
               <Flex _hover={{cursor:'pointer'}} top={{base:"120",md:"190"}} position="absolute" direction="column" >
                 <Heading fontSize={{base:24,md:48}} fontWeight="bold" color="white">{cont.data.title}</Heading>
                 <Text color="white" fontSize={{base:14,md:24}} fontWeight="bold" >{cont.data.subtitle}</Text>
               </Flex>
             </Link>
        </VStack>
      
      </SwiperSlide>
        )
      })}
    
     </Swiper>
   </Box>
   </ChakraProvider>
 </Box>
  
  )
}



export const getStaticProps:GetStaticProps = async () =>{
  const prismic = getPrismicClient()
  
  const response = await prismic.query(

    Primic.predicates.at('document.type','continents'),
    {
      fetch:['continents.title','continents.subtitle','continents.banner'],
      pageSize:20
    
    }
  ) 


  console.log(JSON.stringify(response,null,2))
    const results = response.results.map(continent=>{
     return({
        data:{
        id:continent.uid,
       title:continent.data.title[0].text,
       subtitle:continent.data.subtitle[0].text,
        banner:continent.data.banner.url
       }
     })
    })

  return{
    props:{
       continentPagination:{results},
     },
   
  }
}
  
