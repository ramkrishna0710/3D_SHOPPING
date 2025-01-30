import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Suspense, useState } from 'react'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import { Canvas } from '@react-three/fiber'
import Shoe from './src/components/Shoe'
import Trigger from './src/components/Trigger'
import Loader from './src/components/Loader'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import Header from './src/components/Header'

const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [baseColor, setBaseColor] = useState<string>('pink');
  const [soleColor, setSoleColor] = useState<string>('white');
  const [direction, setDirection] = useState<'x' | 'y'>('x');
  const dataColors = ['pink', 'blue', 'orange', 'red', 'white']

  const position = useSharedValue(0);
  const rotate = useSharedValue(0);

  const pan = Gesture.Pan().onUpdate(e => {
    position.value = e.translationX;
  }).onEnd(() => {
    position.value = withSpring(0);
  })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }]
  }));

  const handleChangeDirection = () => {
    if (direction === 'y') {
      setDirection('x');
      rotate.value = withSpring(90);
    } else {
      setDirection('y');
      rotate.value = withSpring(0);
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor={'transparent'}/>
      <View style={styles.container}>
        <Header handleChangeDirection={handleChangeDirection} rotate={rotate} />
        <ScrollView>
          <View style={styles.modelContainer}>
            <Canvas camera={{ fov: 20 }}>
              {loading ?? <Loader />}
              <directionalLight position={[1, 0, 0]} args={['white', 2]} />
              <directionalLight position={[-1, 0, 0]} args={['white', 2]} />
              <directionalLight position={[0, 0, 1]} args={['white', 2]} />
              <directionalLight position={[0, 0, -1]} args={['white', 2]} />
              <directionalLight position={[0, 1, 0]} args={['white', 2]} />
              <directionalLight position={[0, -1, 0]} args={['white', 2]} />
              <Suspense fallback={<Trigger setLoading={setLoading} />} >
                <Shoe
                  baseColor={baseColor}
                  soleColor={soleColor}
                  position={position}
                  direction={direction}
                />
              </Suspense>
            </Canvas>
          </View>
          <GestureDetector gesture={pan}>
            <Animated.View style={[styles.sliderContainer, animatedStyle]}>
              <Image source={require('./src/assets/Slider.png')} style={styles.slider} />
            </Animated.View>
          </ GestureDetector>
          <View style={styles.contentContiner}>
            <Text style={styles.textName}>Sneakers Shoes</Text>
            <View style={styles.ratingContaier}>
              <Text style={styles.textRating}>(5.0)</Text>
              <Image source={require('./src/assets/Star.png')} style={styles.star} />
              <Image source={require('./src/assets/Star.png')} style={styles.star} />
              <Image source={require('./src/assets/Star.png')} style={styles.star} />
              <Image source={require('./src/assets/Star.png')} style={styles.star} />
              <Image source={require('./src/assets/Star.png')} style={styles.star} />
            </View>
            <Text style={styles.textTitle}>Base Color</Text>
            <View style={styles.colorContaienr}>
              {dataColors.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => {
                    setBaseColor(item);
                  }}>
                    <View style={[styles.color, { backgroundColor: item }]} />
                  </TouchableOpacity>
                )
              })}
            </View>
            <Text style={styles.textTitle}>Sole Color</Text>
            <View style={styles.colorContaienr}>
              {dataColors.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => {
                    setSoleColor(item);
                  }}>
                    <View style={[styles.color, { backgroundColor: item }]} />
                  </TouchableOpacity>
                )
              })}
            </View>
            <Text style={styles.textTitle}>Description</Text>
            <Text style={styles.textDescription}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.textPrice}>₹999</Text>
          </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Buy Now</Text>
            </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  modelContainer: {
    height: 250,
  },
  textName: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  textTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  contentContiner: {
    paddingHorizontal: 20,
  },
  color: {
    width: 30,
    height: 30,
    borderRadius: 50
  },
  colorContaienr: {
    flexDirection: 'row',
    gap: 20
  },
  slider: {
    width: 200,
    height: 30
  },
  sliderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingContaier: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textRating: {
    color: 'white',
    fontSize: 14,
    marginRight: 14
  },
  star: {
    height: 20,
    width: 20,
    marginRight: 10
  },
  textDescription: {
    color: 'white',
    fontSize: 12,
    textAlign: 'justify'
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 10
  },
  priceContainer: {
    flex: 1 / 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textPrice: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  button: {
    flex: 2/3,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    padding: 14,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16
  }
})