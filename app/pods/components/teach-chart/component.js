import Ember from 'ember';
import _collection from 'lodash/collection';
import _array from 'lodash/array';
import _lang from 'lodash/lang';

export default Ember.Component.extend({
  self: {},
  setSelf: function () {
    let self = this;
    let context = this.get('self');
    if (_lang.isEmpty(context)) {
      this.set('self', {
        setBarChartData: self.setBarChartData.bind(self),
        setPieChartData: self.setPieChartData.bind(self)
      });
    }
  }.on('didInsertElement'),
  truncate: function ( n, useWordBoundary ){
      var isTooLong = this.length > n,
          s_ = isTooLong ? this.substr(0,n-1) : this;
          s_ = (useWordBoundary && isTooLong) ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
      return  isTooLong ? s_ + '...' : s_;
  },
  backgroundColor: [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#FF6384",
    "#36A2EB",
    "#FFCE56"
  ],
  borderColor: [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#FF6384",
    "#36A2EB",
    "#FFCE56"
  ],
  chartOptions: {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true,
                min: 0,
                max: 100
            }
        }]
    }
  },
  setBarChartData: function (questionData) {
    let self = this;
    let labels = _collection.map(questionData.options, function (option) {
      return self.truncate.apply(option.value, [11, true]);
    });
    let backgroundColor = _array.take(this.get('backgroundColor'), labels.length);
    let borderColor = _array.take(this.get('borderColor'), labels.length);
    let data = _array.fill(Array(labels.length), 0);
    this.set('barChartData', {
      labels: labels,
      datasets: [{
        label: 'Count',
        data: data,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1
      }]
    })
  },
  containsAll: function (needles, haystack){
    let input = JSON.stringify(needles.sort());
    let answer = JSON.stringify(haystack.sort());
    return input === answer;
  },
  setPieChartData: function (responses, answer) {
    let self = this;
    let correctAns = _collection.reject(responses, function (response) {
      let contains = self.containsAll(response.answer, answer);
      return !contains;
    });
    let data = [correctAns.length, responses.length - correctAns.length];
    let backgroundColor = _array.take(this.get('backgroundColor'), 2);
    let hoverBackgroundColor = _array.take(this.get('hoverBackgroundColor'), 2);
    this.set('pieChartData', {
      labels: ["Correct Answer", "Wrong Answer"],
      datasets: [{
          data: data,
          backgroundColor: backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor
      }]
    });
  },
  barChartData : {
    labels: [
        "Red",
        "Blue",
        "Yellow"
    ],
    datasets: [
      {
          data: [300, 50, 100],
          backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56"
          ],
          hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56"
          ]
      }]
  },
  pieChartData: {
    labels: [
        "Red",
        "Blue",
        "Yellow"
    ],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
        }]
  }
});
