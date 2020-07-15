<template>
  <b-modal
    :id="id"
    static
    hide-header
    ok-only
    @ok="onOk"
  >
    {{ message }}
  </b-modal>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: 'alert'
    },
    message: {
      type: String,
      default: null
    }
  },
  methods: {
    onOk ()
    {
      this.$emit('closed')
    }
  }
}
</script>
