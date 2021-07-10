<template>
  <div class="container">
    <canvas
      ref="board"
      @mousemove="draw"
      @mousedown="startDraw"
      @mouseup="endDraw"
      @mouseleave="endDraw"
    >
    </canvas>
    <div class="control-pad p-shadow-24">
      <Button
        icon="pi pi-trash"
        class="flex-item p-button-raised p-button-rounded p-button-lg"
        @click="clear()"
        :loading="false"
      />
      <Button
        icon="pi pi-download"
        class="flex-item p-button-raised p-button-rounded p-button-lg"
      />

      <Button
        icon="pi pi-pencil"
        class="flex-item p-button-raised p-button-rounded p-button-lg"
        ><ColorPicker v-model="color" format="hex" />
      </Button>
      <Button
        icon="pi pi-share-alt"
        class="flex-item p-button-raised p-button-rounded p-button-lg"
      />
      <Button
        icon="pi pi-github"
        class="flex-item p-button-raised p-button-rounded p-button-lg"
        @click="openGit()"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SocketIO from "socket.io-client";
import * as cHelper from "../services/canvasHelper";
import Button from "primevue/button";
import ColorPicker from "primevue/colorpicker";

export default {
  data() {
    return {
      color: "f24b8e",
    };
  },
  components: {
    Button,
    ColorPicker,
  },
  computed: {
    ...mapState([
      "canvas",
      "isDrawing",
      "brushColor",
      "storkeSize",
      "x",
      "y",
      "webSoc",
    ]),
  },
  methods: {
    drawLine(point) {
      //draw line in canvas
      cHelper.createLine({ ...point, canvas: this.canvas });

      if (!point.secondary) {
        //send new points to ws
        this.addPath({
          ...point,
          width: this.$windowWidth,
          height: this.$windowHeight,
        });
      }
    },
    draw(e) {
      if (this.isDrawing) {
        this.drawLine({
          x1: this.x,
          y1: this.y,
          x2: e.offsetX,
          y2: e.offsetY,
          secondary: false,
          brushColor: "#".concat(this.color),
          storkeSize: this.storkeSize,
        });
        this.setX(e.offsetX);
        this.setY(e.offsetY);
      }
    },
    startDraw(e) {
      this.setDrawState(true);
      this.setX(e.offsetX);
      this.setY(e.offsetY);
    },
    endDraw() {
      this.setDrawState(false);
    },
    clear(notify = true) {
      cHelper.clearBackground(this.canvas);
      cHelper.setBackground(this.canvas);
      if (notify) {
        this.webSoc.emit("clear", {});
      }
    },
    ...mapActions([
      "setWhiteBoard",
      "setX",
      "setY",
      "setDrawState",
      "addPath",
      "setSocketConnection",
    ]),
    drawBackground() {
      this.$refs["board"].width = this.$windowWidth;
      this.$refs["board"].height = this.$windowHeight;

      cHelper.setBackground(this.canvas);
    },
    openGit() {
      window.open("https://github.com/nishanb/Multi-Board");
    },
  },
  mounted() {
    //locate canvas
    this.setWhiteBoard(this.$refs["board"].getContext("2d"));

    //drawbackground
    this.drawBackground();
  },
  created() {
    //setup websocket client
    this.setSocketConnection(SocketIO("http://192.168.0.167:8080"));

    //websocket events

    //add points : other users
    this.webSoc.on("addPoint", (point) => {
      this.drawLine({
        ...point,
        secondary: true,
        currentWidth: this.$windowWidth,
        currentHeight: this.$windowHeight,
      });
    });

    //clear background
    this.webSoc.on("clear", () => {
      this.clear(false);
    });

    //window events

    //add eventlistener to manage window resize events
    window.addEventListener("resize", () => {
      try {
        window.location.reload();
        this.drawBackground();
        //TODO : Restore whiteboard with diffrent screen resulution
      } catch (error) {
        console.log(error);
      }
    });
  },
};
</script>

<style scoped>
.control-pad {
  min-height: 70px;
  left: 0;
  bottom: 0;
  width: 100%;
  background: rgb(49, 49, 49);
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.flex-item {
  margin-left: 15px !important;
  scale: 2rem;
}
.container {
  position: relative;
}
</style>