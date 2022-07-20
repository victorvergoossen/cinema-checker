import * as React from 'react';
import CurrentCinema from './currentCinema';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Picker } from '@react-native-community/picker';

function App() {
  const [currentCinema, setCurrentCinema] = useState(null);
  const [showCinema, setShowCinema] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const cinemas = { // Enum matching ID to place from the RSS feed
    Echt: 45,
    Deventer: 21,
    Breda: 22,
    Brielle: 23,
  };

  useEffect(() => {
    setCurrentCinema(cinemas.Echt);
  }, []);

  return (
    <SafeAreaView>
      <CurrentCinema
        cinema={currentCinema}
        visibility={showCinema}
        setVisibility={setShowCinema}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />

      <Picker
        selectedValue={currentCinema}
        style={{ justifyContent: 'flex-end', height: '100%', width: '100%' }}
        onValueChange={(itemValue, itemIndex) => {
          setShowCinema(true);
          setIsLoading(true);
          setCurrentCinema(itemValue);
        }}
      >
        {Object.keys(cinemas).map((cinema, i) => (
          <Picker.Item
            key={`picker_${i}`}
            label={cinema}
            value={cinemas[cinema]}
          />
        ))}
      </Picker>
    </SafeAreaView>
  );
}

export default App;
