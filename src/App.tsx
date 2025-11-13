import { useContext, useEffect, useState } from 'react'
import AppRouter from './components/AppRouter'
import { observer } from 'mobx-react-lite'
import { Context } from './components/Providers'
import { check } from './http/userAPI'
import { Spinner } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './components/NavBar'
import './style/style.css'
import Footer from './components/Footer'
import { ThemeProvider } from './context/ThemeProvider'

const App = observer(() => {
  const { user } = useContext(Context)!
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check()
      .then((u) => {
        user.setUser(u)
        user.setIsAuth(true)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Spinner style={{ margin: '0 auto' }} animation={'border'} />
  }
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="app">
          <NavBar />
          <AppRouter />
          <Footer />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
})

export default App
