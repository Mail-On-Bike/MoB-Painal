export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user_mob_painal"));

  if (user && user.accessToken) {
    return {
      "Content-type": "application/json",
      "x-access-token": user.accessToken,
    };
  } else {
    return {};
  }
}
