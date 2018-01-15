export default {
  data: function() {
    return {
      isFocusInput: false,
      value: '',
      placeholder: ''
    }
  },

  mounted: function() {
    this.placeholder = this.constantPlaceholder
  },

  methods: {
    onFocusInput: function() {
      this.placeholder = ''
      this.isFocusInput = true
    },

    onFocusoutInput: function() {
      if (this.value.length > 0) {
        this.isFocusInput = true
      } else {
        this.placeholder = this.constantPlaceholder
        this.isFocusInput = false
      }
    },

    updateValue: function(value) {
      this.value = value
    }
  }
}