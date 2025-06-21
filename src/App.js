import classes from "./App.module.css";
import TranslatingCard from "./components/TranslatingCard";
import TranslatedCard from "./components/TranslatedCard";
import TranslationProvider from "./store/languageContext";
import Header from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
function App() {
  return (
    <div className={classes["app-component"]}>
      <Header />
      <div className={classes.translator}>
        <QueryClientProvider client={queryClient}>
          <TranslationProvider>
            <TranslatingCard />
            <TranslatedCard />
          </TranslationProvider>
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
