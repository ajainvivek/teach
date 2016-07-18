import Ember from 'ember';

export default Ember.Component.extend({

    selectedValue: "",
    isSingleSelection: true,
    userAnswer: [],
    defaultTimeOut: 10,
    isSubmitDisabled: false,
    timeToShow: "",
    isTimerToContinue: true,
    isQsTimeCompleted: false,
    correctAnswerArray: [],

    didInsertElement: function(){
      //this.set('question', this.get('obj').slides[0].qs);
      this.set('timeLeft', this.get('question').timeout);
      this.startTimer();
    },

    invokeTimer : function () {
      if(this.get('question').type === 'single'){
        this.set('isSingleSelection', true);
      }else{
        this.set('isSingleSelection', false);
      }
      this.clearTimer();
      this.set('isSubmitDisabled', false);
      this.startTimer();
    }.observes('question'),

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
        this.set('isTimerToContinue', true);
        console.log(this.get('userAnswer'));
        this.sendAction('onAnswer', this.get('userAnswer'));
      }
    },
    timer : null,
    startTimer: function(){
      let self = this;
      this.timer = setTimeout(function(){
        let time = self.get('timeLeft');
        //If submit button is disabled, dont change display time but continue timer internally
        //if(!self.get('isSubmitDisabled')){
          self.set("timeToShow", moment.utc(time*1000).format('mm:ss'));
        //}
        if(time > 0){
          self.set('timeLeft',time-1);
          self.startTimer();
        }else{
          self.sendAction('questionTimeCompleted');
          self.set('isSubmitDisabled', true);
          self.clearTimer();
          self.setCorrectAnswer();
        }
      },1000);
    },
    clearTimer: function () {
      window.clearInterval(this.timer);
      this.set('isTimerToContinue', false);
      this.set("timeLeft", this.get('question').timeout);
      this.set('isQsTimeCompleted', false);
      this.set('correctAnswerArray',[]);
      this.set('userAnswer',[]);
      this.set('selectedValue', '');
    },

    setCorrectAnswer: function(){
      let self = this;
      if (this.get('question').answer) {
        for(let i=0; i< this.get('question').answer.length; i++){
          for(let j=0; j<this.get('question').options.length; j++){
            if(this.get('question').answer[i] == this.get('question').options[j].id){
              self.get('correctAnswerArray').push(this.get('question').options[j].value);
            }
          }
        }
      }
      this.set('isQsTimeCompleted', true);
    }
});
