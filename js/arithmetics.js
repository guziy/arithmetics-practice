

momentDurationFormatSetup(moment);

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


var equation = Vue.component('equation', {

    props:["equation_data", "event_bus",
           'n_tried'],
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

        // ficus the input if required
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
        this.init_equation();
      },
    }
});




var app = new Vue({
  el: '#app',
  data: {
    message: function(){
      if (name.length === 0) {
        return 'Entrez votre nom SVP:'
      } else {
        return "Salut <b>" + this.name + "</b>, on va faire quelques exercices:"
      }

    },
    name: '',

    n_total: 10,

    equation_data: [],

    n_correct: 0,

    n_tried: -1,
    start_time: "",
    elapsed_time: 0,
    current_time: "",
    event_bus: new Vue()
  },
  components: {
    equation: equation,
  },
  created: function(){
    //this.generate_equation_data();
    //register getting elapsed_time every second
    setInterval(this.get_elapsed_time, 1000);

  },
  methods: {
    on_correct: function (event){
      this.n_tried++;
      this.n_correct += event.correct;
    },
    //on commence btn action
    on_start: function(){
      this.generate_equation_data();
      this.start_time = moment();
    },
    get_current_time: function (){
      return moment();
    },
    get_elapsed_time: function(){
      dt = moment.duration(this.get_current_time().diff(this.start_time));
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
        t = [num1, num2, num3];
        t[input_index] = -1;
        this.equation_data.push(
          {triple: t, operation: operation, input_index: input_index, equation_index: i}
        );
      }
    }

  }
});
