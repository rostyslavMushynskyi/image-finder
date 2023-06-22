import { useState, useEffect } from "react";
import axios from "axios";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SeacrhBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import Modal from "./components/Modal/Modal";
import Button from "./components/LoadMore/LoadMore";

function App() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [activeImage, setActiveImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (query === "") {
      return;
    }

    setLoading(true);

    axios
      .get("https://pixabay.com/api/", {
        params: {
          q: query,
          page: currentPage,
          key: "33742336-08c8af999ed52fcc1bc7ad6ca",
          image_type: "photo",
          orientation: "horizontal",
          per_page: 12,
        },
      })
      .then((res) => {
        setImages((prevImages) => [...prevImages, ...res.data.hits]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, currentPage]);

  useEffect(() => {
    scrollToBottom();
  }, [images, currentPage]);

  function search(newQuery) {
    setImages([]);
    setCurrentPage(1);
    setQuery(newQuery);
  }

  function openModal(image) {
    setActiveImage(image);
  }

  function closeModal() {
    setActiveImage(null);
  }

  function loadMore() {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  function scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }

  return (
    <div className="App">
      {activeImage && <Modal activeImage={activeImage} onClose={closeModal} />}
      <SeacrhBar onSearch={search} />
      <ImageGallery images={images} onOpen={openModal} />
      {images.length > 0 && <Button onLoadMore={loadMore} />}
      {loading && <Loader />}
    </div>
  );
}
export default App;
