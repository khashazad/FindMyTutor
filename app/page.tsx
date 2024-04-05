"use client";
import Pic1 from "@/public/home-pic-1.webp";
import Pic2 from "@/public/home-pic-2.webp";
import Pic3 from "@/public/home-pic-3.jpeg";
import Image from "next/image";
import * as React from "react";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  return (
    <main className="relative">
      <PageHeader>
        <PageHeaderHeading className="mb-2">
          Welcome to <span className="font-bold">Find My Tutor</span>
        </PageHeaderHeading>
        <PageHeaderDescription className="px-10">
          In today&apos;s fast-paced academic environment, students and learning
          enthusiasts face the challenge of finding the right guidance to unlock
          their full potential. Enter "Find My Tutor," a revolutionary web
          application designed to bridge the gap between learners seeking to
          broaden their horizons and the experts who can lead the way. "Find My
          Tutor" connects users with tutors and specialists across a wide range
          of subjects and fields.
          <span className="hidden md:inline">
            {" "}
            Whether you're struggling with calculus, diving into the depths of
            historical events, or mastering a new programming language, our
            platform ensures that the right expertise is just a few clicks away.
          </span>
        </PageHeaderDescription>
      </PageHeader>
      <section className="px-4">
        <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow-md md:shadow-xl">
          <Carousel>
            <CarouselContent className="flex items-center px-3 py-2  md:w-full">
              <CarouselItem className="basis-full md:basis-1/3">
                <Image src={Pic1} alt="tutor" />
              </CarouselItem>
              <CarouselItem className="basis-full md:basis-1/3">
                <Image src={Pic2} alt="group tutor" />
              </CarouselItem>
              <CarouselItem className="basis-full md:basis-1/3">
                <Image src={Pic3} alt="book" />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </main>
  );
}
