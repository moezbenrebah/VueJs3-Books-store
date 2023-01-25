import { ref } from "vue";
import { authDB } from "../firebase/firebaseConfig";

const isLoading = ref(false);
const error = ref(null);

const userSignUp = () => {
  const signup = async (email, password, displayName) => {
    isLoading.value = true;
    // reset the error value at the start of every request
    error.value = null;
    try {
      const response = await authDB.createUserWithEmailAndPassword(
        email,
        password
      );
      if (!response) {
        throw new Error("Something went wrong with the SignUp");
      }
      console.log(response.user);
      await response.user.updateProfile({ displayName });
      isLoading.value = false;
      error.value = null;

      // For testing
      console.log(response.user);

      return response;
    } catch (err) {
      console.log(err.message);
      isLoading.value = false;
      error.value = err.message;
    }
  };
  return { signup, error, isLoading };
};

export default userSignUp;
