<script setup lang="ts">



import {BApp} from 'bootstrap-vue-next'

import { ref } from 'vue'

import {
  MAX_NUM_EQUATIONS, 
  MIN_NUM_EQUATIONS,
  num_upper_limit_list,
  all_operations_text_labels,
  all_operations_symbols
} from './util/constants.js'
import EquationBlock from './components/EquationBlock.vue';
import TopMenu from './components/TopMenu.vue';

/*
  data(){
    return {
      name: "",
      n_total: 10,
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
      event_bus: createApp(),
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
      is_show_genius_fireworks: false,
      show_all_equations: false
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
              behavior: 'smooth', 
              block: 'end'
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


      this.start_time = new Date();
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
      return new Date();
    },
    get_elapsed_time: function(){
      return "";
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
**/

</script>



<template>
  <BApp>
    <BContainer id="App">
      <TopMenu />
      "Hello"
      <p>MAX_NUM_EQUATIONS = {{ MAX_NUM_EQUATIONS }} </p>
    </BContainer>
  </BApp>
</template>


<style scoped>
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


  li.current-equation{
    border-bottom: none;
  }
</style>
