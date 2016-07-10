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
        "content": "This is a info type slide 1"
      },
      {
        "id": "123",
        "seqNo": 2,
        "type": "qs",
        "isCurrentQs": false,
        "content": "This is Question type slide 1",
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
        "content": "This is a info type slide 2"
      },
      {
        "id": "125",
        "seqNo": 4,
        "type": "qs",
        "isCurrentQs": false,
        "content": "This is Question type slide 2",
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
