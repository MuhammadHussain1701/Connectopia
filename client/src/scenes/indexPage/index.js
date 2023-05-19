import { NavLink } from "react-router-dom";
import layerBaseImage from "../../img/layer-base.png";
import layerMiddleImage from "../../img/layer-middle.png";
import layerFrontImage from "../../img/layer-front.png";
import dungeonImage from "../../img/dungeon.jpg";
import { useEffect, useState } from "react";
import { gsap } from "gsap-trial";
import ScrollTrigger from "gsap-trial/ScrollTrigger";
import ScrollSmoother from "gsap-trial/ScrollSmoother";
function IndexPage() {
  useEffect(() => {
    window.addEventListener("scroll", () => {
      let scrollY = window.scrollY;
      document.documentElement.style.setProperty("--scrollTop", `${scrollY}px`);
    });
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    ScrollSmoother.create(
      {
        wrapper: ".wrapper",
        content: ".content",
      },
      []
    );
  });
  
  return (
    <div class="wrapper">
      
        <div class="content">
          <header class="main-header">
            <div class="layers">
              <div class="layer__header">
                <div class="layers__caption">WELCOME TO </div>
                <div class="layers__title">CONNECTOPIA</div>
              </div>
              <div
                class="layer layers__base"
                style={{ backgroundImage: `url(${layerBaseImage})` }}
              ></div>
              <div
                class="layer layers__middle"
                style={{ backgroundImage: `url(${layerMiddleImage})` }}
              ></div>
              <div
                class="layer layers__front"
                style={{ backgroundImage: `url(${layerFrontImage})` }}
              ></div>
            </div>
          </header>

          <article
            class="main-article"
            style={{ backgroundImage: `url(${dungeonImage})` }}
          >
            <div class="main-article__content">
              <h2 class="main-article__header">About</h2>
              <p class="main-article__paragraph">
                At Connectopia, we believe that social media is more than just
                scrolling through feeds and passively observing. It's about
                building genuine connections, fostering friendships, and
                creating a community where everyone feels valued. Our platform
                is designed to empower you to express yourself, connect with
                like-minded individuals, and engage in enriching conversations.
                With a user-friendly interface and a myriad of exciting
                features, Connectopia offers a refreshing and inclusive social
                media experience. Whether you're a seasoned social media
                enthusiast or new to the digital landscape, our platform caters
                to individuals of all backgrounds, ages, and interests.
              </p>

              <NavLink className="index-btn" to="/login">
                <button id="neonShadow"><span>Lets Connect</span></button>
              </NavLink>
            </div>
            <div class="copy">© Connectopia</div>
          </article>
        </div>
    </div>
  );
}

export default IndexPage;
