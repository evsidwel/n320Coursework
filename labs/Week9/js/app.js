var app = new Vue({
  el: "#app",
  mounted: function() {
    axios.get("data/shapes.json").then(response => {
      this.shapes = response.data.shapes;
    });
  },
  data: {
    shapes: []
  },
  methods: {}
});
