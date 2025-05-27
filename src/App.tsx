// App.tsx
import React, { useEffect } from 'react';
import Api from './service/api';
import useProductStore from './store/product';
import ImageGallery from './components/imageGallery';
import InfoProduct from './components/infoProduct';

const STORAGE_KEY = 'productUserSelections';
const EXPIRATION_MINUTES = 15;

function App() {
  const {
    id,
    setProduto,
  } = useProductStore();

  const saveUserSelections = (data: Partial<ReturnType<typeof useProductStore.getState>>) => {
    const payload = {
      timestamp: Date.now(),
      data,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  };


  const loadUserSelections = (): Partial<ReturnType<typeof useProductStore.getState>> | null => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;

      const { timestamp, data } = JSON.parse(raw);

      const expired = Date.now() - timestamp > EXPIRATION_MINUTES * 60 * 1000;
      if (expired) {
        console.log('User selections expired, clearing localStorage');
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return data;
    } catch (error) {
      console.error('Error loading user selections', error);
      return null;
    }
  };

  useEffect(() => {
    if (id === 0) {
      const productFromApi = Api.getProductMock();
      const userSelections = loadUserSelections();

      setProduto(productFromApi);

      if (userSelections) {
        if (userSelections.selectedSize) {
          useProductStore.getState().setSelectedSize(userSelections.selectedSize);
        }
        if (userSelections.selectedColor) {
          useProductStore.getState().setSelectedColor(userSelections.selectedColor);
        }
        if (userSelections.mainImage) {
          useProductStore.getState().setMainImage(userSelections.mainImage);
        }
      }
    }
  }, [id, setProduto]);
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const unsub = useProductStore.subscribe((state) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const selections = {
          selectedSize: state.selectedSize,
          selectedColor: state.selectedColor,
          mainImage: state.mainImage,
        };
        saveUserSelections(selections);
      }, 500);
    });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      unsub();
    };
  }, []);


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto max-w-4xl px-6 py-4 flex flex-col md:flex-row gap-10 items-start">
        <ImageGallery />
        <div className="flex flex-col gap-6 w-full">
          <InfoProduct />
        </div>
      </div>
    </div>
  );
}

export default App;