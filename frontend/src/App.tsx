import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./features/Home/containers/Home";
import { AppLayout } from "./shared/components/AppLayout/AppLayout";
import { UserCreation } from "./features/UserCreation/containers/UserCreation";
import { Events } from "./features/Events/containers/Events";
import { EventDetails } from "./features/EventDetails/EventDetails";
import { GoogleMapsProvider } from "./features/GoogleMapsProvider/GoogleMapsPRovider";
import { CreateEvents } from "./features/CreateEvents/CreateEvents";
import { Profile } from "./features/Profile/containers/Profile/Profile";
import { About } from "./features/About/About";
import { Calendar } from "./features/Calendar/Calendar";
import { Analytics } from "./features/Analytics/Analytics";
import { ProtectedRoute } from "./router/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <GoogleMapsProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/authorize" element={<UserCreation />} />
            <Route path="/events" element={<Events />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/create-events" element={<CreateEvents />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/calendar" element={<Calendar />} />
            {/* <Route path="/analytics" element={<Analytics />} /> */}
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              }
            />
          </Routes>
        </GoogleMapsProvider>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
