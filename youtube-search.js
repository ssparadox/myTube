/*
var myVariable;
myVariable = 'Kim';
myVariable = 'Park';
// alert(myVariable);

function sayHi() {
   console.log('Hello JS!');
}
sayHi();

function getSum(a, b) {
   return a + b;
}
const result = getSum('a', 'b');
console.log(result);

function isEnd(value, cb) {
   console.log(value);
   cb(value + ' now!!'); // excute cb func
}
isEnd('Take a break', function(data) {
   console.log(data + ', OK!');
});

var btn = document.querySelector('button');
btn.onclick = function() {
   alert('Ouch! Stop poking me!');
}
*/


$(function() {

   var apiKey = "AIzaSyBdTX1NIQp_4JNPyK66LHxfV1tV1S5DezM";
   var apiYoutube = "https://www.googleapis.com/youtube/v3/search";

   $('form').submit( function(ev) {
      ev.preventDefault(); // 전송을 막음
      
      var query = $('#query').val();

      search(query);
   })

   function search(query) {
      $.get(
         apiYoutube,
         {
            part: 'snippet',
            q: query,
            type: 'video',
            maxResults: 10,
            key: apiKey
         },
         function(data) { // 성공

            $('#results').empty()

            $.each(data.items, function(index, item) {
               var newItem = buildItem(item);
               
               $('#results').append(newItem)
            })
            
         }
      );
   }

   var buildItem = function(item) {
      var videoId = item.id.videoId;
      var thumbnail = item.snippet.thumbnails.default.url;
      var title = item.snippet.title;
      var description = item.snippet.description;
      
//      console.log('==========');
//      console.log(videoId, thumbnail, title, description);

      var newItem = `
         <li class="item">
               <a href="http://www.youtube.com/watch?v=${videoId}" target="_blank">
               <h3>${title}</h3>
               <div class="image-wrapper">
                  <img src="${thumbnail}">
               </div>
               <div class="description">
                  ${description}
               </div>
               </a>
         </li>
      `;

      return newItem;
   }


   /*
   var myObj = {
      "name": "Lee",
      "age": 30,
      "school": {
         "mid": "M",
         "high": "H"
      }
   };
   console.log(myObj['name'])
   console.log(myObj.age)
   console.log(myObj.school.high)
   */

})

