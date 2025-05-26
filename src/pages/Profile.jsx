import React, { useState } from "react";
import {useForm} from "react-hook-form";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FiPlus } from "react-icons/fi";
import { TbLockPassword } from "react-icons/tb";




const Profile = () => {
  const { toggleSidebar, isMobile } = useOutletContext();

  const form = useForm({
    defaultValues: {
      profilePicture: null,
      firstName: "",
      lastName: "",
      bio : "",
      email: "",
      password: "",
      newPassword: "",
    },
  })

  const onSubmit = (values) => {
    console.log("Form values:", values)
  }

  const [preview, setPreview] = useState(null)
  return (
    <PageLayout
      title= "Profile"
      toggleSidebar={toggleSidebar}
      isMobile={isMobile}>
      
      <div className="mt-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Settings</h2>
          <p className="text-gray-600">Manage your Account settings here.</p>
        </div>
      </div>
      <Card className={"max-w-250 mx-auto"}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Profile Settings</CardTitle>
          <CardDescription className="text-gray-600">This is how others will see you</CardDescription>
        </CardHeader>
          <Separator 
          orientation="horizontal"
          />
        <CardContent className="space-y-4">
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"  
            >
                <FormField 
                control={form.control}
                name="profilePicture"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={preview || "https://api.dicebear.com/9.x/notionists/svg"} 
                          alt="Profile Preview"
                          className="h-24 w-24 rounded-full object-cover bg-violet-500"
                        />
                      </div>   
                      <div className="flex-1 flex flex-col">
                        <FormLabel className="text-lg font-semibold">Profile picture</FormLabel>
                        <p className="text-sm text-gray-500">PNG, JPEG under 15MB</p>
                      </div>                                                           
                    <FormControl>
                      <div className="flex space-x-2"> 
                        <Button asChild type="button" variant="outline">
                          <label htmlFor="profilePicture" className="cursor-pointer">
                            <Input
                              id="profilePicture"
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => {
                                const handleFile = e.target.files?.[0];
                                field.onChange(handleFile);
                                if (handleFile) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setPreview(reader.result);
                                  };
                                  reader.readAsDataURL(handleFile);
                                } else {
                                  setPreview(null);
                                }
                              }}
                            />
                              Upload Profile 
                            </label>
                          </Button>
                          <Button type="button" variant="destructive" className="hover:bg-red-700">
                            Delete
                          </Button>
                        </div>
                    </FormControl>
                  </div>
                  </FormItem>
                )}
                />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control = {form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl className="">
                      <Input placeholder="eg. Will" {...field} />
                    </FormControl>
                    <FormDescription>This is your public display name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control = {form.control}
                name="lastName"
                render = {({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="eg. Smith" {...field} />
                    </FormControl>
                    <FormDescription>This is your public display name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
              <FormField
                control = {form.control}
                name="bio"
                render = { ({field}) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us a bit about yourself" {...field} />
                    </FormControl>
                    <FormDescription>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )

                }
              />
              
                <FormField 
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                      <FormLabel>Email</FormLabel>
                      <div className="flex items-center justify-between space-x-2">           
                          <FormControl className="flex-1 max-w-sm">
                            <Input placeholder="example@gmail.com" {...field}/> 
                          </FormControl>
                      <Button type="button" variant="outline"> <FiPlus/> Add email</Button>
                    </div>
                  </FormItem>
                  )}
                />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField 
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormDescription>Input your current password.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField 
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormDescription>Input your new password.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator className="mt-5" />

              <CardFooter className="flex justify-end p-6 space-x-3">
                <Button type="submit" className="w-full md:w-auto">
                  Update Account
                </Button>
                <Button variant="destructive" type="submit" className="w-full md:w-auto">
                  Delete Account
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default Profile
