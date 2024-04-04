import React from 'react'
import './DescriptionBox.css'
const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews {122}</div>
        </div>
        <div className="descriptionbox-description">
            <p>An ecommerce platform is a digital marketplace that enables businesses
                to sell products or services online. These platforms provide a virtual
                storefront where merchants can showcase their offerings, manage inventory, 
                process transactions, and handle customer interactions. Customers can browse 
                through product listings, add items to their cart, and complete purchases securely 
                using various payment methods.
            </p>
            <p>
            Ecommerce platforms serve as powerful tools for businesses of all sizes to establish an 
            online presence, reach a global audience, and drive sales in the digital marketplace. 
            Whether selling physical products, digital goods, or services, ecommerce platforms provide 
            the infrastructure and tools needed to succeed in today's competitive online landscape.  
            </p>
                
        </div>
    </div>
  )
}

export default DescriptionBox