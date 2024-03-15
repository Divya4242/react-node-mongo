import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import About from './components/About'
import CreateNewPost from './components/CreateNewPost'
import EditPost from './components/EditPost'
import Error from './components/Error'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login'
import PostPage from './components/PostPage'
import Register from './components/Register'
import './index.css'
import MyPosts from './components/MyPosts'

function App() {

  return (
    <div>
      <BrowserRouter forceRefresh>
      <Routes>
        <Route exact path='/' element={
          <>
            <Header />
            <Home />
            <Footer />
          </>
        }/>
        <Route exact path='/about' element={
          <>
            <Header />
            <About />
            <Footer />
          </>
        }/>
        <Route exact path='/myposts' element={
          <>
            <Header />
            <MyPosts />
            <Footer />
          </>
        }/>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/register' element={<Register />}/>
        <Route exact path='/createnewpost' element={
          <>
            <Header />
            <CreateNewPost />
            <Footer />
          </>
        }/>
        <Route exact path='/post/:id' element={
          <>
            <Header />
            <PostPage />
            <Footer />
          </>
        }/>
        <Route exact path='/edit/:id' element={
          <>
            <Header />
            <EditPost />
            <Footer />
          </>
        }/>
        <Route path='*' element={<Error />}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
