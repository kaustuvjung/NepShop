    import React from 'react'
    import Hero from '../component/Product/Hero/Hero'
import Popular from '../component/Product/Popular/Popular'
import Offers from '../component/Offers/Offers'
import NewCollection from '../component/Product/NewCollection/NewCollection'

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