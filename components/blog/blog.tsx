import Image from "next/image";
import React from "react";
import styles from "../../styles/blog.module.scss";

const Blog = () => {
  return (
    <div className={styles.blog}>
      <h2 className="title-primary">FROM OUR BLOG</h2>
      <div className={styles["blog-list"]}>
        <div className={styles["blog-column"]}>
          <a href="#" className={styles["blog-item-main"]}>
            <div className={styles["blog-item-image"]}>
              <Image
                src="/sliders/slider1.png"
                width={1000}
                height={300}
                alt="Image"
              />
            </div>
            <div className={styles["blog-item-content"]}>
              <span className={styles["blog-item-date"]}>
                November 29, 2016
              </span>
              <h3 className={styles["blog-item-title"]}>
                8 Healthy Everyday Foods for Busy Women
              </h3>
              <p className={styles["blog-item-desc"]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                ligula justo, aco nsectetur adipisicing elitur tantas...
              </p>
            </div>
          </a>
        </div>
        <div className={styles["blog-column"]}>
          <a href="#" className={styles["blog-item"]}>
            <div className={styles["blog-item-image"]}>
              <Image
                src="/sliders/slider1.png"
                width="300"
                height="250"
                alt="Image"
              />
            </div>
            <div className={styles["blog-item-content"]}>
              <span className={styles["blog-item-date"]}>
                November 29, 2016
              </span>
              <h3 className={styles["blog-title-medium"]}>
                8 Healthy Everyday Foods for Busy Women
              </h3>
              <p className={styles["blog-desc-medium"]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                ligula justo, aco nsectetur adipisicing elitur tantas...
              </p>
            </div>
          </a>
          <a href="#" className={styles["blog-item"]}>
            <div className={styles["blog-item-image"]}>
              <Image
                src="/sliders/slider1.png"
                width="300"
                height="250"
                alt="Image"
              />
            </div>
            <div className={styles["blog-item-content"]}>
              <span className={styles["blog-item-date"]}>
                November 29, 2016
              </span>
              <h3 className={styles["blog-title-medium"]}>
                8 Healthy Everyday Foods for Busy Women
              </h3>
              <p className={styles["blog-desc-medium"]}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                ligula justo, aco nsectetur adipisicing elitur tantas...
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Blog;
