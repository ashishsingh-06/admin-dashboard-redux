import './App.css';
import Header from './feature/Header';
import { Provider } from 'react-redux';
import store from './app/store';
import UserView from './feature/user/UserView';
import DeleteModal from './common/modals/DeleteModal';
import NewUserModal from './common/modals/NewUserModal';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header></Header>
        <UserView></UserView>
        <DeleteModal></DeleteModal>
        <NewUserModal></NewUserModal>
      </div>
    </Provider>
  );
}

export default App;
