<template>
  <div class="registration-form">
    <transition name="fade">
      <div v-if=isSend>
        <div class="complete">
          <p class="title">
            Thank you!
          </p>
          <br>
          <p class="title">
            We looking forward to meeting you on our wedding day.
          </p>
        </div>
      </div>
    </transition>
    <form v-if="!isSend" :class="{ 'is-send': isSending }" @submit.prevent="onSubmit">
      <div class="title">FORM</div>
      <div class="input" v-for="(item, index) in form">
        <label :for=item.id :class="{ 'is-focus': item.isFocus }">{{item.label}}</label>
        <input :type=item.type :id=item.id :data-index=index :placeholder="item.placeholder" @focus="onFocusInput" @focusout="onFocusoutInput" @input="updateValue">
        <span class="error" v-if="item.errorType === 1">Please input your information</span>
        <span class="error" v-if="item.errorType === 2">Please input correct mail address</span>
      </div>
      <div class="select">
        <select v-model="join">
          <option value="true">Join!</option>
          <option value="false">sorry..Im busy</option>
        </select>
      </div>
      <div class="textarea">
        <label :class="{ 'is-focus': message.isFocus }">{{message.label}}</label>
        <textarea :placeholder=message.placeholder @focus="onFocusTextarea" @focusout="onFocusOutTextarea" @input="updateTextArea">{{message.value}}</textarea>
      </div>
      <div class="send title" v-if=isSending>SEND...</div>
      <button v-else type='submit' class="button title" value="SEND">
        <span class="inner title">SEND</span>
        <span class="copy title">SEND</span>
      </button>
    </form>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'registration-form',

    data: function() {
      return {
        join: true
      }
    },

    watch: {
      join: function(bool) {
        this.$store.commit('SET_JOIN_VALUE', bool)
      }
    },

    computed: {
      isSending: function() {
        return this.$store.state.isSending
      },

      isSend: function() {
        return this.$store.state.isSend
      },

      form: function() {
        return this.$store.state.form
      },

      message: function() {
        return this.$store.state.message
      }
    },

    methods: {
      parseInt: function(str) {
        return parseInt(str, 10)
      },

      isEmail: function(email) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
      },

      onFocusInput: function(e) {
        const index = this.parseInt(e.target.dataset.index)
        this.$store.commit('CLEAR_FORM_PLACEHOLDER', {
          index
        })
        this.$store.commit('SET_FORM_FOCUS', {
          index,
          value: true
        })
      },

      onFocusoutInput: function(e) {
        if (e.target.value.length <= 0) {
          const index = this.parseInt(e.target.dataset.index)
          this.$store.commit('RESET_FORM_PLACEHOLDER', {
            index
          })
          this.$store.commit('SET_FORM_FOCUS', {
            index,
            value: false
          })
        }
      },

      onFocusTextarea: function() {
        this.$store.commit('SET_TEXTAREA_FOCUS', true)
        this.$store.commit('CLEAR_TEXTAREA_PLACEHOLDER')
      },

      onFocusOutTextarea: function(e) {
        if (e.target.value.length <= 0) {
          this.$store.commit('RESET_TEXTAREA_PLACEHOLDER')
          this.$store.commit('SET_TEXTAREA_FOCUS', false)
        }
      },

      updateValue: function(e) {
        const index = this.parseInt(e.target.dataset.index)
        this.$store.commit('SET_ERROR_TYPE', {
          index,
          type: 0
        })
        this.$store.commit('SET_FORM_VALUE', {
          index,
          value: e.target.value
        })
      },

      updateTextArea: function(e) {
        this.$store.commit('SET_TEXTAREA_VALUE', e.target.value)
      },

      chkFormData: function() {
        this.$store.state.form.some((item, index) => {
          if(item.value.length === 0) {
            this.$store.commit('SET_ERROR_TYPE', {
              index,
              type: 1 // 入力なし
            })
          }

          if(item.errorType === 0 && item.id === 'email') {
            // メルアドチェック
            if(!this.isEmail(item.value)) {
              this.$store.commit('SET_ERROR_TYPE', {
                index,
                type: 2 // 不正なメルアド
              })
            }
          }
        })
      },

      onSubmit: function() {
        let valid = true
        this.$store.commit('RESET_ERROR_TYPE')
        this.$store.commit('UPDATE_IS_SENDING', true)

        const formData = {}
        this.$store.state.form.forEach(item => {
          formData[item.id] = item.value
        })
        formData[this.$store.state.join.id] = this.$store.state.join.value
        formData[this.$store.state.message.id] = this.$store.state.message.value

        this.chkFormData()

        this.$store.state.form.some(item => {
          if(item.errorType !== 0) {
            valid = false
            return true
          }
        })

        if (valid) {
          return firebase.database().ref().child("users").push(formData).then(() => {
            this.$store.commit('UPDATE_IS_SEND')
          })
        } else {
          this.$store.commit('UPDATE_IS_SENDING', false)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .registration-form {
    height: 732px;
    margin: 0 auto;

    .fade-enter-active,
    .fade-leave-active {
      transition: all 1.5s cubic-bezier(0.1, 0.7, 0.6, 0.9);
    }

    .fade-enter {
      opacity: 0;
    }

    .fade-to {
      opacity: 1;
    }

    @media screen and (max-width: 959px) {
      height: 660px;

      form {
        > .title {
          margin-bottom: 30px;
        }

        label {
          left: 16px;
        }

        > .input {
          height: 50px;

          > input {
            padding: 0 16px;
            height: 50px;
            line-height: 26px;
          }

          & + .input {
            margin-top: 44px;
          }
        }

        > .select {
          &::before {
            top: 23px;
            right: 20px;
          }

          > select {
            padding: 0 50px 0 16px;
            height: 50px;
            line-height: 26px;
          }
        }

        > .textarea {
          > textarea {
            padding: 16px;
            line-height: 26px;
          }
        }

        > .comment {
          p {
            font-size: .8rem;
          }
        }

        > .button {
          margin-top: 30px;
          width: 100%;
          max-width: 240px;
          height: 70px;
          line-height: 70px;

          .inner {
            line-height: 70px;
          }

          .copy {
            line-height: 70px;
          }
        }

        .send {
          margin-top: 30px;
          height: 70px;
          line-height: 70px;
        }
      }

      .complete {
        top: 260px;

        > .title {
          font-size: 1.2rem;
        }

        > .message {
          font-size: .8rem;
        }
      }
    }
  }

  form {
    &.is-send {
      input,
      button {
        pointer-events: none;
      }
    }
    
    > .title {
      margin-bottom: 40px;
      text-align: center;
      font-size: 0.925rem;
      letter-spacing: 2px;
    }

    > .input {
      position: relative;
      height: 58px;
      margin: 0 auto;

      > input {
        padding: 0 40px;
        height: 58px;
        line-height: 58px;
        background-color: #f1f1f1;
      }

      > .error {
        display: block;
        color: #d94a37;
        text-align: center;
        font-size: 0.7rem;
        position: relative;
        top: 4px;
        left: 0;
      }

      & + .input,
      & + .select {
        margin-top: 40px;
      }
    }

    > .select {
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: 28px;
        right: 40px;
        width: 6px;
        height: 6px;
        border: 6px solid transparent;
        border-top: 6px solid #333;
        pointer-events: none;
      }

      select {
        width: 100%;
        height: 58px;
        padding: 0 80px 0 40px;
        line-height: 58px;
        border: 0;
        background-color: #f1f1f1;
        cursor: pointer;
      }
    }

    > .textarea {
      margin-top: 40px;
      position: relative;

      textarea {
        height: 180px;
        padding: 20px 40px;
        border: 0;
        background-color: #f1f1f1;
        letter-spacing: 1px;
      }
    }

    > .comment {
      margin-top: 20px;
      
      p {
        text-align: center;
        letter-spacing: 0;
      }
    }

    > .button {
      margin-top: 50px;
    }
  }

  input,
  textarea {
    width: 100%;
    border-top: none;
    border-left: none;
    border-right: none;
    border: none;
    box-sizing: border-box;
    font-size: 16px;
    font-family: "YuGothic", "Yu Gothic", "游ゴシック", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN", "Hiragino Kaku Gothic Pro", Meiryo, "メイリオ", sans-serif;
    letter-spacing: 1px;
    &::placeholder {
      color: #acacac;
    }
  }

  textarea {
    padding: 10px 0;
    height: 180px;
    resize: none;
    border-bottom: solid 1px rgba(167, 170, 177, 0.6);

    &.is-focus {
      border-bottom: solid 1px rgba(167, 170, 177, 1);
    }
  }

  label {
    position: absolute;
    top: 0;
    left: 40px;
    font-size: 0.8rem;
    display: inline-block;
    opacity: 0;
    transition: all .1s ease-in;
    transform: translateY(100%);

    &.is-focus {
      opacity: 1;
      transition: all .3s ease;
      transform: translateY(-22px);
    }
  }

  .button {
    margin: 0 auto;
    padding: 0;
    display: block;
    width: 240px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: #fff;
    border: 0;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background-color: #adadad;

    &::before {
      content: '';
      display: block;
      width: 120%;
      height: 100%;
      position: absolute;
      top: 0;
      left: -10%;
      background-color: #1d4687;
      opacity: 0;
      transform: translateX(-100%) skew(-20deg);
      transition: all .4s cubic-bezier(0.3, 0.98, 0.25, 0.88);
    }

    .inner {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      text-align: center;
      line-height: 100px;
      transition: all .3s cubic-bezier(0.3, 0.98, 0.25, 0.88);
    }

    .copy {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      line-height: 100px;
      color: #fff;
      text-align: center;
      transform: translateX(-100%);
      transition: transform .4s cubic-bezier(0.3, 0.98, 0.25, 0.88);
    }

    &:hover {
      &::before {
        opacity: 1;
        transform: translateX(0) skew(-20deg);
      }

      .inner {
        opacity: 0;
        transform: translateX(10%);
      }

      .copy {
        transform: translateX(0);
      }
    }
  }

  .send {
    margin: 50px auto 0;
    display: block;
    width: 240px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    border: 0;
    cursor: pointer;
    position: relative;
    color: #fff;
    background-color: #1d4687;
  }
  
  .complete {
    position: relative;
    top: 300px;

    > p {
      text-align: center;
      line-height: 1.5rem;

      + p {
        margin-top: 20px;
      }
    }

    > .title {
      font-size: 1.6rem;
      line-height: 1.5rem;

      > span {
        display: inline-block;
        opacity: 0;
        transform: translate3d(0, 10px, 0);
        transition-property: all;
        transition-duration: .2s;
        transition-timing-function: ease;
        @for $i from 1 through 11 {
          &:nth-child(#{$i}) {
            transition-delay: #{$i * 0.05}s;
          }
        }
      }

      &.is-show {
        > span {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }
    }

    > .message {
      font-size: 1rem;

      a {
        color: #1d4687;
      }
    }
  }
</style>
