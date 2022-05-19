// Useful command: ts-node ~/metaplex-foundation/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts

import React, { useEffect, useState } from "react";
import "./App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import CandyMachine from "./CandyMachine";

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {

	const [walletAddress, setWalletAddress] = useState(null);

	const checkIfWalletIsConnected = async() => {
		try {
			const {solana} = window;
			if(solana) {
				if(solana.isPhantom) {
					console.log('Phantom wallet found!');
					const response = await solana.connect({
						onlyIfTrusted: true
					});
					console.log('Connected with Public Key:', response.publicKey.toString());
					setWalletAddress(response.publicKey.toString());
				}
			}
			else {
				alert('Solana object not found! Get a Phantom wallet!');
			}
		}
		catch(error) {
			console.log(error);
		}
	};

	const connectWallet = async() => {
		const {solana} = window;
			if(solana) {
				const response = await solana.connect();
				console.log('Connected with Public Key:', response.publicKey.toString());
			}
	};

	const renderNotConnectedContainer = () => {
		return <button className='cta-button connect-wallet-button' onClick={connectWallet}>Connect to Wallet</button>
	};

	useEffect(() => {
		const onLoad = async() => {
			await checkIfWalletIsConnected();
		}
		window.addEventListener('load', onLoad);

		return () => window.removeEventListener('load', onLoad);
	}, []);

	return (
		<div className="App">
			<div className="container">
				<div className="header-container">
					<p className="header">🍭 Candy Drop</p>
					<p className="sub-text">NFT drop machine with fair mint</p>
					{!walletAddress && renderNotConnectedContainer()}
				</div>

				{walletAddress && (<CandyMachine walletAddress={window.solana}/>)}

				<div className="footer-container">
					<img
						alt="Twitter Logo"
						className="twitter-logo"
						src={twitterLogo}
					/>
					<a
						className="footer-text"
						href={TWITTER_LINK}
						target="_blank"
						rel="noreferrer"
					>{`Adapted from @${TWITTER_HANDLE}`}</a>
				</div>
			</div>
		</div>
	);
};

export default App;
