export const getVotes = (voteData) => {
  return (
    fetch("http://localhost:3000/poll")
      //.then((res) => res.text())
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        const votes = data.votes;
        const totalVotes = votes.length;
        const votesCounts = votes.reduce(
          (acc, vote) => (
            (acc[vote.restaurant] =
              (acc[vote.restaurant] || 0) + parseInt(vote.points)),
            acc
          ),
          {}
        );
      })
  );
};

//for inside view event event listener
export const makeChart = (voteData) => {
  const data = voteData;
  fetch("http://localhost:3000/poll", {
    method: "POST",
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    //.then((res) => res.text())
    .then((res) => res.json())
    //.then((data) => console.log(data))
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
  //console.log(data);
  //e.preventDefault();
};
