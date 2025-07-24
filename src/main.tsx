import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Initialize FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { 
  faUserNurse, faStethoscope, faFlask, faHeartbeat, 
  faMapMarkerAlt, faClock, faEnvelope, faPhone,
  faChevronLeft, faChevronRight, faCheck
} from "@fortawesome/free-solid-svg-icons";

library.add(
  fab, 
  faUserNurse, faStethoscope, faFlask, faHeartbeat,
  faMapMarkerAlt, faClock, faEnvelope, faPhone,
  faChevronLeft, faChevronRight, faCheck
);

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Helmet>
      <title>Matoshree Dr Kanchan Shantilalji Desarda Mahavidyalya</title>
      <meta name="description" content="Matoshree Dr Kanchan Shantilalji Desarda Mahavidyalya - Excellence in Nursing & Allied Sciences with UGC-approved programs, flexible learning modes, and hands-on clinical training." />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
      <meta property="og:title" content="Matoshree Dr Kanchan Shantilalji Desarda Mahavidyalya" />
      <meta property="og:description" content="Empowering Future Healthcare Leaders with Excellence in Nursing & Allied Sciences." />
      <meta property="og:type" content="website" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Nunito+Sans:wght@400;600&display=swap" rel="stylesheet" />
    </Helmet>
    <App />
  </HelmetProvider>
);
