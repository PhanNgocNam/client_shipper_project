import React from "react";
import SimpleImageSlider from "react-simple-image-slider";
import styles from "./welcome.module.scss";

function Welcome() {
  const sliderImages = [
    {
      url: "https://chat.zalo.me/assets/inapp-welcome-screen-01.469ad7daf26e0303dd0d54eb5262e795.jpg",
    },
    {
      url: "https://chat.zalo.me/assets/inapp-welcome-screen-02.7f8cab265c34128a01a19f3bcd5f327a.jpg",
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
