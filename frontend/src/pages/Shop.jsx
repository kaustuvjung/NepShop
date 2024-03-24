    import React from 'react'
    import Hero from '../components/Hero/Hero'
import Popular from '../components/Popular/Popular'
import Offers from '../components/Offers/Offers'
import NewCollection from '../components/NewCollection/NewCollection'

    const Shop = () => {
    return (
        <div className='container mx-auto'>
            <Hero  className="w-full" />
            <Popular />
            <Offers />
            <NewCollection/>
        </div>
    )
    }

    export default Shop