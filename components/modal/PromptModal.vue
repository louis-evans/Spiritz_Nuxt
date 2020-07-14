<template>
  <b-modal
    :id="id"
    :title="message"
    static
    @ok="onOk"
    @cancel="onCancel"
    @show="onShow"
  >
    <input v-model="result" type="text" class="form-control">
  </b-modal>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: 'prompt'
    },
    message: {
      type: String,
      required: true
    },
    default: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      result: null
    }
  },
  methods: {
    onCancel () {
      this.$emit('result', null)
    },
    onOk () {
      this.$emit('result', this.result)
    },
    onShow () {
      this.result = this.default
    }
  }
}
</script>
