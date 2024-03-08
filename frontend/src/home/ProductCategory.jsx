import React from 'react'
import "./ProductCategory.scss"
import { useNavigate } from 'react-router-dom';
useNavigate

const categories =[
    {
    
        id: 1,
        title:"Shoes VIlla",
        image: "https://i.ibb.co/D1TvpVL/white-shoe.jpg",

    },{
       
        id: 2,
        title: "man Products",
        image: "https://i.ibb.co/RThT5KJ/men.jpg",
    }, {
        id : 3, 
        title : "Women Fashions",
        image: "https://i.ibb.co/nQKLjrW/c2.jpg",

    },
    {
       
        id: 4, 
        title: "Hot Gadget",
        image: "https://i.ibb.co/Bz5v6xs/gadget.jpg",
    },
    {
        
        id: 5,
        title: "Nike Sneakers",
        image: "https://media.gq.com/photos/63eba1b2275d2fef78a425c2/16:9/w_1920,c_limit/nike-running-shoes-streakfly-invincible.jpg",
    },    
];

const Category = ({title , image}) => {
    const navigate = useNavigate()
    return(
        <div className="category">
            <h3>{title}</h3>
            <img src={image} alt="cat" />
            <div className="--btn" onClick={() => navigate("/shop")}>
                {"Shop Now>>>"}
            </div>
        </div>
    )
}

const ProductCategory = () => {
  
  return (
    <div className="categories ">
        {categories.map((cat) => {
            return(
                <div key={cat.id} className="flex justify-center">
                    <Category title={cat.title} image={cat.image}/>
                </div>
            )
        })}
    </div>
  )
}

export default ProductCategory