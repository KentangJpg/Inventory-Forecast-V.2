import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PageLayout from "../layouts/PageLayout";
import { useOutletContext } from "react-router-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const profileSchema = z.object({
  name: z.string().min(1, "Your name is required"),
  dateOfBirth: z.string().min(1, "Last name is required"),
});

const Account = () => {
  const { toggleSidebar, isMobile } = useOutletContext();

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      dateOfBirth: "",
    },
  });

  const onSubmit = (values) => {
    console.log("Form values:", values);
  };

  const handleUpdateAccount = () => {
    console.log("Account deletion confirmed!");
    setShowDeleteAccountDialog(false);
  };

  const [preview, setPreview] = useState(null);

  return (
    <PageLayout
      title="Account"
      toggleSidebar={toggleSidebar}
      isMobile={isMobile}
    >
      <div className="mt-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Settings</h2>
          <p className="text-gray-600">Manage your Account settings here.</p>
        </div>
      </div>
      <Separator className="my-6" />
      <div className={"w-full mx-auto"}>
        <div className="flex flex-col">
          <span className="text-lg font-semibold mx-6">Account</span>
          <span className="text-gray-600 mx-6">
            Update your account settings.
          </span>
        </div>
        <Separator orientation="horizontal" className="my-6" />
        <div className="space-y-4 mx-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="eg. Will" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the name that will be displayed on your profile
                      and in emails.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Of Birth</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tell us a bit about yourself"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
    </PageLayout>
  );
};

export default Account;
