import Ember from 'ember';

export default Ember.Component.extend({
  question: {
      "type" : "multi",
      "title" : "Is this working?",
      "options" : [{
        "id" : "1",
        "value" : "Yes",
        "selected" : true
      },
      {
        "id" : "2",
        "value" : "No",
        "selected" : false
      }],
      "answer" : ["1"],
      "chart" : "pie",
      "responses" : [{
        "id" : "334",
        "name" : "sett",
        "answer" : ["1"]
      }],
      "timeout" : 10
    },
    selectedValue: "",
    isSingleSelection: true,
    userAnswer: [],
    defaultTimeOut: 10,
    isSubmitDisabled: false,

    didInsertElement: function(){
      this.set('selectedValue', this.get('question').options[0].value);
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
        console.log('hittt');
        if(this.get('isSingleSelection')){
          this.set('userAnswer',[]);
          this.get('userAnswer').push(value);
        }
      },

      submit: function(){
        console.log(this.get('userAnswer'));
      }
    },

    test: function(){
      console.log('ok');
    }.observes('question.options'),

    startTimer: function(){
      let self = this;
      Ember.run.later(function(){
        let time = self.get('timeLeft');
        if(time > 0){
          self.set('timeLeft',time-1);
          self.startTimer();
        }else{
          self.set('isSubmitDisabled', true);
        }
      },1000);
    }
});
