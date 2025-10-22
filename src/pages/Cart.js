import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { deleteFromCart } from '../redux/EnrollSlice';

const Cartpage = () => {
    const cartitems=useSelector((state)=>state.cart.cartItems);
    console.log(cartitems);
    const dispatch=useDispatch();
   
   return (
    <section>
    <div className="BestSelllings">
        <h4 className='BestSellerHeader' >CART PRODUCTS</h4>
        <h6 className='BestSellerDes'>Grab our best products to brighten your day</h6>            
        <div class="container text-center" className='ProductContainer'>
          <div class="row">
            {
                cartitems.map((course)=>{
                    return(
                          <div className="course-grid">
                        {
        
            cartitems.map((course) => (
            <div className="course-card" key={course.id}>
                <img src={course.img} alt={course.title} className="course-img" />
                <h3>{course.title}</h3>
                <p>{course.description}</p>
               <button className="btn" onClick={()=>dispatch(deleteFromCart(course))}>delete From Cart -</button>

                
               
            </div>
            ))}
        </div>
                        
                    )
                })
            }
          </div>
      </div>
    </div>  
    </section>
  )
}


export default Cartpage;