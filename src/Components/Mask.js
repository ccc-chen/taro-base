import { View, Text, Button, ScrollView, Image, Input } from '@tarojs/components'
import {
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
  useRef,
  useCallback,
  useMemo,
} from '@tarojs/taro'

const Mask = ({ initialCount = 0 }) => {
  console.log('useState', useState(initialCount))
  const [count, setCount] = useState(initialCount)
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, []);
  var click = () => {
    setCount(prevCount => {
      return prevCount + 100
  })
}
return (
  <View>
    Count: {count}
    <Button onClick={() => setCount(initialCount)}>Reset</Button>
    <Button onClick={() => setCount(prevCount => prevCount + 1)}>+</Button>
    <Button onClick={() => setCount(prevCount => prevCount - 1)}>-</Button>
    <Button onClick={click}>123</Button>
  </View>
)
}
export default Mask