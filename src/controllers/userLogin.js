import { ref } from "vue";
import { authDB } from "../firebase/firebaseConfig";

const isLoading = ref(false);
const error = ref(null);

const userLogin = () => {
  const login = async (email, password) => {
    isLoading.value = true;
    // reset the error value at the start of every request
    error.value = null;
    try {
      const response = await authDB.signInWithEmailAndPassword(email, password);
      if (!response) {
        throw new Error("something went wrong");
      }
      isLoading.value = false;
      error.value = null;
      // log the user object
      console.log(response);
      return response;
    } catch (err) {
      console.log(err.value);
      isLoading.value = false;
      error.value = "Wrong Email or Password";
    }
  };

  return { login, error, isLoading };
};

export default userLogin;
