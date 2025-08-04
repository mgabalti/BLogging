import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faUser, faFileAlt, faArrowLeft, faImage, faChevronDown, faTimes, faSave } from '@fortawesome/free-solid-svg-icons';

// Only run on client side
if (typeof window !== 'undefined') {
  // Add icons to the library
  library.add(faHome, faUser, faFileAlt, faArrowLeft, faImage, faChevronDown, faTimes, faSave);
} 