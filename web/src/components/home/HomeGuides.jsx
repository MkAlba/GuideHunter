
import logo from '../../images/3erlogo.jpg'



function HomeGuides() {

  return (

    <section className="py-8 py-md-11 border-bottom">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 text-center">

            <h2 className="display-4 mt-3">
              Licensed Guides to discover Barcelona
            </h2>

            <p className="lead text-muted mb-7 mb-md-5">
             Ask to Professional guides that love this city and they want to show you how amazing Barcelona is!!!
          </p>

          </div>
        </div>
        <div className="row">
          <div className="col-12">

            <div className="row gx-4">
              <div className="col-4">

                <img className="img-fluid rounded shadow-lg" src={logo} alt="..." />

              </div>
              <div className="col-3">

                <img className="img-fluid rounded shadow-lg mb-4" src={logo} alt="..." />

                <img className="img-fluid rounded shadow-lg" src={logo} alt="..." />

              </div>
              <div className="col-5">

                <div className="row gx-5 mb-4">
                  <div className="col-5">

                    <img className="img-fluid rounded shadow-lg" src={logo} alt="..." />

                  </div>
                  <div className="col-7">

                    <img className="img-fluid rounded shadow-lg" src={logo} alt="..." />

                  </div>
                </div>

                <img className="img-fluid rounded shadow-lg" src={logo} alt="..." />

              </div>
            </div>

          </div>
        </div>
      </div>
      
    </section>
  )
}

export default HomeGuides






