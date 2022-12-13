import React, { useState, useEffect } from "react";

type ReturnType<Type> = [Type, React.Dispatch<React.SetStateAction<Type>>];

export const useLocalStorage = <Type>(
  key: string,
  intialValue?: Type,
): ReturnType<Type> => {
  const [value, setValue] = useState<Type>(() => {
    if (!intialValue) return;

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : intialValue;
    } catch (err) {
      return intialValue;
    }
  });

  useEffect(() => {
    if (value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (err) {
        console.error(err);
      }
    }
  }, [value, key]);

  return [value, setValue];
};
