const fs = require('fs');
const path = require('path');
const dateformat = require('dateformat');
const child_process = require('child_process');
const {publicDir} = require('../constants/directory.constants.js');
const NUM = 12

module.exports = {
  getHistory: function () {
    return new Promise(resolve => {
      console.log(`output image file history`);

      image_list = []
      img_uri = 'uploads/vr_img';
      img_dir = path.join(publicDir, img_uri);
      tmp_uri = 'uploads/list';
      tmp_dir = path.join(publicDir, tmp_uri);

      const files = fs.readdirSync(img_dir);
      var files2 = files.map(function(file){ 
        var fullPath = path.join(img_dir, file);
        var stats = fs.statSync(fullPath);
        return {
            name: file,
            time: stats.mtime,
        }
      });

      files2.sort((a, b) => a.time>b.time ? -1:1);
      const limit = files2.length<NUM ? files2.length : NUM;

      child_process.execSync('rm -rf '+tmp_dir);
      fs.mkdirSync(tmp_dir);

      for(var i=limit-1; i>=0; i--){
        const file_name = files2[i].name;
        const datetime = 
          file_name.substr(8,2) +':'+
          file_name.substr(10,2) +':'+
          file_name.substr(12,2);

        const copy_from = path.join(img_dir, file_name);
        const copy_to = path.join(tmp_dir, file_name);
        fs.copyFileSync(copy_from, copy_to);

        image_list.push({
          name: file_name,
          url: path.join(tmp_uri, file_name),
          time: datetime
        });
      }

      resolve({image_list: image_list});
    });
  },
};
