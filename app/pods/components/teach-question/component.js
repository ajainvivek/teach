import Ember from 'ember';

export default Ember.Component.extend({

    selectedValue: "",
    isSingleSelection: true,
    userAnswer: [],
    defaultTimeOut: 10,
    isSubmitDisabled: false,
    timeToShow: "",
    isTimerToContinue: true,

    didInsertElement: function(){
      //this.set('question', this.get('obj').slides[0].qs);
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
        //If submit button is disabled, dont change display time but continue timer internally
        if(!self.get('isSubmitDisabled')){
          self.set("timeToShow", moment.utc(time*1000).format('mm:ss'));
        }
        if(time > 0){
          self.set('timeLeft',time-1);
          self.startTimer();
        }else{
          console.log('time completed');
          self.sendAction('questionTimeCompleted');
          self.set('isTimerToContinue', false);
          self.set('isSubmitDisabled', true);
        }
      },1000);
    }
});
