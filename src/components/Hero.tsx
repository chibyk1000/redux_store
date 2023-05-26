import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate =  useNavigate()
  return (
    <section className="hero">
      <div>
        <h2>One Solution for all Your Shopping</h2>

        <article>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
          velit nisi? Illum nam voluptatibus ullam exercitationem nihil corporis
          maiores deserunt autem soluta in sint tempore quae, perspiciatis sed
          vero blanditiis quo vitae voluptate quisquam enim.{" "}
        </article>

        <Button variant="contained" color="warning" onClick={()=>navigate('/products')}>Start shopping</Button>
      </div>

      <div>
        <img src="/images/camera.png" alt="" />
      </div>
    </section>
  );
};

export default Hero;
