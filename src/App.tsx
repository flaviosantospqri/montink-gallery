// App.tsx
import React, { useEffect } from 'react';
import Api from './service/api';
import useProductStore from './store/product';
import ImageGallery from './components/imageGallery';
import InfoProduct from './components/infoProduct';
import Delivery from './components/delivery';

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
    <div className="min-h-screen w-full flex items-center justify-center max-w-[1100px] mx-auto p-10">
      <div className="flex flex-col md:flex-row gap-10 w-full items-stretch">
        <div className="w-full md:flex-1 md:min-w-[400px] md:max-w-[500px] flex-shrink-0">
          <ImageGallery />
        </div>
        <div className="w-full md:flex-1 md:min-w-[400px] md:max-w-[500px] flex flex-col gap-5">
          <InfoProduct />
          <Delivery />
        </div>
      </div>
    </div>

  );
}

export default App;