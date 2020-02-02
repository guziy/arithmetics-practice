

momentDurationFormatSetup(moment);

var equation = Vue.component('equation', {

    props:['equation_index', 'num1', 'num2', 'num3', 'operation', 'input_index',
            'n_tried'],
    data: function(){
      return {
        visible: this.is_visible(),
        tokens: this.get_equation_tokens(),
        user_answer: "",
        corrected: false,
        is_correct: false,
        warning_message: "",
        correct_answer: -1,
      }
    },

    template: "#equation",

    created: function() {
      var nums = [this.num1, this.num2, this.num3];

      if (this.operation === "+") {
        switch (this.input_index) {
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
      } else if (this.operation === "-") {
        switch (this.input_index) {
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
        this.corrected = true;
      },
      is_visible: function() {
        return this.equation_index === this.n_tried;
      },

      get_equation_tokens: function() {
        var tokens = [this.num1, this.num2, this.num3];
        tokens.splice(2, 0, '=');
        tokens.splice(1, 0, this.operation);

        return tokens
      }

    },
    watch: {
      n_tried: function(newVal, oldVal){
        if (newVal === -1) {
          this.created();
        }
      }
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
    // triples of numbers
    triples: [],
    // index of the field 0,1 or 2
    input_index: [],
    //which operations
    operations: [],

    n_correct: 0,

    n_tried: -1,
    start_time: "",
    elapsed_time: 0,
    current_time: ""
  },
  components: {
    equation: equation,
  },
  created: function(){
    const MAX_NUM = 100;
    var i;
    var num1, num2, num3;
    var additon;
    var r; // from [0, 1)
    for (i = 0; i < this.n_total; i++) {
      console.log(i);

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

      if (additon){
        num3 = num1 + num2;
        this.operations.push("+")
      } else {
        num3 = num1 - num2;
        this.operations.push("-")
      }

      this.input_index.push(Math.floor(3 * Math.random()))
      t = [num1, num2, num3]
      t[this.input_index[this.input_index.length - 1]] = -1;
      this.triples.push(t);
    }
    //register getting elapsed_time every second
    setInterval(this.get_elapsed_time, 1000);

  },
  methods: {
    on_correct: function (event){

      // todo
      console.log(event);
      this.n_tried++;
      this.n_correct += event.correct;
    },
    on_start: function(){
      this.n_tried = 0;
      this.n_correct = 0;
      this.start_time = moment();

      console.log(this.start_time.format());
    },
    get_current_time: function (){
      return moment();
    },
    get_elapsed_time: function(){
      dt = moment.duration(this.get_current_time().diff(this.start_time));
      this.elapsed_time = dt.format("mm") + " minutes et " + dt.format("ss") + " secondes";
      return this.elapsed_time;
    }

  }
});
