import React from 'react'
import HeroSlider from '../components/HeroSlider'
import CategorySlider from '../components/CategorySlider'
import { Helmet } from 'react-helmet-async'


export default function Home() {
  return (
    <>

      <Helmet>
        <title>Modifix | Premium Cutlery & Kitchen Essentials</title>
        <meta
          name="description"
          content="Discover premium cutlery and kitchen essentials at Modifix. Shop stylish spoons, forks, knives, and dining sets for every occasion."
        />
        <meta
          name="keywords"
          content="cutlery, kitchen cutlery, spoons, forks, knives, dinner sets, utensils, stainless steel cutlery, Modifix cutlery"
        />
        <link rel="canonical" href="https://modifix.com/" />
      </Helmet>


      <HeroSlider />

      <CategorySlider />


    </>
  )
}
