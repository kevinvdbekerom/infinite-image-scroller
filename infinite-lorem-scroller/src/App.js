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

  console.log("ENV:", process.env);
  const API_HOST = process.env.REACT_APP_API_HOST;

  const fetchImages = async () => {
    setLoading(true)
    if (fetchedPages.current.has(page)) return
    fetchedPages.current.add(page)
      try {
        const url = `${API_HOST}/albums/italy/images`
        const res = await axios.get(url);
        const data = res.data
        if (res.data.images.length === 0) {
          setHasMore(false)
        } else {
           setImages(prev => [...prev, ...data.images.map((image) => 
            ({
              ...image,
              downloadUrl: `${API_HOST}/proxy/${image.proxyId}`
            })
           )])
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
      {/* <ImageCard image={{download_url: "https://infinite-image-scroller.s3.eu-central-1.amazonaws.com/albums/italy/IMG20250614111345.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDGV1LWNlbnRyYWwtMSJHMEUCIBj88cApW%2FfuP9gvYlb41BKNMw2%2FMrCb%2BrSD2WgsK1dpAiEAxzZqpPBhprQvJdNTp4itsL8grEXQuZmf%2BNChtx2mnpgqzgMIEBAAGgw4OTE2MTI1NzkyNjYiDGleqnrw7J1AsV7DAyqrA6xBUpeIrfiZBFVT4VQJihpMdXFzCeWPUPGW21X9YYIbuiHfxuNUUjwjn0BAE%2BFbRaAmV%2BGRGpzleqjJIyi7%2Brg4DRfKKEE6wkiuUqiosgIXIeMiXfaSQ7VOjPMLs7cUwzYlU9qBTPLSnKTewfLZT3a%2FYTYjUcZOBof1DU2gD36Y8qQI4Ky%2F%2FkLoLb%2BG6ALcP%2FKA3TRZ8ftd%2B09kczMz6XmU6F4YQbo9Xc3AVM6Fm9HPcpyGxDR8hOrxcSoWpXCnUqwfZCiXGAA7AlsPGNTiFVuhUcxCvYoxWLhRUMZztLygQZt56JDl3vB1Rn6kCG00bhJjIxS0n4Z%2FW%2Fzrzxg64EfY5QMSYmDKIxvFQbdwAR6Al2pMXte6h1kfn5lhbbB1y0n%2BYC%2FGyb%2Ff7wAGD6ZN%2F6NjAY%2Fqx%2F2pcCK66Fxxcr%2BinQatmsVDZydDqr9eLhK2hviqZLYio5unh%2B8bFaGJdgNRSKtWYdL2Gxkywv5pajwTmbchn%2FFcua%2FE0pF19v8oNvi8LNeeQvmjsHlLf5yAbrYMaGDEn2rSRmMxoV7LWuF8cUrz%2Bt%2BRwxiJAe8wvLPNwwY63gK8Xz938Wx9evqProVrTNPnZSlcNspJ7hLqo8%2F3qvPqdX0eotd4LorgeqMLs%2B0ppL5Zl7uwb25YmhVFo9HyVzkkulq3nrVAC7B%2BQ%2Ff7QBzAyTZ%2BlNAixN2jDW9s9hEQBnYAG5RHR4Ciy8UEoDbBztyDDQclIzFn1FsY9tIKamVcW3hPlLFGanp4RE5wavb7JqEecSiBk6kr8vHPIHMo3Xj1CfG%2FnZU1h7r7g8zEwVIV%2FghT%2Boq7E8QpPOnh5tXk37KyWfhNfg9Fy7ntHC43r8o7lo%2F%2FnS9YbFT2JUIPIRTC0UJuMXrTNiVgEG9YD1YZelfzLLRvZ2r9qNzaZTvThKIKX7ZmYpoHVgDd26EZ7NOBawtV4GVTcIFdvGvRIvkRM0PITuubifF47WT96qeGw3vGvt8p%2BUULWlUhKr0zYdC7j0g3AOR32cVoxPPWZraol873%2B3KhphIX8YFwFdH81Q%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA47GCAIXBMMCEGZHM%2F20250713%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20250713T071258Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=193f5bec2a26043d57da788dbf092ad76eb99d0966507bb9b7d65ddc6633cea5",
      author: "Kevin van den Bekerom"
      }} /> */}
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
