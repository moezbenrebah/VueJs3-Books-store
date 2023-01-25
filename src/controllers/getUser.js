import { ref } from "vue";
import { authDB } from "../firebase/firebaseConfig";

const getUser = () => {
  // return user || null
  const user = ref(authDB.currentUser);

  authDB.onAuthStateChanged((userObject) => {
    if (userObject) {
      console.log("User is changed, the current user is:", userObject);
      user.value = userObject;
    } else {
      console.log("no current user signed in!");
    }
  });

  return { user };
};

export default getUser;
