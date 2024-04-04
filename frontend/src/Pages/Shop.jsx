    import React from 'react'
    import Hero from '../Component/Product/Hero/Hero'
import Popular from '../Component/Product/Popular/Popular'
import Offers from '../Component/Offers/Offers'
import NewCollection from '../Component/Product/NewCollection/NewCollection'

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