import { Store } from "pullstate";
import { auth } from "../firebase";

export const redataStore = new Store({
  data: [],
});


export const userStore = new Store({
  user: false,
});

auth.onAuthStateChanged((user) => {
  userStore.update((s) => {
    console.log("auth", user);
    if (user) {
      if (user.email == "rugved@cbkm.in" || user.email == "shriya@cbkm.in"|| user.email == "sachin@cbkm.in"||user.email == "sanhita@cbkm.in")
        s.user = user;
      else auth.signOut();
    } else s.user = user;
  });
});
