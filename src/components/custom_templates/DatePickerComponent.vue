<template>
  <v-menu
      v-model="menuDate"
      :close-on-content-click="false"
      max-width="290">

    <template v-slot:activator="{ on, attrs }">
      <v-text-field
          class="mt-1"
          :value="dateFormatted"
          readonly
          outlined
          :disabled="flag"
          append-icon="event"
          v-on="on"
          v-bind="attrs"
          @click:append="menuDate = true"
      />
    </template>

    <v-date-picker
        v-model="theDate"
        :min="min"
        @change="emitDate(),onChanged()"
        no-title
        :locale="dateLocale"
    />
  </v-menu>
</template>

<script>
import kendo from '@progress/kendo-ui'

/* Store */
import store from "@/store"
const institute = store.state.institute.institute

export default {
  name: 'DatePickerComponent',
  props: ['initialDate', 'min', 'disabled'],
  data() {
    return {
      menuDate: false,
      theDate: '',
      flag: false,
      dateLocale : 'km-kh'
    }
  },
  methods: {
    emitDate() {
      this.menuDate = false;
      this.$emit('emitDate', this.theDate)
    },
    onChanged() {
      this.$emit('onChanged')
    },
  },
  watch: {
    initialDate() {
      this.theDate = this.initialDate
    },
    disabled() {
      this.flag = this.disabled
    },
    locale(){
        if(this.locale == 'kh'){
            this.dateLocale = 'km-kh'
        }else{
            this.dateLocale = 'en-us'   
        }
    }
  },
  computed: {
    dateFormatted() {
      return this.theDate ? kendo.toString(new Date(this.theDate), institute.dateFormat) : ''
    },
    locale(){
        return this.$route.params.locale 
    }
  },
  mounted() {
    /* Initial Date */
    this.theDate = this.initialDate
    this.flag = this.disabled
  }
}
</script>