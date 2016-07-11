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
        "content": "<h2>ES6 Zombie Attack</h2><h4>Introduction to ES6 basic concepts</h4><br /><img src=\"https://media.giphy.com/media/1FFICJRp8QQb6/giphy.gif\"/>"
      },
      {
        "id": "123",
        "seqNo": 2,
        "type": "info",
        "content": "<h2>Zombie Attack Agenda ?</h2> <p> <ul> <li class=\"fragment\">let, const & block scope</li><li class=\"fragment\">Arrow Functions</li><li class=\"fragment\">Template Literals</li><li class=\"fragment\">Default Function Parameters</li><li class=\"fragment\">Rest and Spread</li></ul> </p>"
      },
      {
        "id": "124",
        "seqNo": 3,
        "type": "info",
        "isCurrentQs": false,
        "content": "<p><b>'let'</b> allows you to declare variables that are limited in scope to the block, statement, or expression on which it is used.</p></br><p><b>'Constants'</b> are block-scoped, much like variables defined using the let statement. The value of a constant cannot change through re-assignment, and it can't be redeclared.</p>"
      },
      {
        "id": "125",
        "seqNo": 4,
        "type": "info",
        "isCurrentQs": false,
        "content": "<h3>Zombie Time</h3><p>You will be fired up with questions. Choose the answer within 45 seconds. <br><br><br> Ninja's, Let's get rolling!!!. </p>"
      },
      {
        "id": "126",
        "seqNo": 5,
        "type": "qs",
        "isCurrentQs": false,
        "contentTypeScript": true,
        "content": "<h4>Zombie Time</h4><pre><code>'use strict'; \n console.log(zombie); \n var zombie = 'visible';</code></pre>",
        "qs": {
          "type": "single",
          "title": "What will logger print ?",
          "options": [
            {
              "id": "1",
              "value": "visible"
            },
            {
              "id": "2",
              "value": "undefined"
            },
            {
              "id": "3",
              "value": "''"
            },
            {
              "id": "4",
              "value": "Reference Error: zombie not defined"
            }
          ],
          "answer": [
            "2"
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
      },
      {
        "id": "127",
        "seqNo": 6,
        "type": "qs",
        "isCurrentQs": false,
        "contentTypeScript": true,
        "content": "<h4>Zombie Time</h4><pre><code>'use strict'; \n console.log(zombie); \n let zombie = 'visible';</code></pre>",
        "qs": {
          "type": "single",
          "title": "What will logger print ?",
          "options": [
            {
              "id": "1",
              "value": "visible"
            },
            {
              "id": "2",
              "value": "undefined"
            },
            {
              "id": "3",
              "value": "''"
            },
            {
              "id": "4",
              "value": "Reference Error: zombie not defined"
            }
          ],
          "answer": [
            "2"
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
      },
      {
        "id": "128",
        "seqNo": 7,
        "type": "info",
        "content": "<img src='https://media.giphy.com/media/WMgXdYifGXKg/giphy.gif' />"
      },
      {
        "id": "129",
        "seqNo": 8,
        "type": "qs",
        "isCurrentQs": false,
        "contentTypeScript": true,
        "content": "<h4>Zombie Time</h4><pre><code>'use strict'; \n let zombie = 'visible'; \n console.log(zombie);</code></pre>",
        "qs": {
          "type": "single",
          "title": "What will logger print ?",
          "options": [
            {
              "id": "1",
              "value": "visible"
            },
            {
              "id": "2",
              "value": "undefined"
            },
            {
              "id": "3",
              "value": "''"
            },
            {
              "id": "4",
              "value": "Reference Error: zombie not defined"
            }
          ],
          "answer": [
            "2"
          ],
          "chart": "pie",
          "responses": [
            {
              "id": "334",
              "name": "sett",
              "answer": [
                "1"
              ]
            }
          ],
          "timeout": 20,
          "isCompleted": true
        }
      },
      {
        "id": "130",
        "seqNo": 9,
        "type": "info",
        "content": "<img src='https://media.giphy.com/media/xTiTnyijMsXgn6Bzzy/giphy.gif' />"
      },
      {
        "id": "131",
        "seqNo": 10,
        "type": "qs",
        "isCurrentQs": false,
        "contentTypeScript": true,
        "content": "<h4>Zombie Time</h4><pre><code>'use strict'; \n for (var i = 0; i < 5; i++) { \n  window.setTimeout(function () { \n    console.log(i); \n  }, 1000); \n } </code></pre>",
        "qs": {
          "type": "single",
          "title": "What will logger print ?",
          "options": [
            {
              "id": "1",
              "value": "5, 5, 5, 5, 5"
            },
            {
              "id": "2",
              "value": "0, 1, 2, 3, 4"
            },
            {
              "id": "3",
              "value": "undefined, undefined, undefined, undefined, undefined"
            },
            {
              "id": "4",
              "value": "4, 4, 4, 4, 4"
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
                "1"
              ]
            }
          ],
          "timeout": 20,
          "isCompleted": true
        }
      },
      {
        "id": "132",
        "seqNo": 11,
        "type": "qs",
        "isCurrentQs": false,
        "contentTypeScript": true,
        "content": "<h4>Zombie Time</h4><pre><code>'use strict'; \n for (let i = 0; i < 5; i++) { \n  window.setTimeout(function () { \n    console.log(i); \n  }, 1000); \n } </code></pre>",
        "qs": {
          "type": "single",
          "title": "What will logger print ?",
          "options": [
            {
              "id": "1",
              "value": "5, 5, 5, 5, 5"
            },
            {
              "id": "2",
              "value": "0, 1, 2, 3, 4"
            },
            {
              "id": "3",
              "value": "undefined, undefined, undefined, undefined, undefined"
            },
            {
              "id": "4",
              "value": "4, 4, 4, 4, 4"
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
                "1"
              ]
            }
          ],
          "timeout": 20,
          "isCompleted": true
        }
      },
      {
        "id": "133",
        "seqNo": 11,
        "type": "qs",
        "isCurrentQs": false,
        "contentTypeScript": true,
        "content": "<h4>Zombie Time</h4><pre><code>'use strict'; \n //Set Zombie Health \n const ZOMBIE_FULL_HEALTH = 100; \n console.log(ZOMBIE_FULL_HEALTH); \n //Set Human Health \n const HUMAN_FULL_HEALTH = 100; \n HUMAN_FULL_HEALTH = 50; \n console.log(HUMAN_FULL_HEALTH);</code></pre>",
        "qs": {
          "type": "single",
          "title": "What will logger print ?",
          "options": [
            {
              "id": "1",
              "value": "100, 50"
            },
            {
              "id": "2",
              "value": "100, Type Error: Assignment to constant variable"
            },
            {
              "id": "3",
              "value": "100, undefined"
            },
            {
              "id": "4",
              "value": "100, null"
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
                "1"
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
