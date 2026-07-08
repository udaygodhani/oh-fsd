import React from 'react'
import TradingViewWidget from './components/graph/TradingViewWidget'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import MarketLayout from './pages/Market/MarketLayout'
import CryptoHeatmap from './pages/More/CryptoHeatmap'
import CryptoCompare from './pages/More/CryptoCompare'
import PricePrediction from './pages/More/PricePrediction'
import CryptoConverter from './pages/More/CryptoConverter'
import CryptoCalculator from './pages/More/CryptoCalculator'
import MoreLayout from './pages/More/MoreLayout'
import ProductLayout from './pages/Products/ProductLayout'
import Spot from './pages/Market/Spot'
import Future from './pages/Market/Future'
import All from './pages/Market/All'
import AppPromotion from './pages/Products/AppPromotion'
import SipPlan from './pages/Products/SipPlan'
import Services from './pages/Products/Services'
import { Toaster } from 'react-hot-toast';
import Auth from './pages/auth/Auth';
import PageNotFound from './pages/NotFound/PageNotFound';
import Navbar from './components/Navbar';
import Web3Layout from './components/Layout/Web3Layout'
import Explore from './pages/Market/Web3/Explore'
import Gaming from './pages/Market/Web3/Gaming'
import Nft from './pages/Market/Web3/Nft'
import Defi from './pages/Market/Web3/Defi'

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/market' element={<MarketLayout />}>
          <Route path='Spot' element={<Spot />} />
          <Route path='future' element={<Future />} />
          <Route path='all' element={<All />} />
          <Route path='web3' element={<Web3Layout />} >
            <Route index element={<Navigate to='explore' replace />} />
            <Route path='explore' element={<Explore />} />
            <Route path='defi' element={<Defi />} />
            <Route path='nft' element={<Nft />} />
            <Route path='gaming' element={<Gaming />} />
          </Route>
        </Route>
        <Route path='/products' element={<ProductLayout />}>
          <Route path='apppromotion' element={<AppPromotion />} />
          <Route path='sipplan' element={<SipPlan />} />
          <Route path='services' element={<Services />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
        <Route path='/more' element={<MoreLayout />}>
          <Route path='cryptoheatmap' element={<CryptoHeatmap />} />
          <Route path='cryptocompare' element={<CryptoCompare />} />
          <Route path='priceprediction' element={<PricePrediction />} />
          <Route path='curencyconverter' element={<CryptoConverter />} />
          <Route path='cryptocalculator' element={<CryptoCalculator />} />
        </Route>
      </Routes>

    </>
  )
}

export default App