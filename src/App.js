import { useEffect, useState } from 'react';
import Web3 from 'web3'
import LazyNFT from "./truffle_abis/LazyNFT.json";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import './App.css';

function App() {

  const [account, setAccount] = useState('')
  const [lazyNFTContract, setLazyNFTContract] = useState({})
  const [minter, setMinter] = useState('')

  useEffect(()=>{
    loadWeb3();
    loadBlockchainData();
  },[])

  // useEffect(()=>{
  //   getMinter();
  // },[])

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("No ethereuem browser detected! check the MetaMask");
    }
  };

  const loadBlockchainData = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    const lazyNFT = LazyNFT.networks[networkId];

    if (lazyNFT) {
      const LazyNFTContract = new web3.eth.Contract(
        LazyNFT.abi,
        lazyNFT.address
      );
      setLazyNFTContract(LazyNFTContract);

      var y = await lazyNFTContract.methods.minter().call();
    console.log('y', y)
    setMinter(y)
    }
  };

  return (
    <div className="App">
      <Container>
        <Row className="justify-content-center" style={{ marginTop: "50px" }}>
          <Col xs lg="6">
            <p>Your account: {account}</p>
            <hr />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
