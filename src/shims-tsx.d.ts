import Vue, { VNode } from "vue";

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode { }
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue { }
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}


import VueRouter, { Route } from 'vue-router'
declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter
  }
}