import React from "react";
import {Box,Image,Text,VStack,ChakraProvider,HStack,Heading, Flex,SimpleGrid, Avatar,Tooltip,Icon} from '@chakra-ui/react'
import {Header} from '../../components/Header'
import { GetStaticPaths, GetStaticProps } from "next";
import Prismic from '@prismicio/client'
import {getPrismicClient} from '../../services/prismic'
import {RiInformationLine} from 'react-icons/ri'

interface Continent{
    id:string,
    heading:string,
    bannerdetail:string,
    description:string,
    countrys:Number,
    languages:Number,
    citys:Number,


    card:{
    photo:{
        url:string
    },
    flag:{
        url:string
    },
    citycard:{text:string},
    countrycard:{text:string}
    }[]
}


interface ContinentProps{
    continent:Continent
}

export default function Continent({continent} : ContinentProps){
   

    return(
       <VStack w="100%" p="0">
       
           <Header/>
           <ChakraProvider>
        <VStack w="100%" h={{base:"150",md:"500"}} position="relative">
        
               <Image  fit="fill"  maxH="400" h="100%" w="100%" src={continent.bannerdetail} />
            <Box bottom={{base:"10",md:'36'}} left="16"  position="absolute" >
             <Text color="white" fontWeight="semibold" fontSize={{base:28,md:48}} >{continent.heading}</Text>
           </Box>
       
         
           </VStack>
        <Box  w="100%" maxWidth={1110} p="16"  >
           <Flex w="100%" alignItems="center" flexDirection={{base:"column",md:"row"}} justifyContent="space-between" >
                <Box  >
                    <Text  color="#47585B" align="justify" w={{base:250,md:500}} textAlign="start" fontSize={{base:14,md:24}} fontWeight="normal" >
                   {continent.description}
                    </Text>
                </Box>
                <Box  >
                    <HStack spacing="50">
                        <VStack>
                            <Heading color="#FFBA08" fontSize={48} >{continent.countrys}</Heading>
                            <Text color="#47585B" fontSize={24} fontWeight="600" >países</Text>
                        </VStack>
                        <VStack>
                            <Heading  color="#FFBA08" fontSize={48} >{continent.languages}</Heading>
                            <Text color="#47585B"  fontSize={24} fontWeight="600" >línguas</Text>
                        </VStack>
                        <VStack>
                            <Heading  color="#FFBA08" fontSize={48} >{continent.citys}</Heading>
                            <Text alignItems="center" color="#47585B" fontSize={24} fontWeight="600" >
                                cidades +100
                                <Tooltip label={`${Number(continent.citys) + 100} cidades`} fontSize="md">
                                    <span>
                                         <Icon fontSize="md" color="#999999" as={RiInformationLine} />
                                         </span>
                                </Tooltip>
                                </Text>
                        </VStack>
                    </HStack>
                </Box>
             </Flex>

             <Flex direction="column" mt={20}>
               <Text color="#47585B"  fontSize={36} fontWeight="medium" >Cidades +100</Text>
                <Box mt={10}>
                    <SimpleGrid  minChildWidth="220px" columns={4}   justifyContent="start" >
                     

                           {continent.card.map(card=>{
                               return(
                                <Box key={card.citycard.text} maxH={300} maxW={200} boxShadow= "lg"  borderRadius="7">
                                <Image maxH={120} h="100%"  w="100%" fit="fill" src={card.photo.url}></Image>
                                <HStack  justifyContent="space-between" p="4" >
                                    <VStack alignItems="start">
                                        <Heading fontSize={20} fontWeight="semibold">{card.citycard[0].text}</Heading>
                                        <Text  color="#999999" fontSize={16} >{card.countrycard[0].text}</Text>
                                    </VStack>
                                    <Avatar objectFit="fill" size="10" boxSize={10} src={card.flag.url} />
                                </HStack>
                                </Box>
                               )
                           })}
                         
                    </SimpleGrid>
                </Box>
            </Flex>
           </Box>

       
           </ChakraProvider>
       </VStack>
    )
}

export const getStaticPaths:GetStaticPaths = async () => {
    const prismic = getPrismicClient();
     const posts = await prismic.query(
     Prismic.predicates.at('document.type','continents'),
      {fetch:['continents.bannerdetail','continents.heading','continents.description',
      'continents.countrys','continents.languages','continents.citys',
        'continents.photo','continents.citycard','continents.countrycard','continents.flag'],
     
    },
        
    
    );

    const paths = posts.results.map(post=>{

     return{
         params:{
             slug:post.uid
         }
     }
  })

   return{
     paths,
     fallback: 'blocking'
 }

  }
export const getStaticProps:GetStaticProps = async context =>{
    
    const prismic = getPrismicClient()
    const {slug} = context.params
    const response = await prismic.getByUID('continents',String(slug),{})
    
    console.log(JSON.stringify(response,null,2))

     const continent={
       id:response.uid,
        heading:response.data.content[0].heading[0].text,
        bannerdetail:response.data.content[0].bannerdetail.url,
        description:response.data.content[0].description[0].text,
        countrys:response.data.content[0].countrys,
        languages:response.data.content[0].languages,
        citys:response.data.content[0].citys,
      
        card: response.data.cards.map(card=>{
            return(
                {
                    photo:card.photo,
                    flag:card.flag,
                    citycard:card.citycard,
                    countrycard:card.countrycard
                }
            )
        })
     }

    return{
        props:{continent},
        
    }
}