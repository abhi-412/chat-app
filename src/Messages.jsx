import {Box,
    Container,
    VStack,
    Button,
    HStack,
    Input} from '@chakra-ui/react'
  
  import {app} from './firebase'
  import Message from './Message'
   import {signOut, 
    onAuthStateChanged, 
    getAuth,GoogleAuthProvider,
    signInWithPopup} from 'firebase/auth'
  import { useState } from 'react';
  import { useEffect } from 'react';
  
  import {addDoc, 
    getFirestore,
    collection,
    serverTimestamp,
  onSnapshot,
  query,
  orderBy} from 'firebase/firestore'
  import { useRef } from 'react';
  
  const db = getFirestore(app)
  
  
  const auth = getAuth(app);
  const loginHandler = ()=>{
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth,provider)
  }
  const logoutHandler = ()=>signOut(auth)


  import React from 'react'
  
  const Messages = () => {


    const [user,setUser] = useState(false);
    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([])
  
    const divForScroll = useRef(null)
    
  
    const submitHandler = async (e)=>{
      e.preventDefault();
      try{
        setMessage("")
    
        const doc = await addDoc(collection(db,'Messages'),{
          text:message,
          uuid:user.uid,
          uri:user.photoURL,
          createdAt:serverTimestamp()
        })
  
        divForScroll.current.scrollIntoView({behavior:"smooth"})
      } catch(error){
        alert(error)
      }
    }
    
  
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(data)=>{
            setUser(data)
        });
        const que = query(collection(db,"Messages"),orderBy("createdAt",'asc'));
       const unsubscribeForMessages= onSnapshot(que,(snap)=>{
          setMessages(snap.docs.map((item)=>{
            const id = item.id;
            return {id, ...item.data()}
          }))
        }) 
        return ()=>{
            unsubscribe();
            unsubscribeForMessages();
          }
      },[])



    return (
        <Box bg={'red.50'}>
        {user ? <Container h={'100vh'} bg={'white'}>
            <VStack h={'full'} paddingY={'4'}>
              <Button onClick={logoutHandler} colorScheme={'red'} w={'full'}>
                Logout
              </Button>
                <VStack w={'full'} h={'full'} overflow={'auto'} css={{"&::-webkit-scrollbar" : {display:'none'}}} >
                
                  {messages.map((msg)=>(
                      <Message 
                      key={msg.id}
                       uri={msg.uri}
                       
                       user={msg.uuid===user.uid ? 'me' : 'other'} 
                       text={msg.text}/>
                  ))
                  
                }
                    <div ref = {divForScroll }></div>
                </VStack>
                <form style={{width:"100%"}}
                onSubmit={submitHandler}
                >
                  <HStack>
                      <Input value={message} onChange={(e)=>{setMessage(e.target.value)}} placeholder='Enter a Message'/>
                      <Button colorScheme='purple' type='submit'>
                        Send
                      </Button>
                  </HStack>               
                </form>
            </VStack>
  
  
        </Container>:(
          <VStack bg={'white'} h='100vh' justifyContent={'center'}>
              <Button onClick={loginHandler} colorScheme='blue' >SignUp with Google</Button>
          </VStack>
        )}
      </Box>
    )
  }
  
  export default Messages
  