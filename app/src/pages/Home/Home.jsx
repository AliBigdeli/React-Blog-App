import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <div className="container px-4 py-5" id="Author">
        {/* <h2 className="pb-2 border-bottom">Author</h2> */}
        <div className="row featurette py-5">
          <div className="col-md-8 order-md-2">
            <h2 className="featurette-heading">
              Ali Bigdeli{" "}
              <span className="text-muted">IOT and AI Developer</span>
            </h2>
            <p className="lead">
              Ali Bigdeli is an IT graduated and with a degree in artificial
              intelligence and robotics. His interest in the world of artificial
              intelligence and communications in the world of IoT led him to
              combine the two platforms. As the basis of his education, work,
              and development.
            </p>

            <p className="lead">
              His more than 5 years of programming experience and ability in the
              field of networking and communications facilitated his work
              process and plays a key role in many projects. Python, C ++ / C,
              and Arduino are his specialties in programming.
            </p>

            <p className="lead">
              Since 2016, he has founded a team called ICC-ARIA, whose goals are
              to teach various specialties in the field of artificial
              intelligence and the Internet of Things, in which backend and
              framework designs such as Django play an important role. Ideation
              and conversion of an idea into a product and reverse engineering
              of products are among his potential abilities.
            </p>
          </div>
          <div className="col-md-4 order-md-1">
            <img
              src="https://avatars.githubusercontent.com/u/29748439?v=4"
              width="100%"
              height="100%"
              alt=""
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
