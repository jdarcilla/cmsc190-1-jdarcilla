import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../core/theme';

const AudioVisualizer = (props: { currentVolume: number }) => {
  const currentVolume = props.currentVolume ?? 0;

  const maxVolume = 50;

  const animationRef = useRef(new Animated.Value(0)).current;

  const startAnimations = useCallback(() => {
    Animated.timing(animationRef, {
      toValue: currentVolume / maxVolume,
      useNativeDriver: true,
      duration: 500,
    }).start();
  }, [animationRef, currentVolume]);

  useEffect(() => {
    startAnimations();
  }, [startAnimations]);

  const polAnim = animationRef.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.ripple,
        {
          position: 'absolute',
          height: 150,
          width: 150,
          borderRadius: 150,

          transform: [
            {
              scale: polAnim,
            },
          ],
        },
      ]}></Animated.View>
  );
};

const data = [
  1, 6, 39, 40, 50, 22, 7, 15, 12, 1, 6, 39, 40, 50, 22, 7, 15, 18, 1, 6, 39,
  40, 50, 22, 7, 15, 12, 1, 6, 39, 40, 50, 22, 7, 15, 12, 1, 6, 39, 40, 50, 22,
  7, 15, 12, 1, 6, 39, 40, 50, 22, 7, 15, 12,
];

const Visualizer = (props: { isPlaying: boolean; onChange: () => void }) => {
  const [currentTime, setTime] = useState(0);
  const [currIndex, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = currIndex + 1;
      setTime(data[currIndex]);
      setIndex(newIndex);
    }, 500);
    return () => clearInterval(interval);
  }, [currIndex]);

  return (
    <View style={styles.pageContainer}>
      <View>
        <AudioVisualizer currentVolume={props.isPlaying ? currentTime : 0} />
        <View
          style={{
            height: 150,
            width: 150,
            borderRadius: 150,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.primary,
            zIndex: 3,
          }}>
          <TouchableOpacity onPress={props.onChange}>
            <MaterialCommunityIcons
              name={
                props.isPlaying ? 'stop-circle-outline' : 'play-circle-outline'
              }
              color={theme.colors.onPrimary}
              size={60}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
  content: {
    flex: 1,
    gap: 8,
  },
  button: {
    padding: 12,
    backgroundColor: theme.colors.primaryContainer,
    borderRadius: 12,
  },
  text: {
    color: theme.colors.onPrimaryContainer,
  },
  ripple: {
    backgroundColor: theme.colors.primaryContainer,
    zIndex: 2,
  },
});

export default memo(Visualizer);
