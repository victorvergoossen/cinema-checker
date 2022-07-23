import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface IUseGetCinemaData {
  cinema: number;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const useGetCinemaData = ({
  cinema,
  setIsLoading,
}: IUseGetCinemaData) => {
  const [currentData, setCurrentData] = useState<any>(null);

  const parseString = require('react-native-xml2js')?.parseString;

  useEffect(() => {
    const findAllCinemas = async () => {
      try {
        const text = await fetch(`https://www.biosagenda.nl/rss-films-in-${cinema}.xml`).then((response) => response.text());
        if (text) {
          parseString?.(text, (_err: unknown, result: any) => {
            setIsLoading(false);
            setCurrentData(result);
          });
        }
      } catch (error) {
        console.error('Error fetching', error);
      }
    }

    findAllCinemas();
  }, [cinema]);

  return currentData;
};
