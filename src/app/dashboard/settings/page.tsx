'use client';

import React from "react";
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
import { useUser, useFirestore } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

const profileSchema = z.object({
    displayName: z.string().min(2, "Name must be at least 2 characters."),
});

export default function SettingsPage() {
    const { user, isLoading: isUserLoading } = useUser();
    const firestore = useFirestore();
    const [isSaving, setIsSaving] = React.useState(false);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<{displayName: string}>({
        resolver: zodResolver(profileSchema),
    });

    React.useEffect(() => {
        if(user) {
            setValue('displayName', user.displayName || '');
        }
    }, [user, setValue]);

    const onSubmit = (data: { displayName: string }) => {
        if (!user || !firestore) return;
        
        setIsSaving(true);
        const userRef = doc(firestore, `users/${user.uid}`);
        const profileData = { displayName: data.displayName };

        setDoc(userRef, profileData, { merge: true })
            .then(() => {
                toast({
                    title: "Profile updated",
                    description: "Your display name has been updated.",
                });
            })
            .catch((error: any) => {
                const permissionError = new FirestorePermissionError({
                    path: userRef.path,
                    operation: 'update',
                    requestResourceData: profileData,
                });
                errorEmitter.emit('permission-error', permissionError);
            })
            .finally(() => {
                setIsSaving(false);
            });
    };
    
  if (isUserLoading) {
      return (
          <div className="space-y-8">
              <Card>
                  <CardHeader>
                      <Skeleton className="h-7 w-24" />
                      <Skeleton className="h-4 w-48" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-12" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-12" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <Skeleton className="h-10 w-32" />
                  </CardContent>
              </Card>
          </div>
      )
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" {...register("displayName")} />
                    {errors.displayName && <p className="text-sm text-red-600">{errors.displayName.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue={user?.email || ''} disabled />
                </div>
                <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                </Button>
            </form>
        </CardContent>
      </Card>
    </div>
  );
}
