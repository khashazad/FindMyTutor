import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  TTutorSignupSchema,
  tutorSignupSchema,
} from "@/lib/validations/auth-validation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Categories } from "@/lib/types/types";
import RegistrationFormField from "../registration-form-field";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";

export default function TutorRegistrationForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [expertise, setExpertise] = useState<string[]>([]);

  const form = useForm<TTutorSignupSchema>({
    resolver: zodResolver(tutorSignupSchema),
  });

  const { handleSubmit } = form;

  const onSubmit = async (data: TTutorSignupSchema) => {
    setLoading(true);
    try {
      await axios.post(`http://localhost:3000/api/auth/register/tutor`, {
        ...data,
        expertise,
      });
      router.push("/");
    } catch (error: any) {
      let message = "An error occurred while registering your account";

      if (error.response && error.response.data.message)
        message = error.response.data.message;

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form className="grid mt-8" onSubmit={handleSubmit(onSubmit)}>
        <div className={cn("flex-col gap-4", step === 1 ? "hidden" : "flex")}>
          <div className={cn("grid grid-cols-2 gap-4")}>
            <RegistrationFormField
              label="First Name"
              name="firstName"
              control={form.control}
            />
            <RegistrationFormField
              label="Last Name"
              name="lastName"
              control={form.control}
            />
          </div>

          <RegistrationFormField
            label="Email"
            name="email"
            control={form.control}
          />

          <RegistrationFormField
            label="Phone Number"
            name="phoneNumber"
            control={form.control}
          />
          <RegistrationFormField
            label="Password"
            name="password"
            control={form.control}
          />
          <Button type="button" className="mt-2" onClick={() => setStep(1)}>
            Next
          </Button>
        </div>

        <div className={cn(step === 0 ? "hidden" : "flex flex-col gap-4")}>
          <div className="grid gap-2">
            <FormLabel>Hourly Rate</FormLabel>
            <FormField
              control={form.control}
              name="hourlyRate"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-grow-1 pb-1">
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <div className="flex justify-end h-1">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <FormLabel>Expertise</FormLabel>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Select</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Expertise</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {Categories.map((cat: string) => (
                <DropdownMenuCheckboxItem
                  key={cat}
                  checked={expertise.includes(cat) ? true : false}
                  onCheckedChange={() => {
                    if (!expertise.includes(cat)) {
                      setExpertise((prev) => [...prev, cat]);
                    } else {
                      const referencedArray = [...expertise];
                      const indexOfItemToBeRemoved =
                        referencedArray.indexOf(cat);
                      referencedArray.splice(indexOfItemToBeRemoved, 1);
                      setExpertise(referencedArray);
                    }
                  }}
                >
                  {cat}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="grid gap-2">
            <FormLabel>About</FormLabel>
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This will appear when students are visiting your profile
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <Button type="submit" onClick={() => setStep(0)}>
              Previous
            </Button>
            <Button
              disabled={loading}
              type="submit"
              onClick={() => setStep(0)}
              className={cn(
                `bg-secondary text-secondary w-full transform rounded-lg px-6 text-sm font-medium tracking-wide transition-colors duration-300 focus:outline-none focus:ring focus:ring-opacity-50 ${
                  loading ? "cursor-not-allowed opacity-50" : ""
                }`,
                "bg-gray-900 text-white outline-none transition-all hover:scale-105 hover:bg-gray-950 focus:scale-110 active:scale-105 ",
              )}
            >
              Create an account
            </Button>
          </div>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline">
            Sign in
          </Link>
        </div>
      </form>
    </Form>
  );
}
