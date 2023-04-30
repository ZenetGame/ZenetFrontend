import Image from 'next/image'
import { Inter } from 'next/font/google'

import React, { useState, useEffect, useCallback, FC, useMemo } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import {useDevicePixelRatio} from 'use-device-pixel-ratio'

import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import {
  DecryptPermission,
  WalletAdapterNetwork,
  WalletNotConnectedError
} from "@demox-labs/aleo-wallet-adapter-base";

import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
require("@demox-labs/aleo-wallet-adapter-reactui/styles.css");


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const dpr = useDevicePixelRatio()
    console.log("DPR___",dpr);
    const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
        loaderUrl: "build/senet.loader.js",
        dataUrl: "build/senet.data",
        frameworkUrl: "build/senet.framework.js",
        codeUrl: "build/senet.wasm",
      });
    
      // We'll use a state to store the device pixel ratio.
      const [devicePixelRatio, setDevicePixelRatio] = useState(
        dpr
      );
    

      function connectWallet(){
        console.log("_______CONNECTING TO WALLET_______");
          var wallet = new window.LeoWallet.LeoWalletAdapter({ appName: 'Vanilla JS Example'});
          wallet.connect(window.AleoWalletBase.DecryptPermission.AutoDecrypt, window.AleoWalletBase.WalletAdapterNetwork.Testnet).then(() => {
            let utf8Encode = new TextEncoder();
            let bytes = utf8Encode.encode("Leo is awesome");
            wallet.signMessage(bytes);
            console.log('Signature: ', bytes);
          });
        
        
        
        }



        function game_start(){
            console.log("_______START WALLET_______");
        }

        function game_run(){
            console.log("_______RUN WALLET_______");
        }
        function game_move(){
            console.log("_______MOVE WALLET_______");
        }




      const handleChangePixelRatio = useCallback(
        function () {
          // A function which will update the device pixel ratio of the Unity
          // Application to match the device pixel ratio of the browser.
          const updateDevicePixelRatio = function () {
            setDevicePixelRatio(dpr);
          };
          // A media matcher which watches for changes in the device pixel ratio.
          const mediaMatcher = window.matchMedia(
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

    <WalletProvider
    wallets={wallets}
    decryptPermission={DecryptPermission.UponRequest}
    network={WalletAdapterNetwork.Localnet}
    autoConnect
  >
    <WalletModalProvider>
        <Unity
            unityProvider={unityProvider}
            style={{ width: 800, height: 600 }}
            devicePixelRatio={devicePixelRatio}
        />
    </WalletModalProvider>
  </WalletProvider>
  )
}

