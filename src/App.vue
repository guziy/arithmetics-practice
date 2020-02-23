<template>
  <div class="container m-3" id="app">
    <div class="row justify-content-center m-3 p-3">
      <label for="player-name"> SVP entrez votre nom:
          <input id="player-name" type="text" v-model="name"/>
      </label>
    </div>

    <div class="row">
      <div class="col text-center p-3">
          Salut <b>{{name}}</b>, faisons quelques exercices!
      </div>
    </div>

    <div class="row">
      <div class="col text-center">
        <button type="button" name="button" @click="on_start">Oui, on commence</button>
      </div>

    </div>

<!--
    <div v-if="start_time != ''" class="row">
      <div class="col text-center m-3">
          Temps ecoulé: <b>{{elapsed_time}}</b>
      </div>
    </div>
-->
      <div id=equation-container class="row m-5">
        <div class="col-12 mb-3" v-if="n_tried >= 0">Entrez les nombres manquants:</div>

        <div class="col-12">
          <ul class="list-group">
            <li class="list-group-item" v-for="eq in equation_data"
                v-bind:key="eq.equation_index" v-show="eq.equation_index <= n_tried">

              <equation :equation_data="eq" :event_bus="event_bus"
                        :n_tried="n_tried" @oncorrect-equation="on_correct"
                        ></equation>

            </li>
          </ul>
        </div>

        <div id="end-message" ref="end_message" class="col-12" v-if="n_tried >= 0">
          <div class="row justify-content-center">

            <div class="col-3 p-3">
              <font-awesome-icon icon="stopwatch" class="mr-3"/> {{elapsed_time}}
            </div>

            <div class="col-3 p-3">
              <span class="text-success"><font-awesome-icon icon="check" class="mr-3"/> {{n_correct}}</span>
            </div>

            <div class="col-3 p-3">
              <span class="text-danger"><font-awesome-icon icon="times" class="mr-3"/>{{n_tried - n_correct}}</span>
            </div>
          </div>
          <span v-if="n_tried === n_total">L'exercice est terminé {{name}}, ca vous a pris {{elapsed_time}}: </span>
          <span v-if="n_correct == n_total">vous êtes un genie!</span>
          <span v-else-if="(n_correct > 0.5 * n_total) && n_tried === n_total">bien joué, mais il y a de l'espace pour amelioration!</span>
          <span v-else-if="(n_correct <= 0.5 * n_total) && n_tried === n_total">il faut pratiquer plus!</span>

        </div>

      </div>


  </div>
</template>

<script>
import equation from './components/equation.vue'
import Vue from 'vue'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

momentDurationFormatSetup(moment);


export default {
  title: 'Arithmetics practice',
  name: 'App',
  components: {
    equation
  },
  data: function (){
    return {
      message: function(){
        if (name.length === 0) {
          return 'Entrez votre nom SVP:'
        } else {
          return "Salut <b>" + this.name + "</b>, on va faire quelques exercices:"
        }
      },
      name: "",
      n_total: 10,

      equation_data: [],

      n_correct: 0,

      n_tried: -1,
      start_time: "",
      elapsed_time: 0,
      current_time: "",
      event_bus: new Vue(),
      timer_refresh_interval_id: -1
    }
  },
  created: function(){
    //this.generate_equation_data();
    //register getting elapsed_time every second

    this.event_bus.$on("focus-equation", this.on_focus_equation);


  },
  methods: {

    on_focus_equation: function(event){
      if (event.src_index === this.n_total - 1) {
        clearInterval(this.timer_refresh_interval_id);
        this.$refs.end_message.scrollIntoView();
      }
    },

    on_correct: function (event){
      this.n_tried++;
      this.n_correct += event.correct;
    },
    //on commence btn action
    on_start: function(){
      this.start_time = moment();
      this.elapsed_time = this.get_elapsed_time();
      this.timer_refresh_interval_id = setInterval(this.get_elapsed_time, 1000);
      this.generate_equation_data();


    },
    get_current_time: function (){
      return moment();
    },
    get_elapsed_time: function(){
      let dt = moment.duration(this.get_current_time().diff(this.start_time));
      this.elapsed_time = dt.format("mm [min] ss [sec]");
      return this.elapsed_time;
    },
    generate_equation_data: function () {
      this.equation_data = [];
      this.n_tried = 0;
      this.n_correct = 0;


      const MAX_NUM = 100;
      var i;
      var num1, num2, num3;
      var additon;
      var r; // from [0, 1)
      for (i = 0; i < this.n_total; i++) {
        //console.log(i);

        r = Math.random();

        additon = r < 0.5;

        num1 = Math.floor(r * MAX_NUM);

        num2 = Math.floor(r * num1);

        if (num1 < 10){
          num1 += 13;
          num2 += 8;
        }

        if (num1 + num2 > MAX_NUM) {
          additon = false;
        }

        var operation;
        if (additon){
          num3 = num1 + num2;
          operation = "+";
        } else {
          num3 = num1 - num2;
          operation = "-";
        }

        var input_index;
        input_index = Math.floor(3 * Math.random());
        let t = [num1, num2, num3];
        t[input_index] = -1;
        this.equation_data.push(
          {triple: t, operation: operation, input_index: input_index, equation_index: i}
        );
      }
  }
}


}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/* Define an animation behavior */
@keyframes spinner {
  to { transform: rotate(360deg); }
}
/* This is the class name given by the Font Awesome component when icon contains 'spinner' */
.fa-spinner {
  /* Apply 'spinner' keyframes looping once every second (1s)  */
  animation: spinner 1s linear infinite;
}

</style>
