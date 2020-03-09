<script>


/** initial state of the equation component comp
*/
function equation_initial_state() {

  return {
    visible: false,
    tokens: [],
    user_answer: "",
    corrected: false,
    is_correct: false,
    warning_message: "",
    correct_answer: -1,
  };
}


import { required, integer } from 'vuelidate/lib/validators'


export default {

    name: "equation",

    props:["equation_data", "event_bus",
           "n_tried", "n_total"],
    data: function(){
      return equation_initial_state();
    },
    template: "#equation",

    created: function() {
      // this.event_bus.$on("init-equations", this.init_equation);
      this.init_equation();

      // listen to the event bus, to focus next equation input on correct
      this.event_bus.$on("focus-equation", (event) => {
        //console.log(this.equation_data.equation_index + "-- received --> " + event);
        if (event.src_index + 1 == this.equation_data.equation_index) {
          this.$nextTick(
            () => {
                if (this.is_visible()){
                    this.$refs.input[0].focus();
                    this.$refs.input[0].scrollIntoView();
                }
            });
        }
      }); // this.event_bus.$on
    },

    mounted: function () {
    },

    methods: {
      on_correct: function (event) {
        //TODO: add action

        if (this.$v.user_answer.$invalid) {
          console.log(this.$v.user_answer);
          return;
        }


        if (this.user_answer === "") {
          console.log("Nothing was entered");
          return
        }

        this.is_correct = this.correct_answer == this.user_answer;

        event = {
          correct: this.is_correct,

        };

        this.$emit("oncorrect-equation", event);
        this.event_bus.$emit("focus-equation", {src_index: this.equation_data.equation_index});
        this.corrected = true;
      },
      is_visible: function() {
        return this.equation_data.equation_index <= this.n_tried;
      },

      get_equation_tokens: function() {
        var tokens = this.equation_data.triple.slice();
        tokens.splice(2, 0, '=');
        tokens.splice(1, 0, this.equation_data.operation);

        return tokens
      },

      init_equation: function () {
        var nums = this.equation_data.triple;
        //console.log("init_equation with " + nums.join(",") );

        if (this.equation_data.operation === "+") {
          switch (this.equation_data.input_index) {
            case 0:
              this.correct_answer = nums[2] - nums[1];
              break;

            case 1:
              this.correct_answer = nums[2] - nums[0];
              break;

            case 2:
              this.correct_answer = nums[0] + nums[1];
              break;
          }
        } else if (this.equation_data.operation === "-") {
          switch (this.equation_data.input_index) {
            case 0:
              this.correct_answer = nums[1] + nums[2];
              break;

            case 1:
              this.correct_answer = nums[0] - nums[2];
              break;

            case 2:
              this.correct_answer = nums[0] - nums[1];
              break;
          }
        } else {
          console.log("operation: " + this.operation + "is not implemented.");
        }
        this.corrected = false;
        this.correct = false;
        this.user_answer = "";

        this.tokens = this.get_equation_tokens();
        this.visible = this.is_visible();

        // focus the input if required
        this.$nextTick(
          () => {
              if (this.is_visible()){
                  this.$refs.input[0].focus();
              }
          }
        );

      },

    }, // methods
    watch: {
      equation_data: function(newVal, oldVal){
        if (newVal != oldVal) {
            this.init_equation();
        }
      },
    },
    validations: {
        user_answer: {
          required, integer
        }
    }


}

</script>

<template id="equation">
  <div class="row justify-content-center">

    <div class="p-2 mr-3 text-nowrap">
      <span v-for="token in tokens" v-bind:key="token">
        <span v-if="token === -1">
          <input size="4"  v-model="$v.user_answer.$model"
                 v-on:keyup.enter="on_correct()"
                 :disabled="corrected"
                 :class="{'input': true, 'is-danger': $v.user_answer.$invalid}"
                 ref="input"/>
        </span>
        <span v-else>
          {{token}}
        </span>
      </span>
    </div>

    <div v-if="!corrected" class="p-2">
        <button type="button" @click="on_correct()" class="mr-2"><font-awesome-icon icon="check" /></button>
        <font-awesome-icon icon="spinner" />
    </div>
    <div v-if="corrected && is_correct" class="text-success p-2">
      <font-awesome-icon icon="check" />
      {{$t('well_played')}}!
    </div>
    <div v-if="corrected && !is_correct" class="text-danger p-2">
        <font-awesome-icon icon="times" />
        {{$t('the_answer_is')}}: {{correct_answer}}.
    </div>

    <div class="p-2 alert alert-danger"
         v-if="!$v.user_answer.integer">{{$t('integer_is_required')}}!</div>

  </div>
</template>
