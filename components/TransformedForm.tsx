"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import ImageLoad from "./ImageLoad";
import ImageView from "./ImageView";
import type { Transformations } from "@/types/type";
import { save } from "@/app/action";
import { useUser } from "@clerk/nextjs";
import { getCldImageUrl } from "next-cloudinary";


const TransformedForm = ({ type }: { type?: string }) => {
  const [id, setid] = useState<string | undefined>(undefined);
  const [prompt, setPrompt] = useState<Transformations>({});
  const [active, setActive] = useState(true);
  const [apply, setApply] = useState(false);
  const { user } = useUser();


  const createUrl = () => {
    return getCldImageUrl({
      width: 960,
      height: 600,
      src: id as string,
      ...prompt,
    });
  };
  useEffect(() => {
    if (type) setPrompt({ restore: true });
  }, []);

  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const transformData = {
      title: data.title,
      creater: user?.fullName,
      prompt: prompt,
      url: createUrl(),
    };
    save(transformData).then(() => {
      setActive(true);
      setApply(false);
      setid(undefined);
      setPrompt({});
      form.reset()
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Title</FormLabel>
              <FormControl>
                <Input className="rounded-2xl p-7" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full gap-4">
          <div className="w-full flex flex-col gap-3">
            <h1 className="text-3xl font-extrabold text-blue-950">Original</h1>
            <div className="min-h-80 border-gray-200 rounded-2xl border  ">
              {!id ? (
                <ImageLoad setId={setid} setActive={setActive} />
              ) : (
                <ImageView id={id as string} />
              )}
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <h1 className="text-3xl font-extrabold text-blue-950">
              Transformed
            </h1>
            <div className="min-h-80 border-gray-200 rounded-2xl border ">
              {id && apply ? (
                <ImageView id={id as string} prompt={prompt} />
              ) : (
                <div className="flex h-full w-full justify-center items-center ">
                  <p className="text-slate-500 text-sm font-medium">
                    Transformed Image
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex w-full gap-4 ">
          <Button
            variant="gradient"
            size="custom"
            disabled={active}
            onClick={() => setApply(true)}
            type="button"
          >
            <p className="text-slate-50 font-semibold text-base">
              Apply transformation
            </p>
          </Button>
          <Button variant="gradient" size="custom" type="submit">
            <p className="text-slate-50 font-semibold text-base">Save Image</p>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TransformedForm;
