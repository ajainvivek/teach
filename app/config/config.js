import Ember from 'ember';

export default Ember.Object.create({
  data: {
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
        "id": "122",
        "seqNo": 1,
        "type": "info",
        "isCurrentQs": false,
        "content": "<h2>ES6 Zombie Attack</h2><h4>Introduction to ES6 basic concepts</h4><br />"
      },
      {
        "id": "123",
        "seqNo": 2,
        "type": "qs",
        "isCurrentQs": false,
        "content": "<h2>javascript! why ?</h2> <p> <ul> <li class=\"fragment\">easy to understand</li><li class=\"fragment\">easy to learn</li><li class=\"fragment\">easy to re-use</li><li class=\"fragment\">easy to modify</li><li class=\"fragment\">easy to use with max/msp</li><li class=\"fragment\">easy</li><li class=\"fragment\">easy</li><li class=\"fragment\">zZzzzZZ</li><li class=\"fragment\">zZzzZzZZz...</li></ul> </p>",
        "qs": {
          "type": "single",
          "title": "A sample Single selection question",
          "options": [
            {
              "id": "1",
              "value": "working"
            },
            {
              "id": "2",
              "value": "Not working"
            }
          ],
          "answer": [
            "1"
          ],
          "chart": "pie",
          "responses": [
            {
              "id": "334",
              "name": "sett",
              "answer": [
                "1",
                "2"
              ]
            }
          ],
          "timeout": 10,
          "isCompleted": true
        }
      },
      {
        "id": "124",
        "seqNo": 3,
        "type": "info",
        "isCurrentQs": false,
        "contentTypeScript": true,
        "content": "### variables ( aka vars ): stores values \n <pre> <code> var my_variable=\"my awesome value\"; \n var my_number=1; \n var my_floating_number=1.23; \n var PI=3.14; </pre> </code>"
      },
      {
        "id": "125",
        "seqNo": 4,
        "type": "qs",
        "isCurrentQs": false,
        "content": "<pre><code contenteditable>var start_time;</code></pre>",
        "qs": {
          "type": "multi",
          "title": "A sample multi selection question",
          "options": [
            {
              "id": "1",
              "value": "It is working"
            },
            {
              "id": "2",
              "value": "It is not working"
            }
          ],
          "answer": [
            "1"
          ],
          "chart": "pie",
          "responses": [
            {
              "id": "334",
              "name": "sett",
              "answer": [
                "1",
                "2"
              ]
            }
          ],
          "timeout": 20,
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
  }

});
