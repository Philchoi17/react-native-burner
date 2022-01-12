import * as React from 'react'
import * as Progress from 'react-native-progress'

interface Props {
  type?: 'bar' | 'pie' | 'circle' | 'snail'
  progress?: number
  size?: number
  width?: number
  colors?: string[]
  color?: string
  borderColor?: string
  unfilledColor?: string
  thickness?: number
}

const { Bar, Pie, Circle, CircleSnail: Snail } = Progress
export default function PCProgress({
  type = 'bar',
  progress,
  size = 50,
  width = 200,
  colors = ['red', 'green', 'blue'],
  color = 'rgba(0, 122, 255, 1)',
  borderColor = 'rgba(0, 122, 255, 1)',
  unfilledColor = 'transparent',
  thickness = 3,
}: Props) {
  if (type == 'bar') {
    return (
      <Bar
        progress={progress}
        width={width}
        color={color}
        borderColor={borderColor}
        unfilledColor={unfilledColor}
      />
    )
  } else if (type == 'pie') {
    return (
      <Pie
        progress={progress}
        size={size}
        color={color}
        borderColor={borderColor}
        unfilledColor={unfilledColor}
      />
    )
  } else if (type == 'circle') {
    return (
      <Circle
        thickness={thickness}
        size={size}
        indeterminate
        color={color}
        borderColor={borderColor}
        unfilledColor={unfilledColor}
      />
    )
  } else {
    return (
      <Snail
        thickness={thickness}
        size={size}
        color={colors}
        borderColor={borderColor}
        unfilledColor={unfilledColor}
      />
    )
  }
}
