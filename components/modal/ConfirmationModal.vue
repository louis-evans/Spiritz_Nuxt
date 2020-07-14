<template>
  <b-modal
    :id="id"
    static
    hide-header
    @ok="onOk"
    @cancel="onCancel"
  >
    {{ message }}
  </b-modal>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: 'confirm'
    },
    message: {
      type: String,
      required: true
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    okText: {
      type: String,
      default: 'Ok'
    }
  },
  methods: {
    onCancel () {
      this.$emit('result', false)
    },
    onOk () {
      this.$emit('result', true)
    }
  }
}
</script>
