import Nerv from "nervjs";
import { View, Button } from '@tarojs/components';
import { useEffect, useLayoutEffect, useReducer, useState, useRef, useCallback, useMemo } from "@tarojs/taro-h5";

class Mask extends Taro.Component {
  render() {
    const { initialCount = 0 } = this.props;

    console.log('useState', useState(initialCount));
    const [count, setCount] = useState(initialCount);
    useEffect(() => {
      document.title = `You clicked ${count} times`;
    }, []);
    var click = () => {
      setCount(prevCount => {
        return prevCount + 100;
      });
    };
    return <View>
    Count: {count}
    <Button onClick={() => setCount(initialCount)}>Reset</Button>
    <Button onClick={() => setCount(prevCount => prevCount + 1)}>+</Button>
    <Button onClick={() => setCount(prevCount => prevCount - 1)}>-</Button>
    <Button onClick={click}>123</Button>
  </View>;
  }

}

export default Mask;