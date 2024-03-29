import '../styles/styles.scss'
import {AppProps} from 'next/app'
import {Provider} from 'react-redux'
import {useStore} from '../redux/store'

function App({Component, pageProps}: AppProps) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App
