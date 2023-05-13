import React from "react";
import SimpleImageSlider from "react-simple-image-slider";
import styles from "./welcome.module.scss";

function Welcome() {
  const sliderImages = [
    {
      url: "https://img.freepik.com/premium-vector/online-food-order-website-banner-with-delivery-courier-mask_181313-3708.jpg?w=2000",
    },
    // {
    //   url: "https://t4.ftcdn.net/jpg/04/19/98/19/360_F_419981971_jftDSPRJGskIgVirQqtKLItcFdEZ4Zve.jpg",
    // },
    {
      url: "https://thumbs.dreamstime.com/z/free-shipping-website-banner-template-service-vector-courier-hands-package-box-van-over-white-background-137415217.jpg",
    },
    {
      url: "https://c8.alamy.com/comp/2H8KT6R/online-delivery-service-conceptperfect-for-landing-page-delivery-website-banner-background-application-poster-on-mobilevector-illustration-is-2H8KT6R.jpg",
    },
  ];
  return (
    <div className="content_right_container">
      <h1 className={styles.title_welcome}>Mừng quay trở lại Admin</h1>
      <div className={styles.welcome_container}>
        {/* <h3> Creating the image slider using the react-simple-image-slider</h3> */}
        <SimpleImageSlider
          width="80%"
          height={400}
          images={sliderImages}
          autoPlay={true}
          showBullets={true}
          showNavs={true}
          autoPlayDelay={3}
        />
      </div>
    </div>
  );
}

export default Welcome;
