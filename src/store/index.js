import { createStore } from 'vuex'

export default createStore({
  state: {
    isDrawing: false,
    x: null,
    y: null,
    brushColor: "#f24b8e",
    storkeSize: 5,
    canvas : null,
    history: []
  },
  mutations: {
    SET_CANVAS(state, canvas){
      state.canvas = canvas
    },
    SET_X(state,x){
      state.x = x
    },
    SET_Y(state,y){
      state.y = y
    },
    SET_DRAW_STATE(state,isDrawing){
      state.isDrawing = isDrawing
    },
    SET_BRUSH_COLOR(state,brushColor){
      state.brushColor = brushColor
    },
    SET_STROKE_SIZE(state,storkeSize){
      state.storkeSize = storkeSize
    },
    ADD_HISTORY(state,path){
      state.history.push(path)
    }
  },
  actions: {
    setX({ commit }, x) {
      commit('SET_X',x)
    },
    setY({ commit }, y) {
      commit('SET_Y',y)
    },
    setDrawState({ commit }, isDrawing){
      commit('SET_DRAW_STATE',isDrawing)
    },
    setBrushColor({ commit },brushColor){
      commit('SET_BRUSH_COLOR',brushColor)
    },
    setStorkeSize({ commit },storkeSize){
      commit('SET_STROKE_SIZE',storkeSize)
    },
    addPath({ commit },path){
      commit('ADD_HISTORY',path)
    },
    setWhiteBoard({ commit },canvas){
      commit('SET_CANVAS',canvas)
    }
  },
  modules: {
  }
})
