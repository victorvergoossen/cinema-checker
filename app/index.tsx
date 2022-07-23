import * as React from 'react';
import CurrentCinema from './current-cinema';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { ItemValue } from '@react-native-community/picker/typings/Picker';
import { Cinemas } from './data/cinemas';


function App() {
  const [currentCinema, setCurrentCinema] = useState<number>(1);
  const [showCinema, setShowCinema] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setCurrentCinema(Cinemas.Echt);
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
        onValueChange={(itemValue: ItemValue) => {
          setShowCinema(true);
          setIsLoading(true);
          setCurrentCinema(itemValue as number);
        }}
      >
        {Cinemas && Object.keys(Cinemas)?.map((cinema: string) => (
          <Picker.Item
            key={`picker_${cinema}`}
            label={cinema}
            value={Cinemas[cinema]}
          />
        ))}
      </Picker>
    </SafeAreaView>
  );
}

export default App;
