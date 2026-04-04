import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const bookings = [
  {
    id: "BK001",
    item: "Sunrise Boat Tour",
    date: "2024-08-15",
    status: "Confirmed",
    amount: "₹800",
  },
  {
    id: "BK002",
    item: "The Seaview Hotel",
    date: "2024-08-20 - 2024-08-22",
    status: "Confirmed",
    amount: "₹10000",
  },
];

export default function BookingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Bookings</CardTitle>
        <CardDescription>
          Here is a list of your past and upcoming bookings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.id}</TableCell>
                <TableCell>{booking.item}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell>
                  <Badge>{booking.status}</Badge>
                </TableCell>
                <TableCell className="text-right">{booking.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
