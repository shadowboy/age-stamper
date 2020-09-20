<template>
  <div id="app">
    <h2>{{platform}}</h2>
    <router-link to="/home">Home</router-link>
    <div>
      <video ref="video" id="video" width="640" height="480" autoplay></video>
    </div>
    <div>
      <button id="snap" v-on:click="capture()">Snap Photo</button>
    </div>
    <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
    <ul>
      <li v-for="c in captures" :key="c">
        <img v-bind:src="c" height="50" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      video: {},
      canvas: {},
      captures: [],
      stream: null,
      platform: "unknow"
    };
  },
  mounted() {
    console.log("activated");
    this.initCamera(this.$refs.video, stream => {
      this.stream = stream;
    });
    if (this.isMobile()) {
      this.platform = "Mobile phone";
    } else {
      this.platform = "PC";
    }
  },

  beforeDestroy() {
    console.log("beforeDestroy");
    this.stopCamera(this.stream);
  },
  methods: {
    initCamera: function(videoRef, callback) {
      //   this.video = this.$refs.video;
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
          videoRef.srcObject = stream;
          videoRef.play();
          callback(stream);
        });
      }
    },
    stopCamera: function(stream) {
      if (stream) {
        stream.getTracks().forEach(function(track) {
          track.stop();
        });
      }
    },
    isMobile() {
      const flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    capture() {
      this.canvas = this.$refs.canvas;
      const context = this.canvas
        .getContext("2d")
        .drawImage(this.video, 0, 0, 640, 480);
      this.captures.push(this.canvas.toDataURL("image/png"));
    }
  }
};
</script>

<style>
video {
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
}
</style>