import { createStore } from 'vuex'

export default createStore({
  state: {
    pizzas: [],
    category: null,
    sortBy: {
      id: 0,
      name: 'rating'
    },
    cartItems: new Map()
  },
  getters: {
    getAddedPizzasCount(state) {
      let totalCount = 0
      const pizzas = state.cartItems.values()

      for (const pizza of pizzas) {
        totalCount += pizza.count
      }
      return totalCount
    },
    getAddedPizzaSum(state) {
      let totalSum = 0
      const pizzas = state.cartItems.values()
      
      for (const pizza of pizzas) {
        const pizzaTotalPrice = pizza.price * pizza.count
        totalSum += pizzaTotalPrice
      }
      return totalSum
    },
    getCartItemPizzas(state) {
      let addedPizzas = []

      for (const pizza of state.cartItems.values()) {
        addedPizzas = [...addedPizzas, pizza]
      }
      return addedPizzas
    },
    getCartItemTotalPrice : () => pizza => {
      const totalPrice = pizza.count * pizza.price
      return totalPrice
    },
    getPizzaCount: (state) => pizza => {
      const stringifiedPizza = JSON.stringify(pizza)
      if (state.cartItems.get(stringifiedPizza)) {
        return state.cartItems.get(stringifiedPizza).count
      }
      
    },
  },
  mutations: {
    GET_PIZZA(state, pizzas) {
      state.pizzas = pizzas
    },
    SET_CATEGORY(state, categoryIndex) {
      state.category = categoryIndex
    },
    SET_SORT(state, sortItem) {
      state.sortBy = { name: sortItem.sortBy, id: sortItem.id }
      switch (sortItem.sortBy) {
        case 'rating': return state.pizzas.sort((a,b) => a.rating - b.rating)
        case 'price': return state.pizzas.sort((a,b) => a.price - b.price)
        case 'name': return state.pizzas.sort((a,b) => a.name.localeCompare(b.name))
      }
    },
    ADD_CART(state, pizza) {
      const stringifiedPizza = JSON.stringify(pizza)
      const isPizzaAdded = state.cartItems.get(stringifiedPizza)

      if(!isPizzaAdded) {
        state.cartItems.set(stringifiedPizza, {...pizza, count: 1})
        return
      } else {
        state.cartItems.set(stringifiedPizza, {...pizza, count: isPizzaAdded.count + 1})
        return
      }
    },
    DELETE_CART_ITEM(state, pizza) {
      delete pizza.count
      const stringifiedPizza = JSON.stringify(pizza)
      state.cartItems.delete(stringifiedPizza)
    },
    DECREMENT_CART_ITEM(state, pizza) {
      const copyPizza = {...pizza}
      delete copyPizza.count
      const stringifiedPizza = JSON.stringify(copyPizza)

      if (pizza.count > 1) {
        state.cartItems.set(stringifiedPizza, {...pizza, count: pizza.count - 1})
      }

      
    },
    INCREMENT_CART_ITEM(state, pizza) {
      const copyPizza = {...pizza}
      delete copyPizza.count
      const stringifiedPizza = JSON.stringify(copyPizza)

      state.cartItems.set(stringifiedPizza, {...pizza, count: pizza.count + 1})

    },
    CLEAR_CART(state) {
      state.cartItems.clear()
    }
  },
  actions: {
    async getPizzaAction({commit}) {
      const response = await fetch('http://localhost:3000/pizzas')
      const json = await response.json()
      commit('GET_PIZZA', json)
    },
    async getFilteredPizza(content, category) {
      const response = await fetch(`http://localhost:3000/pizzas?category=${category}`)
      const json = await response.json()
      content.commit('SET_CATEGORY', category)
      content.commit('GET_PIZZA', json)
    }
  },
  modules: {
  }
})
