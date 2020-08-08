Vue.component('product', {
  template: `
    <div class="flex-column flex-1">
      <div class="flex-1 flex-row">
        <div class="flex-1 flex-row align-center justify-center">
          <img :src="image"/>
        </div>
        <div class="flex-1 flex-column align-start justify-center">
          <div class="product-info">
            <!-- Sale -->
            <div class="text-right">
              <p v-show="onSale" class="flex-0 badge"> On sale </p>
            </div>
            <!-- Heading -->
            <h1 class="heading"> {{product}} </h1>
            <!-- Variants -->
            <div class="flex-row">
              <span
                v-for="(variant, index) in variants"
                :key="variant.id"
                @mouseover="updateProduct(index)"
                class="color-box"
                :style="{backgroundColor: variant.color}"
              ></span>
            </div>
            <!-- Availability -->
            <h4 class="accent" :class="{'strike-through' : !inStock}">
              <span v-if="inStock"> IN STOCK </span>
              <span v-else> OUT OF STOCK </span>
            </h4>
            <p> {{description}} </p>
            <product-details :details="details"></product-details>
            <!-- Sizes -->
            <ul class="sizes">
              <li v-for="size in sizes">
                {{size}}
              </li>
            </ul>
            <!-- Add to cart -->
            <button
              @click="addToCart"
              :disabled="!inStock"
              class="add-to-cart"
              :class="{'disabled' : !inStock}"
            > Add to cart ({{price}} ZAR) </button>
          </div>
        </div>
      </div>
    </div>
  `,
  props: {
    premium: {
      type: Boolean,
      required: true,
    }
  },
  data(){
    return {
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
    }
  },
  methods: {
    addToCart: function(){
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
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
    },
    price(){
      if(this.premium){
        return 3064.68
      }
      return 3405.20
    }
  }
})

Vue.component('product-details', {
  template: `
    <ul class="details">
      <li v-for="detail in details">
        {{detail}}
      </li>
    </ul>
  `,
  props: {
    details: {
      type: Array,
      required: true
    }
  },
})

var app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: []
  },
  methods: {
    updateCart(id){
      this.cart.push(id)
    }
  }
})