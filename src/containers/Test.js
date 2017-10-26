import React, { Component } from 'react'
import axios from 'axios'
import { normalize, schema } from 'normalizr';

let originalData = {
  "id": "123",
  "author": {
    "id": "1",
    "name": "Paul"
  },
  "title": "My awesome blog post",
  "comments": [
    {
      "id": "324",
      "commenter": {
        "id": "2",
        "name": "Nicole"
      }
    }
  ]
}

// Define a users schema
const user = new schema.Entity('users');

// Define your comments schema
const comment = new schema.Entity('comments', {
  commenter: user
});

// Define your article
const article = new schema.Entity('articles', {
  author: user,
  comments: [ comment ]
});

const normalizedData = normalize(originalData, article);


console.log(normalizedData)

class Test extends Component {
  func = () => {
    axios.get('https://www.hazyzh.com/get_lastest_blog').then(data => {
      console.log(data)
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <h1 onClick={this.func}>testaaaaa</h1>
    )
  }
}


export default Test
