var data = null;
let apiData = null;
let url = "";

async function createRoom() {
  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
      apiData = JSON.parse(this.responseText);
      console.log(apiData);
      url = apiData.url;
      console.log(url);
      return { xhr, url, apiData };
    }
  });

  xhr.open("POST", "https://api.daily.co/v1/rooms");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader(
    "authorization",
    "Bearer 38b978f11062e181895d8369b3a8b2b21f486a0e49a0f6fb119954f797b6a3e9"
  );

  xhr.send(data);
  
  // await xhr;

  // console.log(url);
  // return { url: `${url}` };

  // Comment out the above and uncomment the below, using your own URL
  // return {url: `https://int4-2020firebaseapp.daily.co/hello`};
}

export default { createRoom };
