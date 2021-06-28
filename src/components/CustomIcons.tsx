import { VStack, Image, Text, extendTheme,Box } from "@chakra-ui/react";
import React from "react";

import { createBreakpoints } from "@chakra-ui/theme-tools"

interface CustomIconsProps {
    url:string,
    name:string,
   
}

const breakpoints = createBreakpoints({
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
  })

  const theme = extendTheme({ breakpoints })

export function CustomIcons({url,name}:CustomIconsProps){

    return(
        <VStack verticalAlign="center" >
            <Image  display={{base:'none',md:'initial'}} src={url} />
            <Text  alignItems="center" fontSize={{sm:16,md:24}} 
             color="#47585B"
             fontFamily="Poppins"
             fontWeight="semibold" >
                   <Text fontSize={66} display={{base:'initial',md:'none'}} as="span" ml="0" color="#FFBA08">.</Text> {name}
                 </Text>   
        </VStack>
    )
}