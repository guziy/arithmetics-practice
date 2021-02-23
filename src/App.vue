<template>



  <div class="container mt-0 p-0" id="app">

    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>

        <b-nav-item href="https://guziy.blogspot.com/2020/02/arithmetics-practice-app-for-my-son-in.html">{{$t('about')}}</b-nav-item>

      </b-navbar-nav>
        <!-- language selection -->

      <b-navbar-nav class="ml-auto">

          <b-nav-item href="https://github.com/guziy/arithmetics-practice">
            <font-awesome-icon :icon="['fab', 'github']"/>
          </b-nav-item>

          <b-nav-item-dropdown v-model="$i18n.locale" right>            
                  <template v-slot:button-content>
                      <font-awesome-icon icon="globe"/>
                  </template>

                <b-dropdown-item href="#" v-for="(alang_name, alang_id) in available_locales" 
                        v-bind:key="'lang-' + alang_id" :value="alang_id"
                        @click="on_change_language(alang_id)">
                  
                  <div class="row justify-content-start">

                    <!-- Check mark for the selected language -->
                    <div class="col-2">
                      <font-awesome-icon icon="check" v-if="alang_id === $i18n.locale"/> 
                    </div>


                    <div class="col-9">
                      {{alang_name}}
                    </div> 

                  </div>

                </b-dropdown-item>
          </b-nav-item-dropdown>
      </b-navbar-nav>

      
    </b-navbar>




    <div class="row justify-content-center p-1 m-0 mt-5 mb-1">
      <div class="col">
        <label for="player-name"> {{$t('pls_enter_your_name')}}:
            <input id="player-name" type="text" v-model="name"
                  v-on:keyup.enter="$refs.start_button.focus()"/>
        </label>
      </div>
    </div>

    <div class="row justify-content-center m-0 p-3 mb-3">
      <div class="col-12 text-center p-3 my-auto border-bottom">

          {{$t("hello")}} <b>{{name}}</b>, {{$t('lets_do_few')}}

          <input id="num-equations"
                 v-model="$v.n_total.$model"
                 size="4"
                 v-on:keyup="on_edit_n_total()"
                 :disabled="(n_tried >= 0) && false"
                 :class="{'input': true, 'is-invalid': $v.n_total.$invalid,
                          'input-sm': true}"/>

          {{$t('exercises')}}!

          <div class="invalid-feedback">
                {{$t("number_of_exercises_should_be") + " " + MIN_NUM_EQUATIONS + " " + $t("and") + " " + MAX_NUM_EQUATIONS}}
          </div>


      </div>

      <!-- choose operations -->
      <div class="col-5 text-left pl-0 pt-2 mt-2">
        <p>{{$t('choose_operations')}}</p>

          <div v-for="(operation, opid) in all_operations_text_labels"
               :class="{'form-check': true,
                        'is-invalid': error_message_list[ERRID_OPS_SELECT].length > 0}"
               v-bind:key="operation">

              <input
                class="form-check-input"
                type="checkbox"
                :value=opid
                v-model="selected_operations[opid]"
                :id="opid + '_opt'"
                @change="on_change_operations($event)"
              />

              <label class="form-check-label" :for="opid + '_opt'">
               ( <b>{{all_operations_symbols[opid]}}</b> ) {{$t(operation)}} 
              </label>
         </div>
         <br/>
         <div class="invalid-feedback">
               {{$t('you_need_to_select_at_least_one_operation')}}
         </div>
      </div>

      <!-- maximum values -->
      <div class="col-5 text-left pt-2 m-0 mt-2 border-left">
          <p>{{$t('i_can_compute_numbers_up_to') + ' '}} </p>

          <select v-model="max_value" @change="on_change_max_value()" 
                  class="custom-select" data-width="fit">
              <option v-for="limit in num_upper_limit_list"
                      v-bind:key="'upper_limit-' + limit"
                      :value="limit">
                {{limit}}
              </option>

          </select>

      </div>

    </div>


    <div class="row m-0">
      <div class="col text-center">
        <button ref="start_button"
                class="btn btn-success"
                type="button"
                name="button"
                :disabled="!enable_start_button"
                @click="on_start">{{$t('yes_lets_start')}}</button>
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
          <ul id="equation-list" class="list-group list-group-flush">
            <li :class="['list-group-item', {'current-equation': eq.equation_index == n_tried}]"
                v-for="eq in equation_data"
                :key="eq.equation_index + 'A'" v-show="eq.equation_index <= n_tried">

              <equation :equation_data="eq" :event_bus="event_bus"
                        :n_tried="n_tried" @oncorrect-equation="on_correct"
                        :n_total="n_total"
                        ></equation>

            </li>
          </ul>
        </div>


        <div class="col-12 mt-0 text-right">
          <div class="p-1 ml-5">
            <a href="#" class="badge badge-dark">{{n_tried}} / {{n_total}}</a>
          </div>
        </div>

        <div class="col-12 mt-0">
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

          <div id="end_message" class="alert alert-success"
                v-if="n_tried === n_total"
                :style="[is_show_genius_fireworks ? {'background-image': 'url(' + genius_fireworks + ')'} : {}]">
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

momentDurationFormatSetup(moment);

import { required, integer, between } from 'vuelidate/lib/validators'

import image from "../assets/fireworks1.gif"

import available_locales from "@/config/supported-locales"

export default {
  title: 'Arithmetics practice',
  name: 'App',
  components: {
    equation
  },
  data: function (){
    return {
      MAX_NUM_EQUATIONS: 500,
      MIN_NUM_EQUATIONS: 5,
      name: "",
      n_total: 10,
      num_upper_limit_list: [20, 50, 100, 500, 1000, 10000],
      all_operations_text_labels: { // operation to text label map
        "add": "addition",
        "sub": "subtraction",
        "mul": "multiplication",
        "div": "division"
      },
      all_operations_symbols: {
        "add": "+",
        "sub": "-",
        "mul": "\u00D7",
        "div": "\u00F7"
      },
      selected_operations: {
        "add": true,
        "sub": true,
        "mul": false,
        "div": false
      },
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
      available_locales: available_locales,
      selected_language: this.$i18n.locale,
      error_message_list: ["", ""],
      ERRID_NTOTAL_FIELD: 0,
      ERRID_OPS_SELECT: 1,
      max_value: 100,
      enable_start_button: true,
      genius_fireworks: image,
      is_show_genius_fireworks: false
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
        console.log(event.src_index)

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

      if (this.n_tried === this.n_total){
        clearInterval(this.timer_refresh_interval_id);
      }


      // Show some fireworks as encouragement
      if (this.n_tried == this.n_total) {
        this.is_show_genius_fireworks = this.n_correct > 0.8 * this.n_total;
      }

    },
    scroll_to_bottom: function() {
        window.scrollTo(0, document.body.scrollHeight);
    },
    //on commence btn action
    on_start: function(){


      this.start_time = moment();
      this.elapsed_time = this.get_elapsed_time();

      if (this.timer_refresh_interval_id !== -1) {
        clearInterval(this.timer_refresh_interval_id);
        this.timer_refresh_interval_id = -1;
      }

      this.timer_refresh_interval_id = setInterval(this.get_elapsed_time, 1000);

      this.generate_equation_data();
      this.n_tried = 0;
      this.progress = 0; // reset the progress bar

      this.is_show_genius_fireworks = false;
      this.$nextTick(this.scroll_to_bottom);

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

    get_random_int: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    },

    generate_equation_data: function () {
      this.equation_data = [];
      this.n_tried = -1;
      this.n_correct = 0;
      //this.progress = Math.floor(this.n_tried / this.n_total * 100);

      var i;
      var num1, num2, num3;
      var r; // from [0, 1)


      var cur_operations = [];

      for (const [key, status] of Object.entries(this.selected_operations)){
        if (status) {
          cur_operations.push(key);
        }
      }

      // console.log(cur_operations);

      var operation;

      for (i = 0; i < this.n_total; i++) {
        //console.log(i);

        r = Math.random();

        operation = cur_operations[Math.floor(r * cur_operations.length)];

        if (operation === "add") {
          num3 = this.get_random_int(Math.floor(this.max_value / 10), this.max_value);
          num1 = this.get_random_int(1, num3);
          num2 = num3 - num1;

        } else if (operation === "sub") {

          num1 = this.get_random_int(Math.floor(this.max_value / 10), this.max_value);
          num2 = this.get_random_int(1, num1);
          num3 = num1 - num2;

        } else if (operation === "mul") {
          num3 = this.get_random_int(Math.floor(this.max_value / 10), this.max_value);
          num2 = this.get_random_int(1, Math.floor(num3 / 2));

          num1 = Math.floor(num3 / num2)
          num3 = num1 * num2;
        } else if (operation === "div") {
          num1 = this.get_random_int(Math.floor(this.max_value / 10), this.max_value);
          num2 = this.get_random_int(1, Math.floor(num1 / 2));
          num3 = Math.floor(num1 / num2);
          num1 = num2 * num3;
        }



        var input_index;
        input_index = Math.floor(3 * Math.random());
        let t = [num1, num2, num3];
        let correct_answer = t[input_index];
        t[input_index] = -1;
        this.equation_data.push(
          {
            triple: t,
            operation_symbol: this.all_operations_symbols[operation],
            operation: operation,
            input_index: input_index,
            equation_index: i,
            correct_answer: correct_answer
          }
        );
      }

    }, // generate_equation_data
    on_change_language: function (selected_language){
      if (this.$i18n.locale === selected_language){
        return;
      }

      this.$i18n.locale = selected_language;
    },
    on_edit_n_total: function (){
      var msg = this.$t("number_of_exercises_should_be") + " " + this.MAX_NUM_EQUATIONS;
      if (this.$v.n_total.$invalid) {
        this.push_error(msg, this.ERRID_NTOTAL_FIELD);
      } else {
        this.pop_error(msg, this.ERRID_NTOTAL_FIELD);
        this.n_total = Number(this.$v.n_total.$model);
      }
      this.n_tried = -1;
    },
    is_ok_to_start: function(){
      // assume that the initial settings are valid
      return this.error_message_list.reduce((acc, item) => acc && (item.length === 0), true);
    },
    on_change_max_value: function(){
      this.n_tried = -1;
    },
    on_change_operations: function(){
      // needed for error checking
      var any_selected = false;
      Object.values(this.selected_operations).forEach( (value) => {
        any_selected = any_selected || value;
      });

      var msg = "You need to select at least one operation!";
      if (!any_selected) {
        this.push_error(msg, this.ERRID_OPS_SELECT);
      } else {
        this.pop_error(msg, this.ERRID_OPS_SELECT);
      }
      this.n_tried = -1;
    },
    push_error: function(msg, idx) {
      this.error_message_list[idx] = msg;
      this.enable_start_button = false;
    },
    pop_error: function(msg, idx) {
      this.error_message_list[idx] = "";
      this.enable_start_button = this.is_ok_to_start();
    }

  },
  validations() {
    return {
      n_total: {
        required,
        integer,
        between: between(this.MIN_NUM_EQUATIONS, this.MAX_NUM_EQUATIONS)
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


#language-bar a.current-language {
  background-color: grey;
}

#language-bar .btn {
  color: white;
  background-color: black;
  border-color: white;
}

li.current-equation{
  border-bottom: none;
}



</style>
