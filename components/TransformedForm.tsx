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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TransformationData = {
  transformProps: Transformations;
  prompt: string;
  color?: string;
};

const TransformedForm = ({ type }: { type: keyof Transformations }) => {
  const [id, setid] = useState<string | undefined>(undefined);
  const [transformation, setTransformation] = useState<TransformationData>();
  const [active, setActive] = useState(true);
  const [apply, setApply] = useState(false);
  const { user } = useUser();

  const createUrl = (transformationData?: TransformationData) => {
    if (transformationData) {
      const { transformProps } = transformationData as TransformationData;
      return getCldImageUrl({
        width: 1000,
        height: 1000,
        src: id as string,
        ...transformProps,
        rawTransformations: [`fl_attachment:${form.getValues("title")}`],
        format: "jpg",
      });
    } else {
      return getCldImageUrl({
        width: 1000,
        height: 1000,
        src: id as string,
      });
    }
  };

  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    ratio: z.string(),
    objectRemove: z.string(),
    objectToRecolore: z.string(),
    replacementColor: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      ratio: "Select size",
      objectRemove: "",
      objectToRecolore: "",
      replacementColor: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const transformData = {
      title: data.title,
      creater: user?.fullName,
      transformation: transformation?.transformProps,
      color: transformation?.color,
      prompt: transformation?.prompt,
      originalUrl: createUrl(),
      transformationUrl: createUrl(transformation!),
    };

    save(transformData).then(() => {
      setActive(true);
      setApply(false);
      setid(undefined);
      setTransformation(undefined);
      form.reset();
    });
  };
  useEffect(() => {
    if (apply) constructPrompt();
  }, [apply]);
  const constructPrompt = () => {
    if (type === "aspectRatio")
      setTransformation({
        transformProps: {
          aspectRatio: form.getValues("ratio"),
          crop: "fill",
        },
        prompt: form.getValues("ratio"),
      });

    if (type === "restore")
      setTransformation({
        transformProps: { restore: true },
        prompt: "restore",
      });
    if (type === "recolor")
      setTransformation({
        transformProps: {
          recolor: {
            prompt: form.getValues("objectToRecolore"),
            to: form.getValues("replacementColor"),
            multiple: true,
          },
        },
        prompt: form.getValues("objectToRecolore"),
        color: form.getValues("replacementColor"),
      });
    if (type === "remove")
      setTransformation({
        transformProps: {
          remove: {
            prompt: form.getValues("objectRemove"),
            multiple: true,
            removeShadow: true,
          },
        },
        prompt: form.getValues("objectRemove"),
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
        {type === "recolor" && (
          <div className="flex w-full gap-4">
            <FormField
              control={form.control}
              name="objectToRecolore"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Object to recolor</FormLabel>
                  <FormControl>
                    <Input className="rounded-2xl p-7" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="replacementColor"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Replacement Color</FormLabel>
                  <FormControl>
                    <Input className="rounded-2xl p-7" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {type === "aspectRatio" && (
          <FormField
            control={form.control}
            name="ratio"
            render={({ field }) => (
              <Select onValueChange={field.onChange}>
                <SelectTrigger className="w-full rounded-2xl p-7">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1:1">Square(1:1)</SelectItem>
                  <SelectItem value="3:4">Standard Portrait (3:4)</SelectItem>
                  <SelectItem value="9:16">Phone Portrait (9:16)</SelectItem>
                  <SelectItem value="16:9">Phone Landscape (16:9)</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        )}
        {type === "remove" && (
          <FormField
            control={form.control}
            name="objectRemove"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Object to Remove</FormLabel>
                <FormControl>
                  <Input className="rounded-2xl p-7" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div className="flex w-full gap-4">
          <div className="w-full flex flex-col gap-3">
            <h1 className="text-3xl font-extrabold text-blue-950">Original</h1>
            <div className="min-h-80 h-fit relative border-gray-200 rounded-2xl border  ">
              {!id ? (
                <ImageLoad setId={setid} setActive={setActive} />
              ) : (
                <ImageView key={"original"} id={id as string} />
              )}
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <h1 className="text-3xl font-extrabold text-blue-950">
              Transformed
            </h1>
            <div className="relative min-h-80 h-fit border-gray-200 rounded-2xl border ">
              {id && apply ? (
                <ImageView
                  key={transformation?.prompt}
                  id={id as string}
                  transformation={transformation?.transformProps!}
                />
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
          <Button
            variant="gradient"
            disabled={!Boolean(transformation)}
            size="custom"
            type="submit"
          >
            <p className="text-slate-50 font-semibold text-base">Save Image</p>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TransformedForm;
