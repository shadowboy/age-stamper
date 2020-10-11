<template>
  <v-card
    class="d-flex flex-column justify-center align-center"
    style="margin: 1rem auto; padding: 2rem;"
    max-width="500"
  >
    <form style="width: 100%;">
      <v-select
        v-model="select"
        :items="categories"
        :error-messages="selectErrors"
        label="Scene Category"
        required
        @change="$v.select.$touch()"
        @blur="$v.select.$touch()"
      ></v-select>
      <v-text-field
        v-model="name"
        :error-messages="nameErrors"
        :counter="10"
        label="Your kid's name"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      ></v-text-field>
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Select date"
            prepend-icon=""
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" scrollable>
          <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(date)"
            >OK</v-btn
          >
        </v-date-picker>
      </v-dialog>

      <v-btn class="mr-4" @click="submit">Save</v-btn>
      <v-btn @click="clear">Cancel</v-btn>
    </form>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import { UserEvent } from "../types";
import { scenes } from "../config/App";
import UserEventMgr from "../utils/UserEventMgr";

export default Vue.extend({
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(10) },
    select: { required },
    date: {
      required
    }
  },
  data() {
    return {
      name: "",
      select: null,
      categories: scenes.map(item => item.label),
      date: new Date().toISOString().substr(0, 10),
      modal: false
    };
  },

  computed: {
    nameErrors() {
      const errors: any[] = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    selectErrors() {
      const errors: any[] = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Item is required");
      return errors;
    }
  },

  methods: {
    submit() {
      this.$v.$touch();
      //   console.log(this.name, this.date, this.select);
      if (this.name && this.date && this.select) {
        const category = scenes.find(item => item.label === this.select);
        const userEvent: UserEvent = {
          id: "1",
          entity: this.name,
          start: this.date,
          scene: category ? category.id : 0,
          image: category ? category.image : "",
          count: 0,
          status: "",
          timeFormat: ""
        };
        // console.log("userEvent", userEvent);
        // return;
        try {
          const ueMgr = new UserEventMgr();
          ueMgr.addNew(userEvent);
        } catch (e) {
          console.log("e", e);
        }
        this.$router.go(-1);
      }
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.date = new Date().toISOString().substr(0, 10);
      this.select = null;
      this.$router.go(-1);
    }
  }
});
</script>