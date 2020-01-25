var app = new Vue({
  el: '#app',
  data: {
    message: 'Entrez votre nom SVP:',
    name: '',

    n_total: 20,
    // triples of numbers
    triples: [],
    // index of the field 0,1 or 2
    field_index: []
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

      additon = r > 0.5;

      num1 = 0;

      triples.append([]);

    }

  }
});
