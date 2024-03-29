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
        <PageHeaderHeading className="hidden md:block">
          Welcome to <span className="font-bold">Find My Tutor</span>
        </PageHeaderHeading>
        <PageHeaderDescription>
          In today&apos;s fast-paced academic environment, students and learning
          enthusiasts face the challenge of finding the right guidance to unlock
          their full potential. Enter "Find My Tutor," a revolutionary web
          application designed to bridge the gap between learners seeking to
          broaden their horizons and the experts who can lead the way. With an
          intuitive interface and a sophisticated matching algorithm, "Find My
          Tutor" connects users with tutors and specialists across a wide range
          of subjects and fields. Whether you're struggling with calculus,
          diving into the depths of historical events, or mastering a new
          programming language, our platform ensures that the right expertise is
          just a few clicks away. Join the "Find My Tutor" community today and
          transform the way you learn, one expert connection at a time.
        </PageHeaderDescription>
      </PageHeader>
      <section className="px-4">
        <div className="max-h-[25rem] overflow-hidden rounded-[0.5rem] border bg-background shadow-md md:shadow-xl">
          <Carousel>
            <CarouselContent className="px-3 py-3">
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 flex flex-col justify-center">
                <Image src={Pic1} alt="tutor" />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 flex flex-col justify-center">
                <Image src={Pic2} alt="group tutor" />
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 flex flex-col justify-center">
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
