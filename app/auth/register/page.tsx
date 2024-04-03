"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TutorRegistrationForm from "./tutor/tutor-register-form";
import StudentRegistrationForm from "./student/student-registration-form";

export default function RegisterPage() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="tutor">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tutor">Tutor</TabsTrigger>
            <TabsTrigger value="student">Student</TabsTrigger>
          </TabsList>
          <TabsContent value="tutor">
            <TutorRegistrationForm />
          </TabsContent>
          <TabsContent value="student">
            <StudentRegistrationForm />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
