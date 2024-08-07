import React from 'react'

const Spinner = () => {
  return (

    <div id="app-preloader">
      <svg
        className="fill-current h-8 mr-2 w-8 preloader-logo"
        xmlns="http://www.w3.org/2000/svg"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="1.5"
        clip-rule="evenodd"
        viewBox="0 0 716 895"
      >
        <path d="M357.776 0l357.77 178.885v536.657l-357.77 178.89L0 715.542V178.885"></path>
        <path
          className="text-white fill-current"
          d="M357.776 804.982l268.32-134.16v-178.89l-89.44-44.72 89.44-44.72V223.606L357.776 89.442v626.1l-178.89-89.44V178.885l-89.443 44.721v447.216l268.333 134.16z"
        ></path>
        <path d="M447.216 670.822l89.44-44.72v-89.45l-89.44-44.72v178.89zM447.216 402.492l89.44-44.721v-89.443l-89.44-44.722"></path>
      </svg>
      <div class="preloader-title"></div>
      <div class="preloader-spinner">
        <svg class="preloader-spinner-icon" viewBox="0 0 24 24">
          <path d="M 22.49772,12.000001 A 10.49772,10.497721 0 0 1 12,22.497722 10.49772,10.497721 0 0 1 1.5022797,12.000001 10.49772,10.497721 0 0 1 12,1.5022797 10.49772,10.497721 0 0 1 22.49772,12.000001 Z" fill="none" stroke-linecap="round" />
        </svg>
      </div>
    </div>
  )
}

export default Spinner