import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  TStudentSignupSchema,
  studnetSignupSchema,
} from "@/lib/validations/auth-validation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import RegistrationFormField from "./student-registration-form-field";
import { useRouter } from "next/navigation";

export default function StudentRegistrationForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<TStudentSignupSchema>({
    resolver: zodResolver(studnetSignupSchema),
  });

  const { handleSubmit } = form;

  const onSubmit = async (data: TStudentSignupSchema) => {
    setLoading(true);
    try {
      await axios.post(`${process.env.API_URL}/auth/register/student`, data);

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
      <form
        className="flex flex-col gap-4 mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
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
        <Button
          disabled={loading}
          type="submit"
          className={cn(
            `mt-2 bg-secondary text-secondary w-full transform rounded-lg px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300 focus:outline-none focus:ring focus:ring-opacity-50 ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`,
            "bg-gray-900 text-white outline-none transition-all hover:scale-105 hover:bg-gray-950 focus:scale-110 active:scale-105 ",
          )}
        >
          Create an account
        </Button>
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
