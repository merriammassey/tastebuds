const form = document.getElementById("vote-form");

//Form submit event
form.addEventListener("submit", (e) => {
  const choice = document.querySelector("input[name=restaurant]:checked").value;
  const data = { restaurant: choice };

  fetch("http://localhost:3000/poll", {
    method: "post",
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

  e.preventDefault();
});

//v3
fetch("http://localhost:3000/poll")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const votes = data.votes;
    //for chart text
    const totalVotes = votes.length;
    //count votes points - take in accumulator and current value
    const votesCounts = votes.reduce(
      (acc, vote) => (
        (acc[vote.restaurant] =
          (acc[vote.restaurant] || 0) + parseInt(vote.points)),
        acc
      ),
      {}
    );

    //chart
    let dataPoints = [
      { label: "maskadores", y: votesCounts.maskadores },
      { label: "munichgyro", y: votesCounts.munichgyro },
      { label: "starbucks", y: votesCounts.starbucks },
      { label: "none", y: votesCounts.none },
    ];

    const chartContainer = document.querySelector("#chartContainer");

    if (chartContainer) {
      const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "theme1",
        title: {
          //will show number of votes from database
          text: `Total Votes ${totalVotes}`,
        },
        data: [
          {
            type: "column",
            dataPoints: dataPoints,
          },
        ],
      });
      chart.render();

      // Enable pusher logging - don't include this in production
      Pusher.logToConsole = true;

      var pusher = new Pusher("3cb02dbd0c542bff3bd5", {
        cluster: "us3",
      });

      var channel = pusher.subscribe("tastebuds");
      channel.bind("tastebudsvote", function (data) {
        dataPoints = dataPoints.map((x) => {
          if (x.label == data.restaurant) {
            x.y += data.points;
            return x;
          } else {
            return x;
          }
        });
        chart.render();
      });
    }
  });
