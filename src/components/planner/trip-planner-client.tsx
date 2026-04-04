"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { generateItineraryAction } from "@/lib/actions";
import type { AiGeneratedTripItineraryOutput } from "@/ai/flows/ai-generated-trip-itinerary-flow";
import ItineraryDisplay from "./itinerary-display";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const interests = [
  { id: "historical", label: "Historical Sites" },
  { id: "beaches", label: "Beaches" },
  { id: "nature", label: "Nature" },
  { id: "cuisine", label: "Local Cuisine" },
  { id: "culture", label: "Culture" },
  { id: "spiritual", label: "Spiritual" },
];

const tripPlannerSchema = z.object({
  interests: z.array(z.string()).min(1, "Please select at least one interest."),
  durationDays: z
    .number()
    .min(1, "Duration must be at least 1 day.")
    .max(10, "Duration cannot exceed 10 days."),
  budget: z.enum(["low", "medium", "high"]),
});

type TripPlannerFormValues = z.infer<typeof tripPlannerSchema>;

export default function TripPlannerClient() {
  const [itinerary, setItinerary] =
    useState<AiGeneratedTripItineraryOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TripPlannerFormValues>({
    resolver: zodResolver(tripPlannerSchema),
    defaultValues: {
      interests: [],
      durationDays: 3,
      budget: "medium",
    },
  });

  const onSubmit = async (data: TripPlannerFormValues) => {
    setIsLoading(true);
    setItinerary(null);

    const result = await generateItineraryAction(data);

    if ("error" in result) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
    } else {
      setItinerary(result);
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Create Your Itinerary</CardTitle>
          <CardDescription>
            Fill out the form below and our AI will generate a personalized plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <Label className="text-base font-semibold">Your Interests</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Select all that apply.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {interests.map((interest) => (
                  <Controller
                    key={interest.id}
                    name="interests"
                    control={control}
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={interest.id}
                          checked={field.value?.includes(interest.label)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([
                                  ...(field.value || []),
                                  interest.label,
                                ])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== interest.label
                                  )
                                );
                          }}
                        />
                        <label
                          htmlFor={interest.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {interest.label}
                        </label>
                      </div>
                    )}
                  />
                ))}
              </div>
              {errors.interests && (
                <p className="text-sm text-red-600 mt-2">
                  {errors.interests.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Label htmlFor="duration" className="text-base font-semibold">
                  Trip Duration (Days)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  {...register("durationDays", { valueAsNumber: true })}
                  className="mt-2"
                />
                {errors.durationDays && (
                  <p className="text-sm text-red-600 mt-2">
                    {errors.durationDays.message}
                  </p>
                )}
              </div>
              <div>
                <Label className="text-base font-semibold">Budget</Label>
                <Controller
                  name="budget"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4 mt-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="low" />
                        <Label htmlFor="low">Low</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="high" />
                        <Label htmlFor="high">High</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
              </div>
            </div>

            <Button type="submit" disabled={isLoading} size="lg">
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Generate Itinerary
            </Button>
          </form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex items-center justify-center p-10">
           <Loader2 className="h-10 w-10 animate-spin text-primary" />
           <p className="ml-4 text-lg">Our AI is crafting your journey...</p>
        </div>
      )}

      {itinerary && <ItineraryDisplay itinerary={itinerary} />}
    </div>
  );
}
