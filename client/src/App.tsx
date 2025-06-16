import {Provider} from "react-redux";
import {store} from "@/store/slices/jiraSlice";
import './App.css';
import {JiraDashboard} from "@/components/dashboard/JiraDashboard";

const App: React.FC = () => (
    <Provider store={store}>
      <JiraDashboard />
    </Provider>
);

export default App;
