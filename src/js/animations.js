import ScrollMagic from 'ScrollMagic'
import 'animation.gsap'
import 'debug.addIndicators'

const controller = new ScrollMagic.Controller()

new ScrollMagic.Scene({
  triggerElement: '#js-primary-nav',
  triggerHook: 0,
  reverse: true
})
  .setPin('#js-primary-nav')
  // .addIndicators({ name: 'primary' })
  .addTo(controller)
