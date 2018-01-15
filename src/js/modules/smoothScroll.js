import $ from 'jquery'
const $body = $('html, body')
$.easing['easeInOutCubic'] = function (x, t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t*t + b
  return c/2*((t-=2)*t*t + 2) + b
}

export default {
  data: function() {
    return {
      targetOffsetTop: 0
    }
  },

  methods: {
    scrollTo: function(event) {
      const targetSelector = event.target.hash.substring(1)
      const targetEl = document.getElementById(targetSelector)
      this.targetOffsetTop = targetEl.offsetTop
      $body.animate({scrollTop: this.targetOffsetTop - 30}, 1000, 'easeInOutCubic')
    },

    closeMenuScrollTo: function(event) {
      const targetSelector = event.target.hash.substring(1)
      const targetEl = document.getElementById(targetSelector)
      this.targetOffsetTop = targetEl.offsetTop

      this.closeMenu()
      $body.animate({scrollTop: this.targetOffsetTop - 30}, 1000, 'easeInOutCubic')
    },
  }
}