async function createRoom(match) {
  return await fetch("https://api.daily.co/v1/rooms", {
    headers: {
      "Content-Type": "application/json",
      authorization:
        "Bearer 38b978f11062e181895d8369b3a8b2b21f486a0e49a0f6fb119954f797b6a3e9",
    },
    method: "POST",
  })
    .then((r) => r.json())
    .then((data) => {
      console.log(data)
      match.roomName = data.name
      return { url: `https://int4-2020firebaseapp.daily.co/${data.name}`};
    });
}

async function deleteRoom(roomName) {
  return await fetch(`https://api.daily.co/v1/rooms/${roomName}`, {
    headers: {
      "Content-Type": "application/json",
      authorization:
        "Bearer 38b978f11062e181895d8369b3a8b2b21f486a0e49a0f6fb119954f797b6a3e9",
    },
    method: "DELETE",
  })
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
      // return { url: `https://int4-2020firebaseapp.daily.co/${data.name}` };
    });
}



export default { createRoom, deleteRoom };