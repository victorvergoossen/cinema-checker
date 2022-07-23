import * as React from 'react';
import {
  ActivityIndicator, Dimensions, View,
  Text, ScrollView, Image, TouchableOpacity
} from 'react-native';
import { useGetCinemaData } from './hooks/use-get-cinema-data';

interface ICurrentCinema {
  cinema: number,
  visibility: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function CurrentCinema({
  cinema = 1,
  visibility,
  setVisibility,
  isLoading,
  setIsLoading,
}: ICurrentCinema) {
  const scrollSize = Dimensions.get('window').height - 150;

  const currentData = useGetCinemaData({ cinema, setIsLoading });

  if (!visibility) return null;

  if (isLoading) {
    return (
      <View>
        <Text style={{ fontSize: 24, marginLeft: 'auto', marginRight: 'auto', marginTop: 200, }}>Actuele films laden...</Text>
        <ActivityIndicator size="large" style={{ marginTop: 25 }} />
      </View>
    );
  }

  return (
    <View>
      <View
        style={{
          paddingTop: 15,
          paddingBottom: 15,
          paddingRight: 25,
          paddingLeft: 25,
          backgroundColor: '#ff344c'
        }}
      >
        <Text
          style={{
            color: '#ffffff',
            fontWeight: "800",
            fontSize: 30,
          }}
        >
          Filmaanbod in
        </Text>
        <Text
          style={{
            marginTop: 5,
            color: '#ffffff',
            fontWeight: "400",
            fontSize: 24,
          }}
        >
          {/* Changing title for demonstrational purposes, because ofcourse, this is not my data. */}
          {currentData?.rss?.channel?.[0]?.title?.[0]
            ?.replace("Biosagenda.nl", "")
            ?.replace('Films in ', '')
            ?.replace(':', '')
          }
        </Text>

        <TouchableOpacity
          style={{ position: 'absolute', right: 20, top: 35, height: 32, width: 32 }}
          onPress={() => {
            setVisibility(false);
          }}
        >
          <Image
            style={{ width: '100%', height: '100%' }}
            source={require('./images/icon.png')}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        persistentScrollbar={true}
        style={{
          backgroundColor: '#F4F4F4',
          padding: 20,
          paddingTop: 0,
          maxHeight: scrollSize,
        }}
      >
        {currentData?.rss?.channel?.[0]?.item?.map((bios: any, i: number) => {
          return (
            <View
              key={`bios_${i}`}
              style={{
                flexDirection: "row",
                marginTop: 24,
                marginBottom:
                  i === currentData?.rss?.channel?.[0]?.item.length - 1 ? 50 : 0
              }}
            >
              <Image
                style={{ height: 100, width: 100, marginTop: 5, }}
                source={{
                  uri: bios?.enclosure?.[0]?.['$']?.url,
                }}
              />
              <View>
                <Text
                  key={`bios_${i}`}
                  style={{ width: "70%", marginLeft: 25, fontSize: 18 }}
                >
                  {bios?.title?.[0]}
                </Text>
                <Text
                  style={{
                    width: "auto",
                    paddingLeft: 25,
                    paddingRight: 100,
                    fontSize: 12,
                    paddingTop: 5
                  }}
                >
                  {bios?.description?.[0] || 'No description found'}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default CurrentCinema;
