import React from "react";

function Footer() {
  return (
    <div class="">
      <footer class=" text-center text-lg-start border-top">
        <div class="container p-4">
          <div class="row">
            <div class="col-lg-4 col-md-12 mb-4 mb-md-0">
              <h5 class="text-uppercase mb-4">About company</h5>

              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti.
              </p>

              <p>
                Blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias.
              </p>

              <div class="mt-4">
                <a type="button" class="btn btn-floating btn-light btn-lg">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a type="button" class="btn btn-floating btn-light btn-lg">
                  <i class="fab fa-dribbble"></i>
                </a>
                <a type="button" class="btn btn-floating btn-light btn-lg">
                  <i class="fab fa-twitter"></i>
                </a>
                <a type="button" class="btn btn-floating btn-light btn-lg">
                  <i class="fab fa-google-plus-g"></i>
                </a>
              </div>
            </div>

            <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 class="text-uppercase mb-4 pb-1">Search something</h5>

              <div class="form-outline  mb-4">
                <input
                  type="text"
                  id="formControlLg"
                  class="form-control form-control-lg"
                  placeholder="Search"
                />
                
              </div>

              <ul class="fa-ul" style={{marginLeft: "1.65em"}}>
                <li class="mb-3">
                  <span class="fa-li">
                    <i class="fas fa-home"></i>
                  </span>
                  <span class="ms-2">Warsaw, 00-967, Poland</span>
                </li>
                <li class="mb-3">
                  <span class="fa-li">
                    <i class="fas fa-envelope"></i>
                  </span>
                  <span class="ms-2">contact@example.com</span>
                </li>
                <li class="mb-3">
                  <span class="fa-li">
                    <i class="fas fa-phone"></i>
                  </span>
                  <span class="ms-2">+ 48 234 567 88</span>
                </li>
              </ul>
            </div>

            <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 class="text-uppercase mb-4">Opening hours</h5>

              <table class="table text-center">
                <tbody class="fw-normal">
                  <tr>
                    <td>Mon - Thu:</td>
                    <td>8am - 9pm</td>
                  </tr>
                  <tr>
                    <td>Fri - Sat:</td>
                    <td>8am - 1am</td>
                  </tr>
                  <tr>
                    <td>Sunday:</td>
                    <td>9am - 10pm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div
          class="text-center p-3 mx-5 border-top"
        >
          © 2020 Copyright:
          <a class="text-success ms-1" style={{textDecoration:"none"}} href="https://mdbootstrap.com/">
            Riot Master
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
