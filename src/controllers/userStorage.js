import { projectStorage } from "@/firebase/firebaseConfig";
import { ref } from "vue";
import getUser from "./getUser";

const { user } = getUser();

const getStoredBook = () => {
  const bookCoverPath = ref(null);
  const bookPath = ref(null);
  const url1 = ref(null);
  const url2 = ref(null);
  const error = ref(null);

  // handle upload book and cover book functionality to firebase storage
  const handleUploadBook = async (bookCover, book) => {
    // create a book cover path in the firebase storage
    bookCoverPath.value = `covers/${user.value.uid}/${bookCover.name}`;
    // create a book path in the firebase storage
    bookPath.value = `book/${user.value.uid}/${book.name}`;

    // Create a bookCover and book path from firebase
    const bookCoverStorage = projectStorage.ref(bookCoverPath.value);
    const bookPathStorage = projectStorage.ref(bookPath.value);

    try {
      const response1 = await bookCoverStorage.put(bookCover);
      const response2 = await bookPathStorage.put(book);
      url1.value = await response1.ref.getDownloadURL();
      // store the download book url from the firebase
      url2.value = await response2.ref.getDownloadURL();
      console.log(response2);
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  // handle delete the book and the cover book
  const deleteBookAndCover = async (bookPath, coverPath) => {
    const bookPathRef = projectStorage.ref(bookPath);
    const coverPathRef = projectStorage.ref(coverPath);

    try {
      await bookPathRef.delete();
      await coverPathRef.delete();
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  return {
    bookCoverPath,
    bookPath,
    url1,
    url2,
    error,
    handleUploadBook,
    deleteBookAndCover,
  };
};

export default getStoredBook;
