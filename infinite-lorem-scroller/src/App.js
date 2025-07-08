import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ImageList from './components/ImageList';
import LoadingSpinner from './components/LoadingSpinner';

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true)
  const fetchedPages = useRef(new Set())


  const fetchImages = async () => {
    setLoading(true)
    if (fetchedPages.current.has(page)) return
    fetchedPages.current.add(page)
      try {
        const url = `https://picsum.photos/v2/list?page=${page}&limit=10`
        const res = await axios.get(url);
        if (res.data.length === 0) {
          setHasMore(false)
        } else {
           setImages(prev => [...prev, ...res.data])
        }
       ;
      } catch (err) {
        console.error('Error fetching images:', err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchImages();
  }, [page]);

  const handleScroll = () => {
    if (loading || !hasMore) return
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
      setLoading(true)
      setPage((p) => p + 1)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [loading, hasMore])


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="max-w-4xl w-full">
        <ImageList images={images} />
        {loading && <LoadingSpinner />}
        {!hasMore && (
          <div className="text-center text-gray-500 p-4">
            No more images to load
          </div>
        )}
      </div>
    </div>
  );
}
