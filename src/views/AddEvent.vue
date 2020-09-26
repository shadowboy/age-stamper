<template>
  <form>
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
        <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
      </v-date-picker>
    </v-dialog>

    <v-btn class="mr-4" @click="submit">Save</v-btn>
    <v-btn @click="clear">Cancel</v-btn>
  </form>
</template>

<script lang="ts">
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import { UserEvent } from "../types";
import { scenes } from "../config/App";

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    select: { required },
    date: {
      required
    }
  },

  data: () => ({
    name: "",
    select: null,
    categories: scenes.map(item => item.label),
    date: new Date().toISOString().substr(0, 10),
    modal: false
  }),

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Item is required");
      return errors;
    }
  },

  methods: {
    addNewEvent<T>(event: T) {
      let userEvents: T[] = [];
      if (localStorage.getItem("userEvents")) {
        userEvents = JSON.parse(localStorage.getItem("userEvents") as string);
      }
      userEvents.push(event);
      localStorage.setItem("userEvents", JSON.stringify(userEvents));
    },
    submit() {
      this.$v.$touch();
      //   console.log(this.name, this.date, this.select);
      if (this.name && this.date && this.select) {
        const scene = scenes.find(item => item.label === this.select);
        const userEvent: UserEvent = {
          id: "1",
          entity: this.name,
          start: this.date,
          scene: scene ? scene.id : 0,
          image: scene ? scene.image : "",
          count: 0,
          status: ""
        };
        // console.log("userEvent", userEvent);
        // return;
        try {
          this.addNewEvent<UserEvent>(userEvent);
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
};
</script>

<style>
</style>