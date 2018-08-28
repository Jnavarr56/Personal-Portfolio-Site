particlesJS("particles-js", {"particles":{"number":{"value":10,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"polygon","stroke":{"width":0,"color":"#000"},"polygon":{"nb_sides":6},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.15,"random":true,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":40.08530152163807,"random":true,"anim":{"enable":true,"speed":10,"size_min":40,"sync":false}},"line_linked":{"enable":false,"distance":200,"color":"#ffffff","opacity":1,"width":2},"move":{"enable":true,"speed":8,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":false,"mode":"grab"},"onclick":{"enable":false,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":false});
let returnTime = (timeString) => {
    let repoDate = new Date(timeString);
    let mins =  repoDate.getMinutes();
    let month = repoDate.getMonth()
    let year = repoDate.getFullYear();
    let day = repoDate.getDay();
    let dayMo = repoDate.getDate();
    let weekDays = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"];
    let time = "am";
    let hours = repoDate.getHours();
    if (hours === 0) {
        hours = 12;
    }
    else if (hours > 12) {
        hours -= 12;
        time = "pm";
    }
    return `${weekDays[day]} ${months[month]} ${dayMo} ${hours}:${mins} ${time}`;
}
axios.get(`https://api.github.com/users/jnavarr56/repos`)
  .then((response) => {
    console.log(response);
     //<---SORT ARRAY OF REPO OBJECTS BY PROPERTY .updated_at
    let repos = response.data.sort((a,b)=>{return (new Date(b.updated_at)) - (new Date(a.updated_at))})
    console.log(repos);
    let reposIndex = 0;
    setInterval(()=>{
        //LOOP THROUGH EVERY 3 SECONDS
        document.getElementById("mostRecentRepo").innerText = repos[reposIndex].name;
        document.getElementById("mostRecentRepoLink").innerText = "View This Repo";
        document.getElementById("mostRecentRepoLink").href = repos[reposIndex].html_url;
        document.getElementById("mostRecentRepoUpdated").innerText = returnTime(repos[reposIndex].updated_at);
        reposIndex++;
        if (reposIndex === 3) {reposIndex = 0};
    }, 3000);
  })
  .catch((error) => {
    console.log(error);
  });

