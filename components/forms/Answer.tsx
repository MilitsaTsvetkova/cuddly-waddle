"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { answerSchema } from "../../lib/validations/answer.schema";
import TextEditor from "../editor/TextEditor";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

const Answer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      answer: "",
    },
  });
  const handleCreateAnswer = async (data: z.infer<typeof answerSchema>) => {};

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>
        <Button
          className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-orange-500 shadow-none dark:text-orange-500"
          onClick={() => {}}
        >
          <Image
            src="/assets/icons/stars.svg"
            width={12}
            height={12}
            alt="AI"
            className="object-contain"
          />
          Generate AI Answer
        </Button>
      </div>
      <Form {...form}>
        <form
          className="mt-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <TextEditor field={field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Answer;
