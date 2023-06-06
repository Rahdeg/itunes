'use client'
import React from 'react'
import Login from '../components/Login'
import { app } from '../config/fire';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nullUser, userValidator } from '../GlobalRedux/features/users/userSlices';
import { useRouter } from 'next/navigation';

function Logins() {
  const [auth, setauth] = useState(false);
  const firebase= getAuth(app);
  // const { isAudioPlaying } = useSelector((store) => store.user);
  const dispat = useDispatch(); 
  

const router= useRouter();
useEffect(() => {
  const storedAuth = window.localStorage.getItem('auth');
  if (typeof window !== 'undefined' && storedAuth === 'true') {
    setauth(true);
  }
}, []);

  useEffect(() => {
    firebase.onAuthStateChanged((userCred)=>{
      if (userCred) {
        userCred.getIdToken().then((token)=>{
         dispat(userValidator(token));
        })
      }else{
        setauth(false);
        window.localStorage.setItem('auth','false');
        dispat(nullUser());
        router.push('/login');
      }
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
  <Login setauth={setauth}/>
  )
}

export default Logins