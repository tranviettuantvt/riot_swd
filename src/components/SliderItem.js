import React from 'react'

function SliderItem() {
  return (
    <div class="col-md-10 offset-1 mb-5 mb-md-0 d-flex align-items-stretch">
      <div class="card testimonial-card">
        <div class="card-up" style={{backgroundColor: "#D7FBDB"}}></div>
        <div class="avatar mx-auto bg-white">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
            class="rounded-circle img-fluid" />
        </div>
        <div class="card-body text-center">
          <h4 class="mb-4">Maria Smantha</h4>
          <hr />
          <p class="dark-grey-text mt-4">
            <i class="fas fa-quote-left pe-2"></i>Lorem ipsum dolor sit amet eos adipisci,
            consectetur adipisicing elit.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SliderItem