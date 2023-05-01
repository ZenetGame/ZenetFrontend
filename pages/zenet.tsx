import Image from 'next/image'
import { Inter } from 'next/font/google'

import React, { useState, useEffect, useCallback, FC, useMemo,useRef } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import {useDevicePixelRatio} from 'use-device-pixel-ratio'

import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletModalProvider, useWalletModal } from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";

import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";

import {
  DecryptPermission,
  Transaction,
  WalletAdapterNetwork,
  WalletNotConnectedError,
  MessageSignerWalletAdapter
} from "@demox-labs/aleo-wallet-adapter-base";




require("@demox-labs/aleo-wallet-adapter-reactui/styles.css");


const inter = Inter({ subsets: ['latin'] })

export default function Home() {


  const { requestTransaction } = useWallet();


    
    const [isGameOver, setIsGameOver] = useState(false);
    const [userName, setUserName] = useState();
    const [move, setMove] = useState();
    const [wallet, setWallet] = useState();
    const [publicKey, setPublickey] = useState();





    const dpr = useDevicePixelRatio()
    console.log("DPR___",dpr);





    const { unityProvider, isLoaded, loadingProgression, addEventListener, removeEventListener } = useUnityContext({
        loaderUrl: "build/senet.loader.js",
        dataUrl: "build/senet.data",
        frameworkUrl: "build/senet.framework.js",
        codeUrl: "build/senet.wasm",
      });
    
      // We'll use a state to store the device pixel ratio.
      const [devicePixelRatio, setDevicePixelRatio] = useState(
        dpr
      );
    

      const handleGameOver = useCallback((userName, score) => {
console.log("GAME_OVER")      
}, []);

      const handleSetMove = useCallback(async (position, move) => {
        console.log('GAME_EVENT / SETMOVE: ', position,move);
      





      }, []);

      const handleConnectWallet = useCallback(async () => {

        console.log("HANDLE_CONNECT_WALLET");
        console.log("_______CONNECTING TO WALLET_______");


        var wallet = new LeoWalletAdapter({ appName: 'Zenet'});


        wallet.connect(DecryptPermission.AutoDecrypt, WalletAdapterNetwork.Testnet).then(() => {
          let utf8Encode = new TextEncoder();
          let bytes = utf8Encode.encode("Leo & Zenet are awesome");
          wallet.signMessage(bytes);
          console.log('Signature: ', bytes);
          console.log('GAME_EVENT / PUBLICKEY: ', wallet.publicKey);
        });
        setPublickey(wallet.publicKey);
        setWallet(wallet);
      }, []);



        
          useEffect(() => {
            addEventListener("GameOver", handleGameOver);
            return () => {
              removeEventListener("GameOver", handleGameOver);
            };
          }, [addEventListener, removeEventListener, handleGameOver]);
          
      
     
          useEffect(() => {
            addEventListener("SetMove", handleSetMove);
            return () => {
              removeEventListener("SetMove", handleSetMove);
            };
          }, [addEventListener, removeEventListener, handleSetMove]);
          
      
          useEffect(() => {
            addEventListener("ConnectWallet", handleConnectWallet);
            return () => {
              removeEventListener("ConnectWallet", handleConnectWallet);
            };
          }, [addEventListener, removeEventListener, handleConnectWallet]);
          

        function game_start(){
            console.log("_______START WALLET_______");
        }

        function game_run(){
            console.log("_______RUN WALLET_______");
        }
        function game_move(){
            console.log("_______MOVE WALLET_______");


            //leo run move 7u8 2u8
        }




      const handleChangePixelRatio = useCallback(
        function () {
          // A function which will update the device pixel ratio of the Unity
          // Application to match the device pixel ratio of the browser.
          const updateDevicePixelRatio = function () {
            setDevicePixelRatio(dpr);
          };
          // A media matcher which watches for changes in the device pixel ratio.
          const mediaMatcher = matchMedia(
            `screen and (resolution: ${devicePixelRatio}dppx)`
          );
          // Adding an event listener to the media matcher which will update the
          // device pixel ratio of the Unity Application when the device pixel
          // ratio changes.
          mediaMatcher.addEventListener("change", updateDevicePixelRatio);
          return function () {
            // Removing the event listener when the component unmounts.
            mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
          };
        },
        [devicePixelRatio]
      );

  return (

        <Unity
            unityProvider={unityProvider}
            style={{ width: '100%', height: '100%' }}
            devicePixelRatio={devicePixelRatio}
        />

  )
}

