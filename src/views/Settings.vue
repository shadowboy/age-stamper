<template>
  <v-card max-width="450" style="margin: 1rem auto;">
    <router-link to="/home"> Home</router-link>
    <v-list two-line subheader>
      <v-subheader>General</v-subheader>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Profile photo</v-list-item-title>
          <v-list-item-subtitle>t</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action> </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Show your status</v-list-item-title>
          <v-list-item-subtitle>t</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list subheader two-line flat>
      <!-- settings -->
      <v-subheader>Functions</v-subheader>
      <v-list-item-group>
        <v-list-item v-for="item in settings" :key="item.id">
          <v-list-item-avatar>
            <v-icon :class="[item.iconClass]" v-text="item.icon"></v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ item.label }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-switch :value="item.checked"></v-switch>
        </v-list-item>
      </v-list-item-group>
      <v-divider></v-divider>
      <!-- info -->
      <v-subheader>Information</v-subheader>
      <v-list-item-group>
        <v-list-item v-for="item in infos" :key="item.label">
          <v-list-item-avatar>
            <v-icon :class="[item.iconClass]" v-text="item.icon"></v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1">mdi-information</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      settings: [
        {
          id: 1,
          icon: "folder",
          iconClass: "grey lighten-1 white--text",
          key: "show_watermark",
          label: "显示水印",
          description: "显示水印",
          checked: true
        },
        {
          id: 2,
          icon: "folder",
          iconClass: "grey lighten-1 white--text",
          key: "show_date",
          label: "日期",
          description: "日期",
          checked: false
        },
        {
          id: 3,
          icon: "folder",
          iconClass: "grey lighten-1 white--text",
          key: "lunar_calendar",
          label: "阴历",
          description: "阴历",
          checked: false
        }
      ],
      infos: [
        {
          label: "About",
          icon: "folder",
          iconClass: "grey lighten-1 white--text",
          description:
            "At repudiandae quo possimus accusantium quas corrupti sunt. Mollitia rerum dicta provident modi. Voluptates tenetur quas eum esse illo."
        },
        {
          label: "Update Logs",
          icon: "folder",
          iconClass: "grey lighten-1 white--text",
          description: [
            "At repudiandae quo possimus accusantium quas corrupti sunt. Mollitia rerum dicta provident modi. Voluptates tenetur quas eum esse illo.",
            "Pretty suddenly put would get possible prevent. Author message civil free health project tend. Billion simple before interest court."
          ]
        }
      ]
    };
  },
  methods: {
    saveSettings: function() {
      console.log("saveSettings");
    }
  }
};
</script>
