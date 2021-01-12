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
                    // console.log("Focusing on:" + this.$refs.input[0] + ", from " + event.src_index);
                    this.$refs.input[0].focus();
                    this.$refs.input[0].scrollIntoView();
                }
            });
        }
      }); // this.event_bus.$on
    },

    mounted: function () {
    },
    beforeDestroy(){
      this.event_bus.$off("focus-equation");
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

        this.is_correct = this.correct_answer === Number(this.user_answer);

        event = {
          correct: this.is_correct,

        };

        this.$emit("oncorrect-equation", event);

        // focus on the next equation
        this.event_bus.$emit("focus-equation",
                               {src_index: this.equation_data.equation_index});

        this.corrected = true;
      },
      is_visible: function() {
        return this.equation_data.equation_index <= this.n_tried;
      },

      get_equation_tokens: function() {
        var tokens = this.equation_data.triple.slice();
        tokens.splice(2, 0, '=');
        tokens.splice(1, 0, this.equation_data.operation_symbol);

        return tokens
      },

      init_equation: function () {
        //console.log("init_equation with " + nums.join(",") );
        this.correct_answer = this.equation_data.correct_answer;

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
  <form action="javascript:void(0);">
  <div class="row justify-content-center">
      <div class="col-md-auto my-auto text-left text-nowrap pt-2 pb-2">
        <span v-for="(token, i) in tokens"
              v-bind:key="i + '-eq_term of eq-' + equation_data.equation_index">
          <span v-if="token === -1" class="mr-2">
            <input size="4"  v-model="$v.user_answer.$model"
                   type="text"
                   v-on:keyup.enter="on_correct()"
                   :disabled="corrected"
                   :class="{'input': true, 'is-invalid': $v.user_answer.$invalid}"
                   ref="input"/>
          </span>
          <span v-else class="mr-2">
            {{token}}
          </span>
        </span>
      </div>
      <div v-if="!corrected" class="col-md-auto my-auto text-left text-nowrap">
          <button type="button"
                  @click="on_correct()"
                  class="btn btn-sm btn-secondary mr-2"><font-awesome-icon
                  icon="check" /></button>
          <font-awesome-icon icon="spinner" />
      </div>
      <div v-if="corrected && is_correct" class="text-success col-md-auto my-auto text-left">
        <font-awesome-icon icon="check" class="" />
        {{$t('well_played')}}!
      </div>
      <div v-if="corrected && !is_correct" class="text-danger col-md-auto my-auto text-left">
          <font-awesome-icon icon="times" />
          {{$t('the_answer_is')}}: {{correct_answer}}.
      </div>

      <div class="col-md-auto alert alert-danger my-auto text-left m-0"
           v-if="!$v.user_answer.integer">
           {{$t('integer_is_required')}}!
      </div>
  </div>
</form>
</template>
