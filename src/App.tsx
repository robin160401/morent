import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DetailsPage from "./pages/DetailsPage";
import RentPage from "./pages/RentPage";
import BookingPage from "./pages/BookingPage";
import FavoritesPage from "./pages/FavoritesPage";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./components/Layout";
import SignUpPage from "./pages/SignUpPage";
import { SearchProvider } from "./context/searchContext";
import { UserContextProvider } from "./context/userContext";
import { FilterProvider } from "./context/filterContext";
import { ThemeContextProvider } from "./context/LightDarkModeContext";

const client = new QueryClient();

function App() {
  return (
    <ThemeContextProvider>
      <UserContextProvider>
        <QueryClientProvider client={client}>
          <FilterProvider>
            <SearchProvider>
              <BrowserRouter>
                <Routes>
                  <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/details/:id" element={<DetailsPage />} />
                    <Route path="/bookings" element={<BookingPage />} />
                    <Route
                      path="/favorites/:user_id"
                      element={<FavoritesPage />}
                    />
                    <Route path="/profile/:id" element={<ProfilePage />} />
                    <Route path="/rent/:id" element={<RentPage />} />

                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/sign-up" element={<SignUpPage />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </SearchProvider>
          </FilterProvider>
        </QueryClientProvider>
      </UserContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
