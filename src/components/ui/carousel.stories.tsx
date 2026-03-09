import type { Meta, StoryObj } from "@storybook/react";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "./carousel";
import { Card, CardContent } from "./card";

const meta: Meta<typeof Carousel> = {
  title: "Custom Components/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Carousel orientation",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const MultipleItems: Story = {
  name: "Multiple Items Visible",
  render: () => (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-2xl"
    >
      <CarouselContent className="-ml-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <CarouselItem key={index} className="pl-4 basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const Vertical: Story = {
  name: "Vertical Orientation",
  render: () => (
    <Carousel
      orientation="vertical"
      opts={{
        align: "start",
      }}
      className="w-full max-w-xs"
    >
      <CarouselContent className="-mt-4 h-[300px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pt-4 basis-1/2">
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const ImageCarousel: Story = {
  name: "Image Carousel",
  render: () => {
    const images = [
      { color: "#3b82f6", label: "Blue" },
      { color: "#10b981", label: "Green" },
      { color: "#f59e0b", label: "Amber" },
      { color: "#ef4444", label: "Red" },
      { color: "#8b5cf6", label: "Purple" },
    ];

    return (
      <Carousel className="w-full max-w-md">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div
                className="aspect-video rounded-lg flex items-center justify-center text-white text-2xl font-bold"
                style={{ backgroundColor: image.color }}
              >
                {image.label}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  },
};

export const WithAPI: Story = {
  name: "With API Control",
  render: function Render() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!api) return;

      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);

      api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1);
      });
    }, [api]);

    return (
      <div className="space-y-4">
        <Carousel setApi={setApi} className="w-full max-w-xs">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="text-center text-sm text-muted-foreground">
          Slide {current} of {count}
        </div>
        <div className="flex justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                current === index + 1 ? "bg-blue-500" : "bg-gray-300"
              }`}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      </div>
    );
  },
};

export const ProductCarousel: Story = {
  name: "Product Carousel",
  render: () => {
    const products = [
      { name: "Product A", price: "$29.99", rating: 4.5 },
      { name: "Product B", price: "$39.99", rating: 4.8 },
      { name: "Product C", price: "$19.99", rating: 4.2 },
      { name: "Product D", price: "$49.99", rating: 4.9 },
      { name: "Product E", price: "$34.99", rating: 4.6 },
      { name: "Product F", price: "$24.99", rating: 4.3 },
    ];

    return (
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-3xl"
      >
        <CarouselContent className="-ml-4">
          {products.map((product, index) => (
            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <Card>
                <CardContent className="p-4">
                  <div
                    className="aspect-square bg-gray-100 rounded-md mb-3 flex items-center justify-center text-gray-400"
                  >
                    Image
                  </div>
                  <h3 className="font-medium">{product.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold">{product.price}</span>
                    <span className="text-sm text-gray-500">
                      {product.rating} stars
                    </span>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  },
};
