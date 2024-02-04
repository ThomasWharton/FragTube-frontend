import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import {Route, Switch} from 'react-router-dom';
import './api/axiosDefaults';
import RegisterForm from "./pages/auth/RegisterForm"
import LogInForm from './pages/auth/LogInForm';
import PostCreateForm from './pages/posts/PostCreateForm';

function App() {
  return (
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => <h1>Home page</h1>} />
              <Route exact path="/login" render={() => <LogInForm />} />
              <Route exact path="/signup" render={() => <RegisterForm />} />
              <Route exact path="/posts/create" render={() => <PostCreateForm />} />
              <Route render={()=><p>Page not found!</p>} />
            </Switch>
          </Container>
        </div>
  );
}

export default App;