export type Place = {
  id: string;
  name: string;
  description: string;
  rating?: number;
  price?: number;
  category: "Attraction" | "Experience" | "Stay";
  imageId: string;
};

export type BusRoute = {
  id: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  fare: number;
  operator: string;
};

export const featuredPlaces: Place[] = [
  {
    id: 'vivekananda-rock',
    name: 'Vivekananda Rock Memorial',
    description: 'A sacred monument and popular meditation spot on a small island off Kanyakumari.',
    rating: 4.8,
    category: 'Attraction',
    imageId: 'vivekananda-rock'
  },
  {
    id: 'thiruvalluvar-statue',
    name: 'Thiruvalluvar Statue',
    description: 'A 133-feet tall stone sculpture of the Tamil poet and philosopher Thiruvalluvar.',
    rating: 4.7,
    category: 'Attraction',
    imageId: 'thiruvalluvar-statue'
  },
  {
    id: 'kanyakumari-beach',
    name: 'Kanyakumari Beach',
    description: 'Famous for its spectacular sunrise and sunset views over the confluence of three seas.',
    rating: 4.6,
    category: 'Attraction',
    imageId: 'kanyakumari-beach'
  },
  {
    id: 'gandhi-mandapam',
    name: 'Gandhi Memorial Mandapam',
    description: 'A memorial to Mahatma Gandhi, designed to let the sun\'s rays fall on the spot where his ashes were kept.',
    rating: 4.5,
    category: 'Attraction',
    imageId: 'gandhi-mandapam'
  },
];

export const allPlaces: Place[] = [
  ...featuredPlaces,
  {
    id: 'vattakottai-fort',
    name: 'Vattakottai Fort',
    description: 'A seaside fort from the 18th century offering panoramic views of the ocean.',
    rating: 4.4,
    category: 'Attraction',
    imageId: 'vattakottai-fort'
  },
  {
    id: 'padmanabhapuram-palace',
    name: 'Padmanabhapuram Palace',
    description: 'A magnificent wooden palace of the Travancore rulers, known for its intricate architecture.',
    rating: 4.7,
    category: 'Attraction',
    imageId: 'padmanabhapuram-palace'
  },
  {
    id: 'trivandrum-city',
    name: 'Trivandrum',
    description: 'The capital city of Kerala, known for its British colonial architecture and many art galleries.',
    rating: 4.5,
    category: 'Attraction',
    imageId: 'trivandrum-city'
  }
];


export const localExperiences: Place[] = [
  {
    id: 'local-craft-workshop',
    name: 'Seashell Craft Workshop',
    description: 'Learn the art of creating beautiful crafts from seashells with local artisans.',
    rating: 4.9,
    price: 500,
    category: 'Experience',
    imageId: 'local-craft'
  },
  {
    id: 'sunrise-boat-tour',
    name: 'Sunrise Boat Tour',
    description: 'Experience the breathtaking sunrise from a boat in the middle of the three seas.',
    rating: 4.8,
    price: 800,
    category: 'Experience',
    imageId: 'boating-experience'
  },
  {
    id: 'south-indian-cuisine-class',
    name: 'South Indian Cuisine Class',
    description: 'Discover the secrets of Kanyakumari\'s local cuisine in a hands-on cooking class.',
    rating: 4.9,
    price: 1200,
    category: 'Experience',
    imageId: 'local-food'
  },
];

export const accommodations: Place[] = [
  {
    id: 'hotel-sea-view',
    name: 'The Seaview Hotel',
    description: 'Luxurious hotel offering stunning views of the Vivekananda Rock and Thiruvalluvar Statue.',
    rating: 4.7,
    price: 5000,
    category: 'Stay',
    imageId: 'hotel-sea-view'
  },
  {
    id: 'traditional-homestay',
    name: 'Nalukettu Homestay',
    description: 'Experience authentic Keralan hospitality in a traditional-style homestay with modern amenities.',
    rating: 4.8,
    price: 3000,
    category: 'Stay',
    imageId: 'homestay-traditional'
  },
  {
    id: 'beachside-resort',
    name: 'Beachside Resort & Spa',
    description: 'A premium resort with a private beach area, swimming pool, and spa services.',
    rating: 4.9,
    price: 8000,
    category: 'Stay',
    imageId: 'beachside-resort'
  },
  {
    id: 'budget-lodge',
    name: 'Kanyakumari Budget Lodge',
    description: 'A clean and affordable lodge located in the heart of the city, perfect for budget travelers.',
    rating: 3.9,
    price: 1200,
    category: 'Stay',
    imageId: 'budget-lodge'
  }
];

export const busRoutes: BusRoute[] = [
  { id: 'bus-1', origin: 'Kanyakumari', destination: 'Trivandrum', departureTime: '08:00 AM', arrivalTime: '10:30 AM', fare: 150, operator: 'KSRTC' },
  { id: 'bus-2', origin: 'Trivandrum', destination: 'Kanyakumari', departureTime: '02:00 PM', arrivalTime: '04:30 PM', fare: 150, operator: 'KSRTC' },
  { id: 'bus-3', origin: 'Kanyakumari', destination: 'Madurai', departureTime: '09:30 AM', arrivalTime: '02:00 PM', fare: 300, operator: 'SETC' },
  { id: 'bus-4', origin: 'Madurai', destination: 'Kanyakumari', departureTime: '05:00 PM', arrivalTime: '09:30 PM', fare: 300, operator: 'SETC' },
  { id: 'bus-5', origin: 'Kanyakumari', destination: 'Tirunelveli', departureTime: '07:00 AM', arrivalTime: '09:00 AM', fare: 100, operator: 'TNSTC' },
  { id: 'bus-6', origin: 'Tirunelveli', destination: 'Kanyakumari', departureTime: '06:00 PM', arrivalTime: '08:00 PM', fare: 100, operator: 'TNSTC' },
];


export const dashboardNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
  },
  {
    title: "Bookings",
    href: "/dashboard/bookings",
    icon: "bookings",
  },
  {
    title: "Trip Planner",
    href: "/trip-planner",
    icon: "planner",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: "settings",
  },
];
