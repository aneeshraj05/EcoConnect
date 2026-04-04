import type { AiGeneratedTripItineraryOutput } from "@/ai/flows/ai-generated-trip-itinerary-flow";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Info } from "lucide-react";

type ItineraryDisplayProps = {
  itinerary: AiGeneratedTripItineraryOutput;
};

export default function ItineraryDisplay({ itinerary }: ItineraryDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Your Personalized Itinerary</CardTitle>
        <CardDescription>
          Here is the Kanyakumari adventure our AI has planned for you.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Accordion type="single" collapsible defaultValue="day-1" className="w-full">
          {itinerary.itinerary.map((dayPlan) => (
            <AccordionItem key={dayPlan.day} value={`day-${dayPlan.day}`}>
              <AccordionTrigger className="text-lg font-semibold">
                Day {dayPlan.day}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-3 pl-5">
                  {dayPlan.activities.map((activity, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div>
          <h3 className="text-xl font-semibold mb-3">
            Additional Recommendations
          </h3>
          <ul className="space-y-2 pl-5 list-disc">
            {itinerary.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>

        {itinerary.notes && (
          <div className="bg-secondary p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <Info className="h-5 w-5 mr-2 text-primary" />
              Good to Know
            </h3>
            <p className="text-sm text-muted-foreground">{itinerary.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
