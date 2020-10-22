const fs = require('fs');
const path = require('path');
const dateformat = require('dateformat');
const {publicDir} = require('../constants/directory.constants.js');

module.exports = {
  getImgUrl: function () {
    return new Promise(resolve => {
      console.log(`output latest image filename`);
      img_uri = 'uploads/vr_img';
      img_dir = path.join(publicDir, img_uri);

      const files = fs.readdirSync(img_dir);
      var files2 = files.map(function(file){ 
        var fullPath = path.join(img_dir, file);
        var stats = fs.statSync(fullPath);
        return {
            name: file,
            time: stats.mtime,
        }
      });

      if(files2.length==0){
          resolve({url: "", date: ""});
      }

      files2.sort((a, b) => a.time>b.time ? -1:1);
      const file_name = files2[0].name;


      const datetime = 
        file_name.substr(0,4) +'/'+
        file_name.substr(4,2) +'/'+
        file_name.substr(6,2) +' '+
        file_name.substr(8,2) +':'+
        file_name.substr(10,2) +':'+
        file_name.substr(12,2);

      resolve({url: path.join(img_uri, file_name), date: datetime});
    });
  },
};
