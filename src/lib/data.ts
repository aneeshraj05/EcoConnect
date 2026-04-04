export type Place = {
  id: string;
  name: string;
  description: string;
  rating?: number;
  price?: number;
  category: "Attraction" | "Experience" | "Stay";
  imageId: string;
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
