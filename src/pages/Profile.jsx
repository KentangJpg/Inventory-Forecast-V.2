import React, { useState } from "react";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PageLayout from "../layouts/PageLayout";
import { useOutletContext } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";




const Profile = () => {
  const { toggleSidebar, isMobile } = useOutletContext();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      bio : "",
    },
  })

  const onSubmit = (values) => {
    console.log("Form values:", values)
  }

  
  return (
    <PageLayout
      title= "Profile"
      toggleSidebar={toggleSidebar}
      isMobile={isMobile}>
      
      <div className="mt-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Profile</h2>
          <p className="text-gray-600">Manage your profile settings here.</p>
        </div>
      </div>

      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 py-6"  
        >
          <FormField
            control = {form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control = {form.control}
            name="email"
            render = {({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control = {form.control}
            name="bio"
            render = { ({field}) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Input placeholder="Tell us about yourself" {...field} />
                </FormControl>
              </FormItem>
            )

            }
          />
        <Button type="submit"> Save Changes </Button>
        </form>
      </Form>
    </PageLayout>
  )
}

export default Profile
