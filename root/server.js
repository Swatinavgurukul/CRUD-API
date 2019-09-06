
var express = require('express');
const jsonfile = require('jsonfile')
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())
var courses_dic = {}
var courses_data = [
  { id: 1, name: "swati" },
  { id: 2, name: "komal" },{id: 3, name: "shwata"},
  { id: 4, name: "Soni" }, { id: 5, name: "priya" },{id: 6, name: "monu"}
]

courses_dic["coursese_name"] = courses_data
app.use(express.json())


app.get('/hoo', (req, res) => {
  res.send('Hello Komal!');
});

app.get('/api', (req, res) => {
  res.send(courses_dic)
})


app.post('/api/courses', (req, res) => {

  jsonfile.readFile("Data.json", (err, data) => {
    if (err) {

      var course = {
        id: courses_dic.coursese_name.length + 1,
        name: req.body.name
      };
      courses_dic.coursese_name.push(course)
      res.send(courses_dic);
      console.log(courses_dic)
      jsonfile.writeFileSync('Data.json', JSON.stringify(courses_dic));
    } else {
      global.config = require("./Data.json");
      jsonfile.readFile("Data.json", (err, contents) => {
        if (err) {
          console.log("Config dota doesnot exist in the file.");
        } else {
          var fileData = JSON.parse(contents)
          var course = {
            id: fileData.coursese_name.length + 1,
            name: req.body.name
          };
          // console.log(fileData)
          fileData.coursese_name.push(course)
          console.log(fileData)
          res.send(fileData);
          jsonfile.writeFileSync('Data.json', JSON.stringify(fileData));

        }

      })
    }
  })
})

app.put('/api/courses/:id', function (request, response) {
  const contacts = require('./Data.json')
  // console.log(contacts)
  let contactId = request.params.id;
  // console.log(contactId)
  jsonfile.readFile("Data.json", (err, contents) => {
    if (err) {
      console.log("Config dota doesnot exist in the file.");
    } else {
      var fileData = JSON.parse(contents)
      var dd = fileData.coursese_name.length
      // console.log(dd)
      console.log(fileData)
      let contact = fileData.coursese_name.filter(contact => {
        return contact.id == contactId;
      })[0];
      // console.log(contact)
      const index = fileData.coursese_name.indexOf(contact);
      // console.log(index)
      let keys = Object.keys(request.body);
      // console.log(keys)
      keys.forEach(key => {
        contact[key] = request.body[key];
        // console.log(contact[key])
      });

      fileData.coursese_name[index] = contact;
      // console.log(contacts)
      // response.json({ message: `User ${contactId} updated.`});
      // fileData.coursese_name.push(contact)
      response.json(fileData.coursese_name[index]);
      jsonfile.writeFileSync('Data.json', JSON.stringify(fileData));

    }
  })
});

app.delete('/api/courses/:id', (request, response) => {
  const contacts = require('./Data.json')
  let contactId = request.params.id;

  jsonfile.readFile("Data.json", (err, contents) => {
    if (err) {
      console.log("Config dota doesnot exist in the file.");
    } else {
      var fileData = JSON.parse(contents)

      let contact = fileData.coursese_name.filter(contact => {
        return contact.id == contactId;
      })[0];
      console.log(contact)
      const index = fileData.coursese_name.indexOf(contact);
      console.log(index)
      fileData.coursese_name.splice(index, 1);

      response.json({ message: `User ${contactId} deleted.` });
      console.log(fileData)
      jsonfile.writeFileSync('Data.json', JSON.stringify(fileData));

    }
  })
  });
  app.listen(7000, function () {
    console.log("Started on PORT 7000");
  })