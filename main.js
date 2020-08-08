var app = new Vue({
  el: '#app',
  data: {
    product: 'Jadon smooth leather platform boots',
    description: 'A fierce evolution of the 8-eye boot, the Jadon retains all its original details - grooved edges, yellow stitching and a heel-loop - and adds a chunky, empowering platform sole.',
    onSale: true,
    details: [
      'Inner ankle zip',
      'Made with the classic Dr. Martens Polished Smooth leather, a lightly textured, highly durable leather with a soft sheen',
      'Built on the durable, comfortable Dr. Martens air-cushioned sole, that\'s oil and fat resistant with good abrasion and slip resistance',
      'Platform height: 1 3/4"'
    ],
    sizes: [5, 6, 7, 8, 9, 10, 11, 12],
    selectedVariant: 0,
    variants: [
      {
        id: 15265001,
        color: 'black',
        image: './assets/black.png',
        quantity: 8,
      },
      {
        id: 15265100,
        color: 'white',
        image: './assets/white.png',
        quantity: 0,
      }
    ],
    cart: 0
  },
  methods: {
    addToCart: function(){
      this.cart += 1
    },
    updateProduct: function(index){
      this.selectedVariant = index
    }
  },
  computed: {
    image(){
      return this.variants[this.selectedVariant].image
    },
    inStock(){
      return this.variants[this.selectedVariant].quantity
    }
  }
})