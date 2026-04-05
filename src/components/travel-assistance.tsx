'use client';

import { useState, useMemo } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { allPlaces, busRoutes, accommodations, Place, BusRoute } from '@/lib/data';
import { placeholderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Bus, Hotel, IndianRupee, Star, ArrowRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

const DESTINATIONS = allPlaces.filter(p => p.category === 'Attraction');
const NUMBER_OF_NIGHTS = 2;
const DAILY_EXPENSES = 800;

export default function TravelAssistance() {
  const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>(null);

  const selectedDestination = useMemo(() => {
    if (!selectedDestinationId) return null;
    return DESTINATIONS.find((d) => d.id === selectedDestinationId);
  }, [selectedDestinationId]);

  const destinationImage = useMemo(() => {
    if (!selectedDestination) return null;
    return placeholderImages.find((img) => img.id === selectedDestination.imageId);
  }, [selectedDestination]);

  const availableBusRoutes = useMemo(() => {
    if (!selectedDestination) return { onward: [], return: [] };
    const onward = busRoutes.filter(
      (route) => route.destination.toLowerCase() === selectedDestination.name.toLowerCase()
    );
    const returnRoutes = busRoutes.filter(
      (route) => route.origin.toLowerCase() === selectedDestination.name.toLowerCase()
    );
    return { onward, return: returnRoutes };
  }, [selectedDestination]);

  const nearbyHotels = useMemo(() => {
    // In a real app, this would use location data.
    // Here we just return all available accommodations.
    return accommodations;
  }, []);

  const costEstimation = useMemo(() => {
    if (!selectedDestination) return null;

    const onwardBusFare = availableBusRoutes.onward[0]?.fare || 0;
    const returnBusFare = availableBusRoutes.return[0]?.fare || 0;
    const transportCost = onwardBusFare + returnBusFare;

    const cheapestHotel = nearbyHotels.reduce((min, hotel) => 
      (hotel.price && hotel.price < min.price!) ? hotel : min, nearbyHotels[0]
    );
    const accommodationCost = (cheapestHotel?.price || 0) * NUMBER_OF_NIGHTS;
    
    const otherExpenses = DAILY_EXPENSES * NUMBER_OF_NIGHTS;

    const totalCost = transportCost + accommodationCost + otherExpenses;

    return {
      transport: transportCost,
      accommodation: accommodationCost,
      expenses: otherExpenses,
      total: totalCost,
      hotelName: cheapestHotel.name,
    };
  }, [selectedDestination, availableBusRoutes, nearbyHotels]);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Select Your Destination</CardTitle>
          <CardDescription>Choose where you want to go to get travel details.</CardDescription>
        </CardHeader>
        <CardContent>
          <Select onValueChange={setSelectedDestinationId} value={selectedDestinationId || ''}>
            <SelectTrigger className="w-full md:w-[300px]">
              <SelectValue placeholder="Select a destination" />
            </SelectTrigger>
            <SelectContent>
              {DESTINATIONS.map((dest) => (
                <SelectItem key={dest.id} value={dest.id}>
                  {dest.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedDestination && (
        <div className="space-y-8">
          {/* Destination Image */}
          {destinationImage && (
            <Card className="overflow-hidden">
              <div className="relative aspect-[16/7]">
                <Image
                  src={destinationImage.imageUrl}
                  alt={selectedDestination.name}
                  fill
                  className="object-cover"
                  data-ai-hint={destinationImage.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                    <h2 className="text-3xl font-bold text-white">{selectedDestination.name}</h2>
                    <p className="text-lg text-white/90 max-w-2xl mt-1">{selectedDestination.description}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Bus Routes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bus className="text-primary"/> Bus Routes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <h3 className="font-semibold text-lg mb-2 flex items-center">Onward Journey <ArrowRight className='w-4 h-4 mx-2'/> {selectedDestination.name}</h3>
                   <BusRouteTable routes={availableBusRoutes.onward} />
                </div>
                <Separator />
                 <div>
                  <h3 className="font-semibold text-lg mb-2 flex items-center">Return Journey <ArrowRight className='w-4 h-4 mx-2'/> Home</h3>
                   <BusRouteTable routes={availableBusRoutes.return} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Nearby Hotels */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Hotel className="text-primary"/> Nearby Hotels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nearbyHotels.map(hotel => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cost Estimation */}
          {costEstimation && (
             <Card>
              <CardHeader>
                 <CardTitle className="flex items-center gap-2"><IndianRupee className="text-primary"/> Estimated Trip Cost</CardTitle>
                 <CardDescription>Approximate cost for a {NUMBER_OF_NIGHTS}-night trip for one person.</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="space-y-4">
                   <div className="flex justify-between items-center">
                      <p>Transportation (Return Bus)</p>
                      <p className="font-semibold">₹{costEstimation.transport.toLocaleString()}</p>
                   </div>
                   <Separator />
                   <div className="flex justify-between items-center">
                     <p>Accommodation ({NUMBER_OF_NIGHTS} nights at {costEstimation.hotelName})</p>
                      <p className="font-semibold">₹{costEstimation.accommodation.toLocaleString()}</p>
                   </div>
                   <Separator />
                   <div className="flex justify-between items-center">
                      <p>Food & Basic Expenses</p>
                      <p className="font-semibold">₹{costEstimation.expenses.toLocaleString()}</p>
                   </div>
                   <Separator className='my-4 border-dashed' />
                   <div className="flex justify-between items-center text-lg font-bold">
                      <p>Estimated Total</p>
                      <p>₹{costEstimation.total.toLocaleString()}</p>
                   </div>
                 </div>
              </CardContent>
            </Card>
          )}

        </div>
      )}
    </div>
  );
}


function BusRouteTable({ routes }: { routes: BusRoute[] }) {
    if (routes.length === 0) {
        return <p className="text-muted-foreground text-sm">No direct bus routes found.</p>;
    }
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Operator</TableHead>
                    <TableHead>Departure</TableHead>
                    <TableHead>Arrival</TableHead>
                    <TableHead className="text-right">Fare</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {routes.map(route => (
                    <TableRow key={route.id}>
                        <TableCell>{route.operator}</TableCell>
                        <TableCell>{route.departureTime}</TableCell>
                        <TableCell>{route.arrivalTime}</TableCell>
                        <TableCell className="text-right">₹{route.fare}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

function HotelCard({ hotel }: { hotel: Place }) {
  const image = placeholderImages.find(img => img.id === hotel.imageId);
  return (
    <Card className="overflow-hidden">
      {image && (
        <div className="relative aspect-video">
          <Image src={image.imageUrl} alt={hotel.name} fill className="object-cover" />
        </div>
      )}
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{hotel.name}</h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{hotel.description}</p>
        <div className="flex justify-between items-center mt-4">
          <Badge variant="secondary" className="flex items-center gap-1">
             <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
             {hotel.rating?.toFixed(1)}
          </Badge>
          <p className="font-semibold text-lg">
            ₹{hotel.price?.toLocaleString()}
            <span className="text-sm font-normal text-muted-foreground">/night</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
