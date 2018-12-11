module.exports = function(req, res) {
  var formidable = require('formidable');
  var fs = require('fs');

  // parse a file upload
  var form = new formidable.IncomingForm(),
    files = [],
    fields = [],
    docs = [];

  form.keepExtensions = true;

  //tmp upload dir
  form.uploadDir = 'uploads/';

  form.on('field', function(field, value) {
    fields.push([field, value]);
  }).on('file', function(name, file) {
    files.push([name, file]);
    docs.push(file);
  }).on('end', function() {});

  form.parse(req, function(err, fields, files) {
    var file = files['file'];
    console.log(file);
    res.json({
      "code": "0",
      "desc": "成功",
      "data": {
        "fileName": file['name'],
        "url": `/${file['path']}`
      }
    });
  });
}