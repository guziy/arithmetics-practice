<template>



  <div class="container mt-0 p-0" id="app">

    <div id="language-bar" class="container border rounded mb-5">
      <div class="p-2 text-right">
        <a class="p-2 mr-3" href="http://guziy.blogspot.com/2020/02/arithmetics-practice-app-for-my-son-in.html">{{$t('about')}}</a>
        <a v-bind:class="['p-2', selected_language === 'fr' ? 'current-language' : '']" href="#" @click.prevent="on_change_language('fr')">Fr</a>
        <a v-bind:class="['p-2',selected_language === 'en' ? 'current-language' : '']" href="#" @click.prevent="on_change_language('en')">En</a>
      </div>
    </div>


    <div class="row justify-content-center pt-3 m-0">
      <label for="player-name"> {{$t('pls_enter_your_name')}}:
          <input id="player-name" type="text" v-model="name"
                v-on:keyup.enter="$refs.start_button.focus()"/>
      </label>
    </div>

    <div class="row m-0">
      <div class="col text-center p-3">
          {{$t("hello")}} <b>{{name}}</b>, {{$t('lets_do_few_exercises')}}!
      </div>
    </div>

    <div class="row m-0">
      <div class="col text-center">
        <button ref="start_button" type="button" name="button" @click="on_start">{{$t('yes_lets_start')}}</button>
      </div>

    </div>

<!--
    <div v-if="start_time != ''" class="row">
      <div class="col text-center m-3">
          Temps ecoulé: <b>{{elapsed_time}}</b>
      </div>
    </div>
-->
      <div id="equation-container" class="row m-0 mt-5" v-if="n_tried >= 0">
        <div class="col-12 mb-3">{{$t('enter_missing_numbers')}}:</div>

        <div class="col-12">
          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="eq in equation_data"
                v-bind:key="eq.equation_index" v-show="eq.equation_index <= n_tried">

              <equation :equation_data="eq" :event_bus="event_bus"
                        :n_tried="n_tried" @oncorrect-equation="on_correct"
                        :n_total="n_total"
                        ></equation>

            </li>
          </ul>
        </div>


        <div class="col-12 mt-3 text-right">
          <div class="p-2 ml-5">
            <a href="#" class="badge badge-dark">{{n_tried}} / {{n_total}}</a>
          </div>
        </div>

        <div class="col-12 mt-1">
          <div class="progress" style="height: 3px;">
            <div class="progress-bar" role="progressbar"
                :aria-valuenow="progress" aria-valuemin="0"
                :style="{width: progress + '%'} "
                aria-valuemax="100">
            </div>
          </div>
        </div>

        <div id="footer" ref="end_message" class="col-12" v-if="n_tried >= 0">
          <div class="row justify-content-center">

            <div class="col-6 p-3">
              <font-awesome-icon icon="stopwatch"/> <br/> {{elapsed_time}}
            </div>

            <div class="col-3 p-3">
              <span class="text-success"><font-awesome-icon icon="check"/> <br/> {{n_correct}}</span>
            </div>

            <div class="col-3 p-3">
              <span class="text-danger"><font-awesome-icon icon="times"/> <br/>{{n_tried - n_correct}}</span>
            </div>
          </div>

          <div id="end_message" class="alert alert-success" v-if="n_tried === n_total">
            <span> {{$t('exercise_is_finished')}} {{name}}, {{$t('it_took_you')}} {{elapsed_time}}: </span>
            <span v-if="n_correct == n_total">{{$t('you_are_a_genius')}}!</span>
            <span v-else-if="(n_correct > 0.5 * n_total)">{{$t('well_played_but_there_is_space_for_improvement')}}!</span>
            <span v-else-if="(n_correct <= 0.5 * n_total)">{{$t('you_have_to_practice_more')}}!</span>
            <span v-else-if="(elapsed_time_seconds > 180 * n_total)"><br>{{$t('try_to_speed_up')}}.</span>
          </div>
        </div>

      </div>


  </div>
</template>

<script>
import equation from './components/equation.vue'
import Vue from 'vue'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
import {i18n} from '@/plugins/i18n';

momentDurationFormatSetup(moment);


export default {
  title: 'Arithmetics practice',
  name: 'App',
  components: {
    equation
  },
  data: function (){
    return {
      name: "",
      n_total: 10,

      equation_data: [],

      n_correct: 0,

      n_tried: -1,
      start_time: "",
      elapsed_time: 0,
      elapsed_time_seconds: 0,
      current_time: "",
      event_bus: new Vue(),
      timer_refresh_interval_id: -1,
      progress: 0,
      selected_language: i18n.locale
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
        this.$nextTick(
          () => {
            this.$refs.end_message.scrollIntoView({
              behavior: 'smooth', block: 'end'
            });
          }
        );
      }
    },

    on_correct: function (event){
      this.n_tried++;
      this.n_correct += event.correct;
      this.progress = Math.floor(this.n_tried / this.n_total * 100);
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
      this.elapsed_time_seconds = dt;
      this.elapsed_time = dt.format("hh [h] mm [min] ss [sec]");
      return this.elapsed_time;
    },
    generate_equation_data: function () {
      this.equation_data = [];
      this.n_tried = 0;
      this.n_correct = 0;
      this.progress = Math.floor(this.n_tried / this.n_total * 100);

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
  }, // generate_equation_data
  on_change_language: function (selected_language){
    if (selected_language === this.selected_language){
      return;
    }
    this.selected_language = selected_language;
    i18n.locale = selected_language;
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
  max-width: 600px;
}
/* Define an animation behavior */
@keyframes spinner {
  to { transform: rotate(360deg); }
}
/* This is the class name given by the Font Awesome component when icon contains 'spinner' */
.fa-spinner {
  /* Apply 'spinner' keyframes looping once every second (1s)  */
  animation: spinner 1.5s linear infinite;
}

#language-bar{
  color: white;
  background-color: black;
}

#language-bar a{
  color: white;
  font-weight: bold;
}

#language-bar a.current-language {
  background-color: grey;
}

#app button {
  color: #2c3e50;
}


</style>
