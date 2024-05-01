import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Text, Button, Alert, Image} from "react-native";
import { Camera, useCameraPermission, useCameraDevice, useFrameProcessor, } from "react-native-vision-camera";


const App = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');


  
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    if (frame.pixelFormat === 'rgb') {
      const buffer = frame.toArrayBuffer()
      const data = new Uint8Array(buffer)
      console.log(`Pixel at 0,0: RGB(${data[0]}, ${data[1]}, ${data[2]})`)
    }
  }, [])

  return (
    <View style={StyleSheet.absoluteFillObject}>
      {device && (
        <Camera
          style={StyleSheet.absoluteFillObject}
          device={device}
          isActive={true}
          photo={false} 
          frameProcessor={frameProcessor} 
        />
      )}
    </View>
  );
};

export default App;
