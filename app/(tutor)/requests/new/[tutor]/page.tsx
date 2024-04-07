"use client";
import { Calendar } from "@/components/ui/calendar";
import { TimePicker } from "@/components/date-time-picker/time-picker";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Categories } from "@/lib/types/types";
import { cn } from "@/lib/utils";
import {
  TTutoringRequest,
  tutoringRequest,
} from "@/lib/validations/tutoring-request-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { CalendarIcon } from "lucide-react";
import { notFound, useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function CreateRequestPage() {
  const router = useRouter();
  const params = useParams();
  const tutorId = params.tutor;

  if (!tutorId) return notFound();

  const form = useForm<TTutoringRequest>({
    resolver: zodResolver(tutoringRequest),
  });

  const [loading, setLoading] = useState(false);
  const { handleSubmit } = form;

  const onSubmit = async (data: TTutoringRequest) => {
    setLoading(true);
    try {
      await axios.post(`http://localhost:3000/api/request`, {
        ...data,
        tutor: tutorId,
      });
      router.push("/requests");
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
        <div className="grid gap-4 py-4 mx-auto w-1/2">
          <div className={"flex flex-col gap-6"}>
            <div className="grid gap-2 my-3">
              <FormLabel>Date & Time</FormLabel>
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 space-y-1 w-full">
                    <Popover>
                      <PopoverTrigger asChild className="py-[2rem] h-12">
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full text-left font-normal py-[0.625rem] h-auto bg-primary-foreground",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              `${field.value.toLocaleDateString()} - ${field.value.toLocaleTimeString()}`
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 text-text-quarterary" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full">
                        <div className="space-y-3">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date: Date) => date < new Date()}
                            initialFocus
                          />

                          <TimePicker
                            //@ts-ignore
                            value={
                              field.value
                                ? {
                                    hour: field.value.getHours(),
                                    minute: field.value.getMinutes(),
                                    second: field.value.getSeconds(),
                                    millisecond: field.value.getMilliseconds(),
                                  }
                                : undefined
                            }
                            onChange={async (value) => {
                              // hour: 11;
                              // millisecond: 0;
                              // minute: 0;
                              // second: 0;
                              field.onChange(
                                moment(field.value)
                                  .hour(value.hour)
                                  .minute(value.minute)
                                  .second(value.second)
                                  .millisecond(value.millisecond)
                                  .toDate(),
                              );
                            }}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-2">
              <FormLabel>Subject</FormLabel>
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-primary-foreground">
                          <SelectValue placeholder="Select ..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Categories.map((cat) => (
                          <SelectItem value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormLabel>About</FormLabel>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-2">
              <Button
                disabled={loading}
                type="submit"
                className={cn(
                  `bg-secondary text-secondary w-full transform rounded-lg px-6 text-sm font-medium tracking-wide transition-colors duration-300 focus:outline-none focus:ring focus:ring-opacity-50 ${
                    loading ? "cursor-not-allowed opacity-50" : ""
                  }`,
                  "bg-gray-900 text-white outline-none transition-all hover:scale-105 hover:bg-gray-950 focus:scale-110 active:scale-105 ",
                )}
              >
                Request Session
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
