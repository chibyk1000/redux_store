import { useEffect } from "react";
import {  FaCartPlus } from "react-icons/fa";
import useAppDispatch from "../hooks/useAppDispatch";


import { addToCart } from "../redux/reducers/cartReducers";
import { useParams } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";
import Slider from "../components/Slider";

import { fetchSingleProduct } from "../redux/reducers/productReducers";
const SingleProduct = () => {
  const {product} = useAppSelector((state) => state.productsReducer);
  const { id } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSingleProduct(id as string));
  }, []);


      
  return (
    <>
      {product && (
        <div>
          <section className="single-product-details">
            <div className="images">
              <Slider images={product?.images as Array<string>} />
            </div>

            <div>
              <div className="details">
              <h1>{product.title}</h1>
                <article>
                  <p>price:</p>
                  <span>{product.price}</span>
                </article>
                <article>
                  <p>description:</p>
                  <span>{product.description}</span>
                </article>

                <button onClick={()=> dispatch(addToCart(product))}>Add To Cart <FaCartPlus/></button>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
