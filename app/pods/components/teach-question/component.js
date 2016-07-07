import Ember from 'ember';

export default Ember.Component.extend({
  obj: {
    "roomId": "123",
      "id": 1,
      "presenter": {
        "id": "123",
        "name": "345"
      },
      "slideTemplate": "url",
      "title": "Title",
      "snapshotImg": "url",
      "theme": "default",
      "slides": [
        {
          "id": "123",
          "seqNo": 1,
          "type": "info/qs",
          "isCurrentQs": false,
          "qs": {
            "type": "multi",
            "title": "Is this working?",
            "options": [
              {
                "id": "1",
                "value": "Yes"
              },
              {
                "id": "2",
                "value": "No"
              }
            ],
            "answer": ["1"],
            "chart": "pie",
            "responses": [
              {
                "id": "334",
                "name": "sett",
                "answer": ["1","2"]
              }
            ],
            "timeout": 30,
            "isCompleted": true
          }
        }
      ],
      "users": [
        {
          "id": "1",
          "name": "Sajith"
        }
      ]
    },
    selectedValue: "",
    isSingleSelection: true,
    userAnswer: [],
    defaultTimeOut: 10,
    isSubmitDisabled: false,
    timeToShow: "",
    isTimerToContinue: true,

    didInsertElement: function(){
      this.set('question', this.get('obj').slides[0].qs);
      if(this.get('question').type === 'single'){
        this.set('isSingleSelection', true);
      }else{
        this.set('isSingleSelection', false);
      }
      this.set('timeLeft', this.get('question').timeout);
      this.startTimer();
    },

    actions: {
      change: function(value){
        this.set('userAnswer',[]);
        this.get('userAnswer').push(value);
      },

      onChecked: function(value){
        let answerArray = this.get('userAnswer');
        if(answerArray.indexOf(value) == -1){
          answerArray.push(value);
        }
        console.log(this.get('userAnswer'));
      },

      onUnChecked: function(value){
        let answerArray = this.get('userAnswer');
        if(answerArray.indexOf(value) != -1){
          answerArray.splice(answerArray.indexOf(value), 1);
        }
        console.log(this.get('userAnswer'));
      },

      submit: function(){
        this.set('isSubmitDisabled', true);
        this.set('isTimerToContinue', false);
        console.log(this.get('userAnswer'));
      }
    },

    startTimer: function(){
      let self = this;
      Ember.run.later(function(){
        let time = self.get('timeLeft');
        self.set("timeToShow", moment.utc(time*1000).format('mm:ss'));
        if(time > 0 && self.get('isTimerToContinue')){
          self.set('timeLeft',time-1);
          self.startTimer();
        }else{
          self.set('isTimerToContinue', false);
          self.set('isSubmitDisabled', true);
        }
      },1000);
    }
});
