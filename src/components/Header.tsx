import { Box , Flex,Image} from "@chakra-ui/react";
import Link from 'next/link'


export  function Header(){
    return(

        <Flex  alignItems="center" justifyContent="center" p="10" >
           
          <Link href="/">
         
              <Box _hover={{cursor:'pointer'}} >
                <img src="/images/Logo.png" alt="" />
             </Box>
             </Link>
        </Flex>
    )
}