var eventBus = new Vue()

Vue.component('product', {
  template: `
    <div class="content">
      <div class="product">
        <div class="flex-1 flex-row align-center justify-center">
          <img :src="image"/>
        </div>
        <div class="flex-1 flex-column align-start justify-center">
          <div class="product-info">
            <!-- Sale -->
            <div class="sale">
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
            <h4 class="secondary--text" :class="{'strike-through' : !inStock}">
              <span v-if="inStock"> IN STOCK </span>
              <span v-else> OUT OF STOCK </span>
            </h4>
            <p> {{description}} </p>
            <product-details :details="details"></product-details>
            <!-- Sizes -->
            <div class="sizes">
              <label
                v-for="size in sizes"
                :key="size"
                class="radio"
                :class="{'selected': selectedSize == size}"  
              >
                <input
                  type="radio"
                  name="size"
                  :value="size"
                  v-model="selectedSize"
                >
                {{size}}
              </label>
            </div>
            <div>
              <span class="error-message"> {{error}} </span>
            </div>
            <!-- Add to cart -->
            <button
              @click="addToCart"
              :disabled="!inStock"
              class="add-to-cart"
              :class="{'disabled' : !inStock}"
            >
              Add to cart ({{price}} ZAR)
            </button>
          </div>
        </div>
      </div>
      <product-tabs :reviews="reviews"></product-tabs>
    </div>
  `,
  props: {
    premium: {
      type: Boolean,
      required: true,
    }
  },
  mounted(){
    eventBus.$on('review-submitted', productReview => {
      this.reviews.push(productReview)
    })
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
      selectedSize: null,
      selectedVariant: 1,
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
      reviews: [
        {name:'Sara', rating:5, review:'I love the height it gives me and how stylish and edgy they are.'},
        {name:'Rachel', rating:4, review:'Love the look and style.'},
      ],
      error: ''
    }
  },
  methods: {
    addToCart(){
      this.error = null
      if(!this.selectedSize){
        return this.error = 'Please choose a size'
      }
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
    },
    updateProduct(index){
      this.selectedVariant = index
    },
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

Vue.component('product-tabs', {
  template: `
    <div>
      <div class="flex-row">
        <span
          class="tab"
          :class="{activeTab: selectedTab == tab}"
          v-for="(tab, index) in tabs"
          :key="index"
          @click="selectedTab = tab"
        >
          {{tab}}
        </span>
      </div>
      <div class="review">
        <div v-show="selectedTab == 'Reviews'" class="flex-1 flex-column">
          <div class="product-reviews">
            <h3> Reviews </h3>
            <p v-show="reviews.length == 0"> There are no reviews yet. </p>
            <div v-for="review in reviews">
              <div class="flex-row align-center justify-space-between review-text">
                <p> {{review.name}} </p>
                <p> {{review.rating}} &#128970; </p>
              </div>
              <p class="caption">{{review.review}}</p>
              <p class="divider"></p>
            </div>
          </div>
        </div>
        <product-review v-show="selectedTab == 'Write a review'"></product-review>
        <div class="flex-1 flex-column">
          <div class="product-shipping">
            <h3> Shipping </h3>
            <p> Free Ground Shipping on orders over $50. <a>Click here</a> for more detailed shipping information!</p>
            <h3> Returns </h3>
            <p> Try on your Doc's and make sure they fit, that they’re the correct size, and/or style. If not, you can return them up to 30 days from your order date. By downloading and using our return label, we will deduct $7 from your refund. If you’d like a different size or another style, please place a new order and we’ll credit your account once we receive your return. For tracking purposes we are unable to accommodate exchanges. Dr. Martens retail stores are unable to accept returns or exchanges at this time. Click here for more return instructions!</p>
          </div>
        </div>
      </div>
    </div>
  `,
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  data(){
    return {
      tabs: ['Reviews', 'Write a review'],
      selectedTab: 'Reviews',
    }
  },
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

Vue.component('product-review', {
  template: `
      <div class="flex-1">
        <h3> Write your review </h3>
        <form @submit.prevent="onSubmit">
          <div class="flex-row">
            <div class="flex-1 flex-column">
              <input id="name" v-model="name" class="order-1" :class="{'input-error':errors.name}"/>
              <label for="name">Full name:</label>
              <span class="error-message order-2"> {{errors.name}} </span>
            </div>
            <div class="flex-column ml-1">
              <select id="rating" v-model.number="rating" class="order-1" :class="{'input-error':errors.name}">
                <option v-for="rate in ratings">{{rate}}</option>
              </select>
              <label for="Rating">Rating:</label>
              <span class="error-message order-2"> {{errors.rating}} </span>
            </div>
          </div>
          <div class="flex-column mt-1">
            <textarea id="review" v-model="review" rows="4" class="order-1" :class="{'input-error':errors.name}"/>
            <label for="review">Review:</label>
              <span class="error-message order-2"> {{errors.review}} </span>
          </div>
          <div class="mt-1">
            <input type="submit" value="Submit review"/>
          </div>
        </form>
      </div>
    </div>
  `,
  data(){
    return {
      name: null,
      rating: null,
      review: null,
      ratings: [5, 4, 3, 2, 1],
      errors: {
        name: null,
        rating: null,
        review: null,
      },
    }
  },
  methods: {
    onSubmit(){
      this.clearErrors()
      if(this.name && this.review && this.rating){
        let productReview = {
          name: this.name,
          rating: this.rating,
          review: this.review
        }
        this.clearForm()
        eventBus.$emit('review-submitted', productReview)
        return
      }
      this.validate()
    },
    clearErrors(){
      this.errors = {
        name: null,
        rating: null,
        review: null,
      }
    },
    clearForm(){
      this.name = null
      this.rating = null
      this.review = null
    },
    validate(){
      // validation errors
      if(!this.name) this.errors.name = 'Required'
      if(!this.rating) this.errors.rating = 'Required'
      if(!this.review) this.errors.review = 'Required'
    }
  }
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