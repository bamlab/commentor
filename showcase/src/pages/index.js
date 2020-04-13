import React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: <>Get started in 5min</>,
    imageUrl: "img/get-started.svg",
    description: <>Authenticate through your favorite versioning platform</>
  },
  {
    title: (
      <div>
        <>Spot improvable</>
        <br />
        <>patterns</>
      </div>
    ),
    imageUrl: "img/improve.svg",
    description: <>In your team's code</>
  },
  {
    title: (
      <div>
        <>Follow your team</>
        <br />
        <>improvement</>
      </div>
    ),
    imageUrl: "img/follow-up.svg",
    description: <>With date, tag and author filters</>
  }
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames("col col--4", styles.feature)}>
      {imgUrl && (
        <div>
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3 className={classnames(styles.featureTitle)}>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="This is the Commentor showcase web site"
    >
      <header className={classnames("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <p className={classnames(styles.bannerTitle)}>
            <div>{"Make the most".toUpperCase()}</div>
            <div>{"out of your".toUpperCase()}</div>
            <div>{"code reviews".toUpperCase()}</div>
          </p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                "button button--lg button--primary",
                styles.getStarted
              )}
              to={useBaseUrl("docs/repositoryAccess")}
            >
              {"Get Started".toUpperCase()}
            </Link>
          </div>
        </div>
        <div className={styles.bannerScreenshotImageContainer}>
          <img src={"img/banner-screenshot.png"} alt={"commentor screenshot"} />
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
        <section className={styles.users}>
          <div className="container">
            <div className="text--center">
              <h2>Trusted By</h2>
            </div>
            <div className={classnames("row")}>
              <div
                className="col col--6"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "30px"
                }}
              >
                <img src={useBaseUrl("img/logo-BAM-white.svg")} alt="BAM" />
              </div>
              <div
                className="col col--6"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "30px"
                }}
              >
                <img src={useBaseUrl("img/logo-Theodo.svg")} alt="Theodo" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
